// EXOSPHERE — sky canvas
// Renders: parallax stars (4 depths), shooting stars.

(function () {
  const canvas = document.getElementById("sky");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0,
    H = 0;
  let scrollY = 0;
  let lastT = performance.now();

  // tweakables (read from window.__sky)
  const cfg = (window.__sky = window.__sky || {
    density: 1.0, // 0..2
    parallax: 1.0, // 0..2
    star: [255, 255, 255],
  });

  const layers = []; // star layers (depth, speed)
  const shooting = []; // shooting stars

  function rebuildLayers() {
    layers.length = 0;
    const base = Math.max(120, Math.floor((W * H) / 12000));
    const counts = [0.55, 0.3, 0.1, 0.05];
    const speeds = [0.05, 0.18, 0.38, 0.62]; // parallax depth (multiplied by cfg.parallax)
    const sizes = [
      [0.4, 0.9],
      [0.6, 1.3],
      [0.9, 1.8],
      [1.2, 2.6],
    ];
    const tw = [0.0, 0.15, 0.45, 0.85]; // twinkle amount
    for (let i = 0; i < 4; i++) {
      const n = Math.floor(base * counts[i] * cfg.density);
      const arr = [];
      const fieldH = H * 2.6; // extends below viewport for parallax during scroll
      for (let j = 0; j < n; j++) {
        arr.push({
          x: Math.random() * W,
          y: Math.random() * fieldH,
          r: sizes[i][0] + Math.random() * (sizes[i][1] - sizes[i][0]),
          tw: tw[i],
          ph: Math.random() * Math.PI * 2,
          sp: 0.5 + Math.random() * 1.2,
        });
      }
      layers.push({ stars: arr, speed: speeds[i], fieldH });
    }
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    rebuildLayers();
  }

  function maybeSpawnShooting() {
    if (Math.random() < 0.0024) {
      const fromLeft = Math.random() < 0.5;
      shooting.push({
        x: fromLeft ? -50 : W + 50,
        y: Math.random() * H * 0.6,
        vx: (fromLeft ? 1 : -1) * (8 + Math.random() * 4),
        vy: 2 + Math.random() * 2.5,
        life: 1,
        len: 80 + Math.random() * 80,
      });
    }
  }

  function drawStars(t) {
    const [sr, sg, sb] = cfg.star;
    for (const layer of layers) {
      const offY = (scrollY * layer.speed * cfg.parallax) % layer.fieldH;
      for (const s of layer.stars) {
        let y = s.y - offY;
        if (y < -10) y += layer.fieldH;
        if (y > H + 10) y -= layer.fieldH;
        if (y < -10 || y > H + 10) continue;
        const tw = s.tw ? 0.6 + 0.4 * Math.sin(t * 0.001 * s.sp + s.ph) : 1;
        ctx.fillStyle = `rgba(${sr},${sg},${sb},${0.5 + 0.5 * tw})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r * tw, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawShooting() {
    for (let i = shooting.length - 1; i >= 0; i--) {
      const s = shooting[i];
      const tailX = s.x - s.vx * s.len * 0.05;
      const tailY = s.y - s.vy * s.len * 0.05;
      const g = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      const [sr, sg, sb] = cfg.star;
      g.addColorStop(0, `rgba(${sr},${sg},${sb},${0.95 * s.life})`);
      g.addColorStop(1, `rgba(${sr},${sg},${sb},0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
      // head
      ctx.fillStyle = `rgba(${sr},${sg},${sb},${s.life})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.012;
      if (s.life <= 0 || s.x < -200 || s.x > W + 200 || s.y > H + 80) shooting.splice(i, 1);
    }
  }

  function frame(t) {
    const dt = t - lastT;
    lastT = t;
    ctx.clearRect(0, 0, W, H);
    drawStars(t);
    maybeSpawnShooting();
    drawShooting();
    requestAnimationFrame(frame);
  }

  window.addEventListener(
    "scroll",
    () => {
      scrollY = window.scrollY;
    },
    { passive: true }
  );
  window.addEventListener("resize", resize);

  // expose for tweaks
  window.__skyAPI = {
    setDensity(v) {
      cfg.density = v;
      rebuildLayers();
    },
    setParallax(v) {
      cfg.parallax = v;
    },
    setStarColor(rgb) {
      cfg.star = rgb;
    },
  };

  resize();
  scrollY = window.scrollY;
  requestAnimationFrame(frame);
})();
