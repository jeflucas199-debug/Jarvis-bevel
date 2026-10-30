"""Gera Mapa-Bevel.canvas: centro + um bloco colorido por pasta, sem sobreposição.
Rodar de novo sempre que criar/mover nota: python3 .claude/scripts/gerar_mapa.py"""
import os, glob, json, math, re
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
# ordem = sentido horário a partir do topo = caminho do negócio
PASTAS = [  # pasta, ícone, título, cor, descrição
 ('01-Empresa','🏢','Empresa','#F472B6','Quem somos, sócios, visão'),
 ('04-Mercado','🎯','Mercado','#FB923C','Para quem vendemos'),
 ('03-Produto','🛠','Produto','#19C3B1','O que entregamos'),
 ('06-Marketing','📣','Marketing','#B07CFF','Como atraímos'),
 ('05-Comercial','💰','Comercial','#22D3EE','Como vendemos'),
 ('02-Clientes','🤝','Clientes','#0062FC','Quem já está com a gente'),
 ('10-Financeiro','💵','Financeiro','#FACC15','Dinheiro que entra e sai'),
 ('11-Juridico','⚖️','Jurídico','#A3E635','Contrato, fiscal, riscos legais'),
 ('07-Operacao','⚙️','Operação','#4ADE80','Ferramentas e rotina'),
 ('08-Decisoes','📌','Decisões','#F87171','O que foi decidido e o que falta'),
 ('09-Reunioes','🗓','Reuniões','#CBD5E1','Atas, da mais nova para a mais antiga')]
SUB = {'Fechados':'✅ Fechados','Em-Negociacao':'🔄 Em negociação','Leads':'🧊 Leads','Parados-ou-Perdidos':'⏸ Parados ou perdidos','Roteiros':'📞 Roteiros'}
DESTAQUE = {'Processo-de-Vendas-e-Entrega','Carta-de-Apresentacao','Identidade-Visual','Precos','Nicho',
            'Registro-de-Decisoes','Divergencias-a-Resolver','Resultado-Acumulado','Clientes','Contrato-Modelo'}
FLUXO = [('06-Marketing','05-Comercial','gera leads'),('05-Comercial','02-Clientes','fecha'),
         ('02-Clientes','10-Financeiro','paga'),('09-Reunioes','08-Decisoes','decide')]
CW, CH, GAP, PAD, COLS = 300, 52, 14, 28, 2
W = PAD*2 + COLS*CW + (COLS-1)*GAP
nodes, edges = [], []
def nome(p): return os.path.basename(p)[:-3]
def card(id_, txt, x, y, w=CW, h=CH, color=None):
    n = {"id": id_, "type": "text", "text": txt, "x": int(x), "y": int(y), "width": int(w), "height": int(h)}
    if color: n["color"] = color
    nodes.append(n); return n
def rotulo(n):
    m = re.match(r'(\d{4})-(\d\d)-(\d\d)-(.*)', n)
    t = f"{m[3]}/{m[2]} · {m[4]}" if m else n
    t = t.replace('-', ' ')
    return f"⭐ **[[{n}|{t}]]**" if n in DESTAQUE else f"[[{n}|{t}]]"
def secoes(pasta):
    base = os.path.join(ROOT, pasta)
    notas = [nome(p) for p in glob.glob(base + '/*.md') if nome(p) != pasta]
    notas.sort(reverse=pasta == '09-Reunioes')
    out = [(None, notas)]
    for sub in [s for s in SUB if os.path.isdir(os.path.join(base, s))]:
        out.append((sub, sorted(nome(p) for p in glob.glob(f'{base}/{sub}/*.md') if nome(p) != sub)))
    return out
blocos = []
for pasta, ic, tit, cor, desc in PASTAS:
    sec = secoes(pasta)
    total = sum(len(n) for _, n in sec)
    linhas = sum((1 if s else 0) + math.ceil(len(n)/COLS) for s, n in sec)
    h = PAD*2 + 80 + GAP + linhas*(CH+GAP)
    blocos.append(dict(pasta=pasta, ic=ic, tit=tit, cor=cor, desc=desc, sec=sec, total=total, w=W, h=h))
# centro
card("centro", "# 🧠 [[Bevel|Bevel]]\n**Segundo cérebro** · *Você e a Bevel.*", -300, -170, 600, 150, "#0062FC")
card("inicio", "⭐ **[[00-Inicio|Início — onde estamos]]**", -300, -5, 292, CH)
card("pend", "✅ **[[Pendencias|Pendências]]**", 8, -5, 292, CH)
card("leg", "**Como ler:** sentido horário = caminho do negócio (empresa → mercado → produto → marketing → comercial → clientes → financeiro). "
     "⭐ = nota principal. Clique num cartão para abrir.", -300, 62, 600, 96)
CENTRO = (-320, -190, 640, 370)
def sobrepoe(a, b, m=60):
    return a[0] < b[0]+b[2]+m and b[0] < a[0]+a[2]+m and a[1] < b[1]+b[3]+m and b[1] < a[1]+a[3]+m
# menor elipse sem sobreposição
for k in range(60):
    rx, ry = 900 + 50*k, 700 + 40*k
    rects = []
    for i, b in enumerate(blocos):
        a = -math.pi/2 + i*2*math.pi/len(blocos)
        b['a'] = a
        rects.append((rx*math.cos(a) - b['w']/2, ry*math.sin(a) - b['h']/2, b['w'], b['h']))
    if all(not sobrepoe(rects[i], rects[j]) for i in range(len(rects)) for j in range(i+1, len(rects))) \
       and all(not sobrepoe(r, CENTRO, 120) for r in rects):
        break
gid = {}
for i, (b, r) in enumerate(zip(blocos, rects)):
    gx, gy = r[0], r[1]; cor = b['cor']; g = f"g{i}"; gid[b['pasta']] = g
    nodes.append({"id": g, "type": "group", "label": f"{b['ic']} {b['tit']} ({b['total']})",
                  "x": int(gx), "y": int(gy), "width": int(b['w']), "height": int(b['h']), "color": cor})
    y = gy + PAD
    card(f"h{i}", f"## {b['ic']} [[{b['pasta']}|{b['tit']}]]\n{b['desc']}", gx+PAD, y, b['w']-2*PAD, 80, cor); y += 80+GAP
    for s, (sub, notas) in enumerate(b['sec']):
        if sub:
            card(f"s{i}_{s}", f"**[[{sub}|{SUB[sub]}]]** ({len(notas)})", gx+PAD, y, b['w']-2*PAD, CH, cor); y += CH+GAP
        for k, n in enumerate(notas):
            card(f"n{i}_{s}_{k}", rotulo(n), gx+PAD+(k % COLS)*(CW+GAP), y+(k//COLS)*(CH+GAP))
        y += math.ceil(len(notas)/COLS)*(CH+GAP)
    a = b['a']; ca, sa = math.cos(a), math.sin(a)
    lado = ("top" if sa > 0 else "bottom") if abs(sa)*ry > abs(ca)*rx*0.6 else ("left" if ca > 0 else "right")
    edges.append({"id": f"e{i}", "fromNode": "centro", "toNode": g, "toSide": lado, "color": cor})
for j, (de, para, txt) in enumerate(FLUXO):
    edges.append({"id": f"f{j}", "fromNode": gid[de], "toNode": gid[para], "label": txt, "toEnd": "arrow"})
json.dump({"nodes": nodes, "edges": edges}, open(os.path.join(ROOT, "Mapa-Bevel.canvas"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"ok: {len(nodes)} cartões, elipse {rx}x{ry}")
