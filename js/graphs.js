/* PE II Trainer – interactive graphs & schematic diagrams (all original SVG). */
(function () {
  const G = PE.G;
  const { frame, open, close, fpath, poly, seg, dot, txt, vline, hline, legend, bisect, num } = G;

  /** SVG label with _{sub} / ^{sup} support */
  function L(str) {
    return String(str)
      .replace(/_\{([^}]*)\}/g, '<tspan class="ssub" dy="3">$1</tspan><tspan dy="-3">​</tspan>')
      .replace(/_([A-Za-z0-9])/g, '<tspan class="ssub" dy="3">$1</tspan><tspan dy="-3">​</tspan>')
      .replace(/\^\{([^}]*)\}/g, '<tspan class="ssup" dy="-5">$1</tspan><tspan dy="5">​</tspan>');
  }
  const pct = (v) => (v * 100).toFixed(v > 0.999 ? 2 : 1) + ' %';
  const ARROW = '<marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="arh"/></marker>';

  // =====================================================================
  // 0  TOOLBOX
  // =====================================================================
  G.def('reactors', {
    title: 'Ideal reactors: PFR vs CSTR vs CSTR cascade (1st order)', topic: 't00',
    ctrls: [
      { k: 'n', l: 'CSTRs in series n =', min: 2, max: 10, step: 1, v: 3, f: (v) => v },
      { k: 'eta', l: 'Target removal η =', min: 0.5, max: 0.999, step: 0.001, v: 0.99, f: (v) => (v * 100).toFixed(1) + ' %' },
    ],
    draw(p) {
      const F = frame({ x: [0.1, 1000], xlog: true, y: [1e-4, 1], ylog: true, xl: L('k·τ (dimensionless)'), yl: L('C/C_0 leaving') });
      const r = 1 - p.eta, kP = Math.log(1 / r), kC = 1 / r - 1, kN = p.n * (Math.pow(1 / r, 1 / p.n) - 1);
      let s = open(F) + hline(F, r, 'cm');
      s += fpath(F, (x) => Math.exp(-x), 'c1') + fpath(F, (x) => 1 / (1 + x), 'c2') + fpath(F, (x) => Math.pow(1 + x / p.n, -p.n), 'c3');
      s += dot(F, kP, r, 'c1') + dot(F, kC, r, 'c2') + dot(F, kN, r, 'c3');
      s += legend(F, [['c1', 'PFR / batch: e^{−kτ}'], ['c2', 'one CSTR: 1/(1+kτ)'], ['c3', `${p.n} CSTRs in series`]].map((a) => [a[0], L(a[1])]), F.pl + 8, F.H - F.pb - 50);
      s += close();
      return {
        svg: s,
        info: `For **${(p.eta * 100).toFixed(1)} %** removal: PFR needs $k\\tau$ = ${num(kP)} · one CSTR $k\\tau$ = ${num(kC)} (**${num(kC / kP, 1)}×** the PFR volume) · ${p.n} CSTRs $k\\tau$ = ${num(kN)} (${num(kN / kP, 1)}×). The CSTR works at the low **effluent** concentration everywhere.`,
      };
    },
  });

  function phFromCtAlk(ct, alk, pk1, pk2) {
    const K1 = Math.pow(10, -pk1), K2 = Math.pow(10, -pk2);
    const f = (pH) => {
      const h = Math.pow(10, -pH);
      const a1 = 1 / (1 + h / K1 + K2 / h), a2 = 1 / (1 + h / K2 + (h * h) / (K1 * K2));
      return ct * (a1 + 2 * a2) + 1000 * (Math.pow(10, pH - 14) - h) - alk;
    };
    if (f(2) > 0) return 2;
    if (f(13.5) < 0) return 13.5;
    return bisect(f, 2, 13.5, 60);
  }
  function alkAt(ct, pH, pk1, pk2) {
    const K1 = Math.pow(10, -pk1), K2 = Math.pow(10, -pk2), h = Math.pow(10, -pH);
    const a1 = 1 / (1 + h / K1 + K2 / h), a2 = 1 / (1 + h / K2 + (h * h) / (K1 * K2));
    return ct * (a1 + 2 * a2) + 1000 * (Math.pow(10, pH - 14) - h);
  }
  G.phFromCtAlk = phFromCtAlk;

  function move(st, dct, dalk, why) {
    st.trail.push([st.ct, st.alk]);
    if (st.trail.length > 8) st.trail.shift();
    st.ct = Math.max(0.05, Math.min(9.9, st.ct + dct));
    st.alk = Math.max(0.05, Math.min(9.9, st.alk + dalk));
    st.last = why;
  }
  G.def('alk', {
    title: 'Alkalinity map: what CO₂, NaOH, CaCO₃ and nitrification do', topic: 't00',
    init: () => ({ ct: 6, alk: 5, trail: [], last: 'Start: Alk 5 mM, C_T 6 mM.' }),
    acts: [
      { l: 'Strip CO₂', f: (s) => move(s, -0.5, 0, 'CO₂ stripped: **ΔAlk = 0**, only $C_T$ drops → pH ↑ (horizontal move).') },
      { l: 'Add CO₂', f: (s) => move(s, 0.5, 0, 'CO₂ added: Alk unchanged, $C_T$ ↑ → pH ↓.') },
      { l: '+ NaOH', f: (s) => move(s, 0, 0.5, 'NaOH: **ΔAlk = +ΔNaOH**, $C_T$ constant (vertical move).') },
      { l: 'CaCO₃ precipitates', f: (s) => move(s, -0.5, -1, 'CaCO₃ precipitation: ΔC_T = −ΔCa, **ΔAlk = −2ΔCa** (slope 2).') },
      { l: 'Nitrify / Fe²⁺ ox.', f: (s) => move(s, 0, -0.5, 'H⁺ released (nitrification 2 H⁺/N, Fe(II) 2 H⁺/Fe): Alk ↓, $C_T$ const → pH ↓.') },
      { l: 'Reset', f: (s) => { s.ct = 6; s.alk = 5; s.trail = []; s.last = 'Reset.'; } },
    ],
    draw(p) {
      const pk1 = 6.3, pk2 = 10.3;
      const F = frame({ x: [0, 10], y: [0, 10], xl: L('C_T total carbonate [mmol/L]'), yl: L('Alkalinity [mmol/L]') });
      let s = open(F);
      [5.5, 6, 6.5, 7, 8.3, 9.5, 10.5].forEach((ph) => {
        s += fpath(F, (ct) => alkAt(ct, ph, pk1, pk2), 'cm thin', { n: 30 });
        const ctEnd = Math.min(9.6, bisect((c) => alkAt(c, ph, pk1, pk2) - 9.6, 0.01, 50) || 9.6);
        const yEnd = alkAt(ctEnd, ph, pk1, pk2);
        s += txt(F, ctEnd, Math.min(9.6, yEnd), 'pH ' + ph, 'iso', 'end', -2, -3);
      });
      let prev = null;
      p.trail.forEach((t) => {
        if (prev) s += `<line class="ln cm" x1="${F.sx(prev[0])}" y1="${F.sy(prev[1])}" x2="${F.sx(t[0])}" y2="${F.sy(t[1])}"/>`;
        s += dot(F, t[0], t[1], 'cm', 3);
        prev = t;
      });
      if (prev) s += `<line class="ln c2" marker-end="url(#ar)" x1="${F.sx(prev[0])}" y1="${F.sy(prev[1])}" x2="${F.sx(p.ct)}" y2="${F.sy(p.alk)}"/>`;
      s += dot(F, p.ct, p.alk, 'c2', 6);
      s = s.replace('<defs>', `<defs>${ARROW}`) + close();
      const ph = phFromCtAlk(p.ct, p.alk, pk1, pk2);
      return { svg: s, info: `**pH = ${ph.toFixed(2)}** at $C_T$ = ${p.ct.toFixed(2)} mM, Alk = ${p.alk.toFixed(2)} mM (p$K_1$ 6.3, p$K_2$ 10.3). ${p.last}` };
    },
  });

  G.def('carbonate', {
    title: 'Carbonate speciation (α₀, α₁, α₂ vs pH)', topic: 't00',
    ctrls: [{ k: 'ph', l: 'pH =', min: 3, max: 13, step: 0.1, v: 7.5, f: (v) => v.toFixed(1) }],
    draw(p) {
      const K1 = Math.pow(10, -6.3), K2 = Math.pow(10, -10.3);
      const a = (pH) => { const h = Math.pow(10, -pH); return [1 / (1 + K1 / h + (K1 * K2) / (h * h)), 1 / (1 + h / K1 + K2 / h), 1 / (1 + h / K2 + (h * h) / (K1 * K2))]; };
      const F = frame({ x: [3, 13], y: [0, 1], xl: 'pH', yl: 'fraction of C_T' });
      let s = open(F) + vline(F, 6.3, 'cm') + vline(F, 10.3, 'cm');
      s += fpath(F, (x) => a(x)[0], 'c1') + fpath(F, (x) => a(x)[1], 'c2') + fpath(F, (x) => a(x)[2], 'c3');
      s += vline(F, p.ph, 'c5');
      const v = a(p.ph);
      s += dot(F, p.ph, v[0], 'c1') + dot(F, p.ph, v[1], 'c2') + dot(F, p.ph, v[2], 'c3');
      s += txt(F, 6.3, 1, 'pK₁', 'small', 'middle', 0, 10) + txt(F, 10.3, 1, 'pK₂', 'small', 'middle', 0, 10);
      s += legend(F, [['c1', L('H_2CO_3* (α_0)')], ['c2', L('HCO_3^{−} (α_1)')], ['c3', L('CO_3^{2−} (α_2)')]], F.W - 130, F.pt + 30) + close();
      return { svg: s, info: `pH ${p.ph.toFixed(1)}: H₂CO₃* **${pct(v[0])}**, HCO₃⁻ **${pct(v[1])}**, CO₃²⁻ **${pct(v[2])}**. Between pH 6.5 and 8.3 almost all alkalinity is HCO₃⁻ → Alk ≈ [HCO₃⁻].` };
    },
  });

  // =====================================================================
  // 1 / 3  PHOSPHATE, IRON
  // =====================================================================
  G.def('pdose', {
    title: 'Fe dosing chart: fraction of soluble P remaining vs Fe:P ratio', topic: 't01',
    ctrls: [{ k: 'eta', l: 'Required removal of initial soluble P:', min: 0.5, max: 0.99, step: 0.005, v: 0.9, f: (v) => (v * 100).toFixed(1) + ' %' }],
    draw(p) {
      const F = frame({ x: [0, 4.5], y: [0.01, 1], ylog: true, xl: 'mol Fe added per mol initial soluble P', yl: L('S_{P,e} / S_{P,init}') });
      const r = 1 - p.eta, ratio = -Math.log10(r) / 0.44;
      let s = open(F) + fpath(F, (x) => Math.pow(10, -0.44 * x), 'c1');
      s += seg(F, 0, r, ratio, r, 'c5', true) + seg(F, ratio, r, ratio, 0.01, 'c5', true) + dot(F, ratio, r, 'c5') + close();
      return { svg: s, info: `Target fraction remaining **${r.toFixed(3)}** → read Fe:P ≈ **${ratio.toFixed(1)} mol/mol** (approximation of M&E Fig. 6-14: $10^{-0.44\\cdot ratio}$). If the task **gives** the ratio, do not read the figure — multiply it by the **initial soluble P**.` };
    },
  });

  G.def('feox', {
    title: 'Fe(II) oxidation: half-life vs pH', topic: 't03',
    ctrls: [
      { k: 'ph', l: 'pH =', min: 5.5, max: 8.5, step: 0.1, v: 7, f: (v) => v.toFixed(1) },
      { k: 'po2', l: 'p_O₂ equivalent [atm] =', min: 0.01, max: 1, step: 0.01, v: 0.2, f: (v) => v.toFixed(2) },
    ],
    draw(p) {
      const k = 8e13, th = (pH) => Math.LN2 / (k * Math.pow(10, 2 * (pH - 14)) * p.po2);
      const F = frame({ x: [5.5, 8.5], y: [0.01, 1e5], ylog: true, xl: 'pH', yl: L('t_{1/2} of Fe²⁺ [min]') });
      let s = open(F) + fpath(F, th, 'c1') + dot(F, p.ph, th(p.ph), 'c5') + hline(F, 60, 'cm') + txt(F, 5.6, 60, '1 hour', 'small', 'start', 0, -4) + close();
      const t = th(p.ph);
      return { svg: s, info: `$k_r = k[\\mathrm{OH^-}]^2 p_{O_2}$ = ${num(Math.LN2 / t)} min⁻¹ → $t_{1/2}$ = **${num(t)} min**. One pH unit up = $[\\mathrm{OH^-}]^2$ ×100 = **100× faster** (CSTR volume ÷100).` };
    },
  });

  // =====================================================================
  // 4 / 5  OXIDATION & DISINFECTION
  // =====================================================================
  G.def('kapp', {
    title: 'Apparent rate constant vs pH (log scale)', topic: 't04',
    ctrls: [
      { k: 'mode', l: 'Case', type: 'sel', v: 'o3', opts: [['o3', 'O₃: only the pollutant dissociates'], ['cl', 'HOCl + phenol: both dissociate']] },
      { k: 'pka', l: 'pKₐ of the pollutant =', min: 2, max: 12, step: 0.1, v: 9.2, f: (v) => v.toFixed(1) },
      { k: 'lha', l: 'log k(HA, protonated) =', min: -1, max: 9, step: 0.1, v: 0, f: (v) => v.toFixed(1) },
      { k: 'la', l: 'log k(A⁻, deprotonated) =', min: 0, max: 10, step: 0.1, v: 7, f: (v) => v.toFixed(1) },
      { k: 'ph', l: 'pH =', min: 0, max: 14, step: 0.1, v: 7, f: (v) => v.toFixed(1) },
    ],
    draw(p) {
      const aA = (pH) => 1 / (1 + Math.pow(10, p.pka - pH));
      let fn, info;
      if (p.mode === 'o3') {
        fn = (pH) => Math.log10((1 - aA(pH)) * Math.pow(10, p.lha) + aA(pH) * Math.pow(10, p.la));
        info = `$k_{app} = \\alpha_{HA}k_{HA} + \\alpha_{A^-}k_{A^-}$ = **${num(Math.pow(10, fn(p.ph)))} M⁻¹s⁻¹** at pH ${p.ph.toFixed(1)}. Plateaus at $k_{HA}$ and $k_{A^-}$; in between the line rises with **slope +1** (×10 per pH unit) up to the pKₐ.`;
      } else {
        const bH = (pH) => 1 / (1 + Math.pow(10, pH - 7.5));
        fn = (pH) => Math.log10(Math.pow(10, p.la) * bH(pH) * aA(pH));
        const opt = (7.5 + p.pka) / 2;
        info = `$k_{app} = k\\,\\beta_{HOCl}\\,\\alpha_{P^-}$: HOCl falls with pH, phenolate rises → **maximum at pH = ½(7.5 + ${p.pka.toFixed(1)}) = ${opt.toFixed(2)}**.`;
      }
      const F = frame({ x: [0, 14], y: [-2, 11], xl: 'pH', yl: L('log k_{app} [M⁻¹s⁻¹]') });
      let s = open(F) + vline(F, p.pka, 'cm') + txt(F, p.pka, 11, 'pKₐ', 'small', 'middle', 0, 10);
      s += fpath(F, fn, 'c1') + dot(F, p.ph, fn(p.ph), 'c5') + close();
      return { svg: s, info };
    },
  });

  G.def('breakpoint', {
    title: 'Breakpoint chlorination', topic: 't05',
    ctrls: [
      { k: 'r', l: 'Dose Cl₂ : NH₄-N (mass) =', min: 0, max: 12, step: 0.1, v: 6, f: (v) => v.toFixed(1) },
      { k: 'off', l: 'Immediate demand (Fe²⁺, H₂S…) =', min: 0, max: 1.5, step: 0.1, v: 0.5, f: (v) => v.toFixed(1) },
    ],
    draw(p) {
      const res = (r) => {
        const e = r - p.off;
        if (e <= 0) return 0;
        if (e <= 5) return 0.92 * e;
        if (e <= 7.6) return 4.6 - ((e - 5) / 2.6) * 4.3;
        return 0.3 + (e - 7.6);
      };
      const F = frame({ x: [0, 12], y: [0, 6], xl: 'Cl₂ dose / NH₄-N  [mg/mg]', yl: 'residual Cl₂ per mg N' });
      let s = open(F) + fpath(F, (x) => x, 'cm thin', { dash: true }) + fpath(F, res, 'c1', { n: 400 });
      s += vline(F, 7.6 + p.off, 'c5') + txt(F, 7.6 + p.off, 6, 'breakpoint', 'small', 'middle', 0, 10);
      s += txt(F, (p.off + 2.6), 4.9, 'A: chloramines', 'small', 'middle') + txt(F, 6.4 + p.off, 2.6, 'B', 'small', 'middle') + txt(F, 10.6, 3.8, 'C: free Cl₂', 'small', 'middle');
      s += dot(F, p.r, res(p.r), 'c5') + close();
      const e = p.r - p.off;
      const zone = e <= 0 ? 'offset: immediate demand (Fe²⁺, Mn²⁺, H₂S, organics) — no residual yet'
        : e <= 5 ? 'zone A: HOCl + NH₃ → chloramines, **combined** residual rises'
          : e <= 7.6 ? 'zone B: extra Cl₂ destroys chloramines (→ N₂), residual **falls**'
            : 'zone C: past the breakpoint, **free** chlorine rises 1:1 with dose';
      return { svg: s, info: `${zone}. Breakpoint = 1.5 mol Cl₂/mol N = **7.6 mg Cl₂/mg N**. Free residual wanted → dose = 7.6·NH₄-N + residual (+ immediate demand).` };
    },
  });

  G.def('chick', {
    title: 'Inactivation curves: Chick–Watson, lag, tailing', topic: 't05',
    ctrls: [
      { k: 'k', l: 'k [L/(mg·min)] =', min: 0.5, max: 5, step: 0.1, v: 2.3, f: (v) => v.toFixed(1) },
      { k: 'b', l: 'lag / tailing constant b =', min: 0.2, max: 4, step: 0.1, v: 1, f: (v) => v.toFixed(1) },
    ],
    draw(p) {
      const F = frame({ x: [0, 8], y: [-6, 0], xl: 'Ct  [mg·min/L]', yl: L('log_{10}(N/N_0)') });
      let s = open(F);
      s += fpath(F, (c) => (-p.k * c) / Math.LN10, 'c1');
      s += fpath(F, (c) => (c < p.b ? 0 : (-p.k * (c - p.b)) / Math.LN10), 'c2', { n: 300 });
      s += fpath(F, (c) => (c < p.b ? 0 : (-p.k * Math.log(c / p.b)) / Math.LN10), 'c3', { n: 300 });
      [-2, -3].forEach((y) => { s += hline(F, y, 'cm'); });
      s += legend(F, [['c1', 'Chick–Watson (straight)'], ['c2', 'Rennecker–Mariñas (lag)'], ['c3', 'Collins–Selleck (tailing)']], F.W - 168, F.pt + 4) + close();
      const ct2 = (2 * Math.LN10) / p.k;
      return { svg: s, info: `Chick–Watson: $\\ln(N/N_0) = -kCt$. With k = ${p.k.toFixed(1)}: 2 log needs Ct = **${ct2.toFixed(2)}**, 3 log **${(1.5 * ct2).toFixed(2)}** mg·min/L — log levels scale **linearly** (3 log = 1.5 × Ct₉₉).` };
    },
  });

  // =====================================================================
  // 6 / 7 / 8  GAS EXCHANGE
  // =====================================================================
  const GASES = [
    ['O₂', [20, 25, 30, 35, 38]], ['N₂', [43, 52, 60, 67, 73]], ['CH₄', [18, 23, 28, 33, 37]],
    ['CO₂', [0.59, 0.81, 1.07, 1.35, 1.65]], ['H₂S', [0.22, 0.28, 0.36, 0.44, 0.53]], ['PCE', [0.24, 0.44, 0.77, 1.31, 2.14]],
    ['TCE', [0.16, 0.26, 0.41, 0.61, 0.9]], ['benzene', [0.06, 0.11, 0.17, 0.27, 0.41]], ['CHCl₃', [0.04, 0.08, 0.13, 0.21, 0.33]],
    ['NH₃', [2e-4, 3.4e-4, 5.6e-4, 8.8e-4, 1.3e-3]],
  ];
  const Hat = (row, T) => Math.exp(G.interp([0, 10, 20, 30, 40], row.map(Math.log), T));

  G.def('henry', {
    title: 'Henry constants H_YC on a log scale', topic: 't06',
    ctrls: [{ k: 'T', l: 'Temperature [°C] =', min: 0, max: 40, step: 1, v: 20, f: (v) => v }],
    draw(p) {
      const W = 360, H = 250, x0 = 26, x1 = 344;
      const sx = (h) => x0 + ((Math.log10(h) + 4) / 6) * (x1 - x0);
      let s = `<svg class="plot" viewBox="0 0 ${W} ${H}">`;
      s += `<rect x="${sx(1e-4)}" y="34" width="${sx(1e-2) - sx(1e-4)}" height="150" class="zone z1"/>`;
      s += `<rect x="${sx(10)}" y="34" width="${sx(100) - sx(10)}" height="150" class="zone z2"/>`;
      s += `<line class="ax" x1="${x0}" y1="190" x2="${x1}" y2="190"/>`;
      for (let e = -4; e <= 2; e++) s += `<line class="ax" x1="${sx(Math.pow(10, e))}" y1="186" x2="${sx(Math.pow(10, e))}" y2="194"/><text class="tk" x="${sx(Math.pow(10, e))}" y="206" text-anchor="middle">10${G.sup(e)}</text>`;
      s += `<text class="al" x="${(x0 + x1) / 2}" y="226" text-anchor="middle">H_YC = C_gas / C_water (dimensionless)</text>`;
      s += `<text class="small" x="${sx(1e-4) + 4}" y="48">very soluble</text><text class="small" x="${sx(1e-4) + 4}" y="60">gas-film controlled</text>`;
      s += `<text class="small" x="${sx(100) - 4}" y="48" text-anchor="end">poorly soluble</text><text class="small" x="${sx(100) - 4}" y="60" text-anchor="end">X ≪ 1 in bubbles</text>`;
      GASES.forEach((g, i) => {
        const h = Hat(g[1], p.T), x = sx(h), y = 78 + (i % 5) * 21;
        s += `<line class="ln cm thin" x1="${x}" y1="${y + 4}" x2="${x}" y2="190"/><circle class="dt c${(i % 5) + 1}" cx="${x}" cy="${y}" r="4"/><text class="lb" x="${x + 6}" y="${y + 4}">${g[0]}</text>`;
      });
      s += '</svg>';
      const o2 = Hat(GASES[0][1], p.T), nh3 = Hat(GASES[9][1], p.T);
      return { svg: s, info: `At ${p.T} °C: O₂ ${num(o2)}, NH₃ ${num(nh3)}. Large H = the gas prefers air (easy to strip, hard to dissolve). H **rises with temperature** for every gas. Practically strippable if $H \\ge 10^{-4}$.` };
    },
  });

  G.def('xcrit', {
    title: 'Gas exchange exponent X = K_La·V/(H·Q_G)', topic: 't06',
    ctrls: [
      { k: 'kla', l: 'K_La [1/h] =', min: 1, max: 60, step: 1, v: 10, f: (v) => v },
      { k: 'q', l: 'Air per tank volume Q_G/V [1/h] =', min: 0.1, max: 20, step: 0.1, v: 2, f: (v) => v.toFixed(1) },
    ],
    draw(p) {
      const F = frame({ x: [1e-3, 1e5], xlog: true, y: [0, 1.05], xl: 'X  (log scale)', yl: L('1 − e^{−X}') });
      let s = open(F);
      s += `<rect class="zone z2" x="${F.sx(1e-3)}" y="${F.pt}" width="${F.sx(0.3) - F.sx(1e-3)}" height="${F.H - F.pt - F.pb}"/>`;
      s += `<rect class="zone z1" x="${F.sx(3)}" y="${F.pt}" width="${F.sx(1e5) - F.sx(3)}" height="${F.H - F.pt - F.pb}"/>`;
      s += fpath(F, (x) => 1 - Math.exp(-x), 'c1');
      const pick = [0, 2, 3, 7, 9];
      let info = [];
      pick.forEach((gi, i) => {
        const g = GASES[gi], H = Hat(g[1], 20), X = p.kla / (H * p.q);
        const Xc = Math.max(1.2e-3, Math.min(9e4, X));
        s += dot(F, Xc, 1 - Math.exp(-Xc), 'c' + ((i % 5) + 1)) + txt(F, Xc, 1 - Math.exp(-Xc), g[0], 'small', 'middle', 0, i % 2 ? 16 : -8);
        info.push(`${g[0]} X = ${num(X)}`);
      });
      s += txt(F, 1.5e-3, 0.95, 'K_La limits', 'small') + txt(F, 5, 0.12, 'air (Q_G) limits', 'small') + close();
      return { svg: s, info: `${info.join(' · ')}. **X ≫ 1** (small H): off-gas leaves at equilibrium → only more **air** helps. **X ≪ 1** (large H): the bubble stays far from equilibrium → $K_La$ (fine bubbles, depth) helps.` };
    },
  });

  G.def('bubble', {
    title: 'Rising bubble: how close to equilibrium does it get?', topic: 't06',
    ctrls: [
      { k: 'db', l: 'Bubble diameter d_B [mm] =', min: 0.5, max: 6, step: 0.1, v: 2, f: (v) => v.toFixed(1) },
      { k: 'h', l: 'Injection depth h [m] =', min: 1, max: 8, step: 0.5, v: 4, f: (v) => v.toFixed(1) },
    ],
    draw(p) {
      const KL = 1e-4, vB = 0.3, list = [['CH₄', 28, 'c1'], ['N₂O', 1.7, 'c2'], ['CO₂', 1.07, 'c3']];
      const F = frame({ x: [0, p.h], y: [0, 1.05], xl: 'height risen [m]', yl: L('C_G / (H·C_L)') });
      let s = open(F), info = [];
      list.forEach((g) => {
        const X = (z) => (6 * KL * z) / ((p.db / 1000) * vB * g[1]);
        s += fpath(F, (z) => 1 - Math.exp(-X(z)), g[2]);
        info.push(`${g[0]} ${pct(1 - Math.exp(-X(p.h)))}`);
      });
      const o2 = Math.exp((-6 * KL * p.h) / ((p.db / 1000) * vB * 30));
      s += legend(F, list.map((g) => [g[2], `${g[0]} (H = ${g[1]})`]), F.W - 120, F.H - F.pb - 52) + close();
      return { svg: s, info: `At the surface the bubble reached: ${info.join(', ')} of equilibrium. O₂ bubble keeps **${pct(o2)}** of its O₂. $X_B = 6K_Lh/(d_Bv_BH)$: smaller bubbles or deeper injection only help gases with **large H**.` };
    },
  });

  G.def('csat', {
    title: 'Saturation at mid-depth C_S,T,m and the k_C factor', topic: 't07',
    ctrls: [
      { k: 'T', l: 'Water temperature [°C] =', min: 5, max: 30, step: 1, v: 10, f: (v) => v },
      { k: 'p', l: 'Ambient pressure [atm] =', min: 0.85, max: 1.0, step: 0.01, v: 0.96, f: (v) => v.toFixed(2) },
      { k: 'h', l: 'Injection depth h_inj [m] =', min: 0.5, max: 8, step: 0.1, v: 2.8, f: (v) => v.toFixed(1) },
      { k: 'ote', l: 'OTE_h for bubble depletion [%/m] =', min: 0, max: 8, step: 0.5, v: 0, f: (v) => v.toFixed(1) },
      { k: 'cl', l: 'C_L in the tank [g/m³] =', min: 0, max: 4, step: 0.1, v: 2.5, f: (v) => v.toFixed(1) },
    ],
    draw(p) {
      const cs = G.cs(p.T);
      const csm = (h) => cs * (p.p + (0.5 * h) / 10.33) * ((100 - 0.5 * h * p.ote) / 100);
      const F = frame({ x: [0, 8], y: [5, 20], xl: 'injection depth h_inj [m]', yl: 'O₂ saturation [g/m³]' });
      let s = open(F) + fpath(F, (h) => cs * (p.p + h / 10.33), 'c2', { dash: true }) + fpath(F, csm, 'c1');
      s += hline(F, 9.08, 'cm') + txt(F, 7.9, 9.08, 'C*_S = 9.08', 'small', 'end', 0, -4);
      s += dot(F, p.h, csm(p.h), 'c5') + legend(F, [['c2', 'at the diffuser (full depth)'], ['c1', 'C_S,T,m (mid-depth)']], F.pl + 8, F.pt + 4) + close();
      const v = csm(p.h), kc = 9.08 / (v - p.cl), kt = Math.exp(0.02 * (20 - p.T));
      return { svg: s, info: `$C_{S,T,m}$ = ${cs.toFixed(2)}·(${p.p.toFixed(2)} + 0.5·${p.h.toFixed(1)}/10.33)${p.ote ? `·(100 − 0.5·${p.h.toFixed(1)}·${p.ote})/100` : ''} = **${v.toFixed(2)} g/m³** → $k_C = 9.08/(C_{S,T,m}-C_L)$ = **${kc.toFixed(2)}**, $k_T$ = ${kt.toFixed(2)} → OTE/SOTE = α/(k_C·k_T) = ${(1 / (kc * kt)).toFixed(2)}·α.` };
    },
  });

  G.def('odq', {
    title: 'Max. inflow: OD(Q) = a·Q − b meets the aeration capacity', topic: 't07',
    ctrls: [
      { k: 'cod', l: 'ΔCOD = COD_in − COD_e [g/m³] =', min: 100, max: 400, step: 2, v: 202, f: (v) => v },
      { k: 'tkn', l: 'TKN removed [gN/m³] =', min: 10, max: 50, step: 1, v: 28, f: (v) => v },
      { k: 'mex', l: 'Excess sludge M_ex [kgCOD/d] =', min: 0, max: 2500, step: 50, v: 1000, f: (v) => v },
      { k: 'cl', l: 'C_L in effluent [g/m³] =', min: 0, max: 3, step: 0.1, v: 2.5, f: (v) => v.toFixed(1) },
      { k: 'den', l: 'Share of N_nitr denitrified =', min: 0, max: 1, step: 0.05, v: 0, f: (v) => Math.round(v * 100) + ' %' },
      { k: 'otr', l: 'OTR capacity [kgO₂/d] =', min: 300, max: 4000, step: 10, v: 1256, f: (v) => v },
    ],
    draw(p) {
      const a = p.cod / 1000 + (4.57 + 0.24) * (p.tkn / 1000) * (1 - p.den) + 1.71 * 0 + (p.cl / 1000) + (4.57 + 0.24 - 2.86) * (p.tkn / 1000) * p.den;
      const b = p.mex + (4.57 + 0.24) * 0.06 * p.mex * (1 - p.den) + (4.57 + 0.24 - 2.86) * 0.06 * p.mex * p.den;
      const qmax = (p.otr + b) / a;
      const F = frame({ x: [0, 20000], y: [0, 5000], xl: 'wastewater inflow Q [m³/d]', yl: 'kg O₂ / d' });
      let s = open(F) + fpath(F, (q) => a * q - b, 'c1') + hline(F, p.otr, 'c5') + txt(F, 300, p.otr, 'OTR capacity', 'small', 'start', 0, -5);
      if (qmax > 0 && qmax < 20000) s += vline(F, qmax, 'c2') + dot(F, qmax, p.otr, 'c2');
      s += close();
      return { svg: s, info: `OD = Q·ΔCOD − M_ex + (4.57 + 0.24)·N_nitr − 2.86·N_denit + Q·C_L with N_nitr = Q·TKN − i_N·M_ex (i_N = 0.06) → **OD = ${a.toFixed(4)}·Q − ${b.toFixed(0)}** [kg/d]. Set OD = OTR → **Q_max ≈ ${num(qmax, 0)} m³/d**.` };
    },
  });

  G.def('stripping', {
    title: 'Stripping tower: operating line vs equilibrium line', topic: 't08',
    ctrls: [
      { k: 'S', l: 'Stripping factor S = H·Q_G/Q_L =', min: 0.3, max: 5, step: 0.05, v: 2, f: (v) => v.toFixed(2) },
      { k: 'eta', l: 'Target removal =', min: 0.5, max: 0.99, step: 0.01, v: 0.95, f: (v) => Math.round(v * 100) + ' %' },
    ],
    draw(p) {
      const ce = 1 - p.eta;
      const F = frame({ x: [0, 1.05], y: [0, 1.25], xl: L('water concentration C_L / C_{L,0}'), yl: L('gas  C_G / (H·C_{L,0})') });
      let s = open(F) + fpath(F, (x) => x, 'c1') + txt(F, 0.95, 0.95, 'equilibrium (slope H)', 'small', 'end', -4, -6);
      const yTop = (1 - ce) / p.S;
      s += seg(F, ce, 0, 1, yTop, 'c2');
      s += txt(F, 1, yTop, 'operating line', 'small', 'end', -4, -6);
      let info;
      if (yTop > 1 + 1e-9) {
        const xs = ce / (1 - p.S);
        s += dot(F, xs, xs, 'c5', 6);
        info = `**S = ${p.S.toFixed(2)} ${p.S < 1 ? '< 1' : ''}: infeasible.** The operating line crosses the equilibrium line (pinch) → the air is saturated before the water is clean. Max. removal with this air flow ≈ **${pct(Math.min(1, p.S))}**.`;
      } else {
        const ntu = Math.abs(p.S - 1) < 1e-6 ? 1 / ce - 1 : (p.S / (p.S - 1)) * Math.log(((1 / ce) * (p.S - 1) + 1) / p.S);
        info = `Feasible: operating line stays below equilibrium. **NTU = ${ntu.toFixed(2)}** (height L = HTU·NTU). Practice: S ≈ 1.5–5. Near S = 1 the tower gets very tall.`;
      }
      s += dot(F, ce, 0, 'c2') + close();
      return { svg: s, info };
    },
  });

  G.def('nh3frac', {
    title: 'Free ammonia NH₃ share vs pH and temperature', topic: 't08',
    ctrls: [
      { k: 'ph', l: 'pH =', min: 6, max: 12, step: 0.1, v: 10, f: (v) => v.toFixed(1) },
      { k: 'T', l: 'Temperature [°C] =', min: 5, max: 80, step: 1, v: 20, f: (v) => v },
    ],
    draw(p) {
      const pka = (T) => 0.09018 + 2729.92 / (T + 273.15);
      const fr = (ph, T) => 1 / (1 + Math.pow(10, pka(T) - ph));
      const F = frame({ x: [6, 12], y: [0, 1], xl: 'pH', yl: 'NH₃ / (NH₃ + NH₄⁺)' });
      let s = open(F) + fpath(F, (x) => fr(x, 20), 'cm', { dash: true }) + fpath(F, (x) => fr(x, 60), 'cm thin', { dash: true });
      s += fpath(F, (x) => fr(x, p.T), 'c1') + dot(F, p.ph, fr(p.ph, p.T), 'c5');
      s += txt(F, 10.6, fr(10.6, 20), '20 °C', 'small', 'start', 4, 14) + txt(F, 8.4, fr(8.4, 60), '60 °C', 'small', 'end', -4, -2) + close();
      const H = 0.00077 * Math.exp(0.044 * (p.T - 25));
      return { svg: s, info: `pKₐ(${p.T} °C) = ${pka(p.T).toFixed(2)} → NH₃ share **${pct(fr(p.ph, p.T))}**. $H_{NH_3}$ = ${num(H)} → min. air/water = 1/H ≈ ${num(1 / H, 0)}. Heat helps twice: pKₐ ↓ and H ↑.` };
    },
  });

  // =====================================================================
  // 9 / 10  PARTICLES, COAGULATION, FLOCCULATION
  // =====================================================================
  const dV = (A, b, d1, d2) => (Math.abs(b - 4) < 1e-6 ? (Math.PI * A / 6) * Math.log(d2 / d1) : ((Math.PI * A) / (6 * (4 - b))) * (Math.pow(d2, 4 - b) - Math.pow(d1, 4 - b)));
  const dN = (A, b, d1, d2) => (Math.abs(b - 1) < 1e-6 ? A * Math.log(d2 / d1) : (A / (1 - b)) * (Math.pow(d2, 1 - b) - Math.pow(d1, 1 - b)));
  G.dN = dN; G.dV = dV;

  G.def('psd', {
    title: 'Particle size distribution: power law F_N = A·d^−β', topic: 't09',
    ctrls: [
      { k: 'la', l: 'log A (raw water) =', min: 3, max: 9, step: 0.1, v: 7, f: (v) => v.toFixed(1) },
      { k: 'b', l: 'β (raw water) =', min: 1.5, max: 5, step: 0.1, v: 3, f: (v) => v.toFixed(1) },
    ],
    init: () => ({ tf: 1, tb: 0, cut: 0, steps: [] }),
    acts: [
      { l: 'Filter: all ÷10', f: (s) => { s.tf /= 10; s.steps.push('filter ÷10 (A ÷ 10, β same)'); } },
      { l: 'Flocculate', f: (s) => { s.tb -= 0.5; s.steps.push('flocculation (β − 0.5, volume kept)'); } },
      { l: 'Settle > 20 µm', f: (s) => { s.cut = 20; s.steps.push('sedimentation removes > 20 µm'); } },
      { l: 'Reset', f: (s) => { s.tf = 1; s.tb = 0; s.cut = 0; s.steps = []; } },
    ],
    draw(p) {
      const A = Math.pow(10, p.la), b = p.b, b2 = Math.max(0.6, b + p.tb);
      let A2 = A * p.tf;
      if (p.tb) A2 = A2 * dV(A, b, 1, 100) / dV(A, b2, 1, 100);
      const F = frame({ x: [0.5, 200], xlog: true, y: [1e-3, 1e10], ylog: true, xl: 'particle diameter d [µm]', yl: L('F_N [#/(mL·µm)]') });
      let s = open(F) + fpath(F, (d) => A * Math.pow(d, -b), 'c1');
      if (p.steps.length) s += fpath(F, (d) => (p.cut && d > p.cut ? NaN : A2 * Math.pow(d, -b2)), 'c2');
      s += legend(F, [['c1', 'raw water'], ['c2', 'after treatment']], F.W - 120, F.pt + 4) + close();
      const nR = dN(A, b, 1, 10), nT = p.steps.length ? dN(A2, b2, 1, Math.min(10, p.cut || 10)) : nR;
      const vR = dV(A, b, 1, 100), vT = p.steps.length ? dV(A2, b2, 1, p.cut || 100) : vR;
      const dom = `β = ${b.toFixed(1)}: number dominated by **${b > 1 ? 'small' : 'large'}**, surface by **${b > 3 ? 'small' : 'large'}**, volume/mass by **${b > 4 ? 'small' : 'large'}** particles.`;
      const tr = p.steps.length ? ` After ${p.steps.join(' + ')}: removal by number (1–10 µm) **${pct(1 - nT / nR)}**, by volume (1–100 µm) **${pct(1 - vT / vR)}**.` : '';
      return { svg: s, info: dom + tr };
    },
  });

  G.def('collision', {
    title: 'Collision frequency β of a particle with partners of size d_j', topic: 't10',
    ctrls: [
      { k: 'di', l: 'Particle d_i [µm] =', min: 0.1, max: 20, step: 0.1, v: 2, f: (v) => v.toFixed(1) },
      { k: 'G', l: 'Velocity gradient G [1/s] =', min: 1, max: 200, step: 1, v: 50, f: (v) => v },
    ],
    draw(p) {
      const T = 293.15, mu = 1.002e-3, dr = 1600, di = p.di * 1e-6;
      const bm = (dj) => ((2 * G.kB * T) / (3 * mu)) * (1 / di + 1 / dj) * (di + dj);
      const bM = (dj) => (p.G / 6) * Math.pow(di + dj, 3);
      const bD = (dj) => ((Math.PI * dr * 9.81) / (72 * mu)) * Math.pow(di + dj, 3) * Math.abs(di - dj);
      const F = frame({ x: [0.01, 100], xlog: true, y: [1e-21, 1e-10], ylog: true, xl: 'partner diameter d_j [µm]', yl: L('β [m³/s]') });
      let s = open(F) + fpath(F, (d) => bm(d * 1e-6), 'c1') + fpath(F, (d) => bM(d * 1e-6), 'c2') + fpath(F, (d) => bD(d * 1e-6), 'c3', { n: 400 });
      s += vline(F, p.di, 'cm') + legend(F, [['c1', 'Brownian (micro)'], ['c2', 'shear (macro)'], ['c3', 'diff. sedimentation']], F.pl + 8, F.pt + 4) + close();
      const eq1 = (8 * G.kB * T) / (3 * mu), eq2 = (4 / 3) * p.G * Math.pow(di, 3);
      return { svg: s, info: `Equal sizes: $\\beta_\\mu = 8k_BT/(3\\mu)$ = ${num(eq1)} m³/s (size independent) vs $\\beta_M = \\tfrac43 G d^3$ = ${num(eq2)} m³/s → **${eq2 > eq1 ? 'macro (shear)' : 'micro (Brownian)'} dominates**. Differential sedimentation is zero for equal sizes.` };
    },
  });

  G.def('dlvo', {
    title: 'Why colloids are stable: the energy barrier', topic: 't10',
    ctrls: [{ k: 'li', l: 'Ionic strength I [mol/L] = 10^', min: -4, max: -0.5, step: 0.1, v: -3, f: (v) => v.toFixed(1) + '  → ' + num(Math.pow(10, v)) }],
    draw(p) {
      const I = Math.pow(10, p.li), kinv = 0.304 / Math.sqrt(I);
      const R = (x) => 40 * Math.exp(-x / kinv), A = (x) => -8 / x;
      const F = frame({ x: [0.2, 30], y: [-25, 40], xl: 'distance between surfaces [nm]', yl: 'interaction energy (arb.)', yt: [-20, 0, 20, 40] });
      let s = open(F) + hline(F, 0, 'cm') + fpath(F, R, 'c3', { dash: true }) + fpath(F, A, 'c1', { dash: true }) + fpath(F, (x) => R(x) + A(x), 'c2');
      let mx = -1e9;
      for (let x = 0.3; x < 30; x += 0.05) mx = Math.max(mx, R(x) + A(x));
      s += legend(F, [['c3', 'double-layer repulsion'], ['c1', 'van der Waals attraction'], ['c2', 'net energy']], F.W - 160, F.pt + 4) + close();
      return { svg: s, info: `Double-layer thickness $\\kappa^{-1} \\approx 0.30/\\sqrt{I}$ = **${num(kinv)} nm**. ${mx > 1 ? `Energy barrier ≈ ${mx.toFixed(0)} (arb.) → **stable** suspension.` : '**No barrier left** → particles coagulate (double-layer compression).'} More / higher-charged counter-ions (Al³⁺ ≫ Ca²⁺ ≫ Na⁺) compress the layer.` };
    },
  });

  G.def('coagdose', {
    title: 'Residual turbidity vs coagulant dose (4 mechanisms)', topic: 't10',
    ctrls: [{ k: 'm', l: 'Mechanism', type: 'sel', v: 'b', opts: [['a', '(a) double-layer compression'], ['b', '(b) charge neutralisation'], ['c', '(c) sweep floc'], ['d', '(d) bridging (polymer)']] }],
    draw(p) {
      const sig = (x, x0, w) => 1 / (1 + Math.exp(-(x - x0) / w));
      const curves = {
        a: (x) => 1 - 0.9 * sig(x, 3, 0.35),
        b: (x) => 1 - 0.9 * sig(x, 2.5, 0.25) + 0.9 * sig(x, 5, 0.3),
        c: (x) => 1 - 0.9 * sig(x, 2.2, 0.25) + 0.85 * sig(x, 4, 0.3) - 0.9 * sig(x, 7, 0.35),
        d: (x) => 1 - 0.88 * sig(x, 2.2, 0.25) + 0.8 * sig(x, 5.5, 0.4),
      };
      const text = {
        a: 'Counter-ions compress the double layer. Works only at high ionic strength; **no restabilisation** (cannot overdose). Al³⁺ ≫ Ca²⁺ ≫ Na⁺.',
        b: 'Positive hydrolysed Al/Fe species or cationic polymers adsorb and neutralise the charge. **Narrow optimum**; overdose → charge reversal → **restabilisation**. Dose ∝ particle surface.',
        c: 'High Al/Fe dose precipitates Al(OH)₃/Fe(OH)₃, which **enmeshes** particles. Robust, independent of charge; good for clean water with few particles.',
        d: 'Long polymer chains bind several particles. **Overdose** coats every particle → steric restabilisation.',
      };
      const F = frame({ x: [0, 9], y: [0, 1.2], xl: 'coagulant dose →', yl: 'residual turbidity', xticks: false, yticks: false });
      let s = open(F) + fpath(F, curves[p.m], 'c1') + close();
      return { svg: s, info: text[p.m] };
    },
  });

  // =====================================================================
  // 11  SEDIMENTATION
  // =====================================================================
  G.def('settler', {
    title: 'Ideal settler (type I): removal vs particle size', topic: 't11',
    ctrls: [
      { k: 'vc', l: 'Overflow rate v_c = Q/A [m/h] =', min: 0.1, max: 10, step: 0.1, v: 1.5, f: (v) => v.toFixed(1) },
      { k: 'rho', l: 'Particle density [kg/m³] =', min: 1020, max: 2650, step: 10, v: 1200, f: (v) => v },
      { k: 'T', l: 'Temperature [°C] =', min: 5, max: 30, step: 1, v: 15, f: (v) => v },
    ],
    draw(p) {
      const mu = G.mu(p.T), rw = G.rho(p.T);
      const vs = (d) => ((9.81 * (p.rho - rw) * Math.pow(d * 1e-6, 2)) / (18 * mu)) * 3600;
      const dc = Math.sqrt((18 * mu * (p.vc / 3600)) / (9.81 * (p.rho - rw))) * 1e6;
      const F = frame({ x: [1, 500], xlog: true, y: [0, 105], xl: 'particle diameter [µm]', yl: 'removal [%]' });
      let s = open(F) + fpath(F, (d) => Math.min(1, vs(d) / p.vc) * 100, 'c1') + vline(F, dc, 'c5') + txt(F, dc, 104, 'd_c', 'small', 'middle', 0, 10) + close();
      return { svg: s, info: `Stokes: $v_s = g(\\rho_p-\\rho_w)d^2/(18\\mu)$. Particles with $v_s \\ge v_c$ → 100 %; smaller ones → fraction $v_s/v_c$. Critical diameter **$d_c$ = ${num(dc)} µm**. **Depth does not appear** — only $Q/A$. Cold water (higher µ) settles slower.` };
    },
  });

  G.def('flux', {
    title: 'Solids flux & state point analysis (secondary clarifier)', topic: 't11',
    ctrls: [
      { k: 'v0', l: 'Vesilind v₀ [m/h] =', min: 4, max: 25, step: 0.5, v: 18, f: (v) => v.toFixed(1) },
      { k: 'lam', l: 'Vesilind λ [m³/kg] =', min: 0.2, max: 0.9, step: 0.01, v: 0.35, f: (v) => v.toFixed(2) },
      { k: 'X', l: 'MLSS X_in [kg/m³] =', min: 1, max: 7, step: 0.1, v: 4, f: (v) => v.toFixed(1) },
      { k: 'Q', l: 'Inflow Q [m³/h] =', min: 200, max: 2500, step: 10, v: 1200, f: (v) => v },
      { k: 'QR', l: 'Return sludge Q_R [m³/h] =', min: 50, max: 1500, step: 5, v: 385, f: (v) => v },
      { k: 'QW', l: 'Waste sludge Q_W [m³/h] =', min: 0, max: 60, step: 1, v: 15, f: (v) => v },
      { k: 'A', l: 'Clarifier area A [m²] =', min: 50, max: 1200, step: 5, v: 480, f: (v) => v },
    ],
    draw(p) {
      const sfg = (x) => p.v0 * x * Math.exp(-p.lam * x);
      const QU = p.QR + p.QW, XR = ((p.Q + p.QR) * p.X) / QU, SFin = ((p.Q + p.QR) * p.X) / p.A, SOR = (p.Q - p.QW) / p.A;
      const peak = sfg(1 / p.lam);
      const ymax = Math.max(peak * 1.35, Math.min(SFin * 1.1, peak * 3));
      const F = frame({ x: [0, 16], y: [0, ymax], xl: L('solids concentration X [kg/m³]'), yl: L('solids flux [kg/(m²·h)]') });
      let s = open(F) + fpath(F, sfg, 'c1', { n: 240 });
      s += seg(F, 0, 0, 16, SOR * 16, 'c2') + seg(F, 0, SFin, XR, 0, 'c3');
      const okII = SOR < p.v0 * Math.exp(-p.lam * p.X);
      let okI = true, aI = 0;
      for (let x = p.X; x <= XR; x += (XR - p.X) / 300 || 1) {
        if (SFin - (QU / p.A) * x > sfg(x) + 1e-9) okI = false;
        aI = Math.max(aI, ((p.Q + p.QR) * p.X - QU * x) / sfg(x));
      }
      const aII = (p.Q - p.QW) / (p.v0 * Math.exp(-p.lam * p.X));
      s += dot(F, p.X, SOR * p.X, okII ? 'ok' : 'bad', 6) + dot(F, XR, 0, 'c3', 4);
      s += legend(F, [['c1', L('gravity flux SF_g = v_s(X)·X')], ['c2', 'SOR line (slope (Q−Q_W)/A)'], ['c3', 'underflow line']], F.W - 190, F.pt + 4) + close();
      const amin = Math.max(aI, aII);
      return {
        svg: s,
        info: `$X_R = (Q+Q_R)X_{in}/(Q_R+Q_W)$ = **${XR.toFixed(2)} kg/m³** · $SF_{in}$ = ${SFin.toFixed(1)} · SOR = ${SOR.toFixed(2)} m/h.\n` +
          `SHC II (state point below curve): **${okII ? '✓ ok' : '✗ violated'}** · SHC I (underflow line never above curve): **${okI ? '✓ ok' : '✗ violated'}**.\n` +
          `Minimum area: SHC II ${aII.toFixed(0)} m², SHC I ${aI.toFixed(0)} m² → **A ≥ ${amin.toFixed(0)} m²** (${aI > aII ? 'thickening (SHC I) governs' : 'clarification (SHC II) governs'}).`,
      };
    },
  });

  // =====================================================================
  // 12  FILTRATION
  // =====================================================================
  G.def('yao', {
    title: 'Yao model: single-collector transport efficiency η', topic: 't12',
    ctrls: [
      { k: 'dc', l: 'Grain d_c [mm] =', min: 0.2, max: 2, step: 0.05, v: 0.5, f: (v) => v.toFixed(2) },
      { k: 'vf', l: 'Filtration rate v_F [m/h] =', min: 1, max: 20, step: 0.5, v: 10, f: (v) => v.toFixed(1) },
      { k: 'T', l: 'Temperature [°C] =', min: 5, max: 30, step: 1, v: 15, f: (v) => v },
      { k: 'rp', l: 'Particle density [kg/m³] =', min: 1010, max: 2650, step: 10, v: 1050, f: (v) => v },
    ],
    draw(p) {
      const mu = G.mu(p.T), rw = G.rho(p.T), T = p.T + 273.15, dc = p.dc / 1000, v = p.vf / 3600;
      const eI = (d) => 1.5 * Math.pow(d / dc, 2);
      const eG = (d) => ((p.rp - rw) * 9.81 * d * d) / (18 * mu * v);
      const eD = (d) => 4 * Math.pow((3 * Math.PI * mu * d * dc * v) / (G.kB * T), -2 / 3);
      const tot = (d) => eI(d) + eG(d) + eD(d);
      const F = frame({ x: [0.01, 100], xlog: true, y: [1e-5, 1], ylog: true, xl: 'particle diameter d_p [µm]', yl: 'transport efficiency η' });
      let s = open(F);
      s += fpath(F, (d) => eD(d * 1e-6), 'c1', { dash: true }) + fpath(F, (d) => eI(d * 1e-6), 'c2', { dash: true }) + fpath(F, (d) => eG(d * 1e-6), 'c3', { dash: true });
      s += fpath(F, (d) => tot(d * 1e-6), 'c4 thick');
      let dmin = 1, emin = 1e9;
      for (let e = -2; e <= 2; e += 0.01) { const d = Math.pow(10, e); const t = tot(d * 1e-6); if (t < emin) { emin = t; dmin = d; } }
      s += dot(F, dmin, emin, 'c5') + legend(F, [['c1', L('diffusion η_D')], ['c2', L('interception η_I')], ['c3', L('sedimentation η_G')], ['c4', 'total η']], F.W - 128, F.pt + 4) + close();
      const L2 = (2 * dc * Math.log(100)) / (3 * 0.6 * tot(1e-6));
      return { svg: s, info: `**Minimum at d_p ≈ ${num(dmin)} µm** (η = ${num(emin)}): too big for diffusion, too small for interception/sedimentation → bacteria & Crypto pass most easily. At 1 µm a 2-log bed (ε 0.4, α 1) would need L ≈ ${num(L2)} m.` };
    },
  });

  function ergun(d, v, L, eps, kv, ki, T) {
    const mu = G.mu(T), rho = G.rho(T);
    const vis = (kv * mu * Math.pow(1 - eps, 2) * L * v) / (rho * 9.81 * Math.pow(eps, 3) * d * d);
    const ine = (ki * (1 - eps) * L * v * v) / (Math.pow(eps, 3) * 9.81 * d);
    return [vis, ine];
  }
  G.ergun = ergun;

  G.def('filterrun', {
    title: 'Filter run: breakthrough t_B vs head-loss limit t_HL (22S-1 fits)', topic: 't12',
    ctrls: [
      { k: 'd', l: 'Grain size d [mm] =', min: 0.5, max: 1.6, step: 0.01, v: 0.74, f: (v) => v.toFixed(2) },
      { k: 'vf', l: 'Filtration rate v_F [m/h] =', min: 5, max: 20, step: 0.5, v: 14, f: (v) => v.toFixed(1) },
      { k: 'c0', l: 'Influent solids C₀ [mg/L] =', min: 0.5, max: 5, step: 0.1, v: 2.4, f: (v) => v.toFixed(1) },
      { k: 'L', l: 'Bed depth L [m] =', min: 1, max: 3, step: 0.1, v: 1.9, f: (v) => v.toFixed(1) },
      { k: 'hm', l: 'Available head h_L,max [m] =', min: 1, max: 4, step: 0.1, v: 2.5, f: (v) => v.toFixed(1) },
    ],
    draw(p) {
      const [vi, ie] = ergun(p.d / 1000, p.vf / 3600, p.L, 0.6, 220, 4.3, 20);
      const h0 = vi + ie, sB = 800 * Math.pow(p.d, -0.8), kHL = 0.002 * Math.pow(p.d, -0.7);
      const tB = (sB * p.L) / (p.vf * p.c0), tHL = ((p.hm - h0) * p.L) / (kHL * p.vf * p.c0);
      const tmax = Math.max(10, Math.max(tB, tHL) * 1.35);
      const F = frame({ x: [0, tmax], y: [0, p.hm * 1.25], xl: 'run time [h]', yl: 'head loss [m]' });
      let s = open(F) + fpath(F, (t) => h0 + (kHL * p.vf * p.c0 * t) / p.L, 'c1') + hline(F, p.hm, 'c5');
      s += vline(F, tB, 'c3') + txt(F, tB, p.hm * 1.25, 't_B', 'small', 'middle', 0, 10) + vline(F, tHL, 'c2') + txt(F, tHL, p.hm * 1.25, 't_HL', 'small', 'middle', 0, 22);
      s += hline(F, h0, 'cm') + txt(F, tmax, h0, 'h_L0 (Ergun)', 'small', 'end', -2, -4) + close();
      const lim = tB < tHL ? 'breakthrough' : 'head loss';
      return { svg: s, info: `Ergun at d = ${p.d.toFixed(2)} mm: $h_{L0}$ = **${h0.toFixed(2)} m** (viscous ${vi.toFixed(2)} + inertial ${ie.toFixed(2)}). $\\sigma_B = 800d^{-0.8}$ = ${sB.toFixed(0)} mg/L → **t_B = ${tB.toFixed(1)} h**; $k_{HL} = 0.002d^{-0.7}$ = ${kHL.toFixed(5)} → **t_HL = ${tHL.toFixed(1)} h**. Run = **${Math.min(tB, tHL).toFixed(1)} h, limited by ${lim}**. Coarser grains: $t_B$ ↓, $t_{HL}$ ↑.` };
    },
  });

  // =====================================================================
  // 13 / 14  MEMBRANES
  // =====================================================================
  G.def('ufres', {
    title: 'UF: resistances in series from flux measurements', topic: 't13',
    ctrls: [
      { k: 'j0', l: 'New membrane, clean water J₀ [L/(m²h)] =', min: 50, max: 800, step: 5, v: 420, f: (v) => v },
      { k: 'p0', l: '… at ΔP [bar] =', min: 0.1, max: 1.5, step: 0.05, v: 0.6, f: (v) => v.toFixed(2) },
      { k: 'je', l: 'Fouled, before cleaning J_end =', min: 5, max: 400, step: 5, v: 85, f: (v) => v },
      { k: 'pe', l: '… at ΔP [bar] =', min: 0.1, max: 1.5, step: 0.05, v: 0.5, f: (v) => v.toFixed(2) },
      { k: 'ja', l: 'After backflush J_after =', min: 10, max: 700, step: 5, v: 280, f: (v) => v },
      { k: 'pa', l: '… at ΔP [bar] =', min: 0.1, max: 1.5, step: 0.05, v: 0.45, f: (v) => v.toFixed(2) },
      { k: 'T', l: 'Temperature of all tests [°C] =', min: 5, max: 25, step: 1, v: 20, f: (v) => v },
    ],
    draw(p) {
      const mu = G.mu(p.T), k = (J, P) => (P * 1e5) / (mu * (J / 3.6e6));
      const km = k(p.j0, p.p0), kt = k(p.je, p.pe), kmi = k(p.ja, p.pa);
      const ki = Math.max(0, kmi - km), kr = Math.max(0, kt - kmi);
      const tot = km + ki + kr, W = 360, H = 150, x0 = 20, x1 = 340, sc = (x1 - x0) / tot;
      let s = `<svg class="plot" viewBox="0 0 ${W} ${H}">`;
      let x = x0;
      [[km, 'c1', 'κ_m membrane'], [ki, 'c3', 'κ_irr'], [kr, 'c2', 'κ_rev']].forEach((b, i) => {
        const w = b[0] * sc;
        s += `<rect class="bar ${b[1]}" x="${x}" y="40" width="${Math.max(0, w)}" height="44"/>`;
        if (w > 30) s += `<text class="barl" x="${x + w / 2}" y="67" text-anchor="middle">${L(b[2].replace('κ_', 'κ_{').replace(/ .*/, '') + '}')}</text>`;
        x += w;
      });
      s += `<text class="lb" x="${x0}" y="28">total resistance when fouled = ${num(tot)} m⁻¹</text>`;
      s += `<text class="small" x="${x0}" y="104">■ membrane ${pct(km / tot)}   ■ irreversible ${pct(ki / tot)}   ■ reversible ${pct(kr / tot)}</text>`;
      s += `<text class="small" x="${x0}" y="124">J must be in m/s, ΔP in Pa: κ = ΔP/(µ·J)</text></svg>`;
      const dom = kr >= ki && kr >= km ? 'the **reversible** fouling → backflush more often / longer' : ki >= km ? 'the **irreversible** fouling → pretreatment (coagulation), chemicals in backflush, CIP' : 'the **membrane** itself → choose a more permeable membrane';
      return { svg: s, info: `$\\kappa_m$ = ${num(km)} · $\\kappa_m+\\kappa_{irr}$ (after backflush) = ${num(kmi)} → $\\kappa_{irr}$ = **${num(ki)}** · $\\kappa_{tot}$ = ${num(kt)} → $\\kappa_{rev}$ = **${num(kr)}** m⁻¹. Largest share: ${dom}. Defaults = exam 15S-4.` };
    },
  });

  G.def('ufsaw', {
    title: 'UF operation: flux saw-tooth with backflush and chemical cleaning', topic: 't13',
    ctrls: [
      { k: 'rev', l: 'Reversible fouling rate =', min: 0.2, max: 3, step: 0.1, v: 1.2, f: (v) => v.toFixed(1) },
      { k: 'irr', l: 'Irreversible fouling rate =', min: 0, max: 0.5, step: 0.02, v: 0.12, f: (v) => v.toFixed(2) },
    ],
    draw(p) {
      const F = frame({ x: [0, 14], y: [0, 1.05], xl: 'time [d]  (backflush daily, chemical cleaning on day 7)', yl: L('J / J_0') });
      const flux = (t) => {
        const tr = t - Math.floor(t);
        const cyc = t < 7 ? t : t - 7;
        const perm = 0.03 * t;
        return 1 / (1 + p.rev * tr + p.irr * Math.floor(cyc) + perm);
      };
      let s = open(F) + fpath(F, flux, 'c1', { n: 1400 }) + vline(F, 7, 'c5') + txt(F, 7, 1.05, 'CIP', 'small', 'middle', 0, 10) + close();
      return { svg: s, info: 'Each **backflush** removes the hydraulically reversible fouling (saw teeth). The baseline still drifts down (hydraulically irreversible) until **chemical cleaning** restores most of it; what stays is **irreversible** (permanent).' };
    },
  });

  G.def('ro', {
    title: 'RO concentration polarisation: β = C_M/C_F = exp(J_W/k_L)', topic: 't14',
    ctrls: [
      { k: 'J', l: 'Water flux J_W [L/(m²h)] =', min: 5, max: 60, step: 1, v: 20, f: (v) => v },
      { k: 'v', l: 'Cross-flow velocity v [m/s] =', min: 0.02, max: 0.5, step: 0.01, v: 0.1, f: (v) => v.toFixed(2) },
      { k: 'h', l: 'Channel height h [mm] (d_H = 2h) =', min: 0.3, max: 1.2, step: 0.05, v: 0.6, f: (v) => v.toFixed(2) },
      { k: 'bmax', l: 'Allowed β before gypsum scales =', min: 1.02, max: 2, step: 0.01, v: 1.16, f: (v) => v.toFixed(2) },
    ],
    draw(p) {
      const D = 1.5e-9, rho = 998, mu = 1e-3, lam = 0.42, dH = (2 * p.h) / 1000;
      const Re = (rho * p.v * dH) / mu, Sc = mu / (rho * D), kL = lam * (D / dH) * Math.sqrt(Re) * Math.cbrt(Sc);
      const J = p.J / 3.6e6, beta = Math.exp(J / kL);
      const F = frame({ x: [0, 1], y: [0.9, Math.max(1.6, beta * 1.12)], xl: 'distance from membrane (boundary layer → bulk)', yl: L('C / C_F'), xticks: false });
      let s = open(F) + fpath(F, (x) => Math.exp((J / kL) * (1 - x)), 'c1') + hline(F, p.bmax, beta > p.bmax ? 'bad' : 'c3');
      s += txt(F, 0.98, p.bmax, 'scaling limit', 'small', 'end', 0, -4) + dot(F, 0, beta, beta > p.bmax ? 'bad' : 'ok') + close();
      return { svg: s, info: `Re = ${Re.toFixed(0)}, Sc = ${Sc.toFixed(0)} → Mariñas–Urama $k_L$ = ${num(kL)} m/s → **β = ${beta.toFixed(3)}**: ${beta > p.bmax ? '**scaling at the membrane!** Lower the flux or raise the cross-flow.' : 'no scaling.'} π at the membrane = β·π_F. Higher J or lower v → larger β.` };
    },
  });

  // =====================================================================
  // 15  ACTIVATED CARBON
  // =====================================================================
  G.def('isotherm', {
    title: 'Freundlich isotherm with PAC operating line', topic: 't15',
    ctrls: [
      { k: 'mode', l: 'Experiment', type: 'sel', v: 'pac', opts: [['pac', 'PAC dosed into contaminated water'], ['des', 'Loaded PAC into clean water (desorption)']] },
      { k: 'K', l: 'K [mg/g·(L/mg)^{1/n}] =', min: 2, max: 60, step: 1, v: 20, f: (v) => v },
      { k: 'n', l: '1/n =', min: 0.1, max: 1, step: 0.05, v: 0.5, f: (v) => v.toFixed(2) },
      { k: 'c0', l: 'C₀ [mg/L] =', min: 1, max: 40, step: 0.5, v: 10, f: (v) => v.toFixed(1) },
      { k: 'D', l: 'Carbon per volume M/V [g/L] =', min: 0.02, max: 5, step: 0.01, v: 0.6, f: (v) => v.toFixed(2) },
    ],
    draw(p) {
      const q = (c) => p.K * Math.pow(Math.max(c, 0), p.n);
      const q0 = q(p.c0);
      const F = frame({ x: [0, p.c0 * 1.05], y: [0, q0 * 1.3], xl: 'dissolved C [mg/L]', yl: 'loading q [mg/g]' });
      let s = open(F) + fpath(F, q, 'c1');
      let info;
      if (p.mode === 'pac') {
        const ce = bisect((c) => q(c) - (p.c0 - c) / p.D, 1e-9, p.c0);
        s += seg(F, p.c0, 0, ce, q(ce), 'c2') + dot(F, ce, q(ce), 'c2') + dot(F, p.c0, q0, 'c3') + txt(F, p.c0, q0, 'GAC: q(C₀)', 'small', 'end', -6, -6);
        info = `Operating line from $(C_0, 0)$ with slope $-V/M$ hits the isotherm at **C_e = ${num(ce)} mg/L** (removal ${pct(1 - ce / p.c0)}), q_e = ${num(q(ce))} mg/g. PAC only reaches **q(C_e)**; a GAC bed reaches **q(C₀) = ${num(q0)} mg/g** → GAC needs less carbon.`;
      } else {
        const qs = q0;
        const ce = bisect((c) => q(c) - (qs - c / p.D), 1e-9, qs * p.D);
        s += seg(F, 0, qs, ce, q(ce), 'c2') + dot(F, 0, qs, 'c3') + dot(F, ce, q(ce), 'c2');
        info = `Carbon loaded at $q_0$ = ${num(qs)} mg/g, put into clean water: line from **(0, q₀)** with slope $-V/M$ → C = **${num(ce)} mg/L**; released **${pct((ce / p.D) / qs)}** of the adsorbed mass.`;
      }
      s += close();
      return { svg: s, info };
    },
  });

  G.def('mtz', {
    title: 'GAC column: mass transfer zone moving through the bed', topic: 't15',
    ctrls: [
      { k: 't', l: 'Time (× ideal breakthrough time) =', min: 0, max: 1.3, step: 0.01, v: 0.6, f: (v) => v.toFixed(2) },
      { k: 'lm', l: 'MTZ length [m] (bed 4 m) =', min: 0, max: 3, step: 0.1, v: 2, f: (v) => v.toFixed(1) },
    ],
    draw(p) {
      const Lb = 4, zc = Lb * p.t, half = p.lm / 2;
      const prof = (z) => (half < 1e-6 ? (z < zc ? 1 : 0) : Math.max(0, Math.min(1, (zc + half - z) / (2 * half))));
      const F = frame({ x: [0, Lb], y: [0, 1.05], xl: 'depth in the bed [m]  (inflow at 0)', yl: L('C / C_0') });
      let s = open(F) + `<rect class="zone z3" x="${F.sx(0)}" y="${F.pt}" width="${Math.max(0, F.sx(Math.min(Lb, Math.max(0, zc - half))) - F.sx(0))}" height="${F.H - F.pt - F.pb}"/>`;
      s += fpath(F, prof, 'c1', { n: 400 }) + vline(F, Lb, 'c5') + close();
      const tb = (Lb - half) / Lb, used = (Lb - half) / Lb;
      const out = prof(Lb);
      return { svg: s, info: `Shaded = saturated carbon (in equilibrium with C₀). First breakthrough when the MTZ front reaches the outlet: $t_{bk} = (L - L_{MTZ}/2)/v_{MTZ}$ = **${tb.toFixed(2)}×** the ideal time; only ${pct(used)} of the bed is used → $CUR_{real} = CUR_{min}\\cdot L/(L - L_{MTZ}/2)$ = ×${(1 / used).toFixed(2)}. Outlet now: C/C₀ = ${out.toFixed(2)}. Fix: lead–lag (2 columns in series).` };
    },
  });

  G.def('pacgac', {
    title: 'PAC vs GAC carbon demand: D_PAC / CUR_GAC', topic: 't15',
    ctrls: [
      { k: 'n', l: 'Freundlich 1/n =', min: 0.1, max: 1, step: 0.05, v: 0.5, f: (v) => v.toFixed(2) },
      { k: 'f', l: 'GAC MTZ penalty L/(L − L_MTZ/2) =', min: 1, max: 2, step: 0.01, v: 1, f: (v) => v.toFixed(2) },
    ],
    draw(p) {
      const ratio = (eta, n) => (eta) / Math.pow(1 - eta, n);
      const F = frame({ x: [0, 0.999], y: [0.1, 1000], ylog: true, xl: 'removal η = 1 − C_e/C₀', yl: 'PAC dose / GAC use' });
      let s = open(F) + hline(F, p.f, 'c5');
      [0.2, 0.5, 1].forEach((n) => { s += fpath(F, (e) => ratio(e, n), 'cm thin', { n: 300 }); });
      s += fpath(F, (e) => ratio(e, p.n), 'c1', { n: 300 });
      const be = bisect((e) => ratio(e, p.n) - p.f, 0.001, 0.998);
      s += dot(F, be, p.f, 'c5') + close();
      return { svg: s, info: `$\\frac{D_{PAC}}{CUR_{GAC}} = \\frac{1 - C_e/C_0}{(C_e/C_0)^{1/n}}$. Break-even at **η ≈ ${pct(be)}** — below it PAC needs less carbon, above it GAC wins (99 % with 1/n = 0.5 → ×${(0.99 / Math.pow(0.01, 0.5)).toFixed(1)}).` };
    },
  });

  // =====================================================================
  // SCHEMATIC DIAGRAMS (static)
  // =====================================================================
  const svgOpen = (W, H) => `<svg class="plot diag" viewBox="0 0 ${W} ${H}"><defs>${ARROW}</defs>`;
  const arrow = (x1, y1, x2, y2, cls) => `<line class="ln ${cls || 'cm'}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#ar)"/>`;
  const box = (x, y, w, h, t, cls) => `<rect class="dbox ${cls || ''}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>` + (t ? `<text class="lb" x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle">${t}</text>` : '');

  G.def('dg_reactors', {
    title: 'Batch · PFR · CSTR', topic: 't00', diagram: true,
    draw() {
      let s = svgOpen(360, 170);
      s += box(14, 30, 90, 70, '', 'water') + `<text class="lb" x="59" y="22" text-anchor="middle">Batch</text><text class="small" x="59" y="70" text-anchor="middle">C(t) falls</text><text class="small" x="59" y="84" text-anchor="middle">with time</text>`;
      s += box(124, 45, 120, 40, '', 'water') + `<text class="lb" x="184" y="22" text-anchor="middle">PFR</text>` + arrow(110, 65, 124, 65) + arrow(244, 65, 258, 65);
      for (let i = 0; i < 6; i++) s += `<rect x="${128 + i * 19}" y="49" width="16" height="32" rx="2" class="parcel" style="opacity:${1 - i * 0.14}"/>`;
      s += `<text class="small" x="184" y="104" text-anchor="middle">parcels = little batch reactors</text>`;
      s += box(266, 30, 80, 70, '', 'water') + `<text class="lb" x="306" y="22" text-anchor="middle">CSTR</text><text class="small" x="306" y="66" text-anchor="middle">C = C_out</text><text class="small" x="306" y="80" text-anchor="middle">everywhere</text>`;
      s += `<path class="ln c2" d="M286,48 q20,-12 40,0 q-20,12 -40,0"/>`;
      s += `<text class="small" x="180" y="140" text-anchor="middle">1st order: PFR e^(−kτ) · CSTR 1/(1+kτ) · rate in a CSTR at EFFLUENT conditions</text></svg>`;
      return { svg: s };
    },
  });

  G.def('dg_settler', {
    title: 'Ideal horizontal settler: why only Q/A counts', topic: 't11', diagram: true,
    draw() {
      let s = svgOpen(360, 190);
      s += `<rect class="dbox water" x="40" y="40" width="280" height="100" rx="4"/>` + arrow(12, 60, 40, 60, 'c2') + arrow(320, 60, 350, 60, 'c2');
      s += `<text class="small" x="12" y="52">Q</text><text class="small" x="330" y="52">Q</text>`;
      s += `<line class="ln c1" x1="44" y1="44" x2="316" y2="138"/><line class="ln c3" x1="44" y1="44" x2="316" y2="96" stroke-dasharray="5 4"/>`;
      s += `<line class="ln c1" x1="60" y1="12" x2="82" y2="12"/><text class="small" x="88" y="15">v_s = v_c: reaches the floor just at the outlet</text>`;
      s += `<line class="ln c3" x1="60" y1="27" x2="82" y2="27" stroke-dasharray="5 4"/><text class="small" x="88" y="30">v_s &lt; v_c: caught only if it enters low enough</text>`;
      s += `<text class="lb" x="180" y="164" text-anchor="middle">time to cross = h / v_s,  residence time = h·A / Q</text>`;
      s += `<text class="lb" x="180" y="182" text-anchor="middle">caught if v_s ≥ h / τ = Q/A = v_c   (h cancels!)</text></svg>`;
      return { svg: s };
    },
  });

  G.def('dg_tower', {
    title: 'Counter-current stripping tower', topic: 't08', diagram: true,
    draw() {
      let s = svgOpen(360, 220);
      s += `<rect class="dbox" x="140" y="30" width="80" height="160" rx="8"/>`;
      for (let i = 0; i < 7; i++) s += `<line class="ln cm thin" x1="146" y1="${46 + i * 20}" x2="214" y2="${56 + i * 20}"/>`;
      s += arrow(60, 40, 140, 40, 'c1') + `<text class="small" x="20" y="34">water in C_L,0</text>`;
      s += arrow(140, 182, 60, 182, 'c1') + `<text class="small" x="20" y="200">water out C_L,e</text>`;
      s += arrow(300, 182, 220, 182, 'c2') + `<text class="small" x="244" y="200">air in C_G,0 ≈ 0</text>`;
      s += arrow(220, 40, 300, 40, 'c2') + `<text class="small" x="240" y="34">air out C_G,e ≤ H·C_L,0</text>`;
      s += `<text class="lb" x="180" y="116" text-anchor="middle">packing</text><text class="small" x="180" y="214" text-anchor="middle">S = H·Q_G/Q_L must be ≥ 1;  L = HTU·NTU</text></svg>`;
      return { svg: s };
    },
  });

  G.def('dg_pushpull', {
    title: 'In-situ iron removal (push–pull)', topic: 't03', diagram: true,
    draw() {
      let s = svgOpen(360, 190);
      s += `<rect class="dbox ground" x="10" y="60" width="340" height="110" rx="4"/>`;
      s += `<rect class="dbox" x="88" y="20" width="14" height="130"/><rect class="dbox" x="258" y="20" width="14" height="130"/>`;
      s += `<text class="lb" x="95" y="14" text-anchor="middle">PUSH</text><text class="lb" x="265" y="14" text-anchor="middle">PULL</text>`;
      s += `<ellipse class="zone z3" cx="95" cy="118" rx="70" ry="34"/><ellipse class="zone z1" cx="265" cy="118" rx="70" ry="34"/>`;
      s += arrow(95, 30, 95, 100, 'c2') + arrow(102, 118, 150, 118, 'c2') + arrow(88, 118, 40, 118, 'c2');
      s += arrow(320, 118, 275, 118, 'c3') + arrow(210, 118, 255, 118, 'c3') + arrow(265, 100, 265, 30, 'c3');
      s += `<text class="small" x="95" y="160" text-anchor="middle">O₂ water → Fe²⁺ oxidised,</text><text class="small" x="95" y="172" text-anchor="middle">Fe(OH)₃ coats grains</text>`;
      s += `<text class="small" x="265" y="160" text-anchor="middle">Fe²⁺ adsorbs on coating →</text><text class="small" x="265" y="172" text-anchor="middle">Fe-free water pumped</text>`;
      s += `<text class="small" x="180" y="52" text-anchor="middle">E = V_pull/V_push = 4·[O₂]_inj/[Fe²⁺] (molar)</text></svg>`;
      return { svg: s };
    },
  });

  G.def('dg_gac', {
    title: 'GAC column: saturated zone, MTZ, fresh carbon', topic: 't15', diagram: true,
    draw() {
      let s = svgOpen(360, 220);
      s += `<rect class="dbox" x="130" y="20" width="100" height="180" rx="6"/>`;
      s += `<rect class="zone z3" x="132" y="22" width="96" height="70"/><rect class="zone z1" x="132" y="92" width="96" height="50"/>`;
      s += `<text class="small" x="180" y="60" text-anchor="middle">saturated</text><text class="small" x="180" y="72" text-anchor="middle">q = q(C₀)</text>`;
      s += `<text class="small" x="180" y="120" text-anchor="middle">MTZ</text><text class="small" x="180" y="172" text-anchor="middle">fresh GAC</text>`;
      s += arrow(180, 2, 180, 20, 'c2') + arrow(180, 200, 180, 218, 'c2');
      s += arrow(250, 92, 250, 130, 'c5') + `<text class="small" x="258" y="112">v_MTZ = v·C₀/(ρ_b·q(C₀))</text>`;
      s += `<text class="small" x="12" y="60">EBCT = L/v</text><text class="small" x="12" y="76">CUR_min = C₀/q(C₀)</text><text class="small" x="12" y="150">breakthrough when the</text><text class="small" x="12" y="162">MTZ front reaches the outlet</text></svg>`;
      return { svg: s };
    },
  });

  G.def('dg_ro', {
    title: 'RO mass balance', topic: 't14', diagram: true,
    draw() {
      let s = svgOpen(360, 170);
      s += `<rect class="dbox" x="110" y="30" width="140" height="90" rx="6"/><line class="ln c5" x1="112" y1="88" x2="248" y2="88" stroke-dasharray="6 3"/>`;
      s += arrow(20, 58, 110, 58, 'c1') + `<text class="small" x="18" y="50">feed Q_F, C_F</text>`;
      s += arrow(250, 58, 340, 58, 'c3') + `<text class="small" x="262" y="50">concentrate Q_C, C_C</text>`;
      s += arrow(180, 120, 180, 160, 'c2') + `<text class="small" x="190" y="150">permeate Q_P, C_P</text>`;
      s += `<text class="small" x="180" y="80" text-anchor="middle">membrane (dense)</text>`;
      s += `<text class="small" x="12" y="104">r = Q_P/Q_F</text><text class="small" x="12" y="118">C_C ≈ C_F/(1−r)</text><text class="small" x="12" y="132">R = 1 − C_P/C_F</text></svg>`;
      return { svg: s };
    },
  });

  G.def('dg_twofilm', {
    title: 'Two-film theory', topic: 't06', diagram: true,
    draw() {
      let s = svgOpen(360, 180);
      s += `<rect class="zone z2" x="20" y="20" width="160" height="130"/><rect class="dbox water" x="180" y="20" width="160" height="130"/>`;
      s += `<line class="ln cm" x1="150" y1="20" x2="150" y2="150" stroke-dasharray="4 4"/><line class="ln c5" x1="180" y1="20" x2="180" y2="150"/><line class="ln cm" x1="215" y1="20" x2="215" y2="150" stroke-dasharray="4 4"/>`;
      s += `<path class="ln c1" d="M20,40 L150,40 L180,52 M180,96 L215,128 L340,128"/>`;
      s += `<text class="small" x="30" y="36">C_G (gas bulk)</text><text class="small" x="150" y="168" text-anchor="middle">δ_G</text><text class="small" x="198" y="168" text-anchor="middle">δ_L</text>`;
      s += `<text class="small" x="186" y="92">C_G/H at interface</text><text class="small" x="240" y="122">C_L (water bulk)</text>`;
      s += `<text class="small" x="30" y="70">gas film</text><text class="small" x="225" y="56">water film</text></svg>`;
      return { svg: s };
    },
  });

  G.def('dg_wwtp', {
    title: 'Activated sludge + secondary clarifier: the flows', topic: 't11', diagram: true,
    draw() {
      let s = svgOpen(360, 190);
      s += box(60, 40, 110, 60, 'aeration tank', 'water') + `<path class="dbox water" d="M220,40 h90 v40 l-45,30 l-45,-30 z"/>`;
      s += arrow(10, 70, 60, 70, 'c1') + `<text class="small" x="12" y="62">Q</text>`;
      s += arrow(170, 70, 220, 70, 'c1') + `<text class="small" x="172" y="62">Q+Q_R, X_in</text>`;
      s += arrow(310, 52, 352, 52, 'c1') + `<text class="small" x="314" y="44">Q−Q_W</text>`;
      s += `<line class="ln c3" x1="265" y1="110" x2="265" y2="150"/>` + arrow(265, 150, 115, 150, 'c3') + arrow(115, 150, 115, 100, 'c3');
      s += `<text class="small" x="140" y="166">return Q_R, X_R</text>` + arrow(265, 150, 340, 150, 'c5') + `<text class="small" x="300" y="170">waste Q_W</text>`;
      s += `<text class="small" x="180" y="186" text-anchor="middle">X_R = (Q+Q_R)·X_in/(Q_R+Q_W)  ·  SOR = (Q−Q_W)/A</text></svg>`;
      return { svg: s };
    },
  });
})();
