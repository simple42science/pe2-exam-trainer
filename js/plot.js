/* PE II Trainer – tiny SVG plotting kit + interactive graph mounting.
 * Graphs are defined in graphs.js via PE.G.def(id, {title, topic, ctrls, acts, init, draw}).
 */
(function () {
  const PE = (window.PE = window.PE || {});
  const G = (PE.G = { defs: {}, order: [] });

  // ---- water properties (Spick §0 table) -----------------------------------
  const TT = [5, 10, 15, 20, 25, 30];
  const MU = [1.518, 1.307, 1.139, 1.002, 0.890, 0.798];
  const RHO = [1000, 999.7, 999.1, 998.2, 997.0, 995.7];
  const CS = [12.75, 11.27, 10.07, 9.08, 8.25, 7.54];
  function interp(xs, ys, x) {
    if (x <= xs[0]) return ys[0] + (ys[1] - ys[0]) * (x - xs[0]) / (xs[1] - xs[0]);
    for (let i = 1; i < xs.length; i++) {
      if (x <= xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
    }
    const n = xs.length - 1;
    return ys[n] + (ys[n] - ys[n - 1]) * (x - xs[n]) / (xs[n] - xs[n - 1]);
  }
  G.mu = (T) => interp(TT, MU, T) * 1e-3;     // Pa s
  G.rho = (T) => interp(TT, RHO, T);          // kg/m3
  G.cs = (T) => interp(TT, CS, T);            // g/m3 O2 at 1 atm
  G.kB = 1.3807e-23;

  // ---- number formatting ----------------------------------------------------
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  function sup(n) { return String(n).split('').map((c) => SUP[c] || c).join(''); }
  function num(v, d) {
    if (v === null || v === undefined || isNaN(v)) return '–';
    if (!isFinite(v)) return v > 0 ? '∞' : '−∞';
    const a = Math.abs(v);
    if (a !== 0 && (a >= 1e5 || a < 1e-3)) {
      const e = Math.floor(Math.log10(a));
      const m = v / Math.pow(10, e);
      return `${m.toFixed(d === undefined ? 2 : Math.max(0, d - 1)).replace(/\.?0+$/, '')}·10${sup(e)}`;
    }
    const dd = d === undefined ? (a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3) : d;
    return v.toFixed(dd).replace('-', '−');
  }
  G.num = num;
  G.sup = sup;

  // ---- frame ------------------------------------------------------------------
  function niceStep(span, n) {
    const raw = span / n;
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    const m = raw / p;
    return (m < 1.5 ? 1 : m < 3 ? 2 : m < 7 ? 5 : 10) * p;
  }
  function ticks(a, b, log, n) {
    const out = [];
    if (log) {
      const e0 = Math.ceil(Math.log10(a) - 1e-9), e1 = Math.floor(Math.log10(b) + 1e-9);
      const stepE = Math.max(1, Math.ceil((e1 - e0 + 1) / 7));
      for (let e = e0; e <= e1; e += stepE) out.push(Math.pow(10, e));
      return out;
    }
    const st = niceStep(b - a, n || 5);
    for (let v = Math.ceil(a / st - 1e-9) * st; v <= b + 1e-9; v += st) out.push(Math.abs(v) < st * 1e-6 ? 0 : v);
    return out;
  }
  function tickLabel(v, log) {
    if (log) {
      const e = Math.round(Math.log10(v));
      if (e >= -2 && e <= 3) return String(Math.pow(10, e)).replace(/^0\./, '0.');
      return '10' + sup(e);
    }
    const a = Math.abs(v);
    if (a >= 1e4 || (a < 1e-2 && a > 0)) return num(v, 1);
    return String(+v.toFixed(6)).replace('-', '−');
  }

  function frame(o) {
    const W = o.w || 360, H = o.h || 230;
    const pl = o.pl === undefined ? 50 : o.pl, pr = o.pr === undefined ? 14 : o.pr;
    const pt = o.pt === undefined ? 12 : o.pt, pb = o.pb === undefined ? 40 : o.pb;
    const [x0, x1] = o.x, [y0, y1] = o.y;
    const lx = !!o.xlog, ly = !!o.ylog;
    const tx = (v) => (lx ? Math.log10(v) : v), ty = (v) => (ly ? Math.log10(v) : v);
    const sx = (v) => pl + ((tx(v) - tx(x0)) / (tx(x1) - tx(x0))) * (W - pl - pr);
    const sy = (v) => pt + (1 - (ty(v) - ty(y0)) / (ty(y1) - ty(y0))) * (H - pt - pb);
    let s = '';
    const xt = o.xt || ticks(x0, x1, lx, o.xn), yt = o.yt || ticks(y0, y1, ly, o.yn);
    if (o.grid !== false) {
      xt.forEach((v) => { s += `<line class="gr" x1="${sx(v)}" y1="${pt}" x2="${sx(v)}" y2="${H - pb}"/>`; });
      yt.forEach((v) => { s += `<line class="gr" x1="${pl}" y1="${sy(v)}" x2="${W - pr}" y2="${sy(v)}"/>`; });
    }
    s += `<line class="ax" x1="${pl}" y1="${H - pb}" x2="${W - pr}" y2="${H - pb}"/>`;
    s += `<line class="ax" x1="${pl}" y1="${pt}" x2="${pl}" y2="${H - pb}"/>`;
    if (o.xticks !== false) xt.forEach((v) => {
      s += `<text class="tk" x="${sx(v)}" y="${H - pb + 13}" text-anchor="middle">${(o.xtf || tickLabel)(v, lx)}</text>`;
    });
    if (o.yticks !== false) yt.forEach((v) => {
      s += `<text class="tk" x="${pl - 5}" y="${sy(v) + 3.5}" text-anchor="end">${(o.ytf || tickLabel)(v, ly)}</text>`;
    });
    if (o.xl) s += `<text class="al" x="${(pl + W - pr) / 2}" y="${H - 6}" text-anchor="middle">${o.xl}</text>`;
    if (o.yl) s += `<text class="al" transform="translate(12 ${(pt + H - pb) / 2}) rotate(-90)" text-anchor="middle">${o.yl}</text>`;
    const F = { W, H, pl, pr, pt, pb, x0, x1, y0, y1, lx, ly, sx, sy, s };
    F.clipId = 'c' + Math.random().toString(36).slice(2, 8);
    return F;
  }

  function open(F, cls) {
    return `<svg class="plot ${cls || ''}" viewBox="0 0 ${F.W} ${F.H}" role="img"><defs><clipPath id="${F.clipId}"><rect x="${F.pl}" y="${F.pt}" width="${F.W - F.pl - F.pr}" height="${F.H - F.pt - F.pb}"/></clipPath></defs>${F.s}<g clip-path="url(#${F.clipId})">`;
  }
  function close() { return '</g></svg>'; }

  /** path of a function y=fn(x) across the x-range */
  function fpath(F, fn, cls, o) {
    o = o || {};
    const n = o.n || 180;
    const a = o.from !== undefined ? o.from : F.x0, b = o.to !== undefined ? o.to : F.x1;
    let d = '', pen = false;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = F.lx ? Math.pow(10, Math.log10(a) + t * (Math.log10(b) - Math.log10(a))) : a + t * (b - a);
      const y = fn(x);
      const ok = isFinite(y) && !(F.ly && y <= 0);
      if (!ok) { pen = false; continue; }
      let py = F.sy(y);
      py = Math.max(-2000, Math.min(2000, py));
      d += `${pen ? 'L' : 'M'}${F.sx(x).toFixed(1)},${py.toFixed(1)}`;
      pen = true;
    }
    return `<path class="ln ${cls || ''}" d="${d}"${o.dash ? ' stroke-dasharray="5 4"' : ''}/>`;
  }
  function poly(F, pts, cls, o) {
    o = o || {};
    const d = pts.filter((p) => isFinite(p[1]) && !(F.ly && p[1] <= 0))
      .map((p, i) => `${i ? 'L' : 'M'}${F.sx(p[0]).toFixed(1)},${F.sy(p[1]).toFixed(1)}`).join('');
    return `<path class="ln ${cls || ''}" d="${d}${o.closed ? 'Z' : ''}"${o.dash ? ' stroke-dasharray="5 4"' : ''}/>`;
  }
  function seg(F, xa, ya, xb, yb, cls, dash) {
    return `<line class="ln ${cls || ''}" x1="${F.sx(xa)}" y1="${F.sy(ya)}" x2="${F.sx(xb)}" y2="${F.sy(yb)}"${dash ? ' stroke-dasharray="4 4"' : ''}/>`;
  }
  function dot(F, x, y, cls, r) {
    return `<circle class="dt ${cls || ''}" cx="${F.sx(x)}" cy="${F.sy(y)}" r="${r || 4.5}"/>`;
  }
  function txt(F, x, y, t, cls, anchor, dx, dy) {
    return `<text class="lb ${cls || ''}" x="${F.sx(x) + (dx || 0)}" y="${F.sy(y) + (dy || 0)}" text-anchor="${anchor || 'start'}">${t}</text>`;
  }
  function vline(F, x, cls) { return `<line class="ln ${cls || ''}" x1="${F.sx(x)}" y1="${F.pt}" x2="${F.sx(x)}" y2="${F.H - F.pb}" stroke-dasharray="4 4"/>`; }
  function hline(F, y, cls) { return `<line class="ln ${cls || ''}" x1="${F.pl}" y1="${F.sy(y)}" x2="${F.W - F.pr}" y2="${F.sy(y)}" stroke-dasharray="4 4"/>`; }
  function legend(F, items, x, y) {
    // items: [[cls,label],…] placed at pixel coords inside plot
    let s = '';
    const X = x === undefined ? F.pl + 8 : x, Y = y === undefined ? F.pt + 6 : y;
    items.forEach((it, i) => {
      s += `<line class="ln ${it[0]}" x1="${X}" y1="${Y + i * 14 + 5}" x2="${X + 16}" y2="${Y + i * 14 + 5}"/>`;
      s += `<text class="lg" x="${X + 21}" y="${Y + i * 14 + 9}">${it[1]}</text>`;
    });
    return s;
  }
  /** solve f(x)=0 on [a,b] by bisection (f(a), f(b) of opposite sign) */
  function bisect(f, a, b, it) {
    let fa = f(a);
    for (let i = 0; i < (it || 80); i++) {
      const m = (a + b) / 2, fm = f(m);
      if ((fa < 0) === (fm < 0)) { a = m; fa = fm; } else b = m;
    }
    return (a + b) / 2;
  }

  Object.assign(G, { frame, open, close, fpath, poly, seg, dot, txt, vline, hline, legend, bisect, ticks, interp });

  // ---- definitions & mounting -----------------------------------------------------
  G.def = function (id, o) { o.id = id; G.defs[id] = o; G.order.push(id); };

  function initState(d, over) {
    const st = {};
    (d.ctrls || []).forEach((c) => { st[c.k] = c.v; });
    if (d.init) Object.assign(st, d.init());
    if (over) Object.assign(st, over);
    return st;
  }

  /** turn plain X_ab / X_{ab} notation inside <text> elements into subscript tspans */
  const SUB_T = '<tspan class="ssub" dy="3">$2</tspan><tspan dy="-3">​</tspan>';
  function post(svg) {
    return svg.replace(/(<text[^>]*>)([^<]*)/g, (m, open, t) => open + t
      .replace(/()_\{([^}]+)\}/g, SUB_T)
      .replace(/([A-Za-zα-ωΑ-Ωµ*])_([A-Za-z0-9]+(?:,[A-Za-z0-9]+)*)/g, '$1' + SUB_T));
  }
  G.post = post;

  /** static SVG (for quizzes / learn pages) */
  G.svg = function (id, over) {
    const d = G.defs[id];
    if (!d) return '';
    const st = initState(d, over);
    return post(d.draw(st).svg);
  };

  function ctrlHTML(c, v) {
    const lab = PE.fmt ? PE.fmt(c.l) : c.l;
    if (c.type === 'sel') {
      return `<label class="gc sel"><span>${lab}</span><select data-k="${c.k}">${c.opts.map((o) =>
        `<option value="${o[0]}"${String(o[0]) === String(v) ? ' selected' : ''}>${o[1]}</option>`).join('')}</select></label>`;
    }
    const sh = c.f ? c.f(v) : num(+v);
    return `<label class="gc"><span>${lab} <b data-o="${c.k}">${sh}</b></span><input type="range" data-k="${c.k}" min="${c.min}" max="${c.max}" step="${c.step}" value="${v}"></label>`;
  }

  /** interactive graph with controls */
  G.mount = function (el, id, opts) {
    const d = G.defs[id];
    if (!d) { el.innerHTML = '<p class="muted">Graph not found.</p>'; return; }
    opts = opts || {};
    const st = initState(d, opts.state);
    el.classList.add('gwrap');
    el.innerHTML = `
      ${opts.title === false ? '' : `<div class="gtitle">${d.title}</div>`}
      <div class="gsvg"></div>
      ${d.acts ? `<div class="gacts">${d.acts.map((a, i) => `<button class="chip" data-a="${i}">${a.l}</button>`).join('')}</div>` : ''}
      <div class="gctrls">${(d.ctrls || []).map((c) => ctrlHTML(c, st[c.k])).join('')}</div>
      <div class="ginfo"></div>`;
    const svgEl = el.querySelector('.gsvg'), info = el.querySelector('.ginfo');
    function render() {
      const r = d.draw(st);
      svgEl.innerHTML = post(r.svg);
      info.innerHTML = r.info ? PE.fmt(r.info) : '';
      info.style.display = r.info ? '' : 'none';
    }
    el.querySelectorAll('[data-k]').forEach((inp) => {
      inp.addEventListener('input', () => {
        const c = d.ctrls.find((x) => x.k === inp.dataset.k);
        st[c.k] = c.type === 'sel' ? inp.value : +inp.value;
        const o = el.querySelector(`[data-o="${c.k}"]`);
        if (o) o.textContent = c.f ? c.f(st[c.k]) : num(st[c.k]);
        render();
      });
    });
    el.querySelectorAll('[data-a]').forEach((b) => {
      b.addEventListener('click', () => {
        d.acts[+b.dataset.a].f(st);
        (d.ctrls || []).forEach((c) => {
          const inp = el.querySelector(`[data-k="${c.k}"]`);
          if (inp && c.type !== 'sel') inp.value = st[c.k];
          const o = el.querySelector(`[data-o="${c.k}"]`);
          if (o) o.textContent = c.f ? c.f(st[c.k]) : num(st[c.k]);
        });
        render();
      });
    });
    render();
    if (PE.store) { PE.store.S.graphs[id] = 1; PE.store.save(); }
  };
})();
