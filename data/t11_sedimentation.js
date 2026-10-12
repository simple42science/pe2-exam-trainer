(function () {
  const R = String.raw;
  PE.topic({
    id: 't11', n: 11, title: 'Sedimentation & solids flux', short: 'Sedimentation', grp: 'part', pri: 'A', spick: '§11',
    exams: ['15S-1', '15W-3', '17S-4', '18W-4', '19W-4', '23W-2', '18S-2'],
    oneMin: R`Four settling types: **I** discrete (Stokes, ideal settler – **only Q/A counts, depth is irrelevant**), **II** flocculent (column test), **III** hindered (activated sludge blanket, Vesilind v = v₀·e^(−λX)), **IV** compression. Secondary clarifiers are designed with the **solids flux / state point** analysis: SHC II (state point below the curve, top) and SHC I (underflow line below the curve, bottom). Sketching the flux curve is a recurring exam task.`,
    learn: [
      {
        h: '🪨 Settling types',
        tbl: [['type', 'situation', 'design tool'], ['I discrete', 'dilute, individual grains (grit)', 'Stokes, overflow rate Q/A'], ['II flocculent', 'dilute, flocs grow while settling (primary, top of secondary)', 'settling column isopercent lines'], ['III hindered / zone', 'activated sludge blanket (secondary clarifier)', 'Vesilind + solids flux'], ['IV compression', 'particles touch (clarifier bottom, thickener)', '–']],
      },
      {
        h: '⬇️ Type I: Stokes & the ideal settler',
        f: [
          { m: R`v_s = \frac{g(\rho_p - \rho_w)\,d_p^2}{18\,\mu}`, u: 'm/s', w: R`valid for $Re = \rho_w v_s d_p/\mu < 1$ – **check it!**` },
          { m: R`v_s = \sqrt{\frac{4g(\rho_p - \rho_w)d}{3C_D\rho_w}}, \quad C_D = \frac{24}{Re} + \frac{3}{\sqrt{Re}} + 0.34`, u: 'm/s', w: 'transition: iterate v → Re → C_D → v; turbulent C_D ≈ 0.4' },
          { m: R`v_c = \frac{Q}{A} = \frac{h}{\tau}`, u: 'm/h', w: 'overflow rate: v_s ≥ v_c → 100 %, v_s < v_c → fraction v_s/v_c' },
          { m: R`R = \sum_i \min\left(1, \frac{v_i}{v_c}\right)\frac{n_i}{\sum n}, \qquad d_c = \sqrt{\frac{18\mu v_c}{g\Delta\rho}}`, u: '-', w: 'total removal; critical diameter' },
        ],
        g: 'dg_settler',
        li: ['**Depth does not matter:** deeper = longer fall but also longer residence time. Depth ×1.5: same removal; length ×1.5 (A ↑): removal ×1.5 (18W-4f).', 'Typical: primary clarifier v_c 1–5 m/h, h 2–3 m, τ 0.5–2 h; grit chamber 20–120 m/h.', 'A granular filter beats a settler: settling distance = a grain radius, plus interception and diffusion (18S-2c).'],
      },
      { g: 'settler' },
      {
        h: '🧪 Type II: settling column',
        f: [{ m: R`R = \sum_n \frac{\Delta h_n}{H}\cdot\frac{R_n + R_{n+1}}{2}`, u: '-', w: 'isopercent lines in a depth–time plot; v_c = H/t' }],
      },
      {
        h: '🟫 Type III: hindered settling',
        f: [
          { m: R`v_s(X) = v_0\,e^{-\lambda X}`, u: 'm/h', w: 'Vesilind; X in kg/m³' },
          { m: R`h_{SB}(t) = h_0 - v_s(X_0)\,t`, u: 'm', w: 'sludge blanket in a batch cylinder – only until compression (type IV) starts (19W-4c: −1.8 m after 8 h is impossible)' },
          { m: R`SF_g = v_s(X)\cdot X = v_0\,X\,e^{-\lambda X}`, u: 'kg/(m^2 h)', w: 'gravity flux: rises, peaks at X = 1/λ, falls – **sketch with ≥ 6–9 points**' },
        ],
        li: ['A single floc above the blanket settles as **type I** (Stokes, 19W-4b).'],
      },
      {
        h: '📈 Solids flux theory & state point',
        g: 'dg_wwtp',
        f: [
          { m: R`SF_{in} = \frac{(Q + Q_R)X_{in}}{A}, \quad SF_u = \frac{Q_R + Q_W}{A}X, \quad SOR = \frac{Q - Q_W}{A}`, u: 'kg/(m^2 h)', w: 'fed flux, underflow (pump) flux, surface overflow rate [m/h]' },
          { m: R`\boxed{X_R = \frac{(Q + Q_R)\,X_{in}}{Q_R + Q_W}}`, u: 'kg/m^3', w: 'mass balance with X_e ≈ 0 (Q_U = Q_R + Q_W). If Q_W is wasted from the tank: X_R = (Q + Q_R − Q_W)X/Q_R (17S-4c)' },
        ],
        li: [
          '**SHC II (top, clarification):** state point (X_in, SOR·X_in) **below** the curve ⇔ SOR < v_s(X_in) → A ≥ (Q − Q_W)/v_s(X_in).',
          '**SHC I (bottom, thickening):** the **underflow line** from (0, SF_in) to (X_R, 0), slope −(Q_R + Q_W)/A, must not cut the SF_g curve anywhere between X_in and X_R.',
          '**Critical loading:** underflow line tangent to SF_g → max X_R, min Q_R; limiting flux SF_L → A ≥ (Q + Q_R)X_in/SF_L. Q_R from the slope: Q_R = −slope·A − Q_W.',
          'Q_U given? Check **both** criteria, A = max(A_I, A_II) (23W-2c). With high X_R the tangent touches the **tail** of the curve, not the peak!',
        ],
      },
      { g: 'flux' },
      {
        h: '🎛️ Operation & DWA',
        li: [
          'Q_R ↑ → X_R ↓, SHC I safer. MLSS ↑ (e.g. PAC dosing) → state point moves right/up → overload (17S-4e); remedy Q_W ↑ (MLSS ↓) but SRT ↓ → nitrification at risk (17S-4f,g).',
          'Better settling (SVI ↓) raises the whole curve. Wet weather: Q ↑ → SOR ↑ (design case PWWF). 1 instead of 2 clarifiers: SOR doubles.',
          'State point moves: along the SOR line upwards = more MLSS; straight up = smaller area (higher SOR). Clarifiers usually fail at the **bottom** (SHC I).',
          R`DWA-A 131 (≈ SHC II): $A = Q_{PWW}/q_A$, $q_A = q_{SV}/DSV$, $DSV = SVI\cdot X_{in}$; q_SV ≤ 500 L/(m²h), q_A ≤ 1.6 m/h for horizontal flow (650 / 2.0 with more vertical flow).`,
        ],
      },
      {
        h: '📝 Worked examples',
        ex: { t: '23W-2: size a secondary clarifier', s: [
          'X_R = (1200 + 385)·4/400 = **15.85 kg/m³** (dummy 14).',
          'SF_g = 18·X·e^(−0.35X): 0, 12.7, 17.9, **18.9 (X = 2.86)**, 17.8 (4), 13.2 (6), 8.8 (8), 5.4 (10), 3.2 (12), 1.4 (15).',
          'SHC II: v_s(4) = 4.44 m/h → A ≥ 1185/4.44 = 267 m².',
          'SHC I: underflow line to (15.85, 0) touches the **tail** near X ≈ 12 → SF_in ≈ 13 → A ≥ 6340/13 ≈ **488 m²** (exact tangent 476). Thickening governs.',
        ] },
      },
      {
        ex: { t: '19W-4: sludge blanket vs a single floc', s: [
          'Blanket: v_s = 7·e^(−0.7·3.5) = 0.60 m/h → after 0.12 h: 3.0 − 0.07 = **2.93 m**.',
          'Floc (Stokes): v = 9.81·31.8·(3·10⁻⁴)²/(18·1.002·10⁻³) = 5.6 m/h, Re = 0.47 < 1 ✓ → 3.8 − 0.67 = **3.13 m** > 2.93 → not yet reintegrated.',
          'After 8 h the formula gives −1.8 m → compression (type IV) has taken over; the data do not describe it.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Stokes law and its validity', b: R`$v_s = g(\rho_p - \rho_w)d^2/(18\mu)$, valid for Re = ρ·v·d/µ < 1.` },
      { t: 'card', f: 'Overflow rate and removal in an ideal settler', b: 'v_c = Q/A; particles with v_s ≥ v_c removed 100 %, slower ones with fraction v_s/v_c.' },
      { t: 'card', f: 'Why does depth not matter for type I settling?', b: 'Deeper → longer fall distance but proportionally longer residence time: v_c = h/τ = Q/A.' },
      { t: 'card', f: 'The four settling types', b: 'I discrete, II flocculent, III hindered/zone, IV compression.' },
      { t: 'card', f: 'Vesilind equation', b: R`$v_s = v_0e^{-\lambda X}$ (X in kg/m³).` },
      { t: 'card', f: 'Gravity solids flux and its maximum', b: R`$SF_g = v_0Xe^{-\lambda X}$, maximum at X = 1/λ.` },
      { t: 'card', f: 'Return sludge concentration', b: R`$X_R = (Q + Q_R)X_{in}/(Q_R + Q_W)$.` },
      { t: 'card', f: 'SHC II', b: 'State point (X_in, SOR·X_in) below the SF_g curve ⇔ SOR < v_s(X_in); sets the area.' },
      { t: 'card', f: 'SHC I', b: 'Underflow line (0, SF_in) → (X_R, 0) stays below SF_g for all X_in < X < X_R; sets Q_R (or A).' },
      { t: 'card', f: 'Critical loading', b: 'Underflow line tangent to SF_g: maximum X_R, minimum Q_R, limiting flux SF_L.' },
      { t: 'card', f: 'Effect of more MLSS (e.g. PAC dosing) on the state point', b: 'Moves right and up along the SOR line → towards overload; remedy: more wasting (but SRT ↓).' },
      { t: 'card', f: 'Where does a secondary clarifier usually fail?', b: 'At the bottom (thickening, SHC I).' },
      { t: 'card', f: 'DWA-A 131 design', b: R`$A = Q_{PWW}/q_A$, $q_A = q_{SV}/(SVI\cdot X_{in})$, q_SV ≤ 500 L/(m²h) (horizontal flow).` },

      { t: 'mcq', q: '18W-4f: the settler depth is increased by 50 %. Removal of the type I particles?', a: ['Unchanged (33 %) – only Q/A counts', 'Increases to 50 %', 'Decreases', 'Increases to 66 %'], x: 'Length +50 % (A ↑) would give 50 %.' },
      { t: 'mcq', q: '15S-1d: design A so that 90 % of large particles (v_s = 0.169 m/h) are removed, Q = 100 m³/h.', a: ['v_c = v_s/0.9 → A = Q/v_c ≈ 533 m²', 'A = Q/v_s = 592 m²', 'A = 0.9·Q/v_s', 'A = Q/(0.9·v_s)·0.9'], x: 'Fraction removed = v_s/v_c.' },
      { t: 'mcq', q: '19W-4b: a resuspended floc (300 µm, 1030 kg/m³) above the blanket. Which settling law?', a: ['Type I – Stokes (check Re)', 'Vesilind with the blanket concentration', 'Compression', 'Type II column test'], x: 'A single floc settles individually.' },
      { t: 'mcq', q: '19W-4c: blanket height after 8 h comes out negative. Why?', a: ['Compression (type IV) starts; the hindered-settling formula no longer applies', 'Wrong units', 'The sludge dissolved', 'Re > 1'], x: '' },
      { t: 'mcq', q: '23W-2c: Q_U given. How do you find the minimum area?', a: ['Check SHC I and SHC II and take the larger area', 'Only SHC II (state point)', 'Only the peak of the flux curve', 'A = Q/v₀'], x: 'Here SHC I (tail of the curve) governs: ≈ 480–490 m².' },
      { t: 'mcq', q: 'The operator increases Q_R. Effect?', a: ['X_R decreases and SHC I becomes safer (steeper underflow line)', 'X_R increases', 'SOR increases', 'The state point moves down'], x: 'But more water is fed to the clarifier (SF_in ↑).' },
      { t: 'mcq', q: '17S-4f: PAC overloads the clarifier. Which flow change helps – and what is the side effect?', a: ['Increase Q_W (MLSS ↓) – SRT drops, nitrification at risk', 'Decrease Q_R – X_R falls', 'Increase Q – dilution', 'Decrease Q_W – more biomass'], x: '17S-4g.' },
      { t: 'mcq', q: 'Why is a granular filter so much better than a settler of the same size (18S-2c)?', a: ['Settling distance is only a grain radius, and interception/diffusion add removal', 'Filters use higher velocities', 'Settlers only work for colloids', 'Filters have more residence time'], x: '' },
      { t: 'mcq', g: 'flux', gp: { A: 300 }, q: 'With A = 300 m² (other defaults of 23W-2): which criterion fails?', a: ['SHC I (underflow line cuts the curve tail)', 'SHC II', 'Both pass', 'Both fail'], x: 'A ≥ 267 m² satisfies SHC II, SHC I needs ≈ 476 m².' },

      { t: 'trend', q: 'Type I settler: water gets colder. What happens to …', r: [['viscosity', 1], ['Stokes velocity', -1], ['removal', -1]], x: '' },
      { t: 'trend', q: 'Secondary clarifier: MLSS rises. What happens to …', r: [['state point (X_in, SF_SOR)', 1], ['risk of SHC II failure', 1], ['X_R (same flows)', 1]], x: '' },
      { t: 'trend', q: 'Sludge settles better (SVI ↓). What happens to …', r: [['SF_g curve', 1], ['allowed MLSS / smaller area', 1]], x: '' },
      { t: 'trend', q: 'Wet weather (Q ↑) with the same area. What happens to …', r: [['SOR', 1], ['state point height', 1], ['risk of sludge loss', 1]], x: 'Design case PWWF.' },

      { t: 'factor', q: 'Stokes: particle diameter doubles. v_s …', a: ['×4', '×2', '×8', '×√2'], x: '' },
      { t: 'factor', q: 'Ideal settler: area doubles. Removal of a particle with v_s < v_c …', a: ['×2', '×1', '×4', '×½'], x: 'Fraction = v_s·A/Q.' },
      { t: 'factor', q: 'One instead of two equal clarifiers in operation: SOR …', a: ['×2', '×½', '×1', '×4'], x: '' },

      { t: 'gap', q: 'Stokes settling velocity', f: R`$$v_s = \frac{g(\rho_p - \rho_w)\,▢}{18\,\mu}$$`, a: [R`$d_p^2$`, R`$d_p$`, R`$d_p^3$`, R`$r_p^2$`], x: '' },
      { t: 'gap', q: 'Return sludge mass balance', f: R`$$X_R = \frac{(Q + Q_R)X_{in}}{▢}$$`, a: [R`$Q_R + Q_W$`, R`$Q_R$`, R`$Q - Q_W$`, R`$Q + Q_R$`], x: '' },
      { t: 'gap', q: 'Surface overflow rate', f: R`$$SOR = \frac{▢}{A}$$`, a: [R`$Q - Q_W$`, R`$Q + Q_R$`, R`$Q_R + Q_W$`, R`$Q$`], x: 'Water leaving over the weir.' },
      { t: 'gap', q: 'Gravity flux', f: R`$$SF_g = v_0\cdot ▢\cdot e^{-\lambda X}$$`, a: [R`$X$`, R`$X^2$`, R`$1/X$`, R`$\lambda$`], x: '' },

      { t: 'order', q: 'State point analysis (15W-3, 23W-2): order', s: ['X_R = (Q + Q_R)X_in/(Q_R + Q_W)', 'Plot SF_g = v₀Xe^(−λX) with ≥ 6–9 points (max at 1/λ)', 'SOR line through the origin → state point at X_in', 'Underflow line from (0, SF_in) to (X_R, 0): check or place tangent', 'Area from the governing criterion (max of SHC I/II)'], x: '' },
      { t: 'order', q: 'Single particle in a settler (15S-1c, 19W-4b): order', s: ['Collect ρ_p, ρ_w, µ at T, d in m', 'Stokes v_s', 'Check Re < 1 (else C_D iteration)', 'Compare v_s with v_c = Q/A (or with the blanket)'], x: '' },

      { t: 'bug', q: '23W-2a: Q = 1200, Q_U = 400, Q_W = 15 m³/h, X_in = 4 kg/m³. X_R?', s: ['Q_R = Q_U − Q_W = 385 m³/h', 'X_R = Q·X_in/Q_U = 1200·4/400 = 12 kg/m³'], w: 1, fix: 'The clarifier receives Q + Q_R: X_R = 1585·4/400 = **15.85 kg/m³**.' },
      { t: 'bug', q: '15S-1: area for 90 % removal of particles with v_s = 0.169 m/h, Q = 100 m³/h.', s: ['Removal of particles with v_s < v_c = v_s/v_c', 'Wanted v_s/v_c = 0.9 → v_c = 0.188 m/h', 'Deeper tank removes more, so choose h = 4 m and A = Q·h/v_c'], w: 2, fix: 'Depth cancels: **A = Q/v_c = 533 m²**.' },

      { t: 'match', q: 'Match the settling type with where it occurs', p: [['Type I discrete', 'Grit chamber'], ['Type II flocculent', 'Primary clarifier'], ['Type III hindered', 'Secondary clarifier sludge blanket'], ['Type IV compression', 'Thickener / clarifier bottom']], x: '' },
    ],
  });
})();
