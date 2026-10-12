(function () {
  const R = String.raw;
  PE.topic({
    id: 't08', n: 8, title: 'Stripping: tower, stripping factor, NH₃', short: 'Stripping', grp: 'gas', pri: 'A', spick: '§8',
    exams: ['15S-2', '16S-4', '16W-2', '18S-3', '23W-3'],
    oneMin: R`Reverse aeration: a counter-current **packed tower** blows a volatile compound out of the water. **How much air?** → stripping factor **S = H·Q_G/Q_L ≥ 1** (practice 1.5–5). **How tall?** → **L = HTU·NTU**. Ammonia twist: only free **NH₃** is volatile → raise the pH (NaOH, or cheaper: **strip CO₂ first**) and the temperature. NaOH keeps C_T constant, CO₂ stripping keeps Alk constant.`,
    learn: [
      {
        h: '🗼 Counter-current tower',
        g: 'dg_tower',
        f: [
          { m: R`Q_G\,(C_{G,e} - C_{G,0}) = Q_L\,(C_{L,0} - C_{L,e})`, u: 'g/s', w: 'mass balance over the tower' },
          { m: R`\left(\frac{Q_G}{Q_L}\right)_{min} = \frac{1}{H}, \qquad \boxed{S = H\,\frac{Q_G}{Q_L}}`, u: '-', w: 'S = slope of equilibrium line (H) / slope of operating line (Q_L/Q_G)' },
        ],
        li: ['**Why S ≥ 1?** For S < 1 the air at the top reaches equilibrium with the inflow before the water is clean (operating line hits the equilibrium line) – no full removal however tall the tower.', 'Min. air-to-water ratio: CO₂ 0.91, H₂S 2.6, benzene 5.3, **NH₃ 1800**; practically strippable if H ≥ 10⁻⁴ (old note said "<" – wrong).'],
      },
      { g: 'stripping' },
      {
        h: '📏 Tower height',
        f: [
          { m: R`L = HTU\cdot NTU, \quad HTU = \frac{Q_L}{K_La\,A}`, u: 'm', w: 'A = tower cross-section; good packing (high K_La) → small HTU' },
          { m: R`NTU = \frac{S}{S - 1}\ln\left[\frac{(C_{L,0}/C_{L,e})(S - 1) + 1}{S}\right]`, u: '-', w: 'difficulty of the separation: high removal and S close to 1 → large NTU' },
          { m: R`\frac{C_0}{C_e} = \frac{S\,e^{NTU(S - 1)/S} - 1}{S - 1}`, u: '-', w: 'inverse: a 2nd compound in the same tower (NTU₂ = L/HTU₂, S₂ = S₁·H₂/H₁) – 15S-2c' },
          { m: R`X = \frac{K_La\,A\,L}{H\,Q_G}`, u: '-', w: 'X ≪ 1: mass transfer limits → better packing · X ≫ 1: air limits → more Q_G (15S-2d)' },
        ],
        li: ['Equilibrium stages: C₁ = Y_e/H, Y₂ = Y_e − (Q/Q_air)(C₀ − C₁) – stair steps between equilibrium and operating line.'],
      },
      {
        h: '💨 Ammonia stripping',
        g: 'nh3frac',
        f: [
          { m: R`f_{NH_3} = \frac{1}{1 + 10^{\text{p}K_a - \text{pH}}}, \quad \text{pH} = \text{p}K_a + \log\frac{f}{1 - f}`, u: '-', w: 'pKa 9.25 (25 °C), 8.3 (60 °C); 18S-3a: 70 % → pH 9.72' },
          { m: R`H_{NH_3} = 0.00077\,e^{0.044(T - 25)}`, u: '-', w: 'heat helps twice: pKa ↓ and H ↑' },
        ],
        li: [
          'pH 10: 80 % NH₃ (20 °C) → 98 % (60 °C); pH 9: 28 % → 84 %; pH 8: 4 % → 34 %.',
          '**Why high air flow, not high K_La?** H tiny → X ≫ 1 → the air saturates at once → removal = Q_G·H·C_L.',
          'Chain: (CO₂ stripper) → NaOH → NH₃ stripper → acid scrubber 2 NH₃ + H₂SO₄ → (NH₄)₂SO₄ (fertiliser, pH ~5). Kloten/Opfikon first full-scale plant.',
          R`Min. acid: ½ mol H₂SO₄ per mol N, volume = n·M/(w·ρ) (16S-4c). **More acid** is needed because the scrubber pH must stay low so NH₃ stays bound as NH₄⁺ (16S-4d).`,
          R`NH₃ lost in an aeration tank: off-gas at equilibrium → load = Q_G·H·[NH₃] vs inflow load (19S-4c: 0.1 % → negligible at pH 6.3).`,
        ],
      },
      {
        h: '🧾 Recipe: NaOH demand vs CO₂ pre-stripping',
        rec: [
          R`Start (pH₀): HCO₃⁻ ≈ Alk − [NH₃]₀; $C_T = $ HCO₃⁻·(1 + 10^{pK₁ − pH₀}) (+CO₃²⁻ if pH high).`,
          R`**NaOH** ($C_T$ const.): $\text{Alk}_{end} = C_T(\alpha_1 + 2\alpha_2) + [\text{NH₃}] + [\text{OH⁻}]$ at pH_end → ΔNaOH = Alk_end − Alk₀ (23W-3a).`,
          R`**CO₂ stripping** (Alk const.): $C_{T,end} = \frac{\text{Alk}_0 - [\text{NH₃}]_{end} - [\text{OH⁻}]}{\alpha_1 + 2\alpha_2}$ → ΔCO₂ = C_T,0 − C_T,end (23W-3b).`,
          R`Max. pH if **all** CO₂ is removed: Alk = [NH₃] (+OH⁻) → pH = pKa + log(Alk/(N_T − Alk)) (16S-4a: 10.14).`,
        ],
        li: [
          'NaOH saved by pre-stripping = NaOH demand without pre-stripping for the same target pH (18S-3d: 55 mM).',
          'Benefits of CO₂ pre-stripping: saves NaOH (cost, salt), CO₂ strips easily (H ≈ 1 → ~2000× less air than NH₃), lowers the buffer.',
          R`Air for the NH₃ stripper: $Q_G = \eta\,N_T\,Q_L/C_{G,e}$, then check $S = HQ_G/Q_L$ (1.5–5 realistic, 23W-3c: 2.1).`,
        ],
        trap: 'Alk at high pH includes **[NH₃]** and [OH⁻], and CO₃²⁻ counts **twice** (α₁ + 2α₂, not α₁ + α₂).',
      },
      {
        h: '📝 Worked examples',
        ex: { t: '23W-3: NaOH or CO₂ stripping to reach pH 11?', s: [
          'Start pH 7: NH₃ 0.22, HCO₃⁻ ≈ 69.8, H₂CO₃ = 69.8·10^(−0.7) = 13.9 → **C_T ≈ 83.7 mol/m³** (dummy 90).',
          'pH 11 (pK₂ 10.4): α₁ = 0.20, α₂ = 0.80 → α₁ + 2α₂ = 1.80; NH₃ = 39.3; OH⁻ = 1.',
          'a) NaOH: Alk_end = 83.7·1.80 + 39.3 + 1 = 191 → **ΔNaOH ≈ 121 mol/m³**.',
          'b) CO₂: C_T,end = (70 − 39.3 − 1)/1.80 = 16.5 → **ΔCO₂ ≈ 67 mol/m³**.',
          'c) Q_G = 0.95·40·100/0.01 = **380 000 m³/d**; S = 0.00056·380 000/100 = **2.1** → realistic.',
        ] },
      },
      {
        ex: { t: '15S-2: one tower, two compounds (PCE, DCP)', s: [
          'PCE: Q_G/Q_L = S/H = 20/0.364 = 55 → Q_G = 5.5 m³/s; NTU = (20/19)·ln((20·19 + 1)/20) = 3.10; HTU = 0.1/(0.0077·7.07) = 1.84 m → **L = 5.7 m**.',
          'DCP: **S = 0.0525·55 = 2.9**; HTU = 3.14 m → NTU = 1.81 → C₀/C_e = 4.47 → **77.6 %** stripped.',
          'X_DCP = 0.63, X_PCE = 0.16 → both < 1 → **mass transfer limits**: improve K_La (packing), not air.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Stripping factor', b: R`$S = H\,Q_G/Q_L$ = what the air can carry / what the water brings. Need S ≥ 1, practice 1.5–5.` },
      { t: 'card', f: 'Minimum air-to-water ratio', b: R`$(Q_G/Q_L)_{min} = 1/H$ (S = 1): CO₂ 0.91, benzene 5.3, NH₃ 1800.` },
      { t: 'card', f: 'Why can S < 1 never strip completely?', b: 'The operating line crosses the equilibrium line: the air saturates with the inflow concentration before the water is clean.' },
      { t: 'card', f: 'Tower height', b: R`$L = HTU\cdot NTU$, $HTU = Q_L/(K_La\,A)$.` },
      { t: 'card', f: 'NTU formula', b: R`$NTU = \frac{S}{S-1}\ln\frac{(C_0/C_e)(S-1) + 1}{S}$.` },
      { t: 'card', f: 'More air or better packing? Criterion', b: R`$X = K_La\,A\,L/(H\,Q_G)$: X ≪ 1 → raise K_La; X ≫ 1 → raise Q_G.` },
      { t: 'card', f: 'Strippability threshold', b: 'H ≥ 10⁻⁴ (below that the required air volume becomes absurd).' },
      { t: 'card', f: 'NH₃ share at pH 10 / 9 / 8 (20 °C vs 60 °C)', b: '80 → 98 % · 28 → 84 % · 4 → 34 %.' },
      { t: 'card', f: 'pKa of NH₄⁺ at 25 °C and 60 °C', b: '9.25 and 8.3.' },
      { t: 'card', f: 'Why is high air flow more important than high K_La for NH₃?', b: 'H is tiny → X ≫ 1 → the air leaves saturated; removal = Q_G·H·C_L grows only with Q_G.' },
      { t: 'card', f: 'NaOH dosing vs CO₂ stripping: which quantity stays constant?', b: 'NaOH: C_T constant (Alk rises). CO₂ stripping: Alk constant (C_T drops).' },
      { t: 'card', f: 'Maximum pH if all CO₂ is stripped from supernatant', b: R`Alk = [NH₃] (+OH⁻) → $\text{pH} = \text{p}K_a + \log(\text{Alk}/(N_T - \text{Alk}))$.` },
      { t: 'card', f: 'Benefits of CO₂ pre-stripping', b: 'Saves NaOH (cost, salt), CO₂ is easy to strip (~2000× less air than NH₃), lowers the buffer capacity.' },
      { t: 'card', f: 'Acid scrubber chemistry and minimum acid', b: '2 NH₃ + H₂SO₄ → (NH₄)₂SO₄; ½ mol H₂SO₄ per mol N – in practice more to keep the pH low.' },
      { t: 'card', f: 'Air flow of an NH₃ stripper from an off-gas concentration', b: R`$Q_G = \eta\,N_T\,Q_L/C_{G,e}$, then check S = H·Q_G/Q_L.` },

      { t: 'mcq', q: 'A tower is designed with S = 0.6 for chloroform. What follows?', a: ['Complete removal is impossible; the air saturates first', 'The tower must be 0.6× shorter', 'Removal 60 % per transfer unit', 'X ≪ 1, so increase K_La'], x: 'S < 1 → pinch. Max removal ≈ S.' },
      { t: 'mcq', q: 'Same tower, second compound with lower H. Its stripping factor …', a: ['is lower: S₂ = S₁·H₂/H₁', 'is the same (same Q_G/Q_L)', 'is higher', 'cannot be determined'], x: '15S-2b: S_DCP = 20·0.0525/0.364 = 2.9.' },
      { t: 'mcq', q: '15S-2d: X_DCP = 0.63, X_PCE = 0.16. Better lever?', a: ['Increase the mass transfer coefficient (packing)', 'Increase the air flow', 'Raise the temperature only', 'Make the tower narrower'], x: 'X < 1 → K_La limits for both.' },
      { t: 'mcq', q: 'Raising digester supernatant (Alk 70, NH_tot 40 mM) to pH 11 with NaOH needs ≈ 121 mol/m³. Why so much?', a: ['Most of the base converts HCO₃⁻ to CO₃²⁻ (the carbonate buffer)', 'NaOH volatilises', 'NH₄⁺ consumes 3 OH⁻ each', 'Because Alk counts OH⁻ twice'], x: 'C_T ≈ 84 mM and α₁ + 2α₂ = 1.8 at pH 11.' },
      { t: 'mcq', q: 'How much NaOH does CO₂ pre-stripping save (18S-3d)?', a: ['The whole NaOH demand for the same target pH (if stripping alone reaches it)', 'Half of the demand', 'Exactly the CO₂ stripped', 'Nothing – Alk is constant'], x: '18S-3: 55 mmol/L.' },
      { t: 'mcq', q: 'Why does the scrubber need more H₂SO₄ than ½ mol per mol NH₃?', a: ['The pH must stay low so NH₃ stays bound as NH₄⁺ and is not stripped again', 'H₂SO₄ evaporates', 'Sulfate precipitates as gypsum', 'Ammonium sulfate is acidic'], x: '16S-4d.' },
      { t: 'mcq', q: '19S-4c: urine nitrification reactor at pH 6.3, 4000 mg N/L, pKa 9.4. Is NH₃ stripping by the aeration substantial?', a: ['No – NH₃ is only ~0.08 % of N; off-gas load ≈ 0.1 % of the input', 'Yes – all ammonia leaves with the air', 'Yes – X ≫ 1 means complete stripping', 'Cannot be judged without K_La'], x: 'Load = Q_G·H·[NH₃] ≈ 1 g/d vs 1200 g/d.' },
      { t: 'mcq', q: '23W-3c: Q_G = 380 000 m³/d for Q_L = 100 m³/d, H = 0.00056. Is it realistic?', a: ['Yes, S = 2.1 lies in 1.5–5', 'No, S must be exactly 1', 'No, S = 0.21 < 1', 'Yes, because Q_G ≫ Q_L always'], x: '' },
      { t: 'mcq', g: 'stripping', gp: { S: 0.8, eta: 0.95 }, q: 'The plot shows S = 0.8 and 95 % target. What does the red point mark?', a: ['The pinch: operating line meets equilibrium – target unreachable', 'The design point of the tower', 'The air inlet', 'The optimum S'], x: 'Max removal ≈ 80 % with this air flow.' },

      { t: 'trend', q: 'Ammonia stripper: temperature raised from 20 to 60 °C. What happens to …', r: [['pKa of NH₄⁺', -1], ['NH₃ share at the same pH', 1], ['H_NH₃', 1], ['air needed', -1]], x: 'Heat helps twice.' },
      { t: 'trend', q: 'Tower: air flow increased (S ↑) at constant removal. What happens to …', r: [['NTU', -1], ['tower height', -1], ['blower energy', 1]], x: 'Above S ≈ 5 extra air buys little height.' },
      { t: 'trend', q: 'Better packing (K_La ↑). What happens to …', r: [['HTU', -1], ['NTU', 0], ['tower height', -1]], x: 'NTU depends only on S and the removal.' },
      { t: 'trend', q: 'CO₂ is stripped from supernatant (no NaOH). What happens to …', r: [['alkalinity', 0], [R`$C_T$`, -1], ['pH', 1], ['NaOH needed afterwards', -1]], x: '' },

      { t: 'factor', q: 'S = H·Q_G/Q_L: H doubles (warmer water), same air. S …', a: ['×2', '×½', '×4', '×1'], x: '' },
      { t: 'factor', q: 'HTU = Q_L/(K_La·A): tower diameter doubles. HTU …', a: ['×¼', '×½', '×2', '×4'], x: 'A ∝ d².' },
      { t: 'factor', q: 'Min. air per water for NH₃ compared with CO₂ …', a: ['×2000', '×20', '×200', '×2'], x: '1/0.00056 vs 1/1.07.' },

      { t: 'gap', q: 'Stripping factor', f: R`$$S = ▢\cdot\frac{Q_G}{Q_L}$$`, a: [R`$H$`, R`$1/H$`, R`$K_La$`, R`$NTU$`], x: '' },
      { t: 'gap', q: 'Height of a transfer unit', f: R`$$HTU = \frac{Q_L}{▢}$$`, a: [R`$K_La\cdot A$`, R`$K_La$`, R`$H\,Q_G$`, R`$S\,A$`], x: '' },
      { t: 'gap', q: 'Alkalinity at the target pH (NaOH case)', f: R`$$\text{Alk}_{end} = C_T\,(▢) + [\text{NH₃}] + [\text{OH⁻}]$$`, a: [R`$\alpha_1 + 2\alpha_2$`, R`$\alpha_1 + \alpha_2$`, R`$\alpha_0 + \alpha_1$`, R`$2\alpha_1 + \alpha_2$`], x: 'CO₃²⁻ carries 2 equivalents.' },
      { t: 'gap', q: 'pH for a given NH₃ fraction f', f: R`$$\text{pH} = \text{p}K_a + \log ▢$$`, a: [R`$\frac{f}{1-f}$`, R`$\frac{1-f}{f}$`, R`$f$`, R`$\frac{1}{f}$`], x: '18S-3a: 9.35 + log(0.7/0.3) = 9.72.' },

      { t: 'order', q: 'NaOH demand vs CO₂ stripping (23W-3, 16W-2, 18S-3): order', s: ['C_T at the start: HCO₃⁻ ≈ Alk − NH₃, H₂CO₃ from pK₁', 'At the target pH: α₁, α₂, [NH₃], [OH⁻]', 'NaOH case: Alk_end = C_T(α₁ + 2α₂) + NH₃ + OH → ΔNaOH = Alk_end − Alk₀', 'CO₂ case: C_T,end = (Alk₀ − NH₃ − OH)/(α₁ + 2α₂) → ΔCO₂ = C_T,0 − C_T,end'], x: '' },
      { t: 'order', q: 'Tower design for a target compound (15S-2a): order', s: ['Q_G/Q_L = S/H → Q_G', 'NTU from S and C₀/C_e', 'HTU = Q_L/(K_La·A)', 'L = HTU·NTU'], x: '5.7 m in 15S-2.' },

      { t: 'bug', q: '16S-4a: Alk 44 mM, NH_tot 52 mM, pKa 9.4. Max pH after stripping all CO₂?', s: ['After stripping all carbonate, Alk = [NH₃] = 44 mM (Alk unchanged)', 'NH₄⁺ = 52 − 44 = 8 mM', 'pH = 9.4 + log(8/44) = 8.66'], w: 2, fix: 'pH = pKa + log(NH₃/NH₄⁺) = 9.4 + log(44/8) = **10.14** (official).' },
      { t: 'bug', q: '23W-3b: reach pH 11 by CO₂ stripping only (Alk 70, NH₃ at pH 11 = 39.3, OH⁻ = 1, α₁ + 2α₂ = 1.8, C_T,0 = 83.7).', s: ['Alk stays 70 mol/m³', 'C_T,end = (70 − 39.3 − 1)/(α₁ + α₂) = 29.7 mol/m³', 'ΔCO₂ = 83.7 − 29.7 = 54 mol/m³'], w: 1, fix: 'Divide by α₁ + **2**α₂ = 1.8: C_T,end = 16.5 → ΔCO₂ = **67 mol/m³**.' },

      { t: 'match', q: 'Match the quantity with its role in tower design', p: [['S = H·Q_G/Q_L', 'Is there enough air? (≥ 1)'], ['NTU', 'How hard is the separation?'], ['HTU', 'How good is the mass transfer?'], ['X = K_La·A·L/(H·Q_G)', 'Air or K_La as the lever?']], x: '' },
    ],
  });
})();
