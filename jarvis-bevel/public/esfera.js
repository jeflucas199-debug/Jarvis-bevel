// Esfera de partículas do Jarvis (canvas 2D): pontos numa esfera ligados por linhas finas, girando devagar.
// Estados (definidos pelo app.js em window.esfera.estado): parado · ouvindo · pensando · falando.
// Falando, ela pulsa como um coração (tum-tum); window.esfera.batida() dá uma batida extra (a cada palavra, nas vozes do Chrome).
(() => {
  const canvas = document.getElementById("esfera");
  const ctx = canvas.getContext("2d");
  const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const LIGACAO = 0.15; // distância máxima (na esfera de raio 1) para desenhar uma linha
  const pontos = [];
  const naEsfera = (x, y, z, raio) => {
    const d = Math.hypot(x, y, z) || 1;
    return { x: (x / d) * raio, y: (y / d) * raio, z: (z / d) * raio, fase: Math.random() * Math.PI * 2 };
  };
  const aleatorio = () => naEsfera(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, 1);
  // "Veias": caminhos que andam pela superfície mudando de direção, com partículas em volta (filamentos da imagem).
  for (let v = 0; v < 16; v++) {
    let p = aleatorio();
    let dir = aleatorio();
    const passos = 18 + Math.floor(Math.random() * 22);
    for (let k = 0; k < passos; k++) {
      dir = naEsfera(dir.x + (Math.random() - 0.5) * 0.9, dir.y + (Math.random() - 0.5) * 0.9, dir.z + (Math.random() - 0.5) * 0.9, 1);
      p = naEsfera(p.x + dir.x * 0.07, p.y + dir.y * 0.07, p.z + dir.z * 0.07, 1);
      const quantos = 1 + Math.floor(Math.random() * 3);
      for (let q = 0; q < quantos; q++) {
        const raio = 0.93 + Math.random() * 0.1;
        pontos.push(naEsfera(p.x + (Math.random() - 0.5) * 0.06, p.y + (Math.random() - 0.5) * 0.06, p.z + (Math.random() - 0.5) * 0.06, raio));
      }
    }
  }
  // Poeira: partículas soltas na casca e algumas por dentro, para dar volume.
  for (let k = 0; k < 220; k++) {
    const a = aleatorio();
    pontos.push(naEsfera(a.x, a.y, a.z, k % 4 === 0 ? 0.55 + Math.random() * 0.35 : 0.95 + Math.random() * 0.06));
  }
  const N = pontos.length;
  // Pares próximos calculados uma vez (a forma não muda, só gira).
  // Cada partícula liga só às 4 vizinhas mais próximas: mantém os filamentos e deixa o desenho leve.
  const pares = [];
  const jaLigados = new Set();
  for (let i = 0; i < N; i++) {
    const vizinhos = [];
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const a = pontos[i], b = pontos[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
      if (d < LIGACAO) vizinhos.push([j, d]);
    }
    vizinhos.sort((x, y) => x[1] - y[1]);
    for (const [j, d] of vizinhos.slice(0, 4)) {
      const chave = i < j ? i * N + j : j * N + i;
      if (jaLigados.has(chave)) continue;
      jaLigados.add(chave);
      pares.push([i, j, 1 - d / LIGACAO]);
    }
  }
  const FAIXAS = 8; // linhas e pontos agrupados por brilho: um traço por faixa, em vez de um por linha

  const esfera = { estado: null, batida };
  window.esfera = esfera;

  let pulso = 0; // 0..1, decai sozinho
  let ultimaBatida = 0;
  function batida(forca = 1) {
    pulso = Math.min(1.2, pulso + 0.55 * forca);
  }

  let angulo = 0;
  let energia = 0; // suaviza a troca entre estados
  let anterior = performance.now();
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
  ajustarTamanho();

  function quadro(agora) {
    // Com o rosto escolhido, a esfera fica escondida e não desenha nada.
    if (!canvas.offsetParent) {
      anterior = agora;
      return requestAnimationFrame(quadro);
    }
    if (canvas.width === 0) ajustarTamanho();
    const inicio = performance.now();
    const dt = Math.min(0.05, (agora - anterior) / 1000);
    anterior = agora;
    const estado = esfera.estado;
    const alvoEnergia = { ouvindo: 1, pensando: 0.6, falando: 0.8 }[estado] ?? 0;
    energia += (alvoEnergia - energia) * Math.min(1, dt * 4);

    // Coração: falando, tum-tum a cada ~0,85 s (a 2ª batida mais fraca).
    if (estado === "falando") {
      const ciclo = (agora % 850) / 850;
      if (ciclo < ultimaBatida) batida(1);
      else if (ultimaBatida < 0.22 && ciclo >= 0.22) batida(0.6);
      ultimaBatida = ciclo;
    } else {
      ultimaBatida = 0;
    }
    pulso = Math.max(0, pulso - dt * 3.2);

    const velocidade = estado === "pensando" ? 1.4 : estado === "ouvindo" ? 0.6 : 0.25;
    if (!reduzido) angulo += dt * velocidade;
    const respiro = reduzido ? 0 : Math.sin(agora / 1400) * 0.02;
    const escala = (Math.min(largura, altura) / 2) * 0.78 * (1 + respiro + pulso * 0.13 + energia * 0.04);
    const cx = largura / 2, cy = altura / 2;
    const cos = Math.cos(angulo), sin = Math.sin(angulo);
    const inclina = 0.35, ci = Math.cos(inclina), si = Math.sin(inclina);

    // Projeta cada ponto (gira em Y, inclina em X; ouvindo, as partículas tremem um pouco).
    const tela = pontos.map((p) => {
      const tremor = estado === "ouvindo" && !reduzido ? 1 + Math.sin(agora / 90 + p.fase) * 0.035 : 1;
      let x = p.x * cos - p.z * sin;
      let z = p.x * sin + p.z * cos;
      let y = p.y * ci - z * si;
      z = p.y * si + z * ci;
      x *= tremor; y *= tremor;
      const perto = (z + 1.3) / 2.3; // 0 (fundo) .. 1 (frente)
      return { x: cx + x * escala, y: cy + y * escala, perto };
    });

    ctx.clearRect(0, 0, largura, altura);
    // Brilho de fundo, mais forte no pulso.
    const brilho = ctx.createRadialGradient(cx, cy, 0, cx, cy, escala * 1.25);
    brilho.addColorStop(0, `rgba(0, 98, 252, ${0.32 + energia * 0.12 + pulso * 0.25})`);
    brilho.addColorStop(1, "rgba(0, 98, 252, 0)");
    ctx.fillStyle = brilho;
    ctx.fillRect(0, 0, largura, altura);

    // Contorno fininho da bolha.
    ctx.strokeStyle = `rgba(200, 225, 255, ${0.12 + pulso * 0.2})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, escala * 1.0, 0, Math.PI * 2);
    ctx.stroke();

    const luz = 0.55 + energia * 0.25 + pulso * 0.35;
    ctx.lineWidth = 0.7;
    const faixasLinha = Array.from({ length: FAIXAS }, () => new Path2D());
    for (const [i, j, f] of pares) {
      const a = tela[i], b = tela[j];
      const alfa = f * (0.25 + (a.perto + b.perto) / 2) * 0.7 * luz;
      if (alfa < 0.03) continue;
      const k = Math.min(FAIXAS - 1, Math.floor(alfa * FAIXAS));
      faixasLinha[k].moveTo(a.x, a.y);
      faixasLinha[k].lineTo(b.x, b.y);
    }
    faixasLinha.forEach((caminho, k) => {
      ctx.strokeStyle = `rgba(200, 225, 255, ${((k + 0.5) / FAIXAS).toFixed(3)})`;
      ctx.stroke(caminho);
    });
    const faixasPonto = Array.from({ length: FAIXAS }, () => new Path2D());
    for (const p of tela) {
      const alfa = (0.25 + p.perto * 0.75) * Math.min(1, luz + 0.2);
      const k = Math.min(FAIXAS - 1, Math.floor(alfa * FAIXAS));
      const r = 0.4 + p.perto * 1.1;
      faixasPonto[k].moveTo(p.x + r, p.y);
      faixasPonto[k].arc(p.x, p.y, r, 0, Math.PI * 2);
    }
    faixasPonto.forEach((caminho, k) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${((k + 0.5) / FAIXAS).toFixed(3)})`;
      ctx.fill(caminho);
    });
    esfera.custoMs = esfera.custoMs * 0.9 + (performance.now() - inicio) * 0.1; // tempo de desenho por quadro
    requestAnimationFrame(quadro);
  }
  esfera.custoMs = 0;
  esfera.particulas = N;
  esfera.linhas = pares.length;
  requestAnimationFrame(quadro);
})();
