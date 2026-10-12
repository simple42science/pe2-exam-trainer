(function () {
  const R = String.raw;
  PE.topic({
    id: 't02', n: 2, title: 'Scaling: calcite, struvite, gypsum', short: 'Scaling', grp: 'chem', pri: 'A', spick: '§2',
    exams: ['17S-2', '19S-2', '20S-2', '21S-1', '23S-2'],
    oneMin: R`Minerals crystallise where you don't want them: calcite in boilers and digesters, struvite in digester outlet pipes, gypsum on RO membranes. The **saturation index** says *whether*, a **mass balance + carbonate system** says *how much*. The trigger is almost always the same: **CO₂ escapes → pH rises → CO₃²⁻ / PO₄³⁻ rise → the ion product crosses the solubility product.**`,
    learn: [
      {
        h: '📐 Saturation index',
        f: [
          { m: R`SI = \log\frac{IAP}{K_{s0}} = \log\{\text{Ca²⁺}\} + \log\{\text{CO₃²⁻}\} + \text{p}K_{s0}`, u: '-', w: 'SI > 0 supersaturated (can precipitate) · = 0 equilibrium · < 0 undersaturated (dissolves)' },
          { m: R`K'_{s0} = \frac{K_{s0}}{\gamma_{Ca}\gamma_{CO_3}} = [\text{Ca}][\text{CO₃}]`, u: 'mol^2/L^2', w: 'conditional constant → use concentrations; digester supernatant γ₂ ≈ 0.4 → pK′ ≈ 7.67 instead of 8.48' },
          { m: R`IAP_{struvite} = [\text{Mg²⁺}][\text{NH₄⁺}][\text{PO₄³⁻}]`, u: 'mol^3/L^3', w: 'struvite MgNH₄PO₄·6H₂O' },
          { m: R`[\text{PO₄³⁻}] = \frac{P_T}{1 + \frac{h}{K_3} + \frac{h^2}{K_2K_3}}, \quad [\text{NH₄⁺}] = \frac{N_T}{1 + 10^{\text{pH} - \text{p}K}}`, u: 'mol/L', w: R`$h = 10^{-\text{pH}}$; $P_T$, $N_T$ total phosphate / ammonia` },
        ],
        tbl: [['mineral', 'pK_s0 (25 °C)', 'exam values'], ['calcite CaCO₃', '8.48 (aragonite 8.34, vaterite 7.91)', 'pK′ 7.7'], ['gypsum CaSO₄', '4.6', 'log K′ −4.658'], ['struvite', '13.3', 'pK′ 11.7–11.8'], ['hydroxyapatite', '114', ''], ['vivianite Fe₃(PO₄)₂', '≈ 32', '']],
        note: 'SI gives only the **direction**. The precipitation potential (amount until SI = 0) is the quantitative risk; real plants simulate it (PHREEQC).',
      },
      {
        h: '🫕 Why the digester outlet clogs',
        p: [R`Proteins break down to NH₄⁺ and HCO₃⁻ → supernatant has **NH₄⁺ ≈ HCO₃⁻ ≈ 40–70 mmol/L**. The biogas is ~35 % CO₂ and the pressure grows by **0.1 bar per metre** of depth, so lots of CO₂ stays dissolved and keeps the pH near 7. Leaving the tank, the pressure drops, CO₂ degasses, pH rises – calcite or struvite crash out in the pipe.`],
        g: 'alk',
      },
      {
        h: '🧾 Recipe: pH in a digester & CO₂ volatilisation',
        rec: [
          R`$p_{CO_2} = x_{CO_2}\,(p_{gas} + 0.1\,\tfrac{\text{atm}}{\text{m}}\cdot\tfrac{h}{2})$ – pressure at **mid-depth**.`,
          R`$[\text{H₂CO₃}] = K_H\,p_{CO_2}$ (K_H in mmol/(L·bar)) or $= p_{CO_2}/(H_{YC}RT)$.`,
          R`$[\text{HCO₃⁻}] \approx$ Alk → $\text{pH} = \text{p}K_1 + \log\frac{[\text{HCO₃⁻}]}{[\text{H₂CO₃}]}$; $C_T = [\text{H₂CO₃}] + [\text{HCO₃⁻}]$.`,
          R`CO₂ loss (x % of $C_T$): **Alk unchanged**, new H₂CO₃ = $C_T^{new}$ − Alk → new pH.`,
          R`$[\text{CO₃²⁻}] = [\text{HCO₃⁻}]\cdot10^{\text{pH} - \text{p}K_2}$ → $[\text{Ca}]_{eq} = K'_{s0}/[\text{CO₃²⁻}]$ → ΔCa = Ca₀ − Ca_eq.`,
          R`Precipitation **and** degassing together: Alk_new = Alk − 2ΔCa, $C_T^{new} = C_T$ − ΔCa − ΔCO₂, solve with K′ (17S-2e).`,
        ],
        trap: 'Use the **given** conditional pK′ (e.g. 7.7), not 8.48. And CO₂ loss never changes the alkalinity; CaCO₃ precipitation removes **2** Alk per Ca.',
      },
      {
        h: '💬 Qualitative answers',
        li: [
          '**Temperature:** calcite is *less* soluble when hot (retrograde) and CO₂ escapes on heating → kettles, boilers, heat exchangers scale.',
          '**pH rise in pipes:** CO₂ loss by pressure drop, turbulence, pumps, digester outlet; also photosynthesis, aeration, heating. Rough surfaces / seed crystals start growth.',
          '**Cation sources in digester supernatant:** Ca/Mg from drinking water hardness, Ca from zeolites (detergents), Mg²⁺ and K⁺ = counter-ions of polyphosphate released in EBPR, Fe²⁺ from reduced Fe(III) precipitates (→ vivianite), NH₄⁺/HCO₃⁻ from protein degradation.',
          '**Less precipitates in reality:** kinetics, complexation, inhibitors, a certain supersaturation is needed (21S-1d).',
          '**Struvite limiter:** usually Mg (NH₄⁺ and PO₄ are abundant) → controlled recovery by dosing MgO/MgCl₂.',
          '**RO membrane:** concentration polarisation multiplies **all** ions (and I) by β; pH ≈ bulk → check SI at the membrane (19S-2, 15W-4c).',
        ],
      },
      {
        h: '📝 Worked examples',
        ex: { t: '17S-2: calcite in a digester (verified)', s: [
          'p = 0.97 + 0.1·5 = 1.47 bar at mid-depth; p_CO₂ = 0.40·1.47 = 0.588 bar → H₂CO₃ = 25.5·0.588 = **15 mM**.',
          'pH = 6.2 + log(60/15) = **6.8**.',
          'CO₃²⁻ = 60·10^(6.8−10) = 0.038 mM → Ca_eq = 10^−7.7 / 3.8·10⁻⁵ = 0.53 mM → **ΔCa = 7.48 mM** (93 %).',
          'ΔAlk = 2·7.48 = **15 mM**.',
          'e) Half the remaining Ca (0.26 mM) to precipitate → CO₃²⁻ = 0.076 mM → pH ≈ 7.23 (HCO₃⁻ ≈ 45 mM) → C_T 56.4 → 48.6 mM → **≈ 7.5 mM CO₂** must volatilise.',
        ] },
      },
      {
        ex: { t: '20S-2: struvite in the digester outlet', s: [
          'p_CO₂ = 0.4·1.5 = 0.6 atm → H₂CO₃ = 0.6/(1.5·0.08206·308) = 0.0158 M → HCO₃⁻ = 0.0158·10^(7.5−6.3) = **0.25 M = Alk**.',
          'Mg 1.44 mM; NH₄⁺ = 85.7/(1 + 10^(7.5−9.3)) = 84.4 mM; PO₄³⁻ = 0.258 mM / 31 400 = 8.2·10⁻⁹ M.',
          'IAP = 10^−12.0 → **SI = −0.2** (slightly undersaturated in the digester).',
          'SI = 0 needs ×1.6 PO₄³⁻ → pH ≈ 7.68; Alk constant → H₂CO₃ = 0.25·10^(6.3−7.68) = 0.0105 M → **ΔCO₂ ≈ 0.005 mol/L**. Hypothesis confirmed.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Saturation index: formula and meaning of the sign', b: R`$SI = \log(IAP/K_{s0})$: > 0 supersaturated (precipitation possible), 0 equilibrium, < 0 undersaturated.` },
      { t: 'card', f: 'What is a conditional solubility product K′_s0?', b: R`$K'_{s0} = K_{s0}/(\gamma_{Ca}\gamma_{CO_3})$ – activity coefficients included, so you insert concentrations.` },
      { t: 'card', f: 'pK_s0 of calcite, gypsum, struvite', b: 'Calcite 8.48 (cond. 7.7 in digesters) · gypsum 4.6 · struvite 13.3 (exams: cond. 11.7–11.8).' },
      { t: 'card', f: 'Struvite IAP and the PO₄³⁻ speciation', b: R`$[\text{Mg}][\text{NH₄}][\text{PO₄}]$ with $[\text{PO₄³⁻}] = P_T/(1 + h/K_3 + h^2/(K_2K_3))$, $[\text{NH₄⁺}] = N_T/(1 + 10^{\text{pH}-\text{p}K})$.` },
      { t: 'card', f: 'CO₂ partial pressure in a digester for the H₂CO₃ calculation?', b: R`At **mid-depth**: $p_{CO_2} = x_{CO_2}(p_{gas} + 0.1\cdot h/2)$ [bar or atm, 0.1 per m].` },
      { t: 'card', f: 'Typical digester supernatant composition', b: 'NH₄⁺ ≈ HCO₃⁻ ≈ 40–70 mmol/L, pH ≈ 7–7.5, biogas ≈ 35 % CO₂ / 65 % CH₄.' },
      { t: 'card', f: 'CaCO₃ precipitation of ΔCa: effect on Alk and C_T?', b: 'ΔAlk = −2ΔCa, ΔC_T = −ΔCa.' },
      { t: 'card', f: 'Why do kettles and heat exchangers scale?', b: 'Calcite has **retrograde** solubility (less soluble when hot) and CO₂ escapes on heating → pH ↑.' },
      { t: 'card', f: 'Name the cation sources in digester supernatant', b: 'Hardness of drinking water (Ca, Mg), zeolites from detergents (Ca), polyphosphate counter-ions released in EBPR (Mg²⁺, K⁺), reduced Fe(III) precipitates (Fe²⁺), protein degradation (NH₄⁺).' },
      { t: 'card', f: 'Why does less precipitate than calculated?', b: 'Kinetics, complexation, inhibitors, and a certain supersaturation is needed before crystals form.' },
      { t: 'card', f: 'SI vs precipitation potential', b: 'SI = direction only. Precipitation potential = amount that must precipitate until SI = 0 → the quantitative risk.' },
      { t: 'card', f: 'Scaling at an RO membrane: what do you multiply?', b: 'All ion concentrations (and the ionic strength) by β = C_M/C_F; pH ≈ bulk; then SI at the membrane.' },

      { t: 'mcq', q: 'The calculation gives SI(struvite) = −0.2 inside the digester. Meaning?', a: ['Slightly undersaturated – no precipitation inside yet', 'Strongly supersaturated', 'Exactly at equilibrium', 'Precipitation potential is 0.2 mol/L'], x: '20S-2b. A modest CO₂ loss (≈ 5 mM) then pushes it over SI = 0.' },
      { t: 'mcq', q: 'What triggers struvite/calcite clogging in the digester outlet pipe?', a: ['CO₂ degassing at lower pressure → pH ↑ → CO₃²⁻ / PO₄³⁻ ↑', 'Cooling of the sludge → higher solubility', 'Oxygen entering → oxidation of Fe²⁺', 'Alkalinity increase by NH₃ release'], x: 'Inside: high CO₂ pressure keeps pH low. Outside: pressure drops.' },
      { t: 'mcq', q: 'Why is struvite precipitation extremely pH sensitive?', a: ['The PO₄³⁻ fraction grows 10–100× per pH unit (pH far below pK₃)', 'Mg²⁺ becomes MgOH⁺', 'NH₄⁺ concentration increases with pH', 'The solubility product depends on pH'], x: 'Only a tiny fraction is PO₄³⁻ at neutral pH, but it rises steeply (NH₄⁺ even decreases slightly).' },
      { t: 'mcq', q: 'Digester 10 m deep, headspace 0.97 bar, 40 % CO₂, +0.1 bar/m. Which p_CO₂?', a: ['0.40 × (0.97 + 0.5) = 0.588 bar', '0.40 × 0.97 = 0.388 bar', '0.40 × (0.97 + 1.0) = 0.788 bar', '0.97 bar'], x: '17S-2a: conditions at mid-depth are representative.' },
      { t: 'mcq', q: 'What usually limits struvite formation in digester supernatant?', a: ['Mg²⁺', 'NH₄⁺', 'PO₄³⁻', 'CO₃²⁻'], x: 'Ammonium and phosphate are abundant; recovery plants dose MgO/MgCl₂.' },
      { t: 'mcq', q: '"How much CO₂ must escape to start struvite precipitation?" – best approach?', a: ['Find the pH where SI = 0; at constant Alk compute H₂CO₃ (or C_T) there; the difference is ΔCO₂', 'Set Alk = 0 and solve for C_T', 'Use Henry’s law with the atmospheric CO₂', 'Subtract the struvite precipitated from C_T'], x: '20S-2c, 23S-2b.' },
      { t: 'mcq', q: 'The task gives pK′ = 7.7 for calcite, your sheet says 8.48. Which do you use?', a: ['7.7 – the conditional value of the task', '8.48 – the thermodynamic value', 'The mean, 8.1', 'Calculate γ and correct 7.7 again'], x: 'Conditional constants already contain the activity coefficients of the supernatant.' },
      { t: 'mcq', q: '7.48 mmol/L calcite precipitates (17S-2c). Alkalinity loss?', a: ['15 mmol/L', '7.48 mmol/L', '3.7 mmol/L', '0 – precipitation does not change Alk'], x: 'Each CaCO₃ removes 2 equivalents.' },
      { t: 'mcq', q: '21S-1d: "Will all of the calculated Ca²⁺ actually precipitate?"', a: ['No – kinetics, complexation and inhibitors; supersaturation is needed', 'Yes – equilibrium is always reached in pipes', 'Yes, and even more because of CO₂ loss', 'No, because calcite is retrograde'], x: 'One sentence with the mechanism is enough.' },

      { t: 'trend', q: 'CO₂ escapes from digestate in the outlet pipe. What happens to …', r: [['pH', 1], ['CO₃²⁻', 1], ['SI of calcite', 1], ['alkalinity', 0]], x: 'Horizontal move in the alkalinity map.' },
      { t: 'trend', q: 'Water is **heated** in a boiler. What happens to …', r: [['calcite solubility', -1], ['dissolved CO₂', -1], ['scaling risk', 1]], x: 'Retrograde solubility + CO₂ escapes.' },
      { t: 'trend', q: 'Ionic strength increases at constant concentrations. What happens to …', r: [['activity coefficient γ', -1], ['SI (calculated with activities)', -1]], x: 'Lower activities → lower IAP.' },
      { t: 'trend', q: 'Concentration polarisation in an RO module increases (β ↑). What happens at the membrane to …', r: [['[Ca²⁺] and [CO₃²⁻]', 1], ['ionic strength', 1], ['scaling risk', 1]], x: 'Even though γ drops a little, the product of two concentrations rises with β².' },

      { t: 'factor', q: 'SI = +1 means IAP is … × K_s0', a: ['×10', '×1', '×2.7', '×100'], x: 'SI is a log10.' },
      { t: 'factor', q: 'pH 6.8 → 7.8 at constant HCO₃⁻: [CO₃²⁻] changes by …', a: ['×10', '×2', '×100', '×1'], x: R`$[\text{CO₃²⁻}] = [\text{HCO₃⁻}]\cdot10^{\text{pH}-\text{p}K_2}$.` },
      { t: 'factor', q: 'Above pK₂ but far below pK₃ (phosphate): pH +1 → [PO₄³⁻] …', a: ['×10', '×100', '×1000', '×2'], x: 'The h/K₃ term dominates: PO₄³⁻ ∝ 1/h.' },

      { t: 'gap', q: 'Saturation index', f: R`$$SI = \log\frac{▢}{K_{s0}}$$`, a: ['IAP (ion activity product)', R`$K'_{s0}$`, 'precipitation potential', R`$[\text{Ca}]_0$`], x: 'Actual product of the activities vs the equilibrium product.' },
      { t: 'gap', q: 'CO₂ partial pressure in a digester', f: R`$$p_{CO_2} = x_{CO_2}\,(p_{gas} + 0.1\cdot ▢)$$`, a: [R`$h/2$`, R`$h$`, R`$2h$`, R`$h/10.33$`], x: 'Mid-depth, 0.1 bar (or atm) per metre.' },
      { t: 'gap', q: 'Maximum calcite precipitation', f: R`$$[\text{Ca}]_{eq} = \frac{K'_{s0}}{▢}$$`, a: [R`$[\text{CO₃²⁻}]$`, R`$[\text{HCO₃⁻}]$`, R`$C_T$`, R`$\text{Alk}$`], x: 'Then ΔCa = Ca₀ − Ca_eq.' },
      { t: 'gap', q: 'pH in the digester', f: R`$$\text{pH} = \text{p}K_1 + \log\frac{[\text{HCO₃⁻}]}{▢}$$`, a: [R`$[\text{H₂CO₃}]$`, R`$[\text{CO₃²⁻}]$`, R`$C_T$`, R`$K_H$`], x: 'H₂CO₃ from Henry’s law.' },

      { t: 'order', q: 'Calcite in a digester (17S-2 / 21S-1): order the steps', s: [R`$p_{CO_2}$ at mid-depth`, 'H₂CO₃ from Henry (K_H·p or p/(H·R·T))', 'pH = pK₁ + log(HCO₃⁻/H₂CO₃)', R`CO₃²⁻ = HCO₃⁻·10^{pH − pK₂}`, 'Ca_eq = K′/CO₃²⁻ → ΔCa = Ca₀ − Ca_eq', 'ΔAlk = 2ΔCa'], x: 'Spick §2 recipe.' },
      { t: 'order', q: 'Struvite hypothesis test (20S-2, 23S-2): order the steps', s: ['Alk ≈ HCO₃⁻ from p_CO₂ and pH', 'Speciation at the digester pH: Mg²⁺, NH₄⁺, PO₄³⁻', 'SI = log IAP + pK′', 'Target pH where SI = 0', 'At constant Alk: H₂CO₃ (C_T) at the target pH → ΔCO₂ to volatilise'], x: 'The answer confirms or rejects "CO₂ release causes the clogging".' },

      { t: 'bug', q: '17S-2a: headspace 0.97 bar, depth 10 m, 40 % CO₂, K_H 25.5 mmol/(L·bar). H₂CO₃?', s: ['Representative conditions: the gas headspace', 'p_CO₂ = 0.40 × 0.97 = 0.388 bar', 'H₂CO₃ = 25.5 × 0.388 = 9.9 mmol/L'], w: 0, fix: 'Use **mid-depth**: p = 0.97 + 0.1·5 = 1.47 bar → p_CO₂ = 0.588 bar → H₂CO₃ = **15 mM**.' },
      { t: 'bug', q: '21S-1b: C_T = 74.3 mM, Alk = 60 mM, pH 6.82. 10 % of C_T volatilises. New pH?', s: ['New C_T = 0.9 × 74.3 = 66.9 mM', 'Alkalinity also drops by 10 % to 54 mM', 'H₂CO₃ = 66.9 − 54 = 12.9 mM', 'pH = 6.2 + log(54/12.9) = 6.8'], w: 1, fix: 'CO₂ loss leaves Alk = 60 mM → H₂CO₃ = 6.9 mM → pH = 6.2 + log(60/6.9) ≈ **7.1** (official).' },
      { t: 'bug', q: 'Calcite: 2 mM Ca precipitates from a water with Alk 6 mM and C_T 7 mM. New state?', s: ['ΔC_T = −2 mM → C_T = 5 mM', 'ΔAlk = −2 mM → Alk = 4 mM', 'pH = 6.3 + log(4/(5 − 4)) = 6.9'], w: 1, fix: 'ΔAlk = −2ΔCa = −4 mM → Alk = 2 mM (CO₃²⁻ carries 2 equivalents).' },

      { t: 'match', q: 'Match the mineral with where it typically causes trouble', p: [['Calcite CaCO₃', 'Boilers, heat exchangers, digesters'], ['Struvite MgNH₄PO₄·6H₂O', 'Digester outlet pipes of EBPR plants'], ['Gypsum CaSO₄', 'RO membranes at high recovery'], ['Vivianite Fe₃(PO₄)₂', 'Digesters with Fe²⁺ from reduced Fe(III)']], x: 'Spick §2.' },
    ],
  });
})();
