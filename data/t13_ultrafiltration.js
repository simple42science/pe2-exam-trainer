(function () {
  const R = String.raw;
  PE.topic({
    id: 't13', n: 13, title: 'Membranes I: micro- & ultrafiltration', short: 'Ultrafiltration', grp: 'mem', pri: 'A', spick: '§13',
    exams: ['14S-4', '15S-4', '17W-1', '18W-1', '20S-4', '21S-4', '23S-3'],
    oneMin: R`MF/UF are **absolute barriers** (pores 0.01–10 µm). One equation: **J = ΔP/(µ·κ_tot)** with resistances in series **κ_tot = κ_m + κ_rev + κ_irr**. Every flux measurement gives the *total* resistance at that moment – compare new membrane / fouled / after backflush / after chemical cleaning to split it. Then size the area with the **net flux** (backflush uses permeate) at the **coldest** temperature. UF was in 7 of 19 exams.`,
    learn: [
      {
        h: '🧫 Membrane family',
        tbl: [['type', 'pores', 'pressure', 'retains'], ['MF', '0.1–10 µm', '0.1–1 bar', 'particles, protozoa, bacteria'], ['UF', '0.01–0.1 µm (MWCO)', '~1 bar', '+ viruses, colloids, macromolecules'], ['NF', '~1 nm', '~10 bar', '+ divalent ions, humics'], ['RO', 'dense', '10–100 bar', '+ all dissolved ions']],
        li: ['Hollow fibres: **inside-out** (A = π·d_i·L·n) dead-end (simple, high recovery, clogs with solids) or cross-flow (shear limits fouling, lower recovery, energy); **outside-in** (A = π·d_o·L·n): more area, tolerates solids (MBR), harder to clean.', 'MF/UF work by straining + adsorption + cake filtration; a granular filter by attachment.'],
      },
      {
        h: '🧮 Flux & resistances in series',
        f: [
          { m: R`\boxed{J = \frac{Q_P}{A} = \frac{\Delta P}{\mu\,\kappa_{tot}}}, \quad \kappa_{tot} = \kappa_m + \kappa_{rev} + \kappa_{irr}`, u: 'm/s', w: '**J in m/s** (L/(m²h) ÷ 3.6·10⁶), **ΔP in Pa** (1 bar = 10⁵ Pa), µ in Pa·s → κ ≈ 10¹¹–10¹² 1/m' },
        ],
        rec: [
          R`New membrane, clean water: $\kappa_m = \Delta P/(\mu J_0)$.`,
          R`Fouled, before cleaning: $\kappa_{tot} = \Delta P/(\mu J_{end})$.`,
          R`After backflush: $\kappa_m + \kappa_{irr} = \Delta P/(\mu J_{after})$ → κ_irr (hydraulically irreversible); κ_rev = κ_tot − κ_m − κ_irr.`,
          'After **chemical** cleaning: the same logic gives chemically reversible / irreversible parts (14S-4b, 23S-3b).',
        ],
        g: 'ufres',
        trap: 'Use **each measurement\'s own ΔP and µ(T)**. Temperature: J_T1 = J_T2·1.03^(T1−T2) or via µ(T). Design at the **coldest** temperature and the **highest** resistance.',
        tip: 'κ from J = ΔP/(µκ) is always the **total** resistance at that moment. Gravity-driven: ΔP = ρ·g·h – the atmospheric pressure acts on both sides and cancels (17W-1: 70 cm → 6867 Pa).',
      },
      {
        h: '📐 Area with backflush & cleaning',
        f: [
          { m: R`J_{net} = \frac{J\,t_f - J_b\,t_b}{t_f + t_b\,(+\,t_{CIP})}, \qquad A = \frac{Q_{demand}}{J_{net}}`, u: 'm^2', w: '28 min filtration + 2 min backflush at J_b = 2J → J_net = 0.8·J (15S-4c)' },
          { m: R`V_{filtered} = Q_{demand}\frac{J\,t_f}{J\,t_f - J_b\,t_b}`, u: 'm^3/d', w: 'water that must pass the membrane incl. backflush permeate (20S-4c-i: 25 000 m³/d)' },
          { m: R`\bar J = \frac{\Delta P}{\mu\,b\,T}\ln\frac{\kappa_0 + bT}{\kappa_0}`, u: 'm/s', w: 'mean flux for linearly growing κ = κ₀ + b·t (the 18W-1 official solution used the arithmetic mean κ per period)' },
        ],
        li: ['Operation 80 % of the time: A = Q/(0.8·J) (17W-1c).', 'Linearly decreasing flux: J̄ = (J₀ + J_end)/2.'],
      },
      {
        h: '🦠 Fouling & gravity-driven membranes',
        g: 'ufsaw',
        li: [
          'Mechanisms: **pore blocking**, **pore constriction** (adsorption inside), **cake layer** (mostly backflushable); also biofouling, scaling, metal oxides.',
          'Prevent: cross-flow, limit the flux, hydrophilic membranes, smaller pores, limit nutrients (AOC), pretreatment (coagulation, PAC) (20S-4b).',
          'Clean: higher cross-flow, backflush; chemically with hypochlorite, acid/base, surfactants.',
          '**Interpret:** large κ_rev → backflush more often/longer; large κ_irr → pretreatment, chemicals in the backflush water, CIP (15S-4b, 20S-4b).',
          '**GDM** (gravity-driven): 30–65 mbar, flux stabilises thanks to a biofilm, no backflush, no chemicals – chemical cleaning would **destroy the biofilm** (21S-4e).',
          R`LRV = log(C_feed/C_perm); nothing detected → LRV ≥ log(C_feed/LOD) (14S-4a: log 250 000 = 5.4).`,
          'Cake resistance (Carman–Kozeny): κ_c = 36κ_K(1 − ε)²δ_c/(ε³d_p²), κ_K ≈ 5. Turbulent fibres (Re > 2300) need absurd flows.',
          'Typical MF/UF (MWH Tab. 12-1): J 30–170 L/(m²h) at TMP 0.2–1 bar (manufacturer 70); Swiss demand ≈ 142 L per person and day.',
        ],
      },
      {
        h: '📝 Worked example 15S-4',
        ex: { t: 'Resistances and area with backflush', s: [
          'κ_m = 0.6·10⁵/(1.002·10⁻³·420/3.6·10⁶) = **5.1·10¹¹ 1/m**.',
          'Fouled (85 at 0.5 bar): 2.11·10¹²; after backflush (280 at 0.45 bar): 5.77·10¹¹ → **κ_irr = 6.4·10¹⁰**, **κ_rev = 1.54·10¹²** → backflushing works; chemicals in the backflush water could cut κ_irr.',
          'Design 5 °C, 0.55 bar, highest κ: J = 55 000/(1.518·10⁻³·2.11·10¹²) = 1.71·10⁻⁵ m/s = 61.7 L/(m²h).',
          'J_net = 0.8·J = 1.185 m/d → **A = 15 000/1.185 = 12 660 m²** (official).',
        ] },
      },
      {
        ex: { t: '17W-1: gravity-driven UF', s: [
          'ΔP = 1000·9.81·0.7 = 6867 Pa → κ_m ≈ 1.65·10¹¹ (official 1.68·10¹¹ with ~7000 Pa).',
          'Fouled 55, after flush 120 L/(m²h) → κ_irr ≈ 4.2·10¹⁰, κ_rev ≈ 2.48·10¹¹.',
          'Area at 0.25 bar, 12 °C, highest κ (4.58·10¹¹), 80 % operation: J₂₀ = 5.46·10⁻⁵ m/s × 1.03^(−8) = 4.31·10⁻⁵ → **A ≈ 1680 m²**.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Membrane flux equation', b: R`$J = Q_P/A = \Delta P/(\mu\,\kappa_{tot})$ – J in m/s, ΔP in Pa, µ in Pa·s.` },
      { t: 'card', f: 'Resistances in series', b: R`$\kappa_{tot} = \kappa_m + \kappa_{rev} + \kappa_{irr}$ [1/m].` },
      { t: 'card', f: 'Which resistance does "after backflush" give you?', b: 'κ_m + κ_irr (the reversible part was removed).' },
      { t: 'card', f: 'Recipe to split the resistances', b: 'New: κ_m · fouled: κ_tot · after backflush: κ_m + κ_irr → κ_irr = that − κ_m; κ_rev = κ_tot − κ_m − κ_irr.' },
      { t: 'card', f: 'L/(m²·h) → m/s', b: 'Divide by 3.6·10⁶ (100 L/(m²h) = 2.78·10⁻⁵ m/s).' },
      { t: 'card', f: 'Temperature correction of a flux', b: 'J_T1 = J_T2·1.03^(T1−T2) – or through µ(T) in J = ΔP/(µκ).' },
      { t: 'card', f: 'Net flux with backflush', b: R`$J_{net} = (Jt_f - J_bt_b)/(t_f + t_b)$; 28/2 min with J_b = 2J → 0.8J.` },
      { t: 'card', f: 'Design conditions for a UF plant', b: 'Coldest temperature (highest µ) and highest (fouled) resistance.' },
      { t: 'card', f: 'ΔP of a gravity-driven membrane', b: 'ρ·g·h (60 cm → 5886 Pa); atmospheric pressure cancels.' },
      { t: 'card', f: 'Log removal value when nothing is detected in the permeate', b: 'LRV ≥ log(C_feed / detection limit).' },
      { t: 'card', f: 'Three fouling mechanisms', b: 'Pore blocking, pore constriction (adsorption), cake layer.' },
      { t: 'card', f: 'What to do with a large reversible vs irreversible resistance?', b: 'κ_rev large → backflush more often/longer. κ_irr large → pretreatment (coagulation, PAC), chemicals in backflush, CIP.' },
      { t: 'card', f: 'Why no chemical cleaning in GDM?', b: 'It would destroy the biofilm that stabilises the flux (21S-4e).' },
      { t: 'card', f: 'MF vs UF vs NF vs RO pores and pressures', b: 'MF 0.1–10 µm/0.1–1 bar · UF 0.01–0.1 µm/~1 bar · NF ~1 nm/~10 bar · RO dense/10–100 bar.' },

      { t: 'mcq', q: '15S-4b: after backflush the flux is 280 L/(m²h) at 0.45 bar. Which resistance does this measurement give?', a: ['κ_m + κ_irr', 'κ_irr alone', 'κ_rev', 'κ_m + κ_rev'], x: 'J = ΔP/(µκ) always gives the total resistance present.' },
      { t: 'mcq', q: 'The three flux measurements were taken at 0.6, 0.5 and 0.45 bar. What do you use?', a: ['Each measurement with its own ΔP', 'The design pressure for all', 'The mean pressure', '1 bar for all'], x: 'Classic trap in 15S-4 and 20S-4.' },
      { t: 'mcq', q: 'Pilot tests at 20 °C, plant runs at 5 °C. Design flux?', a: ['Lower: µ(5 °C) = 1.518 vs 1.002 mPa·s → J ≈ 0.66× at the same ΔP and κ', 'Higher', 'The same', '1.03× higher'], x: 'Design at the coldest temperature. (The official 20S-4cii key uses the 1.03 rule instead: 1.03⁻¹⁵ ≈ 0.64.)' },
      { t: 'mcq', q: '17W-1: gravity-driven UF, permeate outlet 70 cm below the water surface. ΔP?', a: ['ρ·g·h = 6867 Pa', '1 atm + ρgh', '0.7 bar', '70 Pa'], x: 'Atmospheric pressure on both sides cancels.' },
      { t: 'mcq', q: '20S-4c-i: 20 000 m³/d production, 20 min filtration, 2 min backflush at 2J. Filtered volume?', a: ['25 000 m³/d = 20 000·20/(20 − 4)', '20 000 m³/d', '22 000 m³/d', '35 000 m³/d'], x: 'Backflush water is permeate that is lost.' },
      { t: 'mcq', q: 'κ_irr is the largest share (20S-4b). Operational consequence?', a: ['Pretreat the feed (coagulation/PAC), chemicals in backflush, chemical cleaning', 'Backflush more often', 'Increase the TMP', 'Nothing – irreversible means harmless'], x: '' },
      { t: 'mcq', q: '14S-4a: 250 000 enterococci/mL in the feed, none detected (LOD 1/mL). Standard LRV ≥ 5?', a: ['Yes: LRV ≥ log(250 000) = 5.4', 'No: LRV cannot be determined', 'No: LRV = 2.5', 'Yes: LRV = ∞'], x: '' },
      { t: 'mcq', q: 'Which configuration tolerates high solids (MBR)?', a: ['Outside-in hollow fibres', 'Inside-out dead-end', 'Inside-out cross-flow at low velocity', 'Spiral-wound'], x: 'But harder to clean, fibre damage possible.' },
      { t: 'mcq', g: 'ufres', q: 'With the 15S-4 numbers (plot), which resistance dominates and what follows?', a: ['Reversible → backflushing is effective; maybe backflush more often', 'Membrane → change membrane', 'Irreversible → CIP needed', 'All equal'], x: 'κ_rev = 1.54·10¹² of 2.11·10¹².' },

      { t: 'trend', q: 'UF at constant TMP: water gets colder. What happens to …', r: [['viscosity', 1], ['flux', -1], ['required membrane area', 1]], x: '' },
      { t: 'trend', q: 'Backflush interval shortened. What happens to …', r: [['average reversible fouling', -1], ['permeate lost for backflushing', 1]], x: 'Trade-off.' },
      { t: 'trend', q: 'Coagulation added as pretreatment. What happens to …', r: [['irreversible fouling (pore constriction)', -1], ['cake formation', 1], ['long-term flux', 1]], x: 'Flocs form a porous, backflushable cake.' },
      { t: 'trend', q: 'Fouled membrane (κ_tot ↑) at constant flux operation. What happens to …', r: [['required TMP', 1], ['energy demand', 1]], x: 'J = ΔP/(µκ).' },

      { t: 'factor', q: 'κ_tot doubles at constant ΔP: flux …', a: ['×½', '×2', '×¼', '×1'], x: '' },
      { t: 'factor', q: '20 °C → 10 °C with the 1.03 rule: flux …', a: ['×0.74', '×0.5', '×1.34', '×0.97'], x: '1.03⁻¹⁰ = 0.74.' },
      { t: 'factor', q: 'Net flux 0.8·J instead of J: area …', a: ['×1.25', '×0.8', '×2', '×1'], x: 'A = Q/J_net.' },

      { t: 'gap', q: 'Membrane flux', f: R`$$J = \frac{\Delta P}{▢}$$`, a: [R`$\mu\,\kappa_{tot}$`, R`$\kappa_{tot}$`, R`$\mu/\kappa_{tot}$`, R`$\rho g h$`], x: '' },
      { t: 'gap', q: 'Net flux with backflush', f: R`$$J_{net} = \frac{J\,t_f - ▢}{t_f + t_b}$$`, a: [R`$J_b\,t_b$`, R`$J\,t_b$`, R`$J_b\,t_f$`, R`$2J$`], x: '' },
      { t: 'gap', q: 'Resistance after backflush', f: R`$$\frac{\Delta P}{\mu\,J_{after}} = \kappa_m + ▢$$`, a: [R`$\kappa_{irr}$`, R`$\kappa_{rev}$`, R`$\kappa_{tot}$`, '0'], x: '' },

      { t: 'order', q: 'UF pilot → full plant (15S-4, 20S-4): order', s: ['Convert all fluxes to m/s and pressures to Pa', 'κ_m from the new membrane', 'κ_tot from the fouled state; κ_m + κ_irr after backflush', 'κ_irr and κ_rev by difference + interpretation', 'Design flux at the coldest T and highest κ', 'Net flux (backflush) → area A = Q/J_net'], x: '' },

      { t: 'bug', q: '15S-4a: new membrane 420 L/(m²h) at 0.6 bar, µ = 1.002·10⁻³ Pa·s. κ_m?', s: ['J = 420 L/(m²h)', 'ΔP = 0.6·10⁵ Pa', 'κ_m = 0.6·10⁵/(1.002·10⁻³·420) = 1.4·10⁵ 1/m'], w: 0, fix: 'J must be in m/s: 420/3.6·10⁶ = 1.167·10⁻⁴ m/s → **κ_m = 5.1·10¹¹ 1/m**.' },
      { t: 'bug', q: '15S-4c: design at 5 °C with the highest resistance κ_tot = 2.11·10¹² and 0.55 bar.', s: ['µ(5 °C) = 1.518·10⁻³ Pa·s', 'J = 0.55·10⁵/(1.518·10⁻³·2.11·10¹²) = 61.7 L/(m²h)', 'A = 15 000 m³/d / J (no correction needed)'], w: 2, fix: 'The backflush (2 min at 2J per 30 min) loses permeate: J_net = 0.8·J → **A = 12 660 m²**.' },

      { t: 'match', q: 'Match the observation with the fouling type', p: [['Flux recovers after backflush', 'Hydraulically reversible (cake)'], ['Recovers only after CIP', 'Chemically reversible'], ['Never recovers', 'Irreversible'], ['Stable low flux without cleaning (GDM)', 'Biofilm equilibrium']], x: '' },
    ],
  });
})();
