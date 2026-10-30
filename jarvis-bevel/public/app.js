// Página do Jarvis: ouve (Web Speech API), envia ao servidor, mostra e fala a resposta.
const $ = (id) => document.getElementById(id);
// Preferências (voz, velocidade, modo, grupos abertos) ficam guardadas neste navegador.
const preferencia = (chave, padrao) => {
  try {
    return localStorage.getItem(chave) ?? padrao;
  } catch {
    return padrao;
  }
};
const lembrar = (chave, valor) => {
  try {
    localStorage.setItem(chave, valor);
  } catch {
    /* sem armazenamento: vale só nesta aba */
  }
};
const orbe = $("orbe");
const status = $("status");
const transcricao = $("transcricao");

let temas = [];
let historico = {};
let temaFixo = null; // tema escolhido na tela; sem ele, vale a palavra-chave ou a Geral
let temaVisivel = "geral";
let ocupado = false;
let usaApi = false; // sem chave da API o custo é só uma estimativa: sai do limite do plano, não é cobrado

// ---------- Utilidades ----------
function escapar(t) {
  return t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// Markdown simples e seguro (o texto é escapado antes de virar HTML).
function markdown(texto) {
  const linhas = escapar(texto).split("\n");
  const html = [];
  let lista = null;
  let tabela = [];
  const inline = (s) =>
    s
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/\[\[([^\]|]+)(\|([^\]]+))?\]\]/g, (_, nota, __, apelido) => `<strong>${apelido || nota}</strong>`)
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  const fecharLista = () => {
    if (lista) html.push(`</${lista}>`);
    lista = null;
  };
  const fecharTabela = () => {
    if (!tabela.length) return;
    const celulas = (l) => l.replace(/^\||\|$/g, "").split("|").map((c) => inline(c.trim()));
    const [cab, ...corpo] = tabela.filter((l) => !/^[|\s:-]+$/.test(l)); // sem a linha |---|
    html.push(
      `<div class="tabela"><table><thead><tr>${celulas(cab).map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>` +
        corpo.map((l) => `<tr>${celulas(l).map((c) => `<td>${c}</td>`).join("")}</tr>`).join("") +
        "</tbody></table></div>",
    );
    tabela = [];
  };
  for (const linha of linhas) {
    if (/^\s*\|.*\|\s*$/.test(linha)) {
      fecharLista();
      tabela.push(linha.trim());
      continue;
    }
    fecharTabela();
    let m;
    if ((m = linha.match(/^(#{1,4})\s+(.*)/))) {
      fecharLista();
      html.push(`<h3>${inline(m[2])}</h3>`);
    } else if ((m = linha.match(/^\s*[-*•]\s+(.*)/))) {
      if (lista !== "ul") { fecharLista(); html.push("<ul>"); lista = "ul"; }
      html.push(`<li>${inline(m[1])}</li>`);
    } else if ((m = linha.match(/^\s*\d+[.)]\s+(.*)/))) {
      if (lista !== "ol") { fecharLista(); html.push("<ol>"); lista = "ol"; }
      html.push(`<li>${inline(m[1])}</li>`);
    } else if (linha.trim() === "") {
      fecharLista();
    } else {
      fecharLista();
      html.push(`<p>${inline(linha)}</p>`);
    }
  }
  fecharLista();
  fecharTabela();
  return html.join("");
}

function nomeDoTema(id) {
  return temas.find((t) => t.id === id)?.nome ?? "Geral";
}

function definirEstado(classe, texto) {
  orbe.classList.remove("ouvindo", "pensando", "falando");
  if (classe) orbe.classList.add(classe);
  status.innerHTML = texto;
  $("cancelarGravacao").hidden = classe !== "ouvindo";
  if (window.esfera) window.esfera.estado = classe;
  if (window.holograma) window.holograma.estado = classe;
}

// Visual do Jarvis: holograma da cabeça (padrão) ou esfera de partículas, escolhido no painel da direita.
function escolherVisual(visual) {
  document.body.classList.toggle("visual-esfera", visual === "esfera");
  for (const b of document.querySelectorAll("[data-visual]")) b.classList.toggle("ativo", b.dataset.visual === visual);
  lembrar("jarvis-visual", visual);
}
for (const b of document.querySelectorAll("[data-visual]")) b.onclick = () => escolherVisual(b.dataset.visual);
escolherVisual(preferencia("jarvis-visual", "holograma") === "esfera" ? "esfera" : "holograma");



const textoParado = 'Segure a <kbd>barra de espaço</kbd> ou o círculo e fale';

// ---------- Tela ----------
// Barra lateral no estilo do Obsidian, com os mesmos grupos e sessões da barra do app do Claude.
// Geral solto no topo; os outros grupos abrem e fecham.
let grupos = [];
const gruposFechados = new Set(JSON.parse(preferencia("jarvis-grupos-fechados", "[]")));

function linhaTema(t, dentro) {
  const linha = document.createElement("div");
  const ativo = t.id === temaVisivel;
  linha.className = "item" + (dentro ? " dentro" : "") + (ativo ? " ativo" : "") + (ativo && ocupado ? " trabalhando" : "");
  const b = document.createElement("button");
  b.type = "button";
  b.className = "nome";
  b.textContent = t.nome + (t.id === temaFixo ? " 📌" : "");
  b.title = t.id === temaFixo ? "Fixado. Clique para soltar (volta a escolher pelo assunto)" : `Fixar o tema ${t.nome}`;
  b.onclick = () => {
    temaFixo = temaFixo === t.id ? null : t.id;
    temaVisivel = temaFixo ?? t.id;
    desenharTudo();
  };
  linha.appendChild(b);
  if (ativo) {
    const novo = document.createElement("button");
    novo.type = "button";
    novo.className = "nova";
    novo.textContent = "↺";
    novo.title = "Nova conversa neste tema (as notas continuam iguais)";
    novo.onclick = async () => {
      await fetch(`/api/novo/${t.id}`, { method: "POST" });
      definirEstado(null, `Conversa de <b>${escapar(t.nome)}</b> recomeçada. As notas continuam iguais.`);
    };
    linha.appendChild(novo);
  }
  return linha;
}

function desenharTemas() {
  const nav = $("listaTemas");
  nav.innerHTML = "";
  for (const t of temas.filter((t) => t.grupo === "geral")) nav.appendChild(linhaTema(t, false));
  for (const g of grupos.filter((g) => g.id !== "geral")) {
    const doGrupo = temas.filter((t) => t.grupo === g.id);
    if (!doGrupo.length) continue;
    const temAtivo = doGrupo.some((t) => t.id === temaVisivel);
    const aberto = !gruposFechados.has(g.id) || temAtivo; // o grupo do tema atual sempre aparece aberto
    const cab = document.createElement("button");
    cab.type = "button";
    cab.className = "grupo";
    cab.setAttribute("aria-expanded", String(aberto));
    cab.innerHTML = `<span class="seta">${aberto ? "▾" : "▸"}</span>${escapar(g.nome)}${temAtivo && !aberto ? " •" : ""}`;
    cab.onclick = () => {
      if (aberto) gruposFechados.add(g.id);
      else gruposFechados.delete(g.id);
      lembrar("jarvis-grupos-fechados", JSON.stringify([...gruposFechados]));
      desenharTemas();
    };
    nav.appendChild(cab);
    if (aberto) for (const t of doGrupo) nav.appendChild(linhaTema(t, true));
  }
  $("temaAtivo").textContent = nomeDoTema(temaVisivel) + (temaVisivel === temaFixo ? " (fixo)" : "");
}

function cartaoTroca(e) {
  const div = document.createElement("article");
  div.className = "troca" + (e.erro ? " erro" : "");
  const hora = new Date(e.quando).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  div.innerHTML = `
    <p class="pergunta">${escapar(e.pergunta)}</p>
    ${(e.anexos ?? []).map((a) => `<p class="anexo">📎 ${escapar(a.replace(/^_arquivo\//, ""))}</p>`).join("")}
    <div class="resposta">${markdown(e.tela || e.erro || "")}</div>
    ${(e.documentos ?? [])
      .map((d) => `<a class="documento" href="${d.link}" target="_blank" rel="noopener">📄 Abrir / Salvar em PDF · ${escapar(d.nome.replace(/\.html$/, ""))}</a>`)
      .join("")}
    <div class="meta"><span>${hora}</span>${usaApi ? `<span>US$ ${(e.custoUsd ?? 0).toFixed(3)}</span>` : ""}
      <button type="button">🔊 Ouvir de novo</button></div>`;
  div.querySelector("button").onclick = () => falar(e.fala);
  return div;
}

function desenharConversa() {
  const c = $("conversa");
  c.innerHTML = "";
  for (const e of historico[temaVisivel] ?? []) c.appendChild(cartaoTroca(e));
}

// Nome curto de uma nota: "02-Clientes/Em-Negociacao/Escolinha-de-Futebol.md" → "Escolinha de Futebol".
const nomeDaNota = (caminho) =>
  caminho.split("/").pop().replace(/\.md$/, "").replace(/-/g, " ");

// Histórico das notas salvas no tema: fica fechado atrás do ícone ✓ no topo.
function desenharSalvos() {
  const ul = $("listaSalvos");
  const vistos = new Map();
  for (const e of [...(historico[temaVisivel] ?? [])].reverse())
    // Só notas do cofre; documentos ficam no botão embaixo da resposta.
    for (const s of e.salvos ?? []) if (!vistos.has(s.nota)) vistos.set(s.nota, { ...s, quando: e.quando });
  $("contaSalvos").textContent = String(vistos.size);
  ul.innerHTML = vistos.size ? "" : '<li class="vazio">Nada salvo ainda neste tema.</li>';
  for (const s of [...vistos.values()].slice(0, 15)) {
    const li = document.createElement("li");
    const hora = new Date(s.quando).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    li.innerHTML = `<a href="${s.link}" title="Abrir no Obsidian">${escapar(nomeDaNota(s.nota))}<small>${hora}</small></a>`;
    ul.appendChild(li);
  }
}

function abrirSalvos(abrir) {
  $("painelSalvos").hidden = !abrir;
  $("botaoSalvos").setAttribute("aria-expanded", String(abrir));
}
$("botaoSalvos").onclick = (e) => {
  e.stopPropagation();
  abrirSalvos($("painelSalvos").hidden);
};
document.addEventListener("click", (e) => {
  if (!$("painelSalvos").hidden && !e.target.closest(".salvos-menu")) abrirSalvos(false);
});

// Aviso discreto depois de uma resposta que salvou algo; some sozinho.
let timerAviso = null;
function avisarSalvos(salvos) {
  if (!salvos?.length) return;
  const aviso = $("aviso");
  aviso.textContent =
    salvos.length === 1 ? `✓ Salvo em ${nomeDaNota(salvos[0].nota)}` : `✓ ${salvos.length} notas atualizadas`;
  aviso.hidden = false;
  clearTimeout(timerAviso);
  timerAviso = setTimeout(() => (aviso.hidden = true), 3000);
}

function desenharTudo() {
  desenharTemas();
  desenharConversa();
  desenharSalvos();
}

let assinatura = "";
// soSeMudou: usado pela atualização automática, que só redesenha quando algo mudou (aba nova, resposta nova).
async function carregar(soSeMudou = false) {
  const r = await fetch("/api/estado").then((x) => x.json());
  const nova = JSON.stringify([r.temas, r.grupos, r.historico]);
  if (soSeMudou && nova === assinatura) return;
  assinatura = nova;
  temas = r.temas;
  grupos = r.grupos ?? [];
  historico = r.historico;
  $("modelo").textContent = r.modelo;
  usaApi = r.usaApi;
  $("custo").textContent = usaApi ? `Hoje: US$ ${r.custoHoje.toFixed(2)}` : "Pelo seu plano do Claude";
  desenharTudo();
}

// ---------- Voz que fala ----------

// Duas fontes de voz: as do Mac (comando `say` no servidor, inclui as Aprimoradas/Premium,
// que o Chrome não mostra) e as do Chrome. O valor salvo é "mac:Nome" ou "chrome:Nome".
let vozesMac = [];
let vozEscolhida = null; // { fonte: "mac" | "chrome", nome, voz? }
let velocidade = Number(preferencia("jarvis-velocidade", "1.05"));
const nomeCurto = (nome) =>
  nome.replace(/\s*\(português \(brasil\)\)/i, "").replace(/\(enhanced\)/i, "(Aprimorada)").replace(/\(premium\)/i, "(Premium)");

function escolherVoz() {
  const vozesChrome = speechSynthesis.getVoices().filter((v) => v.lang.replace("_", "-").startsWith("pt-BR"));
  const opcoes = [
    ...vozesMac.map((v) => ({ fonte: "mac", nome: v.nome, natural: v.natural })),
    ...vozesChrome.map((v) => ({ fonte: "chrome", nome: v.name, voz: v, natural: false })),
  ];
  // Antigas preferências guardavam só o nome da voz do Chrome.
  let salva = preferencia("jarvis-voz", "");
  if (salva && !salva.includes(":")) salva = `chrome:${salva}`;
  vozEscolhida =
    opcoes.find((o) => `${o.fonte}:${o.nome}` === salva) ??
    opcoes.find((o) => o.natural) ??
    opcoes.find((o) => /luciana|google/i.test(o.nome)) ??
    opcoes[0] ??
    null;

  const select = $("escolhaVoz");
  select.innerHTML = "";
  for (const [fonte, rotulo] of [
    ["mac", "Vozes do Mac"],
    ["chrome", "Vozes do Chrome"],
  ]) {
    const grupo = document.createElement("optgroup");
    grupo.label = rotulo;
    for (const o of opcoes.filter((x) => x.fonte === fonte)) {
      const op = document.createElement("option");
      op.value = `${o.fonte}:${o.nome}`;
      op.textContent = nomeCurto(o.nome) + (o.natural ? " ★" : "");
      op.selected = o === vozEscolhida;
      grupo.appendChild(op);
    }
    if (grupo.children.length) select.appendChild(grupo);
  }
}
speechSynthesis.onvoiceschanged = escolherVoz;
escolherVoz();
fetch("/api/vozes-mac")
  .then((r) => (r.ok ? r.json() : []))
  .then((lista) => {
    vozesMac = lista;
    escolherVoz();
  })
  .catch(() => {});

$("escolhaVoz").onchange = (e) => {
  lembrar("jarvis-voz", e.target.value);
  escolherVoz();
  falar("Oi, Lucas. Esta é a minha voz agora.");
};
$("velocidade").value = String(velocidade);
$("velocidade").oninput = (e) => {
  velocidade = Number(e.target.value);
  lembrar("jarvis-velocidade", String(velocidade));
};
$("testarVoz").onclick = () => falar("Oi, Lucas. Você e a Bevel.");

function calarTudo() {
  speechSynthesis.cancel();
  fetch("/api/calar", { method: "POST" }).catch(() => {});
}

let estaFalando = false;
let falouCedo = false;

async function falar(texto) {
  if (!texto) return;
  calarTudo();
  estaFalando = true;
  if (vozEscolhida?.fonte === "mac") {
    definirEstado("falando", "Falando… (aperte <kbd>Esc</kbd> para calar)");
    try {
      await fetch("/api/dizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto, voz: vozEscolhida.nome, velocidade }),
      });
    } catch {
      /* servidor desligado: só volta ao normal */
    }
    estaFalando = false;
    if (!ouvindo && !ocupado) definirEstado(null, textoParado);
    else if (ocupado) definirEstado("pensando", "Terminando de escrever…");
    return;
  }
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "pt-BR";
  if (vozEscolhida?.voz) u.voice = vozEscolhida.voz;
  u.rate = velocidade;
  u.onstart = () => definirEstado("falando", "Falando… (aperte <kbd>Esc</kbd> para calar)");
  u.onboundary = () => (window.holograma?.batida(0.45), window.esfera?.batida(0.45)); // batida extra a cada palavra
  u.onend = u.onerror = () => {
    estaFalando = false;
    if (ocupado) definirEstado("pensando", "Terminando de escrever…");
    else definirEstado(null, textoParado);
  };
  speechSynthesis.speak(u);
}

// ---------- Modo rápido (modelo mais ágil; o normal pensa com mais calma) ----------
let modoRapido = preferencia("jarvis-modo", "normal") === "rapido";
function desenharModo() {
  const b = $("botaoModo");
  b.classList.toggle("ativo", modoRapido);
  b.textContent = modoRapido ? "⚡ Rápido" : "🧠 Calmo";
  b.title = modoRapido
    ? "Modo rápido: responde mais depressa (Sonnet). Clique para o modo calmo (Opus)."
    : "Modo calmo: pensa com mais cuidado (Opus). Clique para o modo rápido (Sonnet).";
}
$("botaoModo").onclick = () => {
  modoRapido = !modoRapido;
  lembrar("jarvis-modo", modoRapido ? "rapido" : "normal");
  desenharModo();
};
desenharModo();

// ---------- Enviar ao cérebro ----------
async function enviar(texto) {
  texto = texto.trim();
  if (ocupado) return;
  if (anexos.some((a) => a.enviando)) {
    definirEstado(null, "Espere o arquivo terminar de subir…");
    return;
  }
  const prontos = anexos.filter((a) => a.caminho).map((a) => a.caminho);
  if (!texto && !prontos.length) return;
  ocupado = true;
  desenharTemas();
  anexos = [];
  desenharAnexos();
  $("progresso").innerHTML = "";
  $("trilha").hidden = true;
  definirEstado("pensando", "Pensando…");
  transcricao.textContent = texto || "📎 " + prontos.map((p) => p.replace(/^_arquivo\//, "")).join(", ");

  let final = null;
  falouCedo = false;
  try {
    const r = await fetch("/api/falar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto, temaFixo, anexos: prontos, modo: modoRapido ? "rapido" : "normal" }),
    });
    const leitor = r.body.getReader();
    const dec = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await leitor.read();
      if (done) break;
      buffer += dec.decode(value, { stream: true });
      let i;
      while ((i = buffer.indexOf("\n")) >= 0) {
        const linha = buffer.slice(0, i).trim();
        buffer = buffer.slice(i + 1);
        if (linha) final = tratarEvento(JSON.parse(linha)) ?? final;
      }
    }
  } catch (err) {
    final = { erro: `Sem conexão com o servidor do Jarvis (${err.message}).` };
  }

  ocupado = false;
  desenharTemas();
  $("aoVivo")?.remove();
  if (final?.erro && !final.tela) {
    definirEstado(null, "⚠️ " + escapar(final.erro));
    falar(final.erro);
    return;
  }
  await carregar();
  avisarSalvos(final?.salvos);
  // A fala curta normalmente já foi dita enquanto a resposta era escrita.
  if (final?.fala && !falouCedo) falar(final.fala);
  else if (!estaFalando) definirEstado(null, textoParado);
}

// ---------- Trilha: o que o Jarvis está abrindo agora e em qual pasta ----------
// "02-Clientes/Em-Negociacao/Ortech.md" → ["Clientes", "Em Negociacao", "Ortech"]
const caminhoBonito = (rel) =>
  (rel || "")
    .split("/")
    .filter((p) => p && p !== ".." && p !== ".") // pasta fora do cofre (documentos do Jarvis) sem o "../" na frente
    .map((p) => p.replace(/^\d+-/, "").replace(/\.md$/, "").replace(/-/g, " "));

const ACOES = {
  lendo: ["📖", "Abrindo"],
  buscando: ["🔎", "Procurando"],
  escrevendo: ["✍️", "Salvando"],
  crm: ["🗂️", "Consultando o CRM"],
  bloqueado: ["⛔", "Bloqueado"],
};

function htmlCaminho(partes) {
  if (!partes.length) return "";
  const pastas = partes.slice(0, -1).map((p) => `<span class="pasta">📁 ${escapar(p)}</span>`);
  const ultimo = `<span class="arquivo">${escapar(partes[partes.length - 1])}</span>`;
  return [...pastas, ultimo].join('<span class="sep">›</span>');
}

function descreverPasso(e) {
  const [icone, acao] = ACOES[e.tipo] ?? ["•", e.tipo];
  let detalhe = "";
  if (e.tipo === "lendo" || (e.tipo === "escrevendo" && !/^(tema novo|documento)/.test(e.arquivo))) {
    detalhe = htmlCaminho(caminhoBonito(e.arquivo));
  } else if (e.tipo === "buscando") {
    const onde = caminhoBonito(e.pasta);
    const termo = e.arquivo.length > 30 ? e.arquivo.slice(0, 28) + "…" : e.arquivo;
    detalhe = `<span class="arquivo">"${escapar(termo)}"</span>` + (onde.length ? ` em ${htmlCaminho(onde)}` : " no cofre todo");
  } else if (e.tipo === "bloqueado") {
    detalhe = escapar(e.motivo ?? "");
  } else if (e.tipo !== "crm") {
    detalhe = `<span class="arquivo">${escapar(e.arquivo ?? "")}</span>`;
  }
  return { icone, acao, detalhe };
}

function mostrarPasso(e, link) {
  const { icone, acao, detalhe } = descreverPasso(e);
  // Em destaque embaixo do círculo: o passo de agora.
  const trilha = $("trilha");
  trilha.hidden = false;
  trilha.innerHTML = `<span class="icone">${icone}</span><span class="acao">${acao}</span><span class="caminho">${detalhe}</span>`;
  // No painel da direita: todos os passos desta resposta, em ordem.
  const li = document.createElement("li");
  if (e.tipo === "bloqueado") li.className = "bloqueado";
  li.innerHTML = `<span class="icone">${icone}</span><span>${acao} ${detalhe}</span>`;
  if (link) {
    const a = document.createElement("a");
    a.href = link;
    a.title = "Abrir no Obsidian";
    a.append(...li.childNodes);
    li.appendChild(a);
  }
  $("progresso").appendChild(li);
}

// Resposta aparecendo enquanto é escrita (some quando chega a versão final).
function mostrarAoVivo(texto) {
  let div = $("aoVivo");
  if (!div) {
    div = document.createElement("article");
    div.id = "aoVivo";
    div.className = "troca ao-vivo";
    $("conversa").appendChild(div);
  }
  div.innerHTML = `<div class="resposta">${markdown(texto)}</div>`;
}

function tratarEvento(ev) {
  if (ev.tipo === "tema") {
    if (ev.texto) transcricao.textContent = ev.texto;
    if (ev.escolhendo) {
      status.innerHTML = "Escolhendo o tema pelo assunto…";
      return null;
    }
    temaVisivel = ev.tema;
    if (ev.fixar) temaFixo = ev.tema;
    desenharTudo();
    const nome = `<b>${escapar(nomeDoTema(ev.tema))}</b>`;
    status.innerHTML = ev.corrigido
      ? `Corrigido: refazendo em ${nome}…`
      : ev.automatico
        ? `Indo para ${nome} <small>(errou? diga "não, é CRM")</small>…`
        : `Pensando em ${nome}…`;
  } else if (ev.tipo === "progresso") {
    mostrarPasso(ev.evento, ev.link);
  } else if (ev.tipo === "fala") {
    falouCedo = true;
    falar(ev.texto);
  } else if (ev.tipo === "texto") {
    mostrarAoVivo(ev.texto);
  } else if (ev.tipo === "fim") {
    return ev;
  } else if (ev.tipo === "erro") {
    return { erro: ev.mensagem };
  }
  return null;
}

// ---------- Ouvir (Web Speech API do Chrome) ----------
const Reconhecimento = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec = null;
let ouvindo = false;
let textoFinal = "";

if (!Reconhecimento) {
  definirEstado(null, "⚠️ Este navegador não transcreve voz. Abra no <b>Google Chrome</b> (ou digite abaixo).");
} else {
  rec = new Reconhecimento();
  rec.lang = "pt-BR";
  rec.continuous = true;
  rec.interimResults = true;
  rec.onresult = (e) => {
    let provisorio = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) textoFinal += e.results[i][0].transcript + " ";
      else provisorio += e.results[i][0].transcript;
    }
    transcricao.innerHTML = escapar(textoFinal) + `<span class="provisorio">${escapar(provisorio)}</span>`;
  };
  rec.onerror = (e) => {
    if (e.error === "not-allowed") definirEstado(null, "⚠️ O Chrome bloqueou o microfone. Clique no cadeado da barra de endereço e permita.");
    else if (e.error !== "no-speech" && e.error !== "aborted") definirEstado(null, `⚠️ Erro no microfone: ${e.error}`);
  };
  rec.onend = () => {
    if (!ouvindo) return;
    ouvindo = false;
    const texto = textoFinal.trim() || transcricao.textContent.trim();
    if (texto) enviar(texto);
    else definirEstado(null, textoParado);
  };
}

function comecarAOuvir() {
  if (!rec || ouvindo || ocupado) return;
  calarTudo();
  textoFinal = "";
  transcricao.textContent = "";
  cancelada = false;
  ouvindo = true;
  definirEstado("ouvindo", "Ouvindo… solte para enviar");
  try {
    rec.start();
  } catch {
    /* já estava ligado */
  }
}

// Descarta o que foi falado: nada é enviado.
let cancelada = false;
function cancelarGravacao() {
  if (!rec || !ouvindo) return false;
  cancelada = true;
  ouvindo = false;
  textoFinal = "";
  transcricao.textContent = "";
  try {
    rec.abort();
  } catch {
    /* já parado */
  }
  definirEstado(null, "Gravação cancelada. " + textoParado);
  return true;
}
$("cancelarGravacao").addEventListener("pointerdown", (e) => {
  e.preventDefault();
  e.stopPropagation();
  cancelarGravacao();
});

function pararDeOuvir() {
  if (cancelada) return; // soltou a barra depois de cancelar
  if (!rec || !ouvindo) return;
  definirEstado("pensando", "Processando…");
  // Dá um instante para o Chrome entregar as últimas palavras.
  setTimeout(() => rec.stop(), 350);
}

// Segurar a barra de espaço (fora do campo de texto)
const digitando = () => document.activeElement === $("campoTexto");
document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    if (cancelarGravacao()) return;
    abrirSalvos(false);
    calarTudo();
    if (!ouvindo && !ocupado) definirEstado(null, textoParado);
  }
  if (e.code !== "Space" || digitando() || e.repeat) {
    if (e.code === "Space" && !digitando()) e.preventDefault();
    return;
  }
  e.preventDefault();
  comecarAOuvir();
});
document.addEventListener("keyup", (e) => {
  if (e.code === "Space" && !digitando()) {
    e.preventDefault();
    pararDeOuvir();
    cancelada = false;
  }
});

// Segurar o círculo (mouse ou toque); um clique rápido liga e desliga
let inicioToque = 0;
orbe.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  if (ouvindo) return pararDeOuvir();
  inicioToque = Date.now();
  comecarAOuvir();
});
orbe.addEventListener("pointerup", () => {
  if (ouvindo && Date.now() - inicioToque > 400) pararDeOuvir();
});
orbe.addEventListener("keydown", (e) => e.code === "Space" && e.preventDefault());

// Digitar
// ---------- Documentos (PDF, foto, texto) ----------
// Sobem na hora para _arquivo/ do cofre e vão junto com a próxima fala.
let anexos = []; // { nome, caminho?, enviando, erro? }

function desenharAnexos() {
  const ul = $("anexos");
  ul.hidden = anexos.length === 0;
  ul.innerHTML = "";
  for (const a of anexos) {
    const li = document.createElement("li");
    li.className = a.erro ? "erro" : a.enviando ? "enviando" : "";
    li.textContent = `📎 ${a.nome}` + (a.enviando ? " (subindo…)" : a.erro ? ` — ${a.erro}` : "");
    const x = document.createElement("button");
    x.type = "button";
    x.textContent = "✕";
    x.title = "Tirar da próxima mensagem (o arquivo continua no _arquivo)";
    x.onclick = () => {
      anexos = anexos.filter((b) => b !== a);
      desenharAnexos();
    };
    li.appendChild(x);
    ul.appendChild(li);
  }
}

async function anexar(arquivos) {
  for (const f of arquivos) {
    const a = { nome: f.name, enviando: true };
    anexos.push(a);
    desenharAnexos();
    try {
      const r = await fetch("/api/arquivo", {
        method: "POST",
        headers: { "X-Nome": encodeURIComponent(f.name), "Content-Type": "application/octet-stream" },
        body: f,
      });
      const dados = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(dados.erro || (r.status === 413 ? "arquivo grande demais (máx. 30 MB)" : `erro ${r.status}`));
      a.caminho = dados.caminho;
      a.nome = dados.nome;
    } catch (err) {
      a.erro = err.message;
    }
    a.enviando = false;
    desenharAnexos();
  }
  if (anexos.some((a) => a.caminho) && !ocupado)
    definirEstado(null, "Arquivo pronto. Agora <b>fale ou digite</b> o que quer sobre ele (ou só aperte Enviar).");
}

$("botaoAnexar").onclick = () => $("arquivo").click();
$("arquivo").onchange = (e) => {
  anexar([...e.target.files]);
  e.target.value = "";
};

// Arrastar e soltar em qualquer lugar da página
let arrastando = 0;
const temArquivo = (e) => [...(e.dataTransfer?.types ?? [])].includes("Files");
document.addEventListener("dragenter", (e) => {
  if (!temArquivo(e)) return;
  e.preventDefault();
  arrastando++;
  $("soltar").hidden = false;
});
document.addEventListener("dragover", (e) => temArquivo(e) && e.preventDefault());
document.addEventListener("dragleave", (e) => {
  if (!temArquivo(e)) return;
  if (--arrastando <= 0) {
    arrastando = 0;
    $("soltar").hidden = true;
  }
});
document.addEventListener("drop", (e) => {
  if (!temArquivo(e)) return;
  e.preventDefault();
  arrastando = 0;
  $("soltar").hidden = true;
  anexar([...e.dataTransfer.files]);
});

$("formTexto").addEventListener("submit", (e) => {
  e.preventDefault();
  const campo = $("campoTexto");
  enviar(campo.value);
  campo.value = "";
  campo.blur();
});


carregar();

// Atualiza sozinha (sem F5): abas criadas no app ou pelo Jarvis, respostas dadas em outra aba do navegador.
setInterval(() => {
  if (!ocupado && !ouvindo && document.visibilityState === "visible") carregar(true).catch(() => {});
}, 4000);
