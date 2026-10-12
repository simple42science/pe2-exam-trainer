(function () {
  const R = String.raw;
  PE.topic({
    id: 't99', n: 99, title: 'Traps & lessons from past exams', short: 'Traps', grp: 'tool', pri: 'A', spick: '§99',
    exams: ['22S-1', '17W-2', '22W-2', '22W-3', '22W-4', '17W-1', '17W-3', '22S-2'],
    oneMin: R`In an open-book exam the formulas are on the Spick – points are lost through **traps**: a wrong unit, the wrong concentration in a CSTR, the wrong basis of a ratio, a Henry constant in the wrong notation. The same traps come back every year. This chapter collects them, including the eight errors of the old FS25 summary and the lessons from your own attempts.`,
    learn: [
      {
        h: '⚠️ Top traps across all chapters',
        li: [
          '**Units:** mg/L ↔ mol/L; g N vs g NH₄⁺, g P vs g PO₄ (×3.06) → convert to moles of the element first.',
          '**Henry:** H_YC [–] vs H_PC [atm·L/mol] vs K_H [mol/(L·bar)]; T in kelvin; R matching atm or bar.',
          '**CO₂ stripping does not change Alk; NaOH changes Alk, not C_T.**',
          '**CSTR = effluent conditions:** concentration for the rate, particle size for flocculation, q(C_e) for PAC.',
          '**GAC: q(C₀) · PAC: q(C_e).**',
          '**Membranes:** J in m/s, ΔP in Pa, µ(T) of each measurement; design at the coldest T.',
          '**RO:** d_H = 2 × channel height; count all ions (NaCl twice).',
          '**Alum has 2 Al; FeSO₄ is Fe(II).**',
          '**ln vs log:** 99 % = 2 log = factor 100 = ln 100 = 4.605; CT scales linearly with log units.',
          '**Power law:** integrate over wide ranges, state the units of A, special cases β = 1 and β = 4.',
          '**Type I sedimentation:** depth irrelevant, only Q/A.',
          '**Impossible result** (negative flow, η > 100 %): write what it means physically and continue with the dummy.',
        ],
      },
      {
        h: '🚫 Errors in the old FS25 summary – do NOT copy',
        tbl: [
          ['old (wrong)', 'correct'],
          ['H_PC = C/p', 'H_PC = p/C_L [atm·L/mol]; K_H [mol/(L·bar)] = C/p = 1/H_PC'],
          ['CO₂ stripping raises pH and Alk', 'pH rises, **Alk constant**, only C_T drops'],
          ['strippable if H < 10⁻⁴', 'strippable if **H ≥ 10⁻⁴**'],
          ['sphere V = ¾πr³', 'V = **4/3**πr³ = πd³/6, A = πd²'],
          ['36 mol Alk per mol Fe', '**2** mol Alk per mol Fe(II) with O₂ (3 with Cl₂)'],
          ['break-up K_B·k^δ·n_k', 'r_B = K_B·G^δ, δ ≈ 2'],
          ['Fe:P always read from the figure', 'ratio given → use it × **initial soluble P**'],
          ['1 m water = 0.0981 atm', '0.0968 atm = 0.0981 **bar**'],
        ],
      },
      {
        h: '🔬 Lessons from your own attempts',
        li: [
          '**22S-1 filtration:** grain size from **t_B** (σ_B fit), not from Ergun; for the new d first **h_L0 with Ergun**, then t_HL → 51.6 h (head loss limits).',
          '**17W-2c Fe:P:** ratio × initial soluble P (1.353) → 0.0100 mL/L = official.',
          '**22W-2b max inflow:** OD = 0.339·Q − 1289 = OTR 1256 → Q ≈ 7500 m³/d.',
          '**22W-1:** P in effluent VSS goes to the river (not removed); N_nitr = TKN − N_bio.',
          '**22W-3c ozone contactor:** Q_G < 0 = target impossible – say so.',
          '**22W-4b flocculation power:** G from the CSTR macro equation, then P = G²µV.',
          '**17W-1 gravity UF:** ΔP = ρgh, κ from J = ΔP/(µκ) is always the total resistance.',
          '**17W-3 PAC desorption:** line starts at (0, q₀).',
          '**22S-2 aeration:** C_S,T,m at the actual T and mid-depth: 0.5·h_inj/10.33 atm extra.',
        ],
      },
      {
        h: '🔁 After every practice task',
        rec: ['Compare with the official result and a student solution.', 'Error log: concept / formula missing / unit / calculation / time / weak qualitative answer.', 'Improve the Spick (\\new{…} with source) if something was missing or hard to find.', 'Redo the task cold one week later.'],
      },
    ],
    q: [
      { t: 'card', f: 'CSTR – which conditions everywhere?', b: 'Effluent conditions: concentration for rates, particle size for β_M, q(C_e) for PAC.' },
      { t: 'card', f: 'GAC vs PAC loading', b: 'GAC: q(C₀) (inlet) · PAC: q(C_e) (effluent).' },
      { t: 'card', f: 'Strippability threshold (corrected)', b: 'H_YC ≥ 10⁻⁴.' },
      { t: 'card', f: 'Alkalinity per mol Fe(II) oxidised by O₂ (corrected)', b: '2 mol (with Cl₂: 3).' },
      { t: 'card', f: 'Sphere volume (corrected)', b: '4/3·π·r³ = π·d³/6.' },
      { t: 'card', f: 'What do you do with an impossible result (negative flow, η > 100 %)?', b: 'Write one sentence on what it means physically (e.g. target impossible), then continue with the dummy value.' },
      { t: 'card', f: 'Membrane unit checklist', b: 'J in m/s, ΔP in Pa (1 bar = 10⁵), µ at the temperature of that measurement.' },

      { t: 'mcq', q: 'Which statement from the old summary is actually correct?', a: ['Strippable if H_YC ≥ 10⁻⁴', 'CO₂ stripping raises the alkalinity', '1 m water column = 0.0981 atm', '36 mol Alk per mol Fe'], x: 'The other three are the documented errors.' },
      { t: 'mcq', q: 'A first-order CSTR, a flocculation CSTR and a PAC CSTR have one thing in common. Which?', a: ['Everything is evaluated at effluent conditions', 'They all need G', 'They all follow e^(−kτ)', 'They all need a Henry constant'], x: '' },
      { t: 'mcq', q: 'You get Q_G = −7 m³/h for an ozone contactor. Best exam reaction?', a: ['State that the target concentration is not reachable with this gas (H·C_L > C_G,0) and continue', 'Erase and take +7 m³/h', 'Leave the sub-question blank', 'Assume X ≪ 1 instead'], x: '22W-3c: the negative value is the official answer.' },
      { t: 'mcq', q: 'Which conversion is correct?', a: ['1 g P = 3.06 g PO₄', '1 g P = 1 g PO₄', '1 g N = 1 g NH₄⁺', '1 g NH₄-N = 0.78 g NH₄⁺'], x: '1 g N = 18/14 = 1.29 g NH₄⁺.' },
      { t: 'mcq', q: '3-log removal needs which CT compared with CT₉₉?', a: ['1.5 ×', '3 ×', '10 ×', '(CT₉₉)³'], x: 'Linear in log units.' },

      { t: 'bug', q: 'Mixed bag – which step is wrong? (RO feed channel, height 0.7 mm, Mariñas–Urama)', s: ['Re = ρ·v·d_H/µ', 'Hydraulic diameter d_H = channel height = 0.7 mm', 'Sc = µ/(ρ·D)', 'k_L = λ·(D/d_H)·Re^0.5·Sc^(1/3)'], w: 1, fix: 'd_H = 2 × 0.7 = 1.4 mm (spiral-wound slit) – unless the task gives d_H directly.' },
      { t: 'bug', q: 'Aeration at 1 m depth below the surface: extra pressure?', s: ['1 m water = ρ·g·h = 9.81 kPa', '= 0.0981 atm', 'Pressure at 1 m = 1.0981 atm'], w: 1, fix: '9.81 kPa = 0.0981 **bar** = **0.0968 atm** (10.33 m = 1 atm).' },
      { t: 'bug', q: 'GAC carbon use for 99 % removal with K = 56, 1/n = 0.5, C₀ = 1.5 mg/L', s: ['GAC is in equilibrium with the inlet over most of the bed', 'C_e = 0.015 mg/L → q(C_e) = 6.86 mg/g', 'CUR = C₀/q = 1.5/6.86 = 0.22 g/L'], w: 1, fix: 'GAC uses q(**C₀**) = 68.6 mg/g → CUR = 0.022 g/L.' },

      { t: 'match', q: 'Match the trap with the exam where it decided the result', p: [['Ratio × initial soluble P', '17W-2c'], ['Recompute h_L0 with Ergun', '22S-1b'], ['Negative gas flow = impossible', '22W-3c'], ['d_H = 2 × channel height', '17S-1c']], x: '' },
    ],
  });
})();
