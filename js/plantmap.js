/* PE II Trainer – plant roadmap drawings: a wastewater plant and a drinking-water plant as tappable SVG.
 * PE.MAP.svg(mapId, {quiz}) returns the SVG; every station is <g class="st" data-s="id">. Content: data/plantmap.js.
 */
(function () {
  const PE = window.PE;
  const M = (PE.MAP = {});

  // ---------------------------------------------------------------- glyphs (x, y = top-left of the glyph area)
  const bubbles = (pts) => pts.map(([cx, cy, r]) => `<circle class="gbub" cx="${cx}" cy="${cy}" r="${r}"/>`).join('');
  const dots = (pts, cls, r) => pts.map(([cx, cy]) => `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/>`).join('');
  const G = {
    pipe(x, y, w, h) {
      const c = y + h / 2;
      return `<rect class="gw" x="${x}" y="${c - 6}" width="${w}" height="12" rx="6"/>` +
        [8, 18, 28].map((d) => `<path class="gwl" d="M${x + d},${c - 3} l4,3 l-4,3"/>`).join('');
    },
    screen(x, y, w, h) {
      let s = `<rect class="gw" x="${x}" y="${y + 2}" width="${w}" height="${h - 4}" rx="3"/>`;
      for (let i = 0; i < 4; i++) s += `<line class="gm" x1="${x + 5 + i * 4}" y1="${y + 2}" x2="${x + 5 + i * 4}" y2="${y + h - 2}"/>`;
      return s + dots([[x + w - 13, y + h - 5], [x + w - 9, y + h - 5], [x + w - 5, y + h - 5], [x + w - 11, y + h - 8], [x + w - 7, y + h - 8]], 'gsand', 1.6);
    },
    clarR(x, y, w, h) {
      const b = y + h - 7;
      return `<path class="gw" d="M${x},${y + 2} H${x + w} V${b} H${x + 11} L${x + 5.5},${y + h} L${x},${b} Z"/>` +
        `<path class="gsl" d="M${x},${b - 3} H${x + w} V${b} H${x + 11} L${x + 5.5},${y + h} L${x},${b} Z"/>` +
        dots([[x + 16, y + 9], [x + 25, y + 13], [x + 33, y + 8], [x + 21, y + 18]], 'gfl', 1.3);
    },
    anox(x, y, w, h) {
      const cx = x + w / 2, cy = y + h / 2;
      return `<rect class="gw" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>` +
        dots([[x + 7, y + 6], [x + 15, y + 13], [x + w - 8, y + 7], [x + w - 13, y + h - 5], [x + 9, y + h - 5]], 'gfl', 1.5) +
        `<path class="gm" d="M${cx - 8},${cy + 2} a8,6 0 1,1 4,5"/><path class="gmk" d="M${cx - 6},${cy + 9} l-2,-4 l4,0 z"/>`;
    },
    aer(x, y, w, h) {
      return `<rect class="gw" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>` +
        `<line class="gm" x1="${x + 4}" y1="${y + h - 3}" x2="${x + w - 4}" y2="${y + h - 3}"/>` +
        bubbles([[x + 8, y + h - 7, 1.6], [x + 15, y + h - 11, 2], [x + 23, y + h - 6, 1.5], [x + 30, y + h - 12, 2.1], [x + 38, y + h - 8, 1.6], [x + 46, y + h - 13, 2], [x + 53, y + h - 7, 1.5], [x + 60, y + h - 11, 1.8], [x + 12, y + 5, 1.4], [x + 27, y + 4, 1.6], [x + 42, y + 5, 1.4], [x + 57, y + 4, 1.5]]);
    },
    clarV(x, y, w, h) {
      const m = x + w / 2, b = y + h * 0.48;
      return `<path class="gw" d="M${x},${y + 1} H${x + w} V${b} L${m},${y + h} L${x},${b} Z"/>` +
        `<path class="gsl" d="M${x + 4},${b + 2} H${x + w - 4} L${m},${y + h} Z"/>` +
        `<line class="gm" x1="${m}" y1="${y + 1}" x2="${m}" y2="${y + h * 0.36}"/>`;
    },
    ozone(x, y, w, h) {
      return `<rect class="gw" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>` +
        `<line class="gm" x1="${x + w * 0.33}" y1="${y}" x2="${x + w * 0.33}" y2="${y + h - 5}"/><line class="gm" x1="${x + w * 0.66}" y1="${y + 5}" x2="${x + w * 0.66}" y2="${y + h}"/>` +
        bubbles([[x + 5, y + h - 5, 1.3], [x + 9, y + h - 9, 1.5], [x + 6, y + h - 14, 1.2]]) +
        `<text class="gtx" x="${x + w * 0.5}" y="${y + h / 2 + 3}" text-anchor="middle">O₃</text>`;
    },
    carbon(x, y, w, h) {
      const p = [];
      for (let i = 0; i < 9; i++) p.push([x + 5 + i * ((w - 10) / 8), y + h - 4 - ((i * 5) % 3) * Math.min(4, h / 6)]);
      return `<rect class="gw" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>` + dots(p, 'gk', 1.7) +
        `<path class="gm" d="M${x + w - 14},${y - 2} v5 l4,4 l4,-4 v-5"/>`;
    },
    filter(x, y, w, h, top) {
      const t = y + h * 0.3, g = y + h * 0.78;
      let s = `<rect class="gw" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>` +
        `<rect class="${top || 'gsandf'}" x="${x + 1}" y="${t}" width="${w - 2}" height="${g - t}"/>` +
        `<rect class="ggrav" x="${x + 1}" y="${g}" width="${w - 2}" height="${y + h - g - 1}"/>`;
      if (top) s += `<rect class="gsandf" x="${x + 1}" y="${t + (g - t) * 0.4}" width="${w - 2}" height="${(g - t) * 0.6}"/>`;
      return s + `<line class="gm" x1="${x}" y1="${y + h - 1}" x2="${x + w}" y2="${y + h - 1}"/>`;
    },
    uv(x, y, w, h) {
      let s = `<rect class="gw" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
      [0.25, 0.5, 0.75].forEach((f) => { const cx = x + w * f; s += `<rect class="guv" x="${cx - 2.5}" y="${y + 3}" width="5" height="${h - 6}" rx="2.5"/><path class="guvg" d="M${cx - 6},${y + h / 2} h-3 M${cx + 6},${y + h / 2} h3"/>`; });
      return s;
    },
    river(x, y, w, h) {
      let s = `<rect class="gw" x="${x}" y="${y + h * 0.35}" width="${w}" height="${h * 0.65}" rx="3"/>`;
      [0.45, 0.68, 0.9].forEach((f) => { const yy = y + h * f; s += `<path class="gwl" d="M${x + 2},${yy} q4,-3 8,0 t8,0 t8,0 t8,0 t8,0"/>`; });
      return s + `<path class="gtree" d="M${x + 6},${y + h * 0.33} l4,-9 l4,9 z M${x + w - 12},${y + h * 0.33} l4,-7 l4,7 z"/>`;
    },
    thick(x, y, w, h) {
      const m = x + w / 2;
      return `<path class="gsl2" d="M${x},${y + 2} H${x + w} V${y + h * 0.6} L${m},${y + h} L${x},${y + h * 0.6} Z"/>` +
        `<line class="gm" x1="${m}" y1="${y}" x2="${m}" y2="${y + h * 0.8}"/><path class="gm" d="M${m - 9},${y + h * 0.55} L${m},${y + h * 0.8} L${m + 9},${y + h * 0.55}"/>`;
    },
    digester(x, y, w, h) {
      const m = x + w / 2;
      return `<path class="gsl2" d="M${m},${y + 3} C${x + w + 3},${y + 3} ${x + w},${y + h - 2} ${m},${y + h - 2} C${x},${y + h - 2} ${x - 3},${y + 3} ${m},${y + 3} Z"/>` +
        `<path class="gm" d="M${x + 7},${y + h * 0.3} Q${m},${y + h * 0.22} ${x + w - 7},${y + h * 0.3}"/>` +
        bubbles([[m - 5, y + h * 0.5, 1.6], [m + 4, y + h * 0.42, 1.9], [m, y + h * 0.62, 1.4], [m + 7, y + h * 0.58, 1.3], [m - 7, y + h * 0.7, 1.5]]) +
        `<path class="gm" d="M${m},${y + 3} V${y - 3}"/>`;
    },
    centri(x, y, w, h) {
      const c = y + h * 0.36;
      let s = `<rect class="gsl2" x="${x}" y="${c - 7}" width="${w}" height="14" rx="7"/>`;
      for (let i = 0; i < 5; i++) s += `<line class="gm" x1="${x + 5 + i * 6}" y1="${c - 6}" x2="${x + 9 + i * 6}" y2="${c + 6}"/>`;
      const p = y + h - 7;
      s += `<rect class="gpipe" x="${x}" y="${p - 5}" width="${w}" height="10" rx="2"/>`;
      return s + [[x + 6, p - 3], [x + 15, p + 3], [x + 24, p - 3], [x + 33, p + 3]].map(([cx, cy]) => `<path class="gcry" d="M${cx},${cy - 2.5} l2.2,2.5 l-2.2,2.5 l-2.2,-2.5 z"/>`).join('');
    },
    tower(x, y, w, h) {
      let s = `<rect class="gtw" x="${x}" y="${y + 6}" width="${w}" height="${h - 12}" rx="2"/>`;
      for (let yy = y + 12; yy < y + h - 10; yy += 6) s += `<path class="gpack" d="M${x + 1},${yy} l${w - 2},5 M${x + w - 1},${yy} l${-(w - 2)},5"/>`;
      return s + `<path class="ga" d="M${x + w / 2},${y + 6} V${y}"/><path class="gak" d="M${x + w / 2 - 3},${y + 3} l3,-4 l3,4 z"/>` +
        `<path class="ga" d="M${x - 6},${y + h - 9} H${x}"/>`;
    },
    membranes(x, y, w, h) {
      let s = `<rect class="gw" x="${x}" y="${y}" width="${w * 0.42}" height="${h}" rx="4"/>`;
      for (let i = 1; i < 5; i++) s += `<line class="gfib" x1="${x + i * w * 0.084}" y1="${y + 3}" x2="${x + i * w * 0.084}" y2="${y + h - 3}"/>`;
      const rx = x + w * 0.52;
      s += `<rect class="gro" x="${rx}" y="${y + h * 0.25}" width="${w * 0.48}" height="${h * 0.5}" rx="${h * 0.25}"/>`;
      for (let i = 1; i < 4; i++) s += `<path class="gm" d="M${rx + i * w * 0.11},${y + h * 0.3} q2,${h * 0.2} 0,${h * 0.4}"/>`;
      return s;
    },
    uf(x, y, w, h) {
      let s = `<rect class="gw" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>`;
      for (let i = 1; i < 7; i++) s += `<line class="gfib" x1="${x + (i * w) / 7}" y1="${y + 3}" x2="${x + (i * w) / 7}" y2="${y + h - 3}"/>`;
      return s;
    },
    ro(x, y, w, h) {
      let s = `<rect class="gro" x="${x}" y="${y + h * 0.2}" width="${w}" height="${h * 0.6}" rx="${h * 0.3}"/>`;
      for (let i = 1; i < 5; i++) s += `<path class="gm" d="M${x + (i * w) / 5},${y + h * 0.26} q3,${h * 0.24} 0,${h * 0.48}"/>`;
      return s;
    },
    well(x, y, w, h) {
      const m = x + w / 2, wt = y + h * 0.45;
      return `<rect class="gearth" x="${x}" y="${y + 8}" width="${w}" height="${h - 8}" rx="2"/>` +
        `<rect class="gw" x="${x}" y="${wt}" width="${w}" height="${y + h - wt}" rx="2"/>` +
        `<line class="gwl" x1="${x}" y1="${wt}" x2="${x + w}" y2="${wt}" stroke-dasharray="3 2"/>` +
        `<rect class="gpipe" x="${m - 3}" y="${y + 2}" width="6" height="${h - 4}"/><rect class="gm2" x="${m - 7}" y="${y}" width="14" height="6" rx="1.5"/>`;
    },
    cascade(x, y, w, h) {
      const s1 = h / 3;
      return `<path class="gsteps" d="M${x},${y + s1} h${w / 3} v${s1} h${w / 3} v${s1} h${w / 3} V${y + h} H${x} Z"/>` +
        `<path class="gwl" d="M${x},${y + s1 - 3} h${w / 3 + 2} q2,0 2,6 v${s1 - 6} h${w / 3} q2,0 2,6 v${s1 - 6} h${w / 3 - 4}"/>` +
        bubbles([[x + w / 3 + 7, y + s1 + 8, 1.4], [x + (2 * w) / 3 + 7, y + 2 * s1 + 7, 1.4], [x + 6, y + 5, 1.2]]);
    },
    lake(x, y, w, h) {
      let s = `<rect class="gw" x="${x}" y="${y + h * 0.3}" width="${w}" height="${h * 0.7}" rx="3"/>`;
      [0.42, 0.62].forEach((f) => { s += `<path class="gwl" d="M${x + 2},${y + h * f} q4,-3 8,0 t8,0 t8,0 t8,0"/>`; });
      return s + `<rect class="gpipe" x="${x + w * 0.55}" y="${y + h * 0.78}" width="${w * 0.45}" height="5" rx="2"/>` +
        `<path class="gtree" d="M${x + 4},${y + h * 0.28} l4,-9 l4,9 z"/>`;
    },
    floc(x, y, w, h) {
      const a = x + w * 0.3, b = x + w * 0.74;
      return `<rect class="gw" x="${x}" y="${y + 4}" width="${w * 0.42}" height="${h - 4}" rx="2"/><rect class="gw" x="${x + w * 0.48}" y="${y + 4}" width="${w * 0.52}" height="${h - 4}" rx="2"/>` +
        `<line class="gm" x1="${x + w * 0.21}" y1="${y}" x2="${x + w * 0.21}" y2="${y + h * 0.65}"/><path class="gm" d="M${x + w * 0.21 - 5},${y + h * 0.65} h10"/>` +
        `<line class="gm" x1="${b}" y1="${y}" x2="${b}" y2="${y + h * 0.62}"/><path class="gm" d="M${b - 6},${y + h * 0.62} h12 M${b},${y + h * 0.62 - 6} v12"/>` +
        dots([[a + 6, y + h - 6], [b - 7, y + h - 6], [b + 8, y + h - 9]], 'gfl', 2);
    },
    lamella(x, y, w, h) {
      let s = `<rect class="gw" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
      for (let i = 0; i < 5; i++) s += `<line class="gm" x1="${x + 6 + i * 7}" y1="${y + h - 4}" x2="${x + 14 + i * 7}" y2="${y + 4}"/>`;
      return s + `<path class="gsl" d="M${x + 1},${y + h - 1} h${w - 2} v-3 q-${w / 2},-3 -${w - 2},0 z"/>`;
    },
    gac(x, y, w, h) {
      const p = [];
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) p.push([x + 6 + c * ((w - 12) / 3) + (r % 2) * 2, y + h * 0.35 + r * ((h * 0.6) / 4)]);
      return `<rect class="gw" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>` + dots(p, 'gk', 2);
    },
    tap(x, y, w, h) {
      const m = x + w * 0.45;
      return `<path class="ghouse" d="M${x + 2},${y + h * 0.45} L${m},${y + 2} L${x + w * 0.9},${y + h * 0.45} V${y + h} H${x + 2} Z"/>` +
        `<path class="gm2" d="M${x + w * 0.35},${y + h * 0.58} h${w * 0.35} v6 h-6 v-3 h-${w * 0.35 - 6} z"/>` +
        `<path class="gw" d="M${x + w * 0.66},${y + h * 0.78} q2,4 0,6 q-2,-2 0,-6 z"/>`;
    },
  };

  // ---------------------------------------------------------------- building blocks
  function drop(cx, cy, label, cls) {
    return `<g class="dose"><path class="chem" d="M${cx},${cy - 6} C${cx + 4.5},${cy - 1} ${cx + 4},${cy + 4} ${cx},${cy + 4} C${cx - 4},${cy + 4} ${cx - 4.5},${cy - 1} ${cx},${cy - 6} Z"/>` +
      `<text class="chemt ${cls || ''}" x="${cx + 6}" y="${cy + 3}">${label}</text></g>`;
  }
  function badges(st, x, y, maxN) {
    const ts = (st.t || []).slice(0, maxN);
    return ts.map((tid, i) => {
      const tp = PE.topicById && PE.topicById[tid];
      if (!tp) return '';
      const cx = x - (ts.length - 1 - i) * 14;
      return `<g class="tb"><circle class="b-${tp.grp}" cx="${cx}" cy="${y}" r="6.5"/><text x="${cx}" y="${y + 3}" text-anchor="middle">${tp.n}</text></g>`;
    }).join('');
  }
  const textW = (s, px) => s.length * px * 0.56;

  /** one station box: glyph left (or below for layout 'stack'), labels, topic badges */
  function station(mapId, id, x, y, w, h, lbl, glyph, o, quiz) {
    o = o || {};
    const st = PE.plant.st[mapId][id];
    const cls = ['st', st.opt ? 'opt' : '', st.minor ? 'minor' : ''].filter(Boolean).join(' ');
    let s = `<g class="${cls}" data-s="${id}" role="button" tabindex="0" aria-label="${PE.esc(st.n)}">` +
      `<rect class="hit" x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}"/>` +
      `<rect class="bx" x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/>`;
    const nb = quiz ? 0 : Math.min((st.t || []).length, o.maxB || (w < 100 ? 1 : 3));
    if (o.stack) {
      s += `<text class="sn" x="${x + 6}" y="${y + 14}">${lbl[0]}</text>` + (lbl[1] ? `<text class="ss" x="${x + 6}" y="${y + 25}">${lbl[1]}</text>` : '');
      s += glyph ? glyph(x + 5, y + (lbl[1] ? 30 : 20), w - 10, h - (lbl[1] ? 34 : 24)) : '';
      if (nb) s += badges(st, x + w - 9, y + h - 9, nb);
    } else {
      const gw = o.gw || 36;
      s += glyph ? glyph(x + 6, y + 5, gw, h - 10) : '';
      const tx = x + gw + 12;
      const ny = lbl[1] ? y + h / 2 - 1 : y + h / 2 + 4;
      s += `<text class="sn" x="${tx}" y="${ny}">${lbl[0]}</text>` + (lbl[1] ? `<text class="ss" x="${tx}" y="${ny + 12}">${lbl[1]}</text>` : '');
      if (nb) {
        const top = textW(lbl[0], 11) + nb * 14 + 6 <= x + w - tx;
        s += badges(st, x + w - 9, top ? y + 9 : y + h - 9, nb);
      }
    }
    if (o.extra) s += o.extra;
    return s + '</g>';
  }

  const ARR = (id, cls) => `<marker id="${id}" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto-start-reverse"><path class="${cls}" d="M0,0.8 L9,5 L0,9.2 z"/></marker>`;
  const DEFS = `<defs>${ARR('pmw', 'mk-w')}${ARR('pms', 'mk-s')}${ARR('pmr', 'mk-s')}</defs>`;
  /** flow line: water (w) gets a moving-dash overlay, sludge (s), reject/return (r) */
  function flow(d, kind, end) {
    const mk = end === false ? '' : ` marker-end="url(#pm${kind})"`;
    return `<path class="fl f${kind}" d="${d}"${mk}/>` + (kind === 'w' ? `<path class="fl fw2" d="${d}"/>` : '');
  }
  function legend(x, y, items) {
    let s = '', yy = y;
    items.forEach(([kind, label]) => {
      if (kind === 'opt') s += `<rect class="lgbox" x="${x}" y="${yy - 7}" width="18" height="10" rx="3"/>`;
      else if (kind === 'chem') s += `<path class="chem" d="M${x + 9},${yy - 7} C${x + 12.5},${yy - 3} ${x + 12},${yy + 1} ${x + 9},${yy + 1} C${x + 6},${yy + 1} ${x + 5.5},${yy - 3} ${x + 9},${yy - 7} Z"/>`;
      else s += `<path class="fl f${kind}" d="M${x},${yy - 2} h18"/>`;
      s += `<text class="lgt" x="${x + 24}" y="${yy + 1}">${label}</text>`;
      yy += 13;
    });
    return s;
  }

  // ---------------------------------------------------------------- wastewater plant
  function drawWW(q) {
    const S = (id, x, y, w, h, lbl, gl, o) => station('ww', id, x, y, w, h, lbl, gl, o, q);
    let s = `<svg class="pm" viewBox="0 0 360 574" xmlns="http://www.w3.org/2000/svg">${DEFS}`;
    // flows first (under the boxes)
    s += flow('M2,33 H18', 'w');
    s += flow('M100,50 V66', 'w') + flow('M100,98 V116', 'w') + flow('M100,162 V172 H60 V180', 'w');
    s += flow('M140,238 V256', 'w') + flow('M100,306 V316 H59 V328', 'w') + flow('M100,316 H141 V328', 'w');
    s += flow('M59,384 V394 H100', 'w', false) + flow('M141,384 V394 H100 V404', 'w');
    s += flow('M100,450 V468', 'w') + flow('M100,504 V522', 'w') + flow('M180,544 H212', 'w');
    s += flow('M20,282 H8 V210 H18', 'r') + `<text class="fll" x="5" y="252" transform="rotate(-90 5 252)" text-anchor="middle">return sludge Q_R</text>`;
    s += flow('M180,136 H212', 's');
    s += flow('M180,282 H197 V150 H212', 's') + `<text class="fll" x="193" y="222" transform="rotate(-90 193 222)" text-anchor="middle">excess sludge Q_W</text>`;
    s += flow('M279,162 V180', 's') + flow('M279,262 V280', 's') + flow('M279,332 V350', 's');
    s += flow('M344,384 H353 V8 H100 V14', 'r') + `<text class="fll" x="349" y="19" text-anchor="end">reject water → back to the inlet</text>`;
    s += `<text class="fll" x="196" y="538" text-anchor="middle">reuse</text>`;
    s += legend(220, 30, [['w', 'water'], ['s', 'sludge'], ['r', 'return / reject'], ['chem', 'chemical dosing'], ['opt', 'optional unit']]);
    // stations
    s += S('in', 20, 16, 160, 34, ['Raw wastewater', 'Q · COD · TKN · P'], G.pipe);
    s += S('scr', 20, 68, 160, 30, ['Screen & grit', ''], G.screen);
    s += S('pc', 20, 118, 160, 44, ['Primary clarifier', 'settling I/II'], G.clarR, { extra: drop(30, 114, 'Fe') });
    s += S('as', 20, 182, 79, 56, ['Biology', 'C · N · P'], G.anox, { stack: true, extra: drop(30, 178, 'Fe') });
    s += S('air', 101, 182, 79, 56, ['Aeration', 'O₂ supply'], G.aer, { stack: true });
    s += S('sc', 20, 258, 160, 48, ['Sec. clarifier', 'solids flux'], G.clarV);
    s += S('o3', 20, 330, 78, 54, ['Ozone', '4th stage'], G.ozone, { stack: true });
    s += S('pac', 102, 330, 78, 54, ['PAC / GAC', '4th stage'], G.carbon, { stack: true });
    s += S('sf', 20, 406, 160, 44, ['Sand filter', '+ FeCl₃ (post)'], G.filter, { extra: drop(30, 402, 'Fe') });
    s += S('uv', 20, 470, 160, 34, ['UV / chlorine', 'if required'], G.uv);
    s += S('riv', 20, 524, 160, 40, ['River / lake', 'discharge'], G.river);
    s += S('thick', 214, 118, 130, 44, ['Thickener', ''], G.thick, { gw: 30 });
    s += S('dig', 214, 182, 130, 80, ['Digester', 'CH₄ + CO₂'], G.digester, { gw: 38 });
    s += S('strv', 214, 282, 130, 50, ['Dewatering', 'struvite risk'], G.centri, { gw: 38 });
    s += S('nh3', 214, 352, 130, 64, ['NH₃ stripping', 'reject water'], G.tower, { gw: 22 });
    s += S('reuse', 214, 518, 130, 46, ['Water reuse', 'UF → RO'], G.membranes, { gw: 40, maxB: 2 });
    return s + '</svg>';
  }

  // ---------------------------------------------------------------- drinking-water plant
  function drawDW(q) {
    const S = (id, x, y, w, h, lbl, gl, o) => station('dw', id, x, y, w, h, lbl, gl, o, q);
    let s = `<svg class="pm" viewBox="0 0 360 626" xmlns="http://www.w3.org/2000/svg">${DEFS}`;
    s += `<text class="lane" x="92" y="15" text-anchor="middle">GROUNDWATER</text><text class="lane" x="268" y="15" text-anchor="middle">SURFACE WATER</text>`;
    [64, 124, 184, 244].forEach((y0) => { s += flow(`M92,${y0} V${y0 + 18}`, 'w'); });
    s += flow('M92,304 V386 H180', 'w', false);
    [64, 124, 184, 244, 304].forEach((y0) => { s += flow(`M268,${y0} V${y0 + 18}`, 'w'); });
    s += flow('M268,364 V386 H180 V396', 'w');
    s += flow('M180,438 V456', 'w') + flow('M180,498 V516', 'w') + flow('M180,558 V576', 'w');
    s += legend(16, 330, [['w', 'water'], ['chem', 'dosing'], ['opt', 'optional']]);
    s += S('gw', 12, 24, 160, 40, ['Well', 'groundwater'], G.well);
    s += S('aer', 12, 84, 160, 40, ['Aeration', 'O₂ in, CO₂ out'], G.cascade);
    s += S('strip', 12, 144, 160, 40, ['Stripping tower', 'VOCs'], G.tower, { gw: 16 });
    s += S('fe', 12, 204, 160, 40, ['Iron filter', 'Fe(OH)₃'], (x, y, w, h) => G.filter(x, y, w, h, 'gfe'));
    s += S('mn', 12, 264, 160, 40, ['Mn filter', 'biological'], (x, y, w, h) => G.filter(x, y, w, h, 'gmn'));
    s += S('lake', 188, 24, 160, 40, ['Lake / river', 'intake'], G.lake);
    s += S('coag', 188, 84, 160, 40, ['Coag. & floc.', 'Al / Fe salt'], G.floc, { extra: drop(198, 80, 'Al') });
    s += S('sed', 188, 144, 160, 40, ['Sedimentation', 'Q/A'], G.lamella);
    s += S('rsf', 188, 204, 160, 40, ['Rapid sand filter', 'Yao · run length'], G.filter);
    s += S('oz', 188, 264, 160, 40, ['Ozonation', 'O₃ · •OH'], G.ozone);
    s += S('gac', 188, 324, 160, 40, ['GAC filter', 'adsorption'], G.gac);
    s += S('uf', 100, 398, 160, 40, ['Ultrafiltration', 'barrier'], G.uf);
    s += S('ro', 100, 458, 160, 40, ['Reverse osmosis', 'if salty'], G.ro);
    s += S('dis', 100, 518, 160, 40, ['Disinfection', 'UV · Cl₂'], G.uv, { extra: drop(110, 514, 'Cl₂') });
    s += S('net', 100, 578, 160, 40, ['Network → tap', 'residual · SI ≈ 0'], G.tap);
    return s + '</svg>';
  }

  M.svg = function (mapId, o) {
    o = o || {};
    const svg = mapId === 'dw' ? drawDW(o.quiz) : drawWW(o.quiz);
    return PE.G && PE.G.post ? PE.G.post(svg) : svg;
  };
  M.ids = (mapId) => PE.plant.maps[mapId].order;
})();
