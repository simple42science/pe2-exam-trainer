(function () {
  const R = String.raw;
  PE.topic({
    id: 't14', n: 14, title: 'Membranes II: reverse osmosis', short: 'Reverse osmosis', grp: 'mem', pri: 'A', spick: '§14',
    exams: ['14W-4', '15W-4', '16S-3', '16W-4', '17S-1', '23W-1', '19S-2'],
    oneMin: R`RO membranes are **dense**: water dissolves and diffuses through, ions stay. First overcome the **osmotic pressure π = φ·ΣC·R·T** (count all particles: NaCl = 2!). Water flux grows with pressure, salt flux does not → more pressure = purer permeate. **Concentration polarisation** β = C_M/C_F = e^(J_W/k_L) makes everything worse (scaling!), with k_L from Mariñas–Urama and **d_H = 2 × channel height**.`,
    learn: [
      {
        h: '🧂 Osmotic pressure & fluxes',
        g: 'dg_ro',
        f: [
          { m: R`\boxed{\pi = \phi\sum_i C_i\,R\,T}`, u: 'bar', w: 'C_i of **all** dissolved particles (NaCl → 2, MgCl₂ → 3, CaSO₄ → 2) in mol/L; R = 0.08314 L·bar/(mol·K); φ = 1 ideal, 0.85–0.93 seawater; ≈ 0.8 bar per g/L NaCl, seawater ≈ 25 bar' },
          { m: R`J_W = k_W(\Delta P - \Delta\pi), \quad \Delta\pi = \pi_M - \pi_P`, u: 'L/(m^2 h)', w: 'π at the **membrane** (with CP: π_M = β·π_F)' },
          { m: R`J_S = k_S\,(C_M - C_P), \qquad C_P = J_S/J_W`, u: 'g/(m^2 s)', w: 'salt flux independent of pressure → higher pressure = better quality' },
          { m: R`R_a = 1 - \frac{C_P}{C_F}, \qquad R_i = 1 - \frac{C_P}{C_M}`, u: '-', w: 'apparent < intrinsic, because CP makes C_M > C_F → larger gradient → more salt passes (16W-4b)' },
          { m: R`r = \frac{Q_P}{Q_F}, \qquad C_C = C_F\frac{1 - (1 - R)r}{1 - r} \approx \frac{C_F}{1 - r}`, u: '-', w: 'recovery; concentration factor 1/(1 − r)' },
        ],
        li: ['Temperature/pressure correction of manufacturer data: J_W,S = J_W,M·TCF·NDP_S/NDP_M, TCF = 1.03^(T_S − T_M). Warmer → more water **and** more salt flux.'],
      },
      {
        h: '🌊 Concentration polarisation',
        g: 'ro',
        f: [
          { m: R`\frac{C_M - C_P}{C_F - C_P} = \exp\left(\frac{J_W}{k_L}\right), \quad k_L = \frac{D_L}{\delta}`, u: '-', w: 'film theory; J_W in **m/s**' },
          { m: R`R \approx 1:\quad \boxed{\beta = \frac{C_M}{C_F} = \exp\left(\frac{J_W}{k_L}\right)}`, u: '-', w: 'polarisation factor' },
          { m: R`k_L = \lambda\,\frac{D_L}{d_H}\,Re^{0.5}\,Sc^{1/3}, \quad Re = \frac{\rho v d_H}{\mu},\; Sc = \frac{\mu}{\rho D_L}`, u: 'm/s', w: 'Mariñas–Urama (spiral wound with spacer), λ = 0.40–0.54. Alternative Schock–Miquel: Sh = 0.065·Re^0.875·Sc^0.25 (19S-2)' },
        ],
        trap: R`$d_H$ = hydraulic diameter = 4·area/wetted perimeter. Spiral wound with only the **channel height h** given → **d_H = 2h** (only this reproduces 16W-4d and 17S-1c). If the task gives d_H directly (14W-4, 15W-4), use it.`,
        li: [
          '**Minimum cross-flow against scaling (17S-1c):** C_M,max from K_s0 (CaSO₄: √K′) → β_max = C_M,max/C_F → k_L,min = J_W/ln β_max → Re = (k_L·d_H/(λ·D·Sc^(1/3)))² → v = Re·µ/(ρ·d_H).',
          '**Scaling check:** all ions × β (and I), IAP at the membrane vs K_s0; pH ≈ bulk (15W-4c, 19S-2c).',
          'With CP the flux appears on both sides of J_W = k_W(ΔP − β·π_F) → iterate (17S-1: 45.6 L/(m²h), β = 1.15).',
        ],
      },
      {
        h: '🔗 Multi-stage systems & area',
        li: [
          'Serial (permeate 1 → feed 2): salt remaining (1 − R)² without CP; with CP C_P,i = (1 − R_i)·β_i·C_F,i (16S-3b).',
          '**Go backwards from the product:** Q_P,2 = product, Q_F,2 = Q_P,1 = Q_P,2/r₂, Q_F,1 = Q_P,1/r₁.',
          'Area per stage A_i = Q_P,i/J_W,i – convert L/(m²h) × 24 / 1000 = m/d (23W-1c).',
        ],
      },
      {
        h: '💬 Qualitative answers',
        li: [
          '**Against CP** (14W-4c): higher cross-flow (energy, bigger pumps), narrower channel (pressure drop, clogging; more compact), better spacers, lower flux (more area).',
          '**Against scaling, same module** (15W-4d): lower flux (k_L same, β ↓), higher cross-flow (Re ↑ → k_L ↑); also antiscalants, acidification (CaCO₃), lower recovery.',
          '**RO vs UF/MF:** dense, solution–diffusion, must overcome π, removes ions and small molecules; UF/MF porous, sieving, only hydraulic resistance.',
          'Concentrate disposal is a real problem for inland plants. Two stages for seawater: one stage at R = 0.9 leaves 10 % (3 g/L) – too salty.',
        ],
      },
      {
        h: '📝 Worked examples',
        ex: { t: '17S-1: industrial RO with gypsum (minimum cross-flow)', s: [
          'π: NaCl 4.8/58.44·2 = 0.164 M + CaSO₄ 0.552/136.2·2 = 0.0081 → π = 0.95·0.172·0.08314·293 = **4.0 bar**.',
          'J_W = 1.5·(35 − 4.0) = **46.5 L/(m²h)** = 1.29·10⁻⁵ m/s.',
          'C_M,max = √10^(−4.658) = 4.69 mM vs 4.05 mM → β_max = 1.157 → k_L,min = 1.29·10⁻⁵/ln 1.157 = 8.9·10⁻⁵ m/s.',
          'd_H = 2·0.6 = 1.2 mm, Sc = 668 → Re^0.5 = 19.3 → Re = 374 → **v = 0.31 m/s**. d) concentration factor 3.5 instead of 4 → **0.088 m/s**.',
        ] },
      },
      {
        ex: { t: '23W-1: two-stage seawater RO', s: [
          'π = 0.85·(30/58.5·2)·0.083·293 = **21.2 bar**.',
          'Salt left after 2 stages: (1 − 0.9)² = **1 %**.',
          'Stage 2: A₂ = 10 000/0.48 = 20 800 m²; stage 2 feed = 10 000/0.6 = 16 670 m³/d → A₁ = 16 670/0.288 = 57 900 m² → **78 700 m²**.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Osmotic pressure (van \'t Hoff with φ)', b: R`$\pi = \phi\sum C_iRT$ – count **all** particles (NaCl = 2, MgCl₂ = 3).` },
      { t: 'card', f: 'Rule of thumb for π of NaCl and seawater', b: '≈ 0.8 bar per g/L NaCl; seawater ≈ 21–25 bar.' },
      { t: 'card', f: 'Water and salt flux', b: R`$J_W = k_W(\Delta P - \Delta\pi)$; $J_S = k_S(C_M - C_P)$ (pressure independent); $C_P = J_S/J_W$.` },
      { t: 'card', f: 'Apparent vs intrinsic rejection', b: R`$R_a = 1 - C_P/C_F$ < $R_i = 1 - C_P/C_M$, because CP raises C_M.` },
      { t: 'card', f: 'Recovery and concentrate', b: R`$r = Q_P/Q_F$, $C_C \approx C_F/(1 - r)$.` },
      { t: 'card', f: 'Concentration polarisation factor', b: R`$\beta = C_M/C_F = e^{J_W/k_L}$ (R ≈ 1), J_W in m/s.` },
      { t: 'card', f: 'Mariñas–Urama correlation', b: R`$k_L = \lambda\frac{D_L}{d_H}Re^{0.5}Sc^{1/3}$, λ 0.40–0.54.` },
      { t: 'card', f: 'Hydraulic diameter of a spiral-wound channel', b: 'd_H = 2 × channel height (slit); hollow fibre: inner diameter.' },
      { t: 'card', f: 'Four bad effects of concentration polarisation', b: 'Higher π at the membrane (less flux), more salt passage, lower apparent rejection, scaling at the membrane.' },
      { t: 'card', f: 'Measures against concentration polarisation', b: 'Higher cross-flow, narrower channel, better spacers, lower flux (more area).' },
      { t: 'card', f: 'Measures against scaling with the same module', b: 'Lower flux, higher cross-flow; antiscalant, acidification, lower recovery.' },
      { t: 'card', f: 'Two serial stages without CP: salt remaining', b: '(1 − R)² – e.g. R = 0.9 → 1 %.' },
      { t: 'card', f: 'Multi-stage area: direction of the calculation', b: 'Backwards from the product: Q_F,2 = Q_P,1 = Q_P,2/r₂, then A_i = Q_P,i/J_i.' },
      { t: 'card', f: 'Minimum cross-flow chain against scaling', b: 'K_s0 → C_M,max → β_max → k_L,min = J/ln β_max → Re → v.' },

      { t: 'mcq', q: '30 g/L NaCl, fully dissociated, φ = 0.85, 293 K. Which concentration goes into π?', a: ['2 × 30/58.5 = 1.03 mol/L of particles', '30/58.5 = 0.51 mol/L', '30 g/L', '3 × 0.51 mol/L'], x: '23W-1a: 21.2 bar.' },
      { t: 'mcq', q: 'Only the channel height (0.6 mm) of the spiral-wound element is given. d_H?', a: ['1.2 mm', '0.6 mm', '0.3 mm', '2.4 mm'], x: 'Only d_H = 2h reproduces 16W-4d and 17S-1c.' },
      { t: 'mcq', q: 'Why does a higher operating pressure improve permeate quality?', a: ['J_W rises with pressure but J_S does not → C_P = J_S/J_W falls', 'Higher pressure compacts the membrane pores', 'More salt is rejected by sieving', 'π decreases with pressure'], x: '' },
      { t: 'mcq', q: '16W-4: R_i = 95 %, but measured C_P = 1.44 g/L at C_F = 25 g/L (R_a = 94 %). Why is R_a < R_i?', a: ['Concentration polarisation: C_M > C_F → larger gradient → more salt passage', 'Membrane defects', 'Temperature effect', 'Recovery is too low'], x: '16W-4b; C_M = 1.44/0.05 = 28.8 g/L.' },
      { t: 'mcq', q: '15W-4d: avoid gypsum scaling without changing the module. Two measures?', a: ['Lower the flux (β ↓) and raise the cross-flow velocity (k_L ↑)', 'Narrower channel and new spacer', 'Higher pressure and higher recovery', 'Heat the water'], x: 'Channel height and λ stay the same.' },
      { t: 'mcq', q: '23W-1c: 10 000 m³/d product, recovery 0.6 per stage. Feed of stage 2?', a: ['16 667 m³/d (= permeate of stage 1)', '6 000 m³/d', '10 000 m³/d', '27 778 m³/d'], x: 'Backwards: 10 000/0.6.' },
      { t: 'mcq', q: 'Minimum cross-flow for gypsum (17S-1c): which concentration is the limit at the membrane?', a: ['C_M,max = √K′_s0 (equimolar Ca and SO₄)', 'C_M,max = K′_s0', 'The bulk concentration', 'π_max/RT'], x: '' },
      { t: 'mcq', q: '19S-2c: is CaCO₃ precipitation at the membrane possible? Key step?', a: ['Multiply all species and I by β, compute γ (Davies) and SI at the membrane', 'Use the bulk SI', 'Only Ca is concentrated, carbonate is not', 'pH at the membrane rises by log β'], x: 'Official SI = 0.8 → supersaturated.' },
      { t: 'mcq', g: 'ro', gp: { J: 46, v: 0.1, h: 0.6, bmax: 1.16 }, q: 'With J = 46 L/(m²h) and v = 0.1 m/s the plot shows scaling. Which change helps most directly?', a: ['Raise the cross-flow velocity (k_L ↑)', 'Raise the feed pressure', 'Increase the recovery', 'Use a wider channel at the same flow'], x: 'Or lower the flux.' },

      { t: 'trend', q: 'Cross-flow velocity increases. What happens to …', r: [['k_L', 1], ['β', -1], ['pumping energy', 1], ['scaling risk', -1]], x: '' },
      { t: 'trend', q: 'Water flux J_W increases (same module). What happens to …', r: [['β', 1], ['C_M', 1], ['apparent rejection R_a', -1]], x: '' },
      { t: 'trend', q: 'Recovery increases. What happens to …', r: [['concentrate concentration', 1], ['scaling risk at the tail', 1], ['permeate per m³ feed', 1]], x: '' },
      { t: 'trend', q: 'Feed pressure increases. What happens to …', r: [['J_W', 1], ['J_S', 0], ['C_P', -1]], x: '(CP slightly counteracts)' },

      { t: 'factor', q: 'Recovery 75 %: concentration factor of the concentrate …', a: ['×4', '×1.33', '×3', '×7.5'], x: '1/(1 − 0.75).' },
      { t: 'factor', q: 'Mariñas–Urama: velocity ×4 → k_L …', a: ['×2', '×4', '×16', '×1.59'], x: 'k_L ∝ Re^0.5 ∝ v^0.5.' },
      { t: 'factor', q: 'NaCl concentration doubles: π …', a: ['×2', '×4', '×1.41', '×1'], x: 'π ∝ C (≈, φ almost constant).' },

      { t: 'gap', q: 'Osmotic pressure', f: R`$$\pi = \phi\cdot ▢\cdot R\,T$$`, a: [R`$\sum C_i$ (all particles)`, R`$C_{NaCl}$`, R`$\sum C_i/2$`, R`$\rho$`], x: '' },
      { t: 'gap', q: 'Polarisation factor', f: R`$$\beta = \exp\left(\frac{▢}{k_L}\right)$$`, a: [R`$J_W$`, R`$J_S$`, R`$v$`, R`$D_L$`], x: '' },
      { t: 'gap', q: 'Mariñas–Urama', f: R`$$k_L = \lambda\frac{D_L}{d_H}Re^{▢}Sc^{1/3}$$`, a: ['0.5', '0.875', '1', '1/3'], x: '0.875 is Schock–Miquel.' },
      { t: 'gap', q: 'Water flux', f: R`$$J_W = k_W\,(\Delta P - ▢)$$`, a: [R`$\Delta\pi$`, R`$\pi_F$`, R`$J_S$`, R`$\beta$`], x: 'Δπ = π_M − π_P.' },

      { t: 'order', q: 'Minimum cross-flow against scaling (17S-1c): order', s: ['π and J_W = k_W(ΔP − π)', 'C_M,max = √K′_s0 → β_max = C_M,max/C_F', 'k_L,min = J_W (m/s)/ln β_max', 'Sc = µ/(ρD), d_H = 2h', 'Re = (k_L·d_H/(λ·D·Sc^(1/3)))²', 'v = Re·µ/(ρ·d_H)'], x: '0.31 m/s.' },
      { t: 'order', q: 'Two-stage RO area (23W-1c, 16S-3c): order', s: ['Product = Q_P,2', 'A₂ = Q_P,2 / J_W,2 (J in m/d)', 'Q_P,1 = Q_F,2 = Q_P,2/r₂', 'A₁ = Q_P,1 / J_W,1', 'A_tot = A₁ + A₂'], x: '' },

      { t: 'bug', q: '14W-4b: J = 18 L/(m²h), k_L = 5.46·10⁻⁵ m/s. β?', s: ['β = exp(J_W/k_L)', 'β = exp(18/5.46·10⁻⁵)', 'β → ∞, the membrane scales'], w: 1, fix: 'J_W in m/s: 18/3.6·10⁶ = 5·10⁻⁶ → β = exp(0.092) = **1.10** → C_M,NaCl = 35.1 g/L.' },
      { t: 'bug', q: '15W-4a: lake water with 0.55 g/L CaSO₄ (136 g/mol), ideal, 20 °C. π?', s: ['C = 0.55/136 = 4.04·10⁻³ mol/L', 'Particles: CaSO₄ counts once', 'π = 4.04·10⁻³·0.08314·293 = 0.098 bar'], w: 1, fix: 'CaSO₄ → Ca²⁺ + SO₄²⁻ = 2 particles → **π = 0.197 bar** (official).' },

      { t: 'match', q: 'Match the RO term with its meaning', p: [['Recovery r', 'Q_P / Q_F'], ['Rejection R', '1 − C_P/C_F'], ['β', 'C_M / C_F'], ['NDP', 'net driving pressure ΔP − Δπ']], x: '' },
    ],
  });
})();
