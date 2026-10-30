// Holograma do Jarvis (canvas 2D): rosto humano holográfico (superfície azul sombreada com malha fina) que se desfaz
// em partículas de um lado, com a triangulação do reconhecimento facial por cima, envolto por uma esfera de energia
// e com uma rede de pontos e números de dados no fundo. A forma da cabeça vem de uma função de distância
// (elipsoides suavemente unidos); a malha é calculada uma vez e só gira e acende a cada quadro.
// Estados (app.js define window.holograma.estado): parado · ouvindo · pensando · falando.
// A cabeça vira para o mouse; falando, a boca mexe e tudo pulsa como coração; ouvindo, a onda reage à voz.
(() => {
  const canvas = document.getElementById("holograma");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const graus = (g) => (g * Math.PI) / 180;
  const sorte = (a, b) => a + Math.random() * (b - a);

  // ---------- Forma da cabeça ----------
  function elipsoide(px, py, pz, cx, cy, cz, rx, ry, rz) {
    const x = (px - cx) / rx, y = (py - cy) / ry, z = (pz - cz) / rz;
    const k0 = Math.hypot(x, y, z);
    const k1 = Math.hypot(x / rx, y / ry, z / rz) || 1e-6;
    return (k0 * (k0 - 1)) / k1;
  }
  const uniao = (a, b, k) => {
    const h = Math.max(k - Math.abs(a - b), 0) / k;
    return Math.min(a, b) - h * h * k * 0.25;
  };
  const corte = (a, b, k) => -uniao(-a, -b, k);

  // y para cima, z para a frente (rosto), x para a direita da tela. Unidades ~ meia altura da cabeça.
  function cabeca(x, y, z) {
    const ax = Math.abs(x);
    let d = elipsoide(x, y, z, 0, 0.32, -0.08, 0.76, 0.86, 0.9); // crânio
    d = uniao(d, elipsoide(x, y, z, 0, -0.32, 0.1, 0.6, 0.62, 0.66), 0.25); // face e mandíbula
    d = uniao(d, elipsoide(x, y, z, 0, -0.86, 0.34, 0.26, 0.17, 0.22), 0.18); // queixo
    d = uniao(d, elipsoide(ax, y, z, 0.42, -0.1, 0.4, 0.2, 0.14, 0.2), 0.15); // maçãs do rosto
    d = uniao(d, elipsoide(x, y, z, 0, 0.2, 0.6, 0.56, 0.1, 0.18), 0.12); // arco das sobrancelhas
    d = uniao(d, elipsoide(x, y, z, 0, -0.06, 0.8, 0.085, 0.27, 0.15), 0.07); // dorso do nariz
    d = uniao(d, elipsoide(x, y, z, 0, -0.3, 0.93, 0.12, 0.09, 0.11), 0.06); // ponta do nariz
    d = uniao(d, elipsoide(ax, y, z, 0.11, -0.33, 0.84, 0.07, 0.06, 0.07), 0.05); // asas do nariz
    d = uniao(d, elipsoide(x, y, z, 0, -0.5, 0.74, 0.2, 0.05, 0.08), 0.06); // lábio de cima
    d = uniao(d, elipsoide(x, y, z, 0, -0.61, 0.72, 0.17, 0.055, 0.08), 0.06); // lábio de baixo
    d = uniao(d, elipsoide(ax, y, z, 0.79, -0.02, -0.06, 0.07, 0.22, 0.13), 0.06); // orelhas
    d = uniao(d, elipsoide(x, y, z, 0, -1.25, -0.18, 0.36, 0.5, 0.36), 0.2); // pescoço
    d = corte(d, -elipsoide(ax, y, z, 0.27, 0.06, 0.72, 0.15, 0.1, 0.13), 0.08); // órbitas dos olhos
    d = corte(d, -elipsoide(x, y, z, 0, -0.555, 0.8, 0.17, 0.012, 0.1), 0.02); // linha da boca
    return Math.max(d, -(y + 1.55)); // pescoço cortado embaixo
  }

  // Ponto da superfície na direção (dx, dy, dz) a partir de um ponto de dentro da cabeça.
  function superficie(ox, oy, oz, dx, dy, dz, folga = 0) {
    if (cabeca(ox, oy, oz) > 0) return null;
    const passo = 0.03;
    for (let t = passo; t < 2.4; t += passo) {
      if (cabeca(ox + dx * t, oy + dy * t, oz + dz * t) > 0) {
        let a = t - passo, b = t;
        for (let k = 0; k < 9; k++) {
          const m = (a + b) / 2;
          if (cabeca(ox + dx * m, oy + dy * m, oz + dz * m) > 0) b = m;
          else a = m;
        }
        const s = b + folga;
        return { x: ox + dx * s, y: oy + dy * s, z: oz + dz * s };
      }
    }
    return null;
  }
  // Fatia horizontal na altura y, ângulo a (90° = frente, 180° = lado esquerdo da tela, 0° = lado direito).
  const naAltura = (y, a, folga) => superficie(0, y, 0.05, Math.cos(graus(a)), 0, Math.sin(graus(a)), folga);
  // Meridiano: ângulo a em volta do eixo, elevação e.
  const noMeridiano = (a, e, folga) =>
    superficie(0, -0.1, 0.05, Math.cos(graus(a)) * Math.cos(graus(e)), Math.sin(graus(e)), Math.sin(graus(a)) * Math.cos(graus(e)), folga);

  function curvatura(p) {
    const e = 0.03;
    return Math.abs(
      (cabeca(p.x + e, p.y, p.z) + cabeca(p.x - e, p.y, p.z) + cabeca(p.x, p.y + e, p.z) + cabeca(p.x, p.y - e, p.z) +
        cabeca(p.x, p.y, p.z + e) + cabeca(p.x, p.y, p.z - e)) / (e * e * 6),
    );
  }
  // Quanto o ponto desce quando a boca abre (o que fica abaixo da linha da boca, na frente).
  function pesoMandibula(p) {
    if (p.y > -0.56 || p.y < -1.0) return 0;
    const abaixo = Math.min(1, (-0.56 - p.y) / 0.18);
    const frente = Math.min(1, Math.max(0, (p.z - 0.2) / 0.3)) * Math.max(0, 1 - Math.abs(p.x) / 0.6);
    return abaixo * frente;
  }

  // ---------- Malha do rosto ----------
  // Grade em volta da cabeça (ângulo a × elevação e). Cada vértice é um ponto da superfície.
  const PASSO_A = 3, PASSO_E = 3;
  const colunas = 360 / PASSO_A;
  const elevacoes = [];
  for (let e = -80; e <= 86; e += PASSO_E) elevacoes.push(e);
  const linhasGrade = elevacoes.length;
  const vertices = []; // índice = j * colunas + i
  for (let j = 0; j < linhasGrade; j++)
    for (let i = 0; i < colunas; i++) {
      const p = noMeridiano(-180 + i * PASSO_A, elevacoes[j]);
      vertices.push(p ? { ...p, mand: pesoMandibula(p) } : null);
    }
  const NV = vertices.length;
  // Quadrados da malha, com um ruído fixo cada (para o lado que se desfaz ter borda irregular).
  const quads = [];
  for (let j = 0; j < linhasGrade - 1; j++)
    for (let i = 0; i < colunas; i++) {
      const i2 = (i + 1) % colunas;
      const ids = [j * colunas + i, j * colunas + i2, (j + 1) * colunas + i2, (j + 1) * colunas + i];
      if (ids.some((id) => !vertices[id])) continue;
      const c = ids.reduce((s, id) => ({ x: s.x + vertices[id].x / 4, y: s.y + vertices[id].y / 4 }), { x: 0, y: 0 });
      quads.push({ ids, cx: c.x, cy: c.y, ruido: Math.random() });
    }

  // ---------- Pontos do reconhecimento facial (triangulação) ----------
  const MARCOS = [
    [0, 0.62], [-0.55, 0.35], [0.55, 0.35], // testa e têmporas
    [-0.45, 0.2], [-0.1, 0.21], [0.1, 0.21], [0.45, 0.2], // sobrancelhas
    [-0.4, 0.06], [-0.14, 0.06], [0.14, 0.06], [0.4, 0.06], // cantos dos olhos
    [0, 0.08], [0, -0.3], [-0.13, -0.33], [0.13, -0.33], // nariz
    [-0.5, -0.2], [0.5, -0.2], // maçãs
    [-0.19, -0.56], [0, -0.49], [0.19, -0.56], [0, -0.64], // boca
    [-0.5, -0.6], [0.5, -0.6], [0, -0.95], [-0.25, -0.88], [0.25, -0.88], // mandíbula e queixo
  ].map(([x, y]) => {
    const p = superficie(x, y, -0.25, 0, 0, 1, 0.015);
    return p ? { ...p, mand: pesoMandibula(p) } : null;
  });
  const LIGACOES = [
    [0, 4], [0, 5], [0, 1], [0, 2], [1, 3], [2, 6], [3, 4], [5, 6], [4, 5], [3, 7], [4, 8], [5, 9], [6, 10],
    [7, 8], [9, 10], [8, 11], [9, 11], [4, 11], [5, 11], [11, 12], [12, 13], [12, 14], [8, 13], [9, 14],
    [7, 15], [10, 16], [15, 13], [16, 14], [13, 17], [14, 19], [12, 18], [17, 18], [18, 19], [19, 20], [20, 17],
    [15, 17], [16, 19], [15, 21], [16, 22], [21, 17], [22, 19], [21, 24], [22, 25], [24, 23], [25, 23],
    [20, 23], [20, 24], [20, 25], [1, 7], [2, 10],
  ].filter(([a, b]) => MARCOS[a] && MARCOS[b]);

  // ---------- Esfera de energia em volta ----------
  const RAIO_CASCA = 1.62;
  const CENTRO_Y = -0.12;
  const casca = [];
  for (let k = 0; k < 46; k++) {
    let nx = sorte(-1, 1), ny = sorte(-1, 1), nz = sorte(-1, 1);
    const nn = Math.hypot(nx, ny, nz) || 1;
    nx /= nn; ny /= nn; nz /= nn;
    let ux = -ny, uy = nx, uz = 0;
    const un = Math.hypot(ux, uy, uz) || 1;
    ux /= un; uy /= un; uz /= un;
    const vx = ny * uz - nz * uy, vy = nz * ux - nx * uz, vz = nx * uy - ny * ux;
    const ini = sorte(0, Math.PI * 2), comp = sorte(0.5, 2.2);
    const onda = sorte(2, 6), amp = sorte(0.01, 0.06);
    const pts = [];
    for (let s = 0; s <= comp; s += 0.06) {
      const ang = ini + s;
      const r = RAIO_CASCA * (1 + Math.sin(s * onda) * amp);
      pts.push({
        x: (Math.cos(ang) * ux + Math.sin(ang) * vx) * r,
        y: (Math.cos(ang) * uy + Math.sin(ang) * vy) * r,
        z: (Math.cos(ang) * uz + Math.sin(ang) * vz) * r,
      });
    }
    casca.push({ pontos: pts, fase: Math.random() * 10, forca: sorte(0.25, 0.8) });
  }

  // ---------- Fundo: rede de pontos e números de dados ----------
  const rede = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), vx: sorte(-0.01, 0.01), vy: sorte(-0.01, 0.01) }));
  const dados = Array.from({ length: 12 }, () => ({
    x: Math.random(),
    y: Math.random(),
    v: sorte(0.01, 0.03),
    texto: `${Math.floor(sorte(100, 999))}.${Math.floor(sorte(100, 999))}`,
  }));

  // Partículas que se soltam do lado direito do rosto e voam embora.
  const poeira = [];

  const OLHOS = [
    { x: -0.27, y: 0.06, z: 0.64 },
    { x: 0.27, y: 0.06, z: 0.64 },
  ];

  // ---------- Estado, mouse e microfone ----------
  let estadoAtual = null;
  const holograma = {
    get estado() {
      return estadoAtual;
    },
    set estado(v) {
      if (v === estadoAtual) return;
      estadoAtual = v;
      if (v === "ouvindo") ligarMicrofone();
      else desligarMicrofone();
    },
    batida,
    quads: quads.length,
    custoMs: 0,
  };
  window.holograma = holograma;

  let mouseX = 0, mouseY = 0; // -1..1 em relação ao centro do holograma
  document.addEventListener("pointermove", (e) => {
    const caixa = canvas.getBoundingClientRect();
    mouseX = Math.max(-1, Math.min(1, (e.clientX - (caixa.left + caixa.width / 2)) / (window.innerWidth / 2)));
    mouseY = Math.max(-1, Math.min(1, (e.clientY - (caixa.top + caixa.height * 0.42)) / (window.innerHeight / 2)));
  });

  // Ouvindo: a onda em volta reage ao volume da voz (o próprio Chrome já tem o microfone liberado).
  let audio = null, nivel = 0;
  async function ligarMicrofone() {
    if (audio || !navigator.mediaDevices?.getUserMedia) return;
    audio = { pendente: true };
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (estadoAtual !== "ouvindo") {
        stream.getTracks().forEach((t) => t.stop());
        audio = null;
        return;
      }
      const contexto = new AudioContext();
      const analisador = contexto.createAnalyser();
      analisador.fftSize = 256;
      contexto.createMediaStreamSource(stream).connect(analisador);
      audio = { stream, contexto, analisador, dados: new Uint8Array(analisador.fftSize) };
    } catch {
      audio = null;
    }
  }
  function desligarMicrofone() {
    if (!audio || audio.pendente) {
      audio = null;
      return;
    }
    audio.stream.getTracks().forEach((t) => t.stop());
    audio.contexto.close().catch(() => {});
    audio = null;
  }
  function lerNivel() {
    if (!audio?.analisador) return 0;
    audio.analisador.getByteTimeDomainData(audio.dados);
    let soma = 0;
    for (const v of audio.dados) soma += ((v - 128) / 128) ** 2;
    return Math.min(1, Math.sqrt(soma / audio.dados.length) * 4);
  }

  // Coração: tum-tum enquanto fala; batida() dá uma extra (a cada palavra, nas vozes do Chrome).
  let pulso = 0, ultimaBatida = 0;
  const ondas = [];
  function batida(forca = 1) {
    pulso = Math.min(1.2, pulso + 0.55 * forca);
    if (forca >= 0.6) ondas.push({ raio: 0, forca });
  }

  // ---------- Desenho ----------
  let largura = 0, altura = 0;
  function ajustarTamanho() {
    const dpr = window.devicePixelRatio || 1;
    const caixa = canvas.getBoundingClientRect();
    largura = caixa.width;
    altura = caixa.height;
    canvas.width = Math.round(largura * dpr);
    canvas.height = Math.round(altura * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  new ResizeObserver(ajustarTamanho).observe(canvas);

  const SOMBRAS = 10; // faixas de luz da superfície (um preenchimento por faixa)
  const LUZ = (() => {
    const v = [-0.45, 0.5, 0.75];
    const n = Math.hypot(...v);
    return v.map((c) => c / n);
  })();
  const ROTULOS = { null: "SISTEMA ONLINE", ouvindo: "OUVINDO", pensando: "PROCESSANDO", falando: "RESPONDENDO" };
  let yaw = 0, pitch = 0, energia = 0, boca = 0, giroCasca = 0, anterior = performance.now();
  const px = new Float32Array(NV), py = new Float32Array(NV), pz = new Float32Array(NV); // tela
  const wx = new Float32Array(NV), wy = new Float32Array(NV), wz = new Float32Array(NV); // girados (3D)
  const suave = (a, b, x) => Math.min(1, Math.max(0, (x - a) / (b - a))) ** 2 * (3 - 2 * Math.min(1, Math.max(0, (x - a) / (b - a))));

  function quadro(agora) {
    // Com a esfera antiga escolhida, o holograma fica escondido e não desenha nada.
    if (!canvas.offsetParent) {
      anterior = agora;
      return requestAnimationFrame(quadro);
    }
    if (canvas.width === 0) ajustarTamanho();
    const inicio = performance.now();
    const dt = Math.min(0.05, (agora - anterior) / 1000);
    anterior = agora;
    const t = agora / 1000;
    const estado = estadoAtual;

    const alvoEnergia = { ouvindo: 1, pensando: 0.7, falando: 0.85 }[estado] ?? 0;
    energia += (alvoEnergia - energia) * Math.min(1, dt * 4);
    nivel += (lerNivel() - nivel) * Math.min(1, dt * 12);

    if (estado === "falando") {
      const ciclo = (agora % 850) / 850;
      if (ciclo < ultimaBatida) batida(1);
      else if (ultimaBatida < 0.22 && ciclo >= 0.22) batida(0.6);
      ultimaBatida = ciclo;
    } else ultimaBatida = 0;
    pulso = Math.max(0, pulso - dt * 3.2);

    // Boca: abre e fecha falando, num ritmo irregular de fala.
    const alvoBoca = estado === "falando" && !reduzido ? 0.5 + 0.5 * Math.sin(t * 17) * Math.sin(t * 5.3 + 1) : 0;
    boca += (Math.max(0, alvoBoca) - boca) * Math.min(1, dt * 18);

    // Cabeça vira para o mouse; pensando, olha para os lados; sempre com um balanço leve.
    let alvoYaw = mouseX * 0.55, alvoPitch = mouseY * 0.25;
    if (estado === "pensando") { alvoYaw = Math.sin(t * 1.3) * 0.45; alvoPitch = -0.12; }
    if (!reduzido) { alvoYaw += Math.sin(t * 0.35) * 0.06; alvoPitch += Math.sin(t * 0.5) * 0.03; }
    yaw += (alvoYaw - yaw) * Math.min(1, dt * 3);
    pitch += (alvoPitch - pitch) * Math.min(1, dt * 3);
    if (!reduzido) giroCasca += dt * (estado === "pensando" ? 0.9 : estado === "ouvindo" ? 0.45 : 0.12);

    const cx = largura / 2, cy = altura * 0.46;
    const escala = (Math.min(largura, altura * 0.9) * 0.42) / RAIO_CASCA;
    const cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const cg = Math.cos(giroCasca), sg = Math.sin(giroCasca), cg2 = Math.cos(giroCasca * 0.6), sg2 = Math.sin(giroCasca * 0.6);
    const escalaCasca = 1 + pulso * 0.06 + energia * 0.02 + (estado === "ouvindo" ? nivel * 0.05 : 0);
    const escalaCabeca = escala * (1 + pulso * 0.025);

    // Gira um ponto da cabeça (com a boca) e devolve [x, y, z] girados.
    function girar(p) {
      const y0 = p.y - (p.mand || 0) * boca * 0.09;
      const z0 = p.z - (p.mand || 0) * boca * 0.02;
      const x1 = p.x * cyw + z0 * syw;
      let z1 = -p.x * syw + z0 * cyw;
      const yr = y0 - CENTRO_Y;
      const y1 = yr * cp - z1 * sp;
      z1 = yr * sp + z1 * cp;
      return [x1, y1, z1];
    }
    const naTela = (x1, y1, z1, k = escalaCabeca) => {
      const f = 4 / (4 - z1);
      return [cx + x1 * f * k, cy - y1 * f * k];
    };
    function projetarCasca(p) {
      const x1 = p.x * cg + p.z * sg;
      let z1 = -p.x * sg + p.z * cg;
      const y1 = p.y * cg2 - z1 * sg2;
      z1 = p.y * sg2 + z1 * cg2;
      const [x, y] = naTela(x1, y1, z1, escala * escalaCasca);
      return { x, y, z: z1 };
    }

    ctx.clearRect(0, 0, largura, altura);

    // Fundo: rede de pontos bem fraca e números de dados subindo.
    ctx.globalCompositeOperation = "source-over";
    const redeTela = rede.map((n) => {
      if (!reduzido) {
        n.x = (n.x + n.vx * dt + 1) % 1;
        n.y = (n.y + n.vy * dt + 1) % 1;
      }
      return [n.x * largura, n.y * altura];
    });
    ctx.lineWidth = 0.6;
    const fios = new Path2D();
    for (let a = 0; a < redeTela.length; a++)
      for (let b = a + 1; b < redeTela.length; b++) {
        const d = Math.hypot(redeTela[a][0] - redeTela[b][0], redeTela[a][1] - redeTela[b][1]);
        if (d < largura * 0.2) {
          fios.moveTo(...redeTela[a]);
          fios.lineTo(...redeTela[b]);
        }
      }
    ctx.strokeStyle = "rgba(72, 149, 246, 0.1)";
    ctx.stroke(fios);
    ctx.fillStyle = "rgba(120, 180, 255, 0.35)";
    for (const [x, y] of redeTela) ctx.fillRect(x - 1, y - 1, 2, 2);
    ctx.font = "9px ui-monospace, Menlo, monospace";
    ctx.textAlign = "left";
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
    for (const d of dados) {
      if (!reduzido) d.y -= d.v * dt;
      if (d.y < -0.05) { d.y = 1.05; d.x = Math.random(); d.texto = `${Math.floor(sorte(100, 999))}.${Math.floor(sorte(100, 999))}`; }
      ctx.fillStyle = "rgba(120, 180, 255, 0.22)";
      ctx.fillText(d.texto, d.x * largura, d.y * altura);
    }

    // Brilho atrás da cabeça.
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, escala * RAIO_CASCA * 1.1);
    halo.addColorStop(0, `rgba(30, 110, 255, ${0.22 + energia * 0.08 + pulso * 0.18})`);
    halo.addColorStop(0.6, `rgba(10, 60, 200, ${0.08 + pulso * 0.06})`);
    halo.addColorStop(1, "rgba(0, 40, 160, 0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, largura, altura);

    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const luzGeral = 0.85 + energia * 0.2 + pulso * 0.4;

    // Gira e projeta todos os vértices da malha.
    for (let v = 0; v < NV; v++) {
      const p = vertices[v];
      if (!p) continue;
      const [x1, y1, z1] = girar(p);
      wx[v] = x1; wy[v] = y1; wz[v] = z1;
      const [sx, sy] = naTela(x1, y1, z1);
      px[v] = sx; py[v] = sy; pz[v] = z1;
    }

    // Superfície: só as faces viradas para a frente, sombreadas pela luz; o lado direito se desfaz.
    const preench = Array.from({ length: SOMBRAS }, () => new Path2D());
    const malha = [new Path2D(), new Path2D(), new Path2D()];
    const borda = []; // vértices na borda que está se desfazendo (viram poeira)
    const ondaBorda = reduzido ? 0 : Math.sin(t * 0.6) * 0.06;
    for (const q of quads) {
      const [a, b, c, d] = q.ids;
      // Normal pelos vértices girados (diagonais do quadrado).
      const ux = wx[c] - wx[a], uy = wy[c] - wy[a], uz = wz[c] - wz[a];
      const vx = wx[d] - wx[b], vy = wy[d] - wy[b], vz = wz[d] - wz[b];
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const nn = Math.hypot(nx, ny, nz) || 1;
      nx /= nn; ny /= nn; nz /= nn;
      if (nz < 0) { nx = -nx; ny = -ny; nz = -nz; } // a ordem dos vértices varia; olhamos só a face da frente
      const zMedio = (pz[a] + pz[b] + pz[c] + pz[d]) / 4;
      if (zMedio < -0.15) continue; // costas da cabeça não aparecem
      // Dissolução: quanto mais à direita do rosto, maior a chance de o quadrado já ter virado poeira.
      const limiar = suave(0.12, 0.7, q.cx + ondaBorda + Math.sin(q.cy * 4 + t * 0.8) * 0.04);
      if (q.ruido < limiar) {
        if (q.ruido > limiar - 0.12) borda.push(a);
        continue;
      }
      if (q.cy < -1.38) continue; // fim do pescoço
      // Perto da borda que se desfaz e no pescoço, a superfície vai sumindo aos poucos (sem degrau).
      const sumindo = (limiar > 0.01 ? Math.min(1, (q.ruido - limiar) / 0.35) : 1) * suave(-1.38, -0.95, q.cy);
      const luz = Math.max(0, nx * LUZ[0] + ny * LUZ[1] + nz * LUZ[2]);
      const contorno = (1 - nz) ** 2 * 0.5; // borda da silhueta mais acesa
      const valor = Math.min(0.999, (luz ** 1.4 * 0.85 + contorno + 0.05) * Math.min(1, (zMedio + 0.6) / 0.9) * sumindo);
      if (valor < 0.02) continue;
      const k = Math.floor(valor * SOMBRAS);
      const caminho = preench[k];
      caminho.moveTo(px[a], py[a]);
      caminho.lineTo(px[b], py[b]);
      caminho.lineTo(px[c], py[c]);
      caminho.lineTo(px[d], py[d]);
      caminho.closePath();
      const m = malha[Math.min(2, Math.floor(valor * 3))];
      m.moveTo(px[a], py[a]);
      m.lineTo(px[b], py[b]);
      m.lineTo(px[c], py[c]);
    }
    preench.forEach((caminho, k) => {
      const v = (k + 0.5) / SOMBRAS;
      ctx.fillStyle = `rgba(${Math.round(30 + v * 60)}, ${Math.round(110 + v * 90)}, 255, ${(0.04 + v * 0.42 * luzGeral).toFixed(3)})`;
      ctx.fill(caminho);
    });
    ctx.lineWidth = 0.5;
    malha.forEach((m, k) => {
      ctx.strokeStyle = `rgba(150, 205, 255, ${(0.06 + k * 0.08) * luzGeral})`;
      ctx.stroke(m);
    });

    // Poeira: nasce na borda que se desfaz e voa para a direita, apagando.
    if (!reduzido && borda.length) {
      const novas = Math.min(14, Math.ceil(dt * 320));
      for (let k = 0; k < novas && poeira.length < 900; k++) {
        const v = vertices[borda[Math.floor(Math.random() * borda.length)]];
        poeira.push({ x: v.x, y: v.y, z: v.z, vx: sorte(0.1, 0.45), vy: sorte(-0.06, 0.12), vz: sorte(-0.1, 0.15), vida: 0, max: sorte(1.4, 3.4) });
      }
    }
    const graos = [new Path2D(), new Path2D(), new Path2D()];
    for (let k = poeira.length - 1; k >= 0; k--) {
      const g = poeira[k];
      g.vida += dt;
      if (g.vida > g.max) { poeira.splice(k, 1); continue; }
      g.x += g.vx * dt; g.y += g.vy * dt; g.z += g.vz * dt;
      const [x1, y1, z1] = girar(g);
      const [sx, sy] = naTela(x1, y1, z1);
      const fase = 1 - g.vida / g.max;
      const r = 0.5 + fase * 0.9;
      const c = graos[Math.min(2, Math.floor(fase * 3))];
      c.moveTo(sx + r, sy);
      c.arc(sx, sy, r, 0, Math.PI * 2);
    }
    graos.forEach((c, k) => {
      ctx.fillStyle = `rgba(170, 215, 255, ${(0.25 + k * 0.3) * luzGeral})`;
      ctx.fill(c);
    });

    // Reconhecimento facial: triângulos ligando os marcos do rosto, com nós acesos.
    const marcosTela = MARCOS.map((m) => {
      if (!m) return null;
      const [x1, y1, z1] = girar(m);
      const [sx, sy] = naTela(x1, y1, z1);
      return { x: sx, y: sy, z: z1 };
    });
    const tri = new Path2D();
    for (const [a, b] of LIGACOES) {
      const p = marcosTela[a], q = marcosTela[b];
      if (p.z < 0 || q.z < 0) continue;
      tri.moveTo(p.x, p.y);
      tri.lineTo(q.x, q.y);
    }
    const cintila = reduzido ? 1 : 0.8 + 0.2 * Math.sin(t * 2.3);
    ctx.lineWidth = 3;
    ctx.strokeStyle = `rgba(120, 200, 255, ${0.08 * luzGeral})`;
    ctx.stroke(tri);
    ctx.lineWidth = 0.9;
    ctx.strokeStyle = `rgba(210, 235, 255, ${0.55 * luzGeral * cintila})`;
    ctx.stroke(tri);
    const nosTri = new Path2D();
    for (const p of marcosTela) {
      if (!p || p.z < 0) continue;
      nosTri.moveTo(p.x + 1.8, p.y);
      nosTri.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
    }
    ctx.fillStyle = `rgba(230, 245, 255, ${0.9 * cintila})`;
    ctx.fill(nosTri);

    // Esfera de energia: arcos de luz girando em volta.
    const velocidadeLuz = estado === "pensando" ? 4 : estado === "falando" ? 3 : 1.5;
    const arcos = [new Path2D(), new Path2D(), new Path2D(), new Path2D()];
    for (const arco of casca) {
      let ant = null;
      for (let i = 0; i < arco.pontos.length; i++) {
        const q = projetarCasca(arco.pontos[i]);
        if (ant) {
          const corre = reduzido ? 1 : 0.55 + 0.45 * Math.sin(i * 0.35 - t * velocidadeLuz + arco.fase);
          const alfa = arco.forca * luzGeral * (0.25 + 0.75 * Math.max(0, Math.min(1, (q.z + 1.6) / 3.2))) * corre;
          const k = Math.min(3, Math.floor(Math.min(0.999, alfa) * 4));
          arcos[k].moveTo(ant.x, ant.y);
          arcos[k].lineTo(q.x, q.y);
        }
        ant = q;
      }
    }
    for (const passada of [0, 1])
      arcos.forEach((c, k) => {
        const alfa = ((k + 0.5) / 4) * 0.55;
        ctx.strokeStyle = `rgba(125, 185, 255, ${(passada ? alfa : alfa * 0.18).toFixed(3)})`;
        ctx.lineWidth = passada ? 0.9 : 3.5;
        ctx.stroke(c);
      });

    // Olhos: íris de luz que olham para o mouse.
    const olharX = mouseX * escala * 0.02, olharY = mouseY * escala * 0.012;
    const brilhoOlho = Math.min(1.3, 0.8 + energia * 0.3 + pulso * 0.3);
    for (const o of OLHOS) {
      const [x1, y1, z1] = girar(o);
      if (z1 < 0.1) continue;
      const [sx, sy] = naTela(x1, y1, z1);
      const ox = sx + olharX, oy = sy + olharY, r = escala * 0.06;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
      g.addColorStop(0, `rgba(255, 255, 255, ${brilhoOlho})`);
      g.addColorStop(0.2, `rgba(170, 220, 255, ${brilhoOlho * 0.8})`);
      g.addColorStop(1, "rgba(40, 130, 255, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ox, oy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";

    desenharEstados(cx, cy, escala * RAIO_CASCA * escalaCasca, t, estado);
    holograma.custoMs = holograma.custoMs * 0.9 + (performance.now() - inicio) * 0.1;
    requestAnimationFrame(quadro);
  }

  // Rótulos, onda da voz, arco de processamento e ondas do coração.
  function desenharEstados(cx, cy, R, t, estado) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.globalCompositeOperation = "lighter";
    if (estado === "ouvindo") {
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = "rgba(160, 215, 255, 0.85)";
      ctx.beginPath();
      for (let i = 0; i <= 180; i++) {
        const a = (i / 180) * Math.PI * 2;
        const amp = (2 + nivel * 18) * (0.6 + 0.4 * Math.sin(a * 9 + t * 7)) * Math.sin(a * 5 - t * 5);
        const r = R * 1.06 + amp;
        i === 0 ? ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r) : ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.stroke();
    }
    if (estado === "pensando") {
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.strokeStyle = "rgba(160, 215, 255, 0.9)";
      const a = t * 4;
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.06, a, a + 1.1);
      ctx.stroke();
    }
    for (let i = ondas.length - 1; i >= 0; i--) {
      const o = ondas[i];
      o.raio += 0.02;
      const alfa = (1 - o.raio) * 0.5 * o.forca;
      if (alfa <= 0) {
        ondas.splice(i, 1);
        continue;
      }
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(140, 200, 255, ${alfa})`;
      ctx.beginPath();
      ctx.arc(0, 0, R * (0.95 + o.raio * 0.3), 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.font = "600 9px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    if ("letterSpacing" in ctx) ctx.letterSpacing = "3px";
    ctx.fillStyle = "rgba(72, 149, 246, 0.7)";
    ctx.fillText("JARVIS · BEVEL SYSTEMS", 0, -R * 1.06 - 14);
    ctx.fillStyle = estado ? "rgba(170, 210, 255, 0.95)" : "rgba(72, 149, 246, 0.6)";
    ctx.fillText(ROTULOS[estado] ?? ROTULOS.null, 0, R * 1.06 + 22);
    ctx.restore();
  }

  requestAnimationFrame(quadro);
})();
