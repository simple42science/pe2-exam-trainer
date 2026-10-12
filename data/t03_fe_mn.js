(function () {
  const R = String.raw;
  PE.topic({
    id: 't03', n: 3, title: 'Iron & manganese removal', short: 'Fe/Mn removal', grp: 'chem', pri: 'B', spick: '§3',
    exams: ['14S-1', '16S-1', '18S-4', '23W-4', '21W-2'],
    oneMin: R`Anoxic groundwater carries dissolved **Fe²⁺ and Mn²⁺**. Removal = **oxidise** (to Fe(OH)₃, MnO₂) + **separate** (filter). Iron is easy and has a **pH turbo** (rate ∝ [OH⁻]², one pH unit = 100× faster); manganese is stubborn (higher pH/redox, autocatalytic, in practice biological filters *after* the iron filter). Elegant alternative: **in-situ** push–pull removal in the aquifer, efficiency E = 4·[O₂]/[Fe].`,
    learn: [
      {
        h: '⚖️ Stoichiometry',
        tbl: [
          ['', 'Iron', 'Manganese'],
          ['O₂', '¼ mol O₂/mol Fe · 0.143 g O₂/g Fe · −2 Alk/Fe', '½ mol O₂/mol Mn · 0.29 g/g · −2 Alk/Mn'],
          ['Cl₂', '½ mol Cl₂/mol Fe · 0.64 g/g · **−3 Alk/Fe**', 'Mn²⁺ + Cl₂ + 2H₂O → MnO₂ + 2Cl⁻ + 4H⁺'],
          ['sludge', '1.91 g Fe(OH)₃ per g Fe', '1.58 g MnO₂ per g Mn'],
        ],
        li: ['4 Fe²⁺ + O₂ + 10 H₂O → 4 Fe(OH)₃ + 8 H⁺', '2 Mn²⁺ + O₂ + 2 H₂O → 2 MnO₂ + 4 H⁺', 'KMnO₄ and ClO₂ also work (classic: KMnO₄ for Mn).'],
        trap: 'Per mol Fe(II) oxidised by O₂: **2** mol alkalinity (an old summary said 36 – wrong). With Cl₂ it is 3 → stronger pH drop (18S-4d).',
      },
      {
        h: '⏱️ Kinetics of Fe(II) oxidation',
        f: [
          { m: R`-\frac{d[\text{Fe²⁺}]}{dt} = k\,[\text{Fe²⁺}]\,[\text{OH⁻}]^2\,p_{O_2}`, u: 'mol/(L min)', w: R`$k = 8\cdot10^{13}$ L²/(mol² min atm) at 20 °C; $p_{O_2}$ = partial pressure in equilibrium with the dissolved O₂` },
          { m: R`k_r = k\,[\text{OH⁻}]^2\,p_{O_2}, \quad [\text{OH⁻}] = 10^{\text{pH}-14}`, u: '1/min', w: '**pH + 1 → rate × 100**' },
          { m: R`p_{O_2} = H_{PC}\,C_L = H_{YC}\,R\,T\,C_L`, u: 'atm', w: R`O₂: $H_{YC}\approx30$; 2 g/m³ = 6.25·10⁻⁵ mol/L → p ≈ 0.045 atm` },
          { m: R`V = \frac{Q\,([\text{Fe}]_{in} - [\text{Fe}])}{k_r\,[\text{Fe}]}`, u: 'm^3', w: 'CSTR, rate at the **effluent** Fe' },
        ],
        g: 'feox',
        trap: R`Read the units of $k$: with $[\text{O}_2]$ in mol/L (21W-2) $k \approx 10^{14}$ L³/(mol³ min) and the rate becomes tiny. Without pH control the pH **drops** (Alk −2ΔFe at constant $C_T$, 14S-1c,d) and the rate collapses.`,
      },
      {
        h: '🟤 Manganese',
        f: [{ m: R`-\frac{d[\text{Mn}]}{dt} = k_1[\text{Mn}] + k_2[\text{Mn}][\text{MnO₂}]`, u: 'mol/(L min)', w: 'autocatalytic: MnO₂ already formed speeds it up' }],
        li: ['Abiotic only above pH ~8.5–9 (t½ = 7700 min at pH 8.95); catalysed by Fe oxides (37–59 min); **biological at pH 7.2: t½ ≈ 4 min**.', 'Pourbaix: Mn²⁺ stays dissolved up to much higher E_H and pH than Fe²⁺.'],
      },
      {
        h: '🏭 Filters & plant layout',
        li: [
          '**Fe(III) filter:** Fe²⁺ oxidised *before* the filter (aeration + time) → voluminous Fe(OH)₃ flocs are filtered → fast head-loss increase.',
          '**Fe(II) filter:** dissolved Fe²⁺ enters, adsorbs on Fe-oxide coatings and is oxidised there (catalytic/biological) → compact deposits, longer runs.',
          '**Biological filters:** iron bacteria pH 5.5–8, E_H > −10 mV, tolerant; manganese bacteria pH > 6.5, E_H > 250 mV (O₂ > 1.5 mg/L), **very sensitive** (inhibited by NH₄⁺, Fe²⁺, Cl₂, ClO₂) → **Mn filter after the Fe filter**.',
          'Combined plant (DVGW): well → Fe(II) filter → water spray (O₂ in, **CO₂ out** → pH ↑, Alk constant) → Mn(II) filter → network.',
          '**Accelerate oxidation:** raise pH (strip CO₂, base), stronger oxidant (Cl₂, KMnO₄, ClO₂, O₃), catalysis (MnO₂/Fe-oxide surfaces), biology, more O₂ (pure O₂).',
          'Swiss standards: Fe total 0.2 mg/L (dissolved < 0.05), Mn 0.05 mg/L (dissolved < 0.02).',
        ],
      },
      {
        h: '💧 In-situ iron removal (push–pull)',
        g: 'dg_pushpull',
        f: [
          { m: R`E = \frac{V_{pull}}{V_{push}} = \frac{4\,[\text{O₂}]_{inj}}{[\text{Fe²⁺}]_{GW}}`, u: '-', w: '**molar** concentrations; one O₂ prepares sites for 4 Fe' },
          { m: R`[\text{O₂}]_{inj} = E\left(\tfrac14[\text{Fe}] + \tfrac12[\text{Mn}] + 2[\text{NH₄⁺}]\right)`, u: 'mol/L', w: 'NH₄⁺ needs 2 O₂ per N – it kills the efficiency (Alpnach: E ≈ 1.5 instead of 10)' },
          { m: R`C_S = \frac{x_{O_2}\,p\,M}{H_{YC}\,R\,T}, \quad x_{req} = 0.21\,\frac{C_{req}}{C_{S,air}}`, u: 'g/L', w: 'saturation with a gas of O₂ fraction x' },
          { m: R`f = \frac{V_{O_2}}{V_{tot}} = \frac{x_{req} - 0.21}{0.79}, \qquad \frac{V_{O_2}}{V_{air}} = \frac{f}{1 - f}`, u: '-', w: 'mixing pure O₂ with air – **read which ratio is asked**' },
        ],
        trap: 'E is **molar**. 970 mbar = 0.957 atm (16S-1b). And V_O₂/V_tot ≠ V_O₂/V_air (18S-4b asks for the latter: 0.13).',
      },
      {
        h: '📝 Worked examples',
        ex: { t: '23W-4: in-situ with pure O₂ (Fe 8 mg/L, Mn 0.1 mg/L, 15 °C, H = 28.8)', s: [
          'a) Fe 0.1434 mM × ¼ = 0.0358; Mn 0.00182 × ½ = 0.0009 → 0.0368 mM O₂ = **1.18 mg/L**; Mn needs only **2.5 %**.',
          'b) E = 10 (Fe only): [O₂] = 10 × 0.0358 = 0.358 mM = **11.5 mg/L**.',
          'c) Air saturation: 0.21·1·32/(28.8·0.082·288.15) = 9.9 mg/L → x_req = 0.21·11.5/9.9 = 0.244 → f = (0.244 − 0.21)/0.79 = **4.3 %**.',
        ] },
      },
      {
        ex: { t: 'Exercise 4a / 14S-1a: CSTR for Fe(II) oxidation', s: [
          'pH 6.5 → [OH⁻]² = 10⁻¹⁵; p_O₂ from 2 g/m³: 30·0.08206·293·6.25·10⁻⁵ = 0.045 atm → k_r = 8·10¹³·10⁻¹⁵·0.045 = 0.0036 min⁻¹.',
          'V = Q(7 − 0.5)/(k_r·0.5) = 2.08·6.5/0.0018 ≈ **7500 m³** (at pH 7.5: 75 m³!).',
          '14S-1a: pH 7, p_O₂ 0.15 → k_r = 0.12 min⁻¹; 90 % in 1 m³ → Q = k_r·V·0.1/0.9 = 13.3 L/min ≈ **19 200 L/d**.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'O₂ demand and alkalinity for Fe(II) oxidation by O₂', b: '¼ mol O₂ per mol Fe = 0.143 g O₂/g Fe; −2 mol Alk per mol Fe.' },
      { t: 'card', f: 'O₂ demand and alkalinity for Mn(II) oxidation by O₂', b: '½ mol O₂ per mol Mn = 0.29 g O₂/g Mn; −2 mol Alk per mol Mn.' },
      { t: 'card', f: 'Fe(II) oxidation by Cl₂: Cl₂ demand and Alk?', b: '½ mol Cl₂/mol Fe (0.64 g/g), −3 Alk per Fe → stronger pH drop than O₂.' },
      { t: 'card', f: 'Rate law of homogeneous Fe(II) oxidation', b: R`$-d[\text{Fe}]/dt = k[\text{Fe}][\text{OH⁻}]^2p_{O_2}$, $k = 8\cdot10^{13}$ L²/(mol² min atm) at 20 °C.` },
      { t: 'card', f: 'How do you get p_O₂ for the rate law from the dissolved O₂?', b: R`$p_{O_2} = H_{YC}RT\,C_L$ (H ≈ 30, C_L in mol/L) – e.g. 2 g/m³ → 0.045 atm.` },
      { t: 'card', f: 'Effect of +1 pH unit on Fe(II) oxidation?', b: '[OH⁻]² × 100 → rate × 100, CSTR volume ÷ 100.' },
      { t: 'card', f: 'Sludge per g Fe and per g Mn oxidised', b: '1.91 g Fe(OH)₃/g Fe; 1.58 g MnO₂/g Mn.' },
      { t: 'card', f: 'Fe(III) filter vs Fe(II) filter', b: 'Fe(III): oxidise before, filter the flocs (voluminous, fast head loss). Fe(II): Fe²⁺ adsorbs and oxidises on the grain coating (compact, long runs).' },
      { t: 'card', f: 'Why is the Mn filter placed after the Fe filter?', b: 'Mn bacteria need higher redox (> 250 mV, O₂ > 1.5 mg/L) and are inhibited by Fe²⁺ and NH₄⁺.' },
      { t: 'card', f: 'Efficiency of in-situ iron removal', b: R`$E = V_{pull}/V_{push} = 4[\text{O₂}]_{inj}/[\text{Fe²⁺}]$ (molar).` },
      { t: 'card', f: 'In-situ: O₂ needed with Fe, Mn and NH₄⁺', b: R`$[\text{O₂}] = E(\frac14[\text{Fe}] + \frac12[\text{Mn}] + 2[\text{NH₄⁺}])$ – ammonium destroys E.` },
      { t: 'card', f: 'Mixing pure O₂ with air: share of pure O₂?', b: R`$f = V_{O_2}/V_{tot} = (x_{req} - 0.21)/0.79$; $V_{O_2}/V_{air} = f/(1-f)$.` },
      { t: 'card', f: 'Ways to accelerate Fe/Mn oxidation', b: 'Raise pH (CO₂ stripping, base), stronger oxidant (Cl₂, KMnO₄, ClO₂, O₃), catalytic surfaces (MnO₂, Fe oxides), biology, pure O₂.' },
      { t: 'card', f: 'Biological manganese oxidation: half-life at pH 7.2?', b: '≈ 4 min (abiotic at pH 8.95: 7700 min!) → Mn filters rely on bacteria.' },

      { t: 'mcq', q: 'Why is pH so important for iron removal?', a: ['Rate ∝ [OH⁻]², and the oxidation releases H⁺ so the pH falls by itself', 'Fe(OH)₃ dissolves above pH 7', 'O₂ solubility rises with pH', 'The filter grains are pH sensitive'], x: 'pH + 1 → 100× faster; without buffer the reaction slows itself down.' },
      { t: 'mcq', q: 'In a CSTR for Fe(II) oxidation the rate is evaluated with …', a: ['the effluent Fe²⁺ concentration', 'the influent Fe²⁺ concentration', 'the mean of in- and outflow', 'the total iron'], x: 'V = Q(Fe_in − Fe)/(k_r·Fe) with Fe = effluent.' },
      { t: 'mcq', q: '14S-1c: the pH is no longer controlled by base. What happens in the reactor?', a: ['Alk drops by 2·ΔFe at constant C_T → pH drops slightly → rate falls', 'C_T drops and pH rises', 'Nothing – the rate law has no pH term', 'Alk rises because Fe(OH)₃ is a base'], x: '14S: Alk 6.9 → 6.84 mM, pH 7 → 6.98.' },
      { t: 'mcq', q: 'Which oxidant causes the stronger pH decrease per Fe oxidised?', a: ['Cl₂ (3 H⁺ per Fe)', 'O₂ (2 H⁺ per Fe)', 'Both the same', 'KMnO₄ (0 H⁺)'], x: '18S-4d.' },
      { t: 'mcq', q: 'The ammonium-rich Alpnach groundwater: why is in-situ iron removal not economical?', a: ['NH₄⁺ consumes 2 O₂ per N, so E drops to ≈ 1.5', 'Ammonium dissolves Fe(OH)₃', 'Ammonium raises the pH too much', 'Mn²⁺ blocks the adsorption sites'], x: 'Without NH₄⁺ E would be about 10.' },
      { t: 'mcq', q: 'Required O₂ in the injection water is above air saturation. What do you do?', a: ['Mix pure O₂ into the air: f = (x_req − 0.21)/0.79', 'Increase the temperature', 'Inject more water', 'Use a lower E'], x: '23W-4c: 4.3 %; 18S-4b: V_O₂/V_air = 0.13.' },
      { t: 'mcq', q: 'The task gives 970 mbar ambient pressure for the saturation calculation. Which p in atm?', a: ['0.957 atm', '0.970 atm', '0.985 atm', '1.0 atm'], x: '1 atm = 1013 mbar. 16S-1b: C_S = 8.12 g/m³ with 32.4 at 298 K.' },
      { t: 'mcq', q: 'Typical sequence of a combined Fe/Mn plant?', a: ['Fe(II) filter → spray aeration (CO₂ out) → Mn filter → network', 'Mn filter → Fe filter → aeration', 'Ozone → Mn filter → Fe filter', 'Aeration → Mn filter → Fe filter'], x: 'Iron first; manganese needs higher pH and E_H and is inhibited by Fe²⁺.' },
      { t: 'mcq', g: 'feox', gp: { ph: 6.5 }, q: 'With the half-life curve: what happens to t½ of Fe²⁺ when the pH goes from 6.5 to 7.5?', a: ['It becomes 100× shorter', 'It halves', 'It becomes 10× shorter', 'It does not change'], x: 't½ = ln2/(k[OH⁻]²p_O₂).' },

      { t: 'trend', q: 'Fe(II) oxidation in a CSTR: pH is raised from 6.5 to 7.0. What happens to …', r: [['k_r', 1], ['required reactor volume', -1], ['alkalinity consumed per Fe', 0]], x: 'k_r × 10; stoichiometry unchanged.' },
      { t: 'trend', q: 'More dissolved O₂ is kept in the tank (C_L ↑). What happens to …', r: [['p_O₂ equivalent', 1], ['Fe oxidation rate', 1], ['O₂ leaving with the effluent (Q·C_L)', 1]], x: 'Q·C_L is part of the oxygen demand (Ex4b).' },
      { t: 'trend', q: 'In-situ removal: the groundwater contains more NH₄⁺. What happens to …', r: [['O₂ demand per m³', 1], ['efficiency E', -1]], x: '2 mol O₂ per mol NH₄⁺.' },
      { t: 'trend', q: 'Water spray aeration strips CO₂ before the Mn filter. What happens to …', r: [['pH', 1], ['alkalinity', 0], ['Mn oxidation rate', 1]], x: 'Free pH increase without chemicals.' },

      { t: 'factor', q: 'Fe(II) oxidation: pH 6.5 → 7.5. Rate constant k_r changes by …', a: ['×100', '×10', '×2', '×1000'], x: 'k_r ∝ [OH⁻]².' },
      { t: 'factor', q: 'In-situ E: the injected O₂ concentration doubles. E changes by …', a: ['×2', '×4', '×½', '×1'], x: 'E = 4[O₂]/[Fe] – linear.' },
      { t: 'factor', q: 'Oxidant demand per mol Fe: Cl₂ compared with O₂ (in mol) …', a: ['×2', '×½', '×4', '×1'], x: '½ mol Cl₂ vs ¼ mol O₂ (2 vs 4 electrons).' },

      { t: 'gap', q: 'Pseudo-1st-order constant for Fe(II) oxidation', f: R`$$k_r = k\cdot ▢ \cdot p_{O_2}$$`, a: [R`$[\text{OH⁻}]^2$`, R`$[\text{OH⁻}]$`, R`$[\text{H⁺}]^2$`, R`$[\text{Fe²⁺}]$`], x: 'Second power of hydroxide – the pH turbo.' },
      { t: 'gap', q: 'In-situ efficiency (molar)', f: R`$$E = \frac{▢\cdot[\text{O₂}]_{inj}}{[\text{Fe²⁺}]_{GW}}$$`, a: ['4', '2', '¼', '1'], x: 'One O₂ oxidises 4 Fe²⁺.' },
      { t: 'gap', q: 'Pure O₂ share in the gas', f: R`$$f = \frac{x_{req} - 0.21}{▢}$$`, a: ['0.79', '0.21', '1', R`$x_{req}$`], x: 'x = 0.21(1 − f) + f.' },
      { t: 'gap', q: 'CSTR volume for Fe(II) oxidation', f: R`$$V = \frac{Q([\text{Fe}]_{in} - [\text{Fe}])}{▢}$$`, a: [R`$k_r\,[\text{Fe}]$`, R`$k_r\,[\text{Fe}]_{in}$`, R`$k_r$`, R`$\ln([\text{Fe}]_{in}/[\text{Fe}])$`], x: 'Rate at effluent conditions.' },

      { t: 'order', q: 'In-situ removal with pure O₂ (23W-4): order the steps', s: ['Convert Fe (and Mn) to mmol/L', 'O₂ demand: ¼ per Fe (+ ½ per Mn)', R`$[\text{O₂}]_{inj} = E\cdot$ demand → mg/L`, 'Air saturation C_S = 0.21·p·M/(H·R·T)', 'x_req = 0.21·C_req/C_S,air → f = (x_req − 0.21)/0.79'], x: '23W-4: 1.18 mg/L, 11.5 mg/L, 4.3 %.' },
      { t: 'order', q: 'CSTR for Fe(II) oxidation (Ex4a / 14S-1a)', s: [R`$[\text{OH⁻}] = 10^{\text{pH}-14}$`, R`$p_{O_2}$ (given, or $H_{YC}RT\,C_L$)`, R`$k_r = k[\text{OH⁻}]^2p_{O_2}$`, R`CSTR balance with effluent Fe: $V$ or $Q$`, 'Convert units (min⁻¹ ↔ d⁻¹, L ↔ m³)'], x: 'Then sludge (1.91 g/g Fe) and alkalinity (−2/Fe).' },

      { t: 'bug', q: 'Groundwater 5.6 mg/L Fe, injection water 8 mg/L O₂. Maximum E?', s: ['E = 4·[O₂]/[Fe²⁺]', 'E = 4 × 8 / 5.6', 'E = 5.7'], w: 1, fix: 'Use **molar** values: 8/32 = 0.25 mM O₂, 5.6/55.8 = 0.10 mM Fe → E = 4·0.25/0.10 = **10**.' },
      { t: 'bug', q: 'Exercise 4a: dissolved O₂ 2 g/m³, pH 6.5, k = 8·10¹³. Rate constant?', s: [R`$[\text{OH⁻}]^2 = 10^{-15}$`, R`$p_{O_2} = 0.21$ atm (air)`, R`$k_r = 8\cdot10^{13}\cdot10^{-15}\cdot0.21 = 0.017$ min⁻¹`], w: 1, fix: R`p_O₂ must be the pressure in equilibrium with the **dissolved** O₂: $H_{YC}RT\,C_L$ = 0.045 atm → k_r = 0.0036 min⁻¹.` },

      { t: 'match', q: 'Match the measure with how it speeds up Fe/Mn removal', p: [['CO₂ stripping', 'pH ↑ without chemicals'], ['KMnO₄', 'stronger oxidant, classic for Mn'], ['MnO₂-coated grains', 'catalytic / autocatalytic surface'], ['Pure O₂', 'higher driving force, more O₂ per m³']], x: 'Spick §3 qualitative box.' },
    ],
  });
})();
