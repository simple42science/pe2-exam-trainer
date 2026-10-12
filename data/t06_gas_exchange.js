(function () {
  const R = String.raw;
  PE.topic({
    id: 't06', n: 6, title: 'Gas exchange: Henry, two-film, bubbles, X criterion', short: 'Gas exchange', grp: 'gas', pri: 'B', spick: '§6',
    exams: ['14S-2', '15W-1', '17S-3', '18W-2'],
    oneMin: R`Two questions decide every aeration and stripping task: **where would it end?** (Henry: H = C_G/C_L) and **how fast?** (K_L·a). In bubbles a third: does the bubble reach equilibrium before it leaves? The **gas exchange exponent X = K_La·V/(H·Q_G)** answers it: X ≫ 1 (small H: CO₂, VOCs, NH₃, O₃) → only **air flow** matters; X ≪ 1 (large H: O₂, CH₄) → **K_La** matters (fine bubbles).`,
    learn: [
      {
        h: '⚖️ Henry: each gas has its preference',
        g: 'henry',
        f: [{ m: R`H_{YC} = \frac{C_G}{C_L}`, u: '-', w: 'O₂ 30, CH₄ 28, N₂ 60 (poorly soluble) · CO₂ 1.07, H₂S 0.36, VOCs 0.1–1 (medium) · NH₃ 0.00056 (very soluble), all at 20 °C; O₃ 3.9–4.2' }],
        li: [
          R`Temperature: H rises with T (van 't Hoff); NH₃: $H = 0.00077\,e^{0.044(T - 25)}$.`,
          R`Salt: $H_{eff} = \gamma H$, γ > 1 ("salting out", 1.27 at 20 g Cl/L).`,
          R`Water vapour: $p_{i,eff} = p_i\,(p_{tot} - p_{H_2O})/p_{tot}$.`,
        ],
        trap: 'Check the notation: H_YC [–] vs H_PC [atm·L/mol] vs K_H [mol/(L·bar)] (§0). Use H at the **water temperature** (14S-2: H given at 20 °C, plant at 25 °C!).',
      },
      {
        h: '🧱 Two-film theory & K_L',
        g: 'dg_twofilm',
        f: [
          { m: R`j = K_L\left(\frac{C_G}{H} - C_L\right) = K_L(C_S - C_L)`, u: 'g/(m^2 s)', w: '' },
          { m: R`\frac{1}{K_L} = \frac{1}{k_L} + \frac{1}{k_G H}, \quad k_L = \frac{D_L}{\delta_L},\; k_G = \frac{D_G}{\delta_G}`, u: 's/m', w: 'very soluble (NH₃): **gas film** controls, K_L ≈ k_G·H · medium/poor (O₂, CO₂, CH₄, VOCs): **water film** controls, K_L ≈ k_L' },
          { m: R`K_L = 2\sqrt{\frac{D_L}{\pi t_c}}`, u: 'm/s', w: 'penetration theory: K_L ∝ √D (two-film: ∝ D)' },
          { m: R`K_La_{VOC} = K_La_{O_2}\left(\frac{D_{VOC}}{D_{O_2}}\right)^n`, u: '1/s', w: 'n = 0.5 (packed, mechanical), 1 (diffused aeration)' },
          { m: R`k_T = \frac{K_La_{20}}{K_La_T} \approx e^{0.02(20 - T)}`, u: '-', w: 'diffusion +~3 %/°C; with a fast reaction: enhancement E = M/tanh M' },
        ],
      },
      {
        h: '🫧 The rising bubble',
        f: [
          { m: R`C_G(\tau) = H C_L + (C_{G,0} - H C_L)\exp\left(-\frac{6K_L\tau}{d_B H}\right)`, u: 'g/m^3', w: R`$\tau = h/v_B$, $A/V = 6/d_B$` },
          { m: R`X_B = \frac{6K_L h}{d_B\,v_B\,H}`, u: '-', w: R`desorption: $C_G = HC_L(1 - e^{-X_B})$ · O₂ absorption: $C_G/C_{G,0} = e^{-X_B}$` },
        ],
        g: 'bubble',
        li: ['Exercise 3 (2 mm, 0.3 m/s, 4 m, K_L = 10⁻⁴): X_B = 4/H → CH₄ 13 %, N₂O ≈ 90 % of equilibrium; O₂ bubble loses only 12.5 %.', '**Smaller bubbles / deeper injection only help gases with large H** (Ex3d).'],
      },
      {
        h: '🏊 Bubble-aerated reactor: the X criterion',
        f: [
          { m: R`V\frac{dC_L}{dt} = Q_G\,(C_{G,0} - H C_L)\,(1 - e^{-X}), \quad X = \frac{K_La\,V}{H\,Q_G}`, u: 'g/s', w: 'X compares possible transfer (K_La·V) with what the air can carry (H·Q_G)' },
          { m: R`\text{Batch desorption: } C_L = C_{L,0}\exp\left(-\frac{Q_G H (1 - e^{-X})}{V}t\right)`, u: 'g/m^3', w: 'X ≫ 1: exponent Q_G·H·t/V · X ≪ 1: K_La·t' },
          { m: R`\text{CSTR desorption: } \frac{C_L}{C_{L,in}} = \frac{1}{1 + \frac{Q_G H}{Q}(1 - e^{-X})}`, u: '-', w: '14S-2, 17S-3c' },
          { m: R`\text{CSTR absorption: } 0 = Q(C_{L,in} - C_L) + Q_G(C_{G,0} - HC_L)(1 - e^{-X}) - rV`, u: 'g/s', w: R`X ≫ 1, no reaction: $Q_G = \frac{Q\,C_L}{C_{G,0} - H C_L}$` },
        ],
        g: 'xcrit',
        li: [
          '"Well soluble, minimum gas": all gas dissolves → Q_G·C_G,0 = Q·C_L (17W-4c).',
          'Q_G < 0 → H·C_L > C_G,0: the target concentration is **impossible** with this gas – say so (22W-3c).',
          'Surface aerators: always r = K_La(C_S − C_L).',
          'Off-gas maximum: batch at t = 0 → C_G = H·C_L,0; CSTR → C_G = H·C_L,e (14S-2c).',
        ],
        tip: 'Always compute X first and **state** which simplification you use – it earns points. For 99 % removal, batch ≫ CSTR (14S-2: 11 vs 0.5 m³/d).',
      },
      {
        h: '📝 Worked example 17S-3 (benzene vs methane in an aeration tank)',
        ex: { t: 'Open the walkthrough', s: [
          'Air (standard): OD = Q·ΔCOD·(1 − Y) = 10·176·0.6 = 1056 g/d; SOTE = 7 %·1.1 = 7.7 % → Q_G = 1056/(0.077·282) = **48.6 m³/d**.',
          'K_La*: 1056/(9.08·5) = 23.3 d⁻¹ → K_La,op = 0.8·23.3/1.22 = **15.2 d⁻¹**.',
          'Benzene (H 0.11): X = 15.2·5/(0.11·48.6) = 14 ≫ 1 → removal = 1 − 1/(1 + 48.6·0.11/10) = **35 %**.',
          'Methane (H 23): X = 0.07 ≪ 1 → K_La limits. Smaller bubbles: **help CH₄, not benzene**.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Dimensionless Henry constant – definition and meaning', b: R`$H_{YC} = C_G/C_L$ at equilibrium. Large H = poorly soluble (prefers air), small H = very soluble.` },
      { t: 'card', f: 'Henry constants at 20 °C: O₂, CH₄, CO₂, NH₃, O₃', b: 'O₂ ≈ 30 · CH₄ ≈ 28 · CO₂ ≈ 1.07 · NH₃ ≈ 0.00056 · O₃ ≈ 3.9–4.2' },
      { t: 'card', f: 'How does H depend on temperature?', b: 'H increases with T for all gases (less soluble in warm water).' },
      { t: 'card', f: 'Two-film theory: overall resistance', b: R`$1/K_L = 1/k_L + 1/(k_G H)$, $k_L = D_L/\delta_L$.` },
      { t: 'card', f: 'Which film controls for NH₃, which for O₂?', b: 'NH₃ (H tiny): gas film, K_L ≈ k_G·H. O₂, CO₂, CH₄, VOCs: water film, K_L ≈ k_L.' },
      { t: 'card', f: 'Penetration vs two-film theory: dependence on D', b: 'Penetration: K_L ∝ √D; two-film: K_L ∝ D → transfer K_La between compounds with (D₁/D₂)ⁿ, n = 0.5 or 1.' },
      { t: 'card', f: 'Bubble exponent X_B', b: R`$X_B = 6K_Lh/(d_Bv_BH)$ – H in the denominator: large H = far from equilibrium.` },
      { t: 'card', f: 'Gas exchange exponent X of a tank', b: R`$X = K_La\,V/(H\,Q_G)$.` },
      { t: 'card', f: 'X ≫ 1: what simplifies and what matters?', b: R`Off-gas at equilibrium, $(1 - e^{-X}) \to 1$: $V\,dC/dt = Q_G(C_{G,0} - HC_L)$ – only **air flow** matters.` },
      { t: 'card', f: 'X ≪ 1: what simplifies and what matters?', b: R`$dC/dt = K_La(C_S - C_L)$ – **K_La** matters (fine bubbles, depth).` },
      { t: 'card', f: 'CSTR desorption formula', b: R`$C_L/C_{L,in} = 1/[1 + (Q_GH/Q)(1 - e^{-X})]$.` },
      { t: 'card', f: 'Gas flow needed for an absorbed concentration (X ≫ 1, no reaction)', b: R`$Q_G = Q\,C_L/(C_{G,0} - H\,C_L)$; negative → impossible.` },
      { t: 'card', f: 'Factors that influence gas transfer', b: 'Temperature, salinity, pressure/altitude, vapour pressure, surfactants (α), turbulence.' },

      { t: 'mcq', q: 'Bubble aeration of a tank: methane (H 28) and N₂O (H 1.7). You switch to smaller bubbles at the same air flow. Effect?', a: ['CH₄ removal improves clearly, N₂O hardly (already near equilibrium)', 'Both improve equally', 'Only N₂O improves', 'Neither changes'], x: 'Exercise 3d. X_B(N₂O) ≈ 2.4 → bubble already ~90 % saturated.' },
      { t: 'mcq', q: 'For ammonia stripping, what increases the removal most?', a: ['More air (Q_G), or heating to raise H', 'Smaller bubbles', 'Higher K_La packing', 'Deeper diffusers'], x: 'X ≫ 1: the air leaves saturated; only more air carries more NH₃.' },
      { t: 'mcq', q: '14S-2: H of benzene is given at 20 °C, the reactor runs at 25 °C. What do you do?', a: ['Use H at 25 °C (table/temperature correction)', 'Use the 20 °C value, temperature does not matter', 'Halve the value', 'Use H_PC instead'], x: 'The official solution used ≈ 0.21–0.22 (25 °C) → 10.9–11.5 m³/d.' },
      { t: 'mcq', q: 'An ozone contactor calculation gives Q_G = −7 m³/h. What does it mean?', a: ['H·C_L > C_G,0: the required dissolved ozone cannot be reached with this gas – the target is impossible', 'You made a sign error; take the absolute value', 'The ozone degasses: use 7 m³/h', 'The reactor is gas-film controlled'], x: '22W-3c: write it as an interpretation, then continue.' },
      { t: 'mcq', q: 'Which statement about the X criterion is correct?', a: ['X ≫ 1 → off-gas in equilibrium → removal set by Q_G·H', 'X ≫ 1 → K_La limits', 'X ≪ 1 → only Q_G matters', 'X does not depend on H'], x: 'X = K_La·V/(H·Q_G).' },
      { t: 'mcq', q: '"Assume ozone is a well soluble gas: minimum gas flow?" (17W-4c)', a: ['All ozone dissolves: Q_G·C_G = Q·C_L', 'Q_G = Q·C_L/(C_G − H·C_L)', 'Q_G = Q/H', 'Q_G = K_La·V/H'], x: '10 m³/h · 0.5/70 = 0.071 m³/h = 1.7 m³/d.' },
      { t: 'mcq', q: 'Why does warm water hold less CO₂ (beer goes flat)?', a: ['H rises with temperature', 'K_La falls with temperature', 'Alkalinity drops', 'Viscosity rises'], x: 'Van ’t Hoff.' },
      { t: 'mcq', q: 'Batch stripping vs CSTR for 99 % removal (same tank, X ≫ 1)?', a: ['Batch treats far more water (14S-2: ~11 vs 0.5 m³/d)', 'CSTR treats more because it runs continuously', 'Identical', 'Batch impossible because X ≫ 1'], x: 'CSTR works at the effluent concentration (1 %) all the time.' },
      { t: 'mcq', g: 'xcrit', gp: { kla: 10, q: 2 }, q: 'K_La = 10 h⁻¹, Q_G/V = 2 h⁻¹. Which gas is in the "K_La limits" region?', a: ['O₂ and CH₄', 'NH₃', 'CO₂', 'benzene'], x: 'X = 5/H: O₂ 0.17, CH₄ 0.18 → ≪ 1.' },

      { t: 'trend', q: 'Bubble aeration (O₂, X ≪ 1): bubbles become smaller at the same air flow. What happens to …', r: [['interfacial area a', 1], ['K_La', 1], ['oxygen transfer efficiency', 1]], x: 'For large H, transfer is limited by K_La.' },
      { t: 'trend', q: 'Stripping of a VOC with X ≫ 1: air flow doubles. What happens to …', r: [['removal', 1], ['X', -1], ['off-gas concentration', -1]], x: 'More air carries more VOC but each m³ is less loaded.' },
      { t: 'trend', q: 'Temperature rises (desorption). What happens to …', r: [['H', 1], ['K_La', 1], ['removal', 1]], x: 'Desorption only profits from warmth.' },
      { t: 'trend', q: 'Surfactants in wastewater. What happens to …', r: [['interfacial area a', 1], ['K_L', -1], ['α = K_La(ww)/K_La(clean)', -1]], x: 'Captured by the α factor (§7).' },

      { t: 'factor', q: 'Penetration theory: D doubles. K_L changes by …', a: ['×1.41', '×2', '×4', '×1'], x: 'K_L ∝ √D.' },
      { t: 'factor', q: 'Bubble diameter halved (same h, v_B, K_L). X_B changes by …', a: ['×2', '×½', '×4', '×1'], x: 'X_B ∝ 1/d_B.' },
      { t: 'factor', q: 'Air flow doubled, X ≫ 1, CSTR, removal low. Removal term Q_G·H/Q …', a: ['×2', '×1', '×4', '×½'], x: 'Linear in Q_G.' },

      { t: 'gap', q: 'Gas exchange exponent', f: R`$$X = \frac{K_La\,V}{▢}$$`, a: [R`$H\,Q_G$`, R`$Q_G$`, R`$H\,Q$`, R`$K_L\,a$`], x: '' },
      { t: 'gap', q: 'CSTR desorption', f: R`$$\frac{C_L}{C_{L,in}} = \frac{1}{1 + \frac{Q_G H}{Q}(▢)}$$`, a: [R`$1 - e^{-X}$`, R`$e^{-X}$`, R`$X$`, R`$1 + X$`], x: '' },
      { t: 'gap', q: 'Two-film theory', f: R`$$\frac{1}{K_L} = \frac{1}{k_L} + \frac{1}{▢}$$`, a: [R`$k_G H$`, R`$k_G/H$`, R`$k_L H$`, R`$k_G$`], x: 'Tiny H → second term dominates → gas film controls.' },
      { t: 'gap', q: 'Absorption, X ≫ 1, no reaction', f: R`$$Q_G = \frac{Q\,C_L}{▢}$$`, a: [R`$C_{G,0} - H\,C_L$`, R`$C_{G,0}$`, R`$H\,C_L$`, R`$C_{G,0} + H\,C_L$`], x: '15W-1c, 18W-2c.' },

      { t: 'order', q: 'Stripping/aeration in a CSTR (14S-2, 17S-3c): order the steps', s: ['Pick H at the operating temperature', 'Compute X = K_La·V/(H·Q_G)', 'Decide the simplification (X ≫ 1 or X ≪ 1) and write it down', 'Use the CSTR desorption formula → removal or flow', 'Interpret: air flow or K_La as the lever'], x: 'The tip box of §6.' },

      { t: 'bug', q: 'Benzene CSTR (17S-3c): Q_G = 48.6 m³/d, Q = 10 m³/d, H = 0.11, X = 14. Removal?', s: ['X ≫ 1 → 1 − e^{−X} ≈ 1', 'C/C_in = 1/(1 + K_La·V/Q) = 1/(1 + 15.2·5/10)', 'Removal = 1 − 1/8.6 = 88 %'], w: 1, fix: 'With X ≫ 1 the removal is set by the **air**: 1/(1 + Q_G·H/Q) = 1/1.53 → **35 %** (official).' },

      { t: 'match', q: 'Match the gas with its behaviour in bubble aeration', p: [['O₂ (H ≈ 30)', 'Far from equilibrium, K_La limits'], ['NH₃ (H ≈ 0.0006)', 'Air saturates at once, gas film controls'], ['CO₂ (H ≈ 1)', 'Near equilibrium, air flow matters'], ['O₃ (H ≈ 4)', 'X ≫ 1 in contactors: gas balance Q_G·(C_G − H·C_L)']], x: '' },
    ],
  });
})();
