(function () {
  const R = String.raw;
  PE.topic({
    id: 't15', n: 15, title: 'Activated carbon: isotherms, PAC & GAC', short: 'Activated carbon', grp: 'ac', pri: 'A', spick: '§15',
    exams: ['15W-2', '16W-3', '17W-3', '19S-3', '19W-1', '21W-4', '23S-4'],
    oneMin: R`The isotherm q(C) says how much the carbon holds. The one idea that solves most tasks: **PAC in a stirred tank sees the effluent C_e → loads only q(C_e); GAC near the inlet sees C₀ → loads q(C₀).** Hence D_PAC = (C₀ − C_e)/q(C_e) vs CUR_GAC = C₀/q(C₀), and GAC wins at high removal. GAC columns also need EBCT, the speed of the **mass transfer zone** and the breakthrough time.`,
    learn: [
      {
        h: '📈 Isotherms',
        f: [
          { m: R`q_e = K\,C_e^{1/n} \;\Leftrightarrow\; \log q = \log K + \tfrac{1}{n}\log C`, u: 'mg/g', w: 'Freundlich (exam workhorse)' },
          { m: R`\tfrac{1}{n} = \frac{\log q_2 - \log q_1}{\log C_2 - \log C_1}, \quad K = \frac{q_1}{C_1^{1/n}}`, u: '-', w: 'two-point fit (15W-2b, 19S-3a)' },
          { m: R`q_e = \frac{q_{max}\,b\,C_e}{1 + b\,C_e}`, u: 'mg/g', w: 'Langmuir (saturates at q_max); linear: 1/q = 1/q_max + 1/(q_max·b)·1/C' },
          { m: R`q_e = \frac{V(C_0 - C_e)}{M}`, u: 'mg/g', w: 'one batch data point' },
        ],
        trap: 'The units of K only match the units of C and q in the task (µg/L or mg/L, mg/g or g/g). **Do not convert K** – insert C in the isotherm\'s units.',
      },
      {
        h: '⚫ PAC (equilibrium with the effluent)',
        g: 'isotherm',
        f: [
          { m: R`\boxed{D_{PAC} = \frac{M}{V} = \frac{C_0 - C_e}{q_e(C_e)}}`, u: 'g/L', w: 'graphically: operating line from (C₀, 0) with slope −V/M hits the isotherm at (C_e, q_e)' },
          { m: R`D_1 = \frac{C_0 - C_1}{q(C_1)}, \quad D_2 = \frac{C_1 - C_e}{q(C_e)}`, u: 'g/L', w: 'two stages in series with fresh PAC each (21W-4c: C₁ given)' },
          { m: R`D = \frac{C_1 - C_e}{q(C_e)} = \frac{C_0 - C_1}{q(C_1) - q(C_e)}`, u: 'g/L', w: 'counter-current recycling (PAC from stage 2 → 1); iterate C₁. Ex11: 13.6 / 9.0 / 6.1 mg/L' },
        ],
        li: [
          '**Desorption:** loaded PAC in clean water → line from **(0, q₀)** with slope −V/M; mixed with fresh carbon: start at (0, q_avg = M₁q₀/(M₁ + M₂)), slope −V/(M₁ + M₂) (17W-3).',
          'Where: before flocculation/sedimentation, separate PAC reactor, 4th treatment stage of Swiss WWTPs (PAC + Al/Fe). PAC in activated sludge raises MLSS → check the clarifier (17S-4).',
        ],
      },
      {
        h: '🛢️ GAC fixed bed',
        g: 'dg_gac',
        f: [
          { m: R`EBCT = \frac{V_b}{Q} = \frac{L}{v}, \quad A = \frac{Q}{v}, \quad \tau_{real} = \varepsilon\cdot EBCT`, u: 'min', w: 'M_GAC = ρ_b·V_b' },
          { m: R`\boxed{CUR_{min} = \frac{C_0}{q_e(C_0)}}`, u: 'g/L', w: 'carbon use rate when the whole bed is in equilibrium with the influent; per day: Q·CUR' },
          { m: R`t_{bk} = \frac{\rho_b\,q_e(C_0)\,EBCT}{C_0}`, u: 'd', w: 'breakthrough without MTZ (consistent units: ρ_b g/L, q mg/g, C₀ mg/L)' },
          { m: R`\boxed{v_{MTZ} = \frac{v\,C_0}{\rho_b\,q_e(C_0)}}, \quad t_{bk} = \frac{L - L_{MTZ}/2}{v_{MTZ}}`, u: 'm/d', w: 'symmetric MTZ: CUR_real = CUR_min·L/(L − L_MTZ/2)' },
        ],
        li: ['Higher C₀: v_MTZ ∝ C₀^(1−1/n)/K → faster, replace more often (16W-3c).', 'Profile after Δt: shift the MTZ by v_MTZ·Δt (16W-3b).', 'Ex11 (TCE 1 mg/L, K 30, 1/n 0.6): q(C₀) = 30 mg/g, CUR = 0.033 g/L; 15-min EBCT holds 6.75 t and lasts 141 d.'],
      },
      { g: 'mtz' },
      {
        h: '⚖️ PAC vs GAC',
        f: [{ m: R`\frac{D_{PAC}}{CUR_{GAC}} = \frac{1 - C_e/C_0}{(C_e/C_0)^{1/n}}`, u: '-', w: '≈ 1 at 50 %; 99.9 % with 1/n = 1: 1000×. Break-even (1/n = 0.5): 62 % without MTZ, 71 % with L = 4 m, L_MTZ = 2 m (23S-4e)' }],
        g: 'pacgac',
        tbl: [['', 'PAC', 'GAC'], ['+', 'flexible dosing (seasonal, spills), low investment, retrofit, fast kinetics', 'high loading (efficient), regenerable, biologically active (BAC), also filters'], ['−', 'not regenerable, more sludge, separation needed, higher consumption', 'investment, MTZ, backwashing, breakthrough monitoring, bacteria']],
        li: [
          '**Lead–lag (serial):** run the first column to exhaustion while the second polishes; swap → only fully loaded carbon is replaced (≈ CUR_min) (19W-1g, 23S-4c). **Parallel:** staggered columns, blended effluent, large Q.',
          '**Competition:** shared sites → less capacity per compound, earlier breakthrough; weak adsorbers displaced (C_e > C₀ possible); NOM preloading lowers capacity.',
          '**Production:** coal, lignite, coconut, wood … → carbonisation 600–900 °C without O₂ → activation (steam/O₂ or chemical) → grinding (GAC/PAC). Thermal reactivation: 2–3 vs 11–18 t CO₂/t. Pores: micro < 2 nm, meso 2–50, macro > 50 nm.',
        ],
      },
      {
        h: '📝 Worked examples',
        ex: { t: '21W-4: PAC (1 and 2 tanks) vs GAC for 99 % TCE', s: [
          'q(C_e = 0.015) = 56·0.015^0.5 = 6.86 mg/g → **D = 1.485/6.86 = 0.217 g/L**.',
          'GAC: q(1.5) = 68.6 mg/g → CUR = 1.5/68.6 = 0.022 g/L → **−90 %** (ratio 0.99/0.01^0.5 = 9.9).',
          'Two tanks (90 % in tank 1): D₁ = 1.35/21.7 = 0.062, D₂ = 0.135/6.86 = 0.020 → **0.082 g/L**.',
        ] },
      },
      {
        ex: { t: '19W-1: GAC column with a 2 m MTZ', s: [
          'EBCT = 4/10 h = **24 min**; A = 180/10 = **18 m²**; real residence time 0.4·24 = **9.6 min**.',
          'q(2) = 0.034·2^0.65 = 0.0534 g/g → CUR = 37.5 g/m³ × 4320 m³/d = **162 kg/d**.',
          'v_MTZ = 10·2/(450 000·0.0534) = 8.3·10⁻⁴ m/h → t_bk = (4 − 1)/v_MTZ = **150 d** (dummy 94).',
          'Replace at first breakthrough: 162·4/3 = **216 kg/d** → avoid with lead–lag operation.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Freundlich isotherm and its log form', b: R`$q = KC^{1/n}$ ⇔ log q = log K + (1/n)·log C.` },
      { t: 'card', f: 'Two-point Freundlich fit', b: R`$1/n = \Delta\log q/\Delta\log C$, $K = q_1/C_1^{1/n}$.` },
      { t: 'card', f: 'PAC dose in a CSTR/batch', b: R`$D = (C_0 - C_e)/q(C_e)$ – equilibrium with the **effluent**.` },
      { t: 'card', f: 'Minimum GAC carbon use rate', b: R`$CUR_{min} = C_0/q(C_0)$ – equilibrium with the **influent**.` },
      { t: 'card', f: 'Graphical PAC solution', b: 'Operating line from (C₀, 0) with slope −V/M; intersection with the isotherm = equilibrium state.' },
      { t: 'card', f: 'Desorption: where does the operating line start?', b: 'At (C = 0, q₀) with slope −V/M (mixed with fresh PAC: (0, q_avg), slope −V/(M₁+M₂)).' },
      { t: 'card', f: 'EBCT and real residence time', b: 'EBCT = V_b/Q = L/v; real = ε·EBCT.' },
      { t: 'card', f: 'MTZ velocity', b: R`$v_{MTZ} = vC_0/(\rho_bq(C_0))$ – independent of the bed depth.` },
      { t: 'card', f: 'First breakthrough with a symmetric MTZ', b: R`$t_{bk} = (L - L_{MTZ}/2)/v_{MTZ}$; CUR_real = CUR_min·L/(L − L_MTZ/2).` },
      { t: 'card', f: 'PAC/GAC dose ratio', b: R`$(1 - C_e/C_0)/(C_e/C_0)^{1/n}$ – ≈ 1 at 50 %, explodes at high removal.` },
      { t: 'card', f: 'Lead–lag operation', b: 'Two columns in series: run the lead to exhaustion while the lag polishes; swap → only fully loaded carbon replaced.' },
      { t: 'card', f: 'Pros of PAC', b: 'Flexible dosing (seasonal peaks, spills), low investment, easy retrofit, fast kinetics.' },
      { t: 'card', f: 'Pros of GAC', b: 'High loading (efficient), regenerable, biologically active, also filters.' },
      { t: 'card', f: 'Competitive adsorption effects', b: 'Lower capacity per compound, earlier breakthrough, weak adsorbers displaced (C_e > C₀), NOM preloading.' },
      { t: 'card', f: 'Steps of activated carbon production', b: 'Raw material → pyrolytic carbonisation (600–900 °C, no O₂) → activation (steam/O₂ or chemical) → crushing/grinding/sieving.' },

      { t: 'mcq', q: 'Why does GAC need far less carbon than PAC for 99 % removal?', a: ['GAC near the inlet loads up to q(C₀), PAC only to q(C_e) with C_e = 1 % of C₀', 'GAC has a larger internal surface', 'PAC is washed out', 'GAC is regenerated on site'], x: '21W-4b: −90 %.' },
      { t: 'mcq', q: 'Freundlich K in µg/mg·(L/µg)^(1/n), your C₀ is given in mg/L. What do you do?', a: ['Convert C to µg/L and insert – do not convert K', 'Convert K to mg/g units', 'Use C in mg/L directly', 'Take log K instead'], x: 'Units of K are tied to the units of C and q.' },
      { t: 'mcq', q: '17W-3b: 10 g PAC loaded at 16 mg/g into 2 L of clean water. Graphical start point?', a: ['(C = 0, q = 16) with slope −V/M = −0.2 L/g', '(C = 16, q = 0) with slope −0.2', '(C = 40, q = 0) with slope −5', '(0, 0) with slope +0.2'], x: 'Result C ≈ 3.5 mg/L, only 4.4 % released.' },
      { t: 'mcq', q: '16W-3c: influent 400 instead of 50 µg/L. The MTZ moves …', a: ['faster (v_MTZ ∝ C₀^(1−1/n)) → replace carbon more often', 'slower', 'at the same speed', 'backwards'], x: '1.17 → 3.31 m/a.' },
      { t: 'mcq', q: '19W-1g: how do you use only fully loaded GAC in practice despite an MTZ?', a: ['Two columns in series (lead–lag) and swap', 'A deeper single bed', 'Higher superficial velocity', 'PAC dosing before the column'], x: '' },
      { t: 'mcq', q: '23S-4c: serial or parallel GAC operation – which uses the carbon better?', a: ['Serial (lead–lag): only exhausted carbon leaves', 'Parallel: more area', 'Both identical', 'Parallel: less MTZ'], x: 'Parallel is for large flows and blending.' },
      { t: 'mcq', q: '19S-3d: ρ_F = 0.46 g/cm³, EBCT = 10 min, q(C₀) = 24.5 mg/g, C₀ = 1 mg/L. Breakthrough (no MTZ)?', a: ['≈ 78 d', '≈ 7.8 d', '≈ 780 d', '≈ 1.1 d'], x: '460 g/L·24.5 mg/g·10 min/(1 mg/L) = 112 700 min.' },
      { t: 'mcq', q: 'Below which removal is PAC more carbon-efficient than GAC (1/n = 0.5, no MTZ)?', a: ['≈ 62 %', '≈ 90 %', '≈ 38 %', '≈ 99 %'], x: '(1 − x)/√x = 1 → x = 0.38.' },
      { t: 'mcq', g: 'isotherm', gp: { mode: 'pac', K: 20, n: 0.5, c0: 10, D: 0.6 }, q: 'In the plot, what is the slope of the PAC operating line?', a: ['−V/M = −1/D', '+M/V', '−K', '1/n'], x: 'q = (C₀ − C)·V/M.' },

      { t: 'trend', q: 'PAC in a CSTR: the target effluent concentration is lowered. What happens to …', r: [['q(C_e)', -1], ['PAC dose', 1]], x: 'Double effect: more to remove, less capacity.' },
      { t: 'trend', q: 'GAC: superficial velocity v increases (same bed depth). What happens to …', r: [['EBCT', -1], ['v_MTZ', 1], ['time to breakthrough', -1]], x: '' },
      { t: 'trend', q: 'GAC: the mass transfer zone becomes longer. What happens to …', r: [['time to first breakthrough', -1], ['carbon used per m³ (replacing at breakthrough)', 1]], x: '' },
      { t: 'trend', q: 'A competing compound (NOM) is present. What happens to …', r: [['capacity for the micropollutant', -1], ['breakthrough time', -1]], x: '' },

      { t: 'factor', q: 'GAC bed 4 m, MTZ 2 m: carbon use at first breakthrough vs CUR_min …', a: ['×1.33', '×2', '×1.5', '×1'], x: '4/(4 − 1).' },
      { t: 'factor', q: 'Freundlich 1/n = 0.5: C ×4 → q …', a: ['×2', '×4', '×16', '×1'], x: '4^0.5.' },
      { t: 'factor', q: 'Linear isotherm (1/n = 1), 99.9 % removal: PAC/GAC carbon ratio …', a: ['×1000', '×100', '×10', '×1'], x: '0.999/0.001.' },

      { t: 'gap', q: 'PAC dose', f: R`$$D_{PAC} = \frac{C_0 - C_e}{▢}$$`, a: [R`$q_e(C_e)$`, R`$q_e(C_0)$`, R`$K$`, R`$C_0$`], x: '' },
      { t: 'gap', q: 'GAC minimum carbon usage', f: R`$$CUR_{min} = \frac{C_0}{▢}$$`, a: [R`$q_e(C_0)$`, R`$q_e(C_e)$`, R`$\rho_b$`, R`$EBCT$`], x: '' },
      { t: 'gap', q: 'MTZ velocity', f: R`$$v_{MTZ} = \frac{v\,C_0}{\rho_b\cdot ▢}$$`, a: [R`$q_e(C_0)$`, R`$q_e(C_e)$`, R`$L$`, R`$EBCT$`], x: '' },
      { t: 'gap', q: 'First breakthrough with MTZ', f: R`$$t_{bk} = \frac{L - ▢}{v_{MTZ}}$$`, a: [R`$L_{MTZ}/2$`, R`$L_{MTZ}$`, R`$2L_{MTZ}$`, '0'], x: 'Symmetric S-shaped front.' },

      { t: 'order', q: 'GAC column design (19W-1): order', s: ['EBCT = L/v and A = Q/v', 'Real residence time ε·EBCT', 'q(C₀) from the isotherm → CUR_min = C₀/q(C₀) → kg/d', 'v_MTZ = v·C₀/(ρ_b·q(C₀))', 't_bk = (L − L_MTZ/2)/v_MTZ', 'CUR_real = CUR_min·L/(L − L_MTZ/2); lead–lag to avoid it'], x: '' },
      { t: 'order', q: 'Two PAC tanks in series (21W-4c): order', s: ['C₁ after tank 1 (given or optimised)', 'q(C₁) and D₁ = (C₀ − C₁)/q(C₁)', 'q(C_e) and D₂ = (C₁ − C_e)/q(C_e)', 'D_tot = D₁ + D₂, compare with one tank and with GAC'], x: '' },

      { t: 'bug', q: '21W-4a: TCE 1.5 mg/L, 99 % removal, K = 56, 1/n = 0.5, one PAC tank.', s: ['C_e = 0.015 mg/L', 'q = K·C₀^0.5 = 56·1.22 = 68.6 mg/g', 'D = (1.5 − 0.015)/68.6 = 0.022 g/L'], w: 1, fix: 'PAC equilibrates with the **effluent**: q(0.015) = 6.86 mg/g → **D = 0.217 g/L** (the 0.022 is the GAC value).' },
      { t: 'bug', q: '19W-1e: first breakthrough with L = 4 m, L_MTZ = 2 m, v_MTZ = 8.3·10⁻⁴ m/h.', s: ['Ideal plug front reaches the outlet at L/v_MTZ', 'With MTZ: front edge arrives L_MTZ/2 earlier', 't_bk = (4 − 2)/8.3·10⁻⁴ = 2400 h = 100 d'], w: 2, fix: 't_bk = (L − L_MTZ/2)/v_MTZ = (4 − 1)/8.3·10⁻⁴ = 3600 h = **150 d**.' },

      { t: 'match', q: 'Match the situation with the better carbon choice', p: [['Seasonal taste & odour peaks', 'PAC (flexible dosing)'], ['Continuous 99 % micropollutant removal', 'GAC'], ['Retrofit of an existing plant, low budget', 'PAC'], ['Biological activity after ozonation', 'GAC (BAC)']], x: '' },
    ],
  });
})();
