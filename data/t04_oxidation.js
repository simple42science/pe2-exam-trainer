(function () {
  const R = String.raw;
  PE.topic({
    id: 't04', n: 4, title: 'Oxidation of micropollutants (O₃, •OH)', short: 'Oxidation', grp: 'ox', pri: 'A', spick: '§4',
    exams: ['14W-2', '15S-3', '18W-2', '20S-3', '21S-2', '23S-1'],
    oneMin: R`Everything follows from one line: **rate = k·[Ox]·[P]**. With constant oxidant it is pseudo-1st order (k′ = k·[O₃]), so the reactor formulas of §0 apply. The **pH** changes k by orders of magnitude for acids/bases (phenol: phenolate reacts 10⁶× faster), ozone is **selective**, OH radicals attack everything (fraction via R_ct). Typical exam: k_app at the pH → τ in PFR vs CSTR → which pH / NaOH dose / reactor type would do the job.`,
    learn: [
      {
        h: '📈 Second-order kinetics',
        f: [
          { m: R`-\frac{d[P]}{dt} = k\,[\text{Ox}]\,[P] \;\Rightarrow\; \ln\frac{[P]}{[P]_0} = -k\int[\text{Ox}]\,dt`, u: '-', w: R`$\int[\text{Ox}]dt$ = oxidant **exposure** ("ct", M·s)` },
          { m: R`k' = k_{app}[\text{O₃}], \quad t_{1/2} = \frac{\ln 2}{k'}`, u: 's', w: 'pseudo-1st order when [O₃] is constant' },
          { m: R`\text{PFR: } \tau = \frac{\ln(C_0/C)}{k'}, \qquad \text{CSTR: } \tau = \frac{C_0/C - 1}{k'}`, u: 's', w: '' },
        ],
        note: R`Unit bridge: **1 mg/L O₃ = 1/48 000 mol/L = 2.08·10⁻⁵ M**. 99 % → ln 100 = 4.605; 90 % → ln 10.`,
      },
      {
        h: '🧪 pH dependence',
        f: [
          { m: R`k_{app} = \alpha_{HA}\,k_{HA} + \alpha_{A^-}\,k_{A^-}, \quad \alpha_{A^-} = \frac{1}{1 + 10^{\text{p}K_a - \text{pH}}}`, u: 'M^{-1}s^{-1}', w: 'only the pollutant dissociates (O₃, ClO₂)' },
          { m: R`k_{app} = k\,\beta_{HOCl}\,\alpha_{P^-}, \quad \beta_{HOCl} = \frac{1}{1 + 10^{\text{pH} - 7.5}}`, u: 'M^{-1}s^{-1}', w: 'both dissociate (HOCl + phenolate) → **maximum at pH = ½(pK₁ + pK₂)** (phenol + Cl₂: 8.7)' },
        ],
        g: 'kapp',
        li: [
          'Phenol: pKa ≈ 10, k(PH) = 1300, k(P⁻) = 1.4·10⁹ M⁻¹s⁻¹ → phenolate dominates already at pH 7: k_app ≈ k_P⁻·10^(pH−pKa) (×10 per pH unit).',
          'Amines (roxithromycin, pKa 9.2): deprotonated 10⁷, protonated ≈ 1.',
          '**SMX** (pKa 5.5–5.6): the **protonated** form reacts faster (5.7·10⁵ vs 4.7·10⁴) – read the table, never assume!',
          'Sketch log k_app vs pH: low plateau (k_HA) → line with slope +1 → high plateau (k_A⁻) above the pKa.',
        ],
        trap: 'NaOH (pH) acts **exponentially**, more ozone only **linearly** – for phenol the pH is the stronger lever (18W-2b). But compute the NaOH dose with the **carbonate buffer** (15S-3d), and switching CSTR → PFR can beat both (21S-2b).',
      },
      {
        h: '⚡ OH radicals & AOPs',
        f: [
          { m: R`-\frac{d[P]}{dt} = (k_{O_3} + k_{OH}R_{ct})\,[\text{O₃}]\,[P], \quad R_{ct} = \frac{[{}^\bullet\text{OH}]}{[\text{O₃}]}`, u: 'M/s', w: R`$R_{ct}$ typically $10^{-9}$–$10^{-7}$ (Lake Zurich $10^{-8}$)` },
          { m: R`f_{OH} = \frac{k_{OH}R_{ct}}{k_{O_3} + k_{OH}R_{ct}}`, u: '-', w: 'share degraded by radicals; compare k_O₃·[O₃] with k_OH·R_ct·[O₃] (20S-3c)' },
        ],
        li: [
          'R_ct is measured with the probe **pCBA** (k_O₃ < 0.15, k_OH = 5·10⁹): slope of ln(P/P₀) vs O₃ exposure = R_ct·k_OH.',
          '•OH production: O₃ + H₂O₂ (peroxone), UV + H₂O₂, O₃/UV, O₃ + activated carbon, Fenton; chemical-free: VUV, ultrasound, TiO₂/UV, BDD electrolysis.',
          '**Scavengers:** HCO₃⁻/CO₃²⁻ and DOC eat radicals. Ozone-resistant compounds (geosmin, IPMP, atrazine, PCE) are removed mainly by •OH.',
        ],
      },
      {
        h: '🧰 Which oxidant?',
        tbl: [
          ['', 'strengths', 'weaknesses'],
          ['Cl₂/HOCl', 'cheap, network residual, bacteria & viruses', 'THM/HAA, taste, weak vs Crypto, pH dependent'],
          ['NH₂Cl', 'stable residual, fewer THM', 'weak (large CT), NDMA'],
          ['ClO₂', 'hardly pH dependent, few THM', 'chlorite/chlorate, on-site, costly'],
          ['O₃', 'strongest: viruses, Giardia, T&O, colour, micropollutants', 'no residual, **bromate**, **AOC ↑** (needs biological filter), costly'],
          ['UV', 'no chemicals or DBPs, protozoa', 'no residual, turbidity/UV₂₅₄ interfere, adenovirus needs high dose'],
          ['KMnO₄', 'Fe/Mn, taste & odour', 'pink colour, MnO₂ solids'],
        ],
        li: ['Stability in lake water: •OH (µs) ≪ O₃ < ClO₂ < ferrate < HOCl < MnO₄⁻.'],
      },
      {
        h: '📝 Worked example 15S-3 (phenol, PFR vs CSTR, NaOH)',
        ex: { t: 'Open the full walkthrough', s: [
          'α_P⁻ = 1/(1 + 10^(10−7.3)) = 1.99·10⁻³ → k_app = 1300 + 1.4·10⁹·1.99·10⁻³ = 2.79·10⁶ M⁻¹s⁻¹ → k′ = k_app·5·10⁻⁶ M = 13.9 s⁻¹.',
          'a) PFR 80 %: τ = ln 5/13.9 = **0.12 s**.',
          'b) CSTR with the same τ: k′τ = C₀/C − 1 = 4 → k′ = **34.7 s⁻¹** (2.5× more).',
          'c) k_app = 34.7/5·10⁻⁶ = 6.9·10⁶ → α = 4.95·10⁻³ → pH = 10 + log(4.95·10⁻³) = **7.7**.',
          'd) NaOH with the carbonate buffer: C_T constant (5.4 mM), Alk 5.0 → 5.2 mM at pH 7.7 → **ΔNaOH ≈ 0.2 mmol/L** (official 0.0002 mol/L).',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Second-order oxidation kinetics', b: R`$-d[P]/dt = k[\text{Ox}][P]$; constant Ox → pseudo-1st order $k' = k[\text{Ox}]$, $t_{1/2} = \ln2/k'$.` },
      { t: 'card', f: '1 mg/L ozone in mol/L?', b: R`1/48 000 = $2.08\cdot10^{-5}$ M (2 mg/L = 4.17·10⁻⁵ M).` },
      { t: 'card', f: 'k_app when only the pollutant dissociates', b: R`$k_{app} = \alpha_{HA}k_{HA} + \alpha_{A^-}k_{A^-}$, $\alpha_{A^-} = 1/(1 + 10^{\text{p}K_a - \text{pH}})$.` },
      { t: 'card', f: 'Shape of log k_app vs pH', b: 'Plateau k_HA at low pH → straight line with slope +1 → plateau k_A⁻ above the pKa.' },
      { t: 'card', f: 'Phenol + ozone: constants', b: 'pKa ≈ 10; k(phenol) 1300, k(phenolate) 1.4·10⁹ M⁻¹s⁻¹ → phenolate dominates already at pH 7.' },
      { t: 'card', f: 'HOCl + phenol: at which pH is k_app maximal?', b: 'pH = ½(pK_HOCl + pK_phenol) = ½(7.5 + 9.9) ≈ 8.7 (HOCl falls, phenolate rises).' },
      { t: 'card', f: 'SMX: which form reacts faster with ozone?', b: 'The **protonated** form (5.7·10⁵ vs 4.7·10⁴ M⁻¹s⁻¹, pKa ≈ 5.5) – always read the table.' },
      { t: 'card', f: 'Definition of R_ct', b: R`$R_{ct} = [{}^\bullet\text{OH}]/[\text{O₃}]$ = ratio of the exposures; typically 10⁻⁹–10⁻⁷ (Lake Zurich 10⁻⁸).` },
      { t: 'card', f: 'Fraction of a pollutant degraded by OH radicals', b: R`$f_{OH} = k_{OH}R_{ct}/(k_{O_3} + k_{OH}R_{ct})$.` },
      { t: 'card', f: 'How is R_ct measured?', b: 'Probe compound pCBA (reacts with •OH at 5·10⁹, hardly with O₃): slope of ln(P/P₀) vs O₃ exposure = R_ct·k_OH.' },
      { t: 'card', f: 'Ways to produce OH radicals', b: 'O₃ + H₂O₂ (peroxone), UV + H₂O₂, O₃/UV, O₃ + activated carbon, Fenton (Fe²⁺ + H₂O₂); chemical-free: VUV, ultrasound, TiO₂/UV, BDD electrolysis.' },
      { t: 'card', f: 'Scavengers of OH radicals', b: 'HCO₃⁻/CO₃²⁻ (alkalinity) and dissolved organic matter.' },
      { t: 'card', f: 'Why must a biological filter follow ozonation?', b: 'Ozone cracks NOM into biodegradable AOC → bacterial regrowth in the network unless removed (BAC/sand filter).' },
      { t: 'card', f: 'Ozone + bromide?', b: 'Forms **bromate** (carcinogenic, limit 10 µg/L).' },

      { t: 'mcq', q: 'Phenol ozonation at pH 7 (pKa 10). Which form controls k_app?', a: ['Phenolate, although only ~0.1 % is deprotonated', 'Phenol, because 99.9 % is protonated', 'Both contribute equally', 'Neither – OH radicals dominate'], x: '1.4·10⁹ × 10⁻³ = 1.4·10⁶ ≫ 1300.' },
      { t: 'mcq', q: 'A CSTR replaces a PFR at the same τ. What k′ do you need for 80 % removal?', a: ['k′ = (C₀/C − 1)/τ – about 2.5× the PFR value', 'The same k′', 'ln(5)/τ', 'Half the PFR value'], x: '15S-3b: 34.7 vs 13.9 s⁻¹.' },
      { t: 'mcq', q: 'To speed up phenol oxidation in a CSTR, which lever is stronger?', a: ['Raise the pH (exponential effect via phenolate)', 'Double the ozone concentration (linear)', 'Lower the temperature', 'Add bicarbonate'], x: '18W-2b: k_app grows ×10 per pH unit, linear in [O₃].' },
      { t: 'mcq', q: '21S-2b: pH 7 → 7.7 in the CSTR or the same reactor as a plug flow?', a: ['Plug flow wins (99.99 % vs 97.8 %)', 'pH 7.7 wins', 'Both identical', 'Neither reaches 90 %'], x: 'At k′τ = 9, PFR gives e⁻⁹ = 1.2·10⁻⁴.' },
      { t: 'mcq', q: 'k_O₃ = 15 M⁻¹s⁻¹, k_OH = 4.5·10⁹, R_ct = 10⁻⁸. Main pathway?', a: ['OH radicals (k_OH·R_ct = 45 > 15 → 75 %)', 'Ozone (15 > 10⁻⁸)', 'Equal shares', 'Photolysis'], x: 'Diuron in Exercise 2. Compare k_O₃ with k_OH·R_ct, not k_OH directly.' },
      { t: 'mcq', q: '20S-3c: SMX, rate via O₃ = 2.79 s⁻¹, via •OH = 0.02 s⁻¹. Conclusion?', a: ['Radicals are negligible for SMX', 'Radicals dominate', 'Both are equal', 'The reaction is diffusion limited'], x: 'SMX reacts fast with ozone.' },
      { t: 'mcq', q: '15S-3d: How do you compute the NaOH needed to reach pH 7.7?', a: ['C_T constant: Alk(pH 7.7) − Alk(pH 7.3) with the carbonate system', 'ΔNaOH = 10^(−7.3) − 10^(−7.7)', 'ΔNaOH = [OH⁻] at pH 7.7', 'ΔNaOH = Alk·(7.7 − 7.3)'], x: 'The buffer swallows most of the base: ≈ 0.2 mmol/L.' },
      { t: 'mcq', q: 'Which compound class reacts poorly with ozone and needs an AOP?', a: ['Geosmin/IPMP, atrazine, chlorinated solvents', 'Phenols', 'Amines', 'Compounds with C=C double bonds'], x: 'Ozone attacks electron-rich sites; saturated/chlorinated molecules are slow.' },
      { t: 'mcq', g: 'kapp', gp: { pka: 9.2, lha: 0, la: 7, ph: 7 }, q: 'Roxithromycin (amine, pKa 9.2): between pH 6 and 9 the log k_app line has which slope?', a: ['+1 (factor 10 per pH unit)', '0', '+2', '−1'], x: 'Below the pKa, α_A⁻ ≈ 10^(pH−pKa).' },

      { t: 'trend', q: 'Phenol ozonation: pH is raised from 7 to 8. What happens to …', r: [['phenolate fraction', 1], ['k_app', 1], ['required reactor volume', -1]], x: 'k_app × 10.' },
      { t: 'trend', q: 'The water has more alkalinity and DOC (scavengers). What happens to …', r: [['R_ct', -1], ['removal of ozone-resistant compounds', -1], ['O₃ demand for a given exposure', 1]], x: 'Scavengers consume radicals and ozone.' },
      { t: 'trend', q: 'Ozone dose is doubled at constant pH. What happens to …', r: [['k′ = k_app·[O₃]', 1], ['k_app', 0], ['bromate risk (if Br⁻ present)', 1]], x: 'k_app depends on pH, not on [O₃].' },
      { t: 'trend', q: 'Pollutant with small k_O₃: R_ct is increased by H₂O₂ addition. What happens to …', r: [['fraction via OH radicals', 1], ['overall removal', 1], ['selectivity of the treatment', -1]], x: 'Radicals are unselective.' },

      { t: 'factor', q: 'Phenol at pH ≪ pKa: pH +1 → k_app …', a: ['×10', '×100', '×2', '×1'], x: 'Slope +1 in log k vs pH.' },
      { t: 'factor', q: 'Ozone concentration doubled: time for 99 % removal …', a: ['×½', '×2', '×¼', '×1'], x: 't = ln100/(k_app[O₃]).' },
      { t: 'factor', q: '99 % instead of 90 % removal in a PFR: required τ …', a: ['×2', '×10', '×11', '×1.1'], x: 'ln 100 / ln 10 = 2.' },
      { t: 'factor', q: '99 % instead of 90 % removal in a CSTR: required τ …', a: ['×11', '×2', '×10', '×100'], x: '(100 − 1)/(10 − 1) = 11.' },

      { t: 'gap', q: 'Apparent rate constant (only the pollutant dissociates)', f: R`$$k_{app} = \alpha_{HA}k_{HA} + ▢\cdot k_{A^-}$$`, a: [R`$\alpha_{A^-}$`, R`$\alpha_{HA}$`, R`$K_a$`, R`$[\text{O₃}]$`], x: 'Weighted sum over the two forms.' },
      { t: 'gap', q: 'Residence time of a CSTR for an oxidation', f: R`$$\tau = \frac{▢}{k'}$$`, a: [R`$C_0/C - 1$`, R`$\ln(C_0/C)$`, R`$C_0 - C$`, R`$\ln 2$`], x: 'From C/C₀ = 1/(1 + k′τ).' },
      { t: 'gap', q: 'Radical contribution', f: R`$$f_{OH} = \frac{k_{OH}R_{ct}}{k_{O_3} + ▢}$$`, a: [R`$k_{OH}R_{ct}$`, R`$k_{OH}$`, R`$R_{ct}$`, R`$k_{O_3}R_{ct}$`], x: 'Both rates are multiplied by [O₃].' },

      { t: 'order', q: 'Typical oxidation task (15S-3, 18W-2, 21S-2): order the steps', s: [R`$\alpha$ of the reacting form at the given pH`, R`$k_{app} = \alpha_{HA}k_{HA} + \alpha_{A^-}k_{A^-}$`, R`$k' = k_{app}\,[\text{O₃}]$ (O₃ in mol/L!)`, 'τ from the reactor formula (PFR ln, CSTR C₀/C − 1)', 'V = Q·τ; compare options (pH, ozone, reactor type)'], x: 'Write the reactor assumption explicitly.' },

      { t: 'bug', q: 'SMX at pH 7 (pKa 5.6), k(deprot.) 4.7·10⁴, k(prot.) 5.7·10⁵. k_app?', s: ['α_deprot = 1/(1 + 10^(5.6−7)) = 0.96', 'Only the deprotonated form reacts relevantly: k_app ≈ 0.96 × 4.7·10⁴', 'k_app ≈ 4.5·10⁴ M⁻¹s⁻¹'], w: 1, fix: 'Include both forms – here the **protonated** reacts faster: 0.96·4.7·10⁴ + 0.04·5.7·10⁵ = **6.7·10⁴** M⁻¹s⁻¹ (official).' },
      { t: 'bug', q: 'Half-life of As(III) with 2 mg/L O₃, k_app = 1.49·10⁶ M⁻¹s⁻¹?', s: ['k′ = k_app·[O₃]', '[O₃] = 2 mg/L', 'k′ = 1.49·10⁶ × 2 = 3·10⁶ s⁻¹', 't½ = 0.693/k′'], w: 1, fix: '[O₃] in mol/L: 2/48 000 = 4.17·10⁻⁵ M → k′ = 62 s⁻¹ → t½ = **11 ms** (14W-2b).' },

      { t: 'match', q: 'Match the oxidant with its main weakness', p: [['Free chlorine', 'THM/HAA, weak against Crypto'], ['Monochloramine', 'Weak disinfectant (large CT), NDMA'], ['Chlorine dioxide', 'Chlorite/chlorate, made on site'], ['Ozone', 'No residual, bromate, AOC'], ['UV', 'No residual, turbidity interferes']], x: 'Spick §4 table.' },
    ],
  });
})();
