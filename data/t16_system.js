(function () {
  const R = String.raw;
  PE.topic({
    id: 't16', n: 16, title: 'System integration: raw water → treatment train', short: 'System integration', grp: 'sys', pri: 'C', spick: '§16',
    exams: [],
    oneMin: R`Read a raw-water analysis like a detective in **three passes**: (1) compare every parameter with the **standards**, (2) identify the **source** from the clues (temperature, O₂, hardness, variability, typical contaminants), (3) choose processes and put them in a **sensible order** – particles before disinfection, ozone before biological carbon, iron before manganese, a residual at the end. Always justify (multi-barrier, by-products, cost, robustness).`,
    learn: [
      {
        h: '📋 Swiss standards (TBDV) – quality goal (SVGW W12) in brackets',
        tbl: [
          ['parameter', 'limit'],
          ['turbidity', '≤ 1 NTU (< 0.2)'],
          ['TOC / DOC', '≤ 1 mg/L'],
          ['NH₄⁺', '0.5 aerobic / 0.1 anaerobic (< 0.05)'],
          ['NO₃⁻ / NO₂⁻', '40 (< 25) / 0.1 (< 0.01) mg/L'],
          ['Fe total / Mn', '0.2 mg/L (dissolved < 0.05) / 50 µg/L (dissolved < 0.02 mg/L)'],
          ['pesticides', '0.1 µg/L each'],
          ['PCE, TCE', '10 µg/L each'],
          ['F⁻ · EDTA · bromate', '1.5 (< 0.5) · 0.2 mg/L · 10 µg/L'],
          ['E. coli, enterococci', 'not detectable in 100 mL'],
          ['pH · T · O₂', '6.8–8.2 · 8–15 °C · 20–100 % saturation'],
        ],
        li: ['Hardness: 1 mmol/L (Ca + Mg) = 2 meq/L = **10 °fH** = 5.6 °dH = 40 mg Ca/L; soft < 1.5, medium 1.5–2.5, hard > 2.5 mmol/L.'],
      },
      {
        h: '🔍 Diagnosis: clue → source',
        tbl: [
          ['clue', 'source'],
          ['T constant ≈ 10 °C', 'groundwater / deep lake'],
          ['T varying, warm in summer', 'surface / river water'],
          ['T ≈ 4 °C all year', 'lake hypolimnion'],
          ['O₂ = 0, Fe²⁺, Mn²⁺, NH₄⁺, NO₂⁻, no NO₃⁻', 'reduced (anoxic) groundwater'],
          ['O₂ supersaturation, high/varying pH', 'photosynthesis → surface water'],
          ['turbidity peaks after rain + hard water + varying DOC/germs', 'karst spring'],
          ['atrazine, high nitrate', 'agriculture'],
          ['PCE/TCE', 'industrial contamination'],
          ['EDTA', 'wastewater influence'],
          ['high Cl⁻ / Br⁻', 'sea or road salt (bromate risk with O₃!)'],
          ['taste & odour, high DOC', 'algae, eutrophic water'],
        ],
      },
      {
        h: '🧰 Contaminant → process',
        tbl: [
          ['problem', 'processes'],
          ['particles / turbidity', 'coag. → floc. → sed. → filtr. (conventional), direct/in-line filtration, MF/UF, slow sand'],
          ['pathogens', 'Cl₂, O₃, UV, UF, slow sand (multi-barrier); protozoa: UF/UV; viruses: Cl₂/O₃'],
          ['NOM / DOC / colour', 'enhanced coagulation, O₃ + BAC, GAC, NF'],
          ['micropollutants', 'O₃/AOP, GAC/PAC, NF/RO'],
          ['VOCs (PCE, TCE)', 'air stripping, GAC'],
          ['Fe / Mn', 'oxidation + (biological) filtration; KMnO₄ for Mn'],
          ['NH₄⁺', 'biological nitrification (breakpoint chlorination possible, high Cl₂ demand)'],
          ['NO₃⁻ · hardness · salts', 'denitrification, IX, RO · softening, NF · RO/NF'],
          ['arsenic · fluoride · radon · H₂S', 'oxidise As(III) → coag./IX/RO · activated alumina · aeration · aeration/oxidation'],
          ['algae · taste & odour', 'DAF, microscreens · O₃/AOP, GAC/PAC'],
        ],
      },
      {
        h: '🏭 Example trains from the lecture',
        li: [
          '**Karst with PCE/TCE, atrazine, turbidity (Jura):** O₃ + H₂O₂ (AOP) → flocculant → rapid sand filter → GAC → Cl₂.',
          '**Reduced groundwater with Fe/Mn/NH₄⁺ (Alpnach):** aeration → Fe filter → nitrification → Mn filter / KMnO₄; in-situ only with little NH₄⁺.',
          '**River with algae, T&O, bromide (Warnow):** pre-ozonation → sedimentation → two-layer filter → O₃ → GAC.',
          '**Lake Zurich (Lengg):** pre-ozonation → rapid filter → intermediate ozonation → GAC → slow sand filter → pH correction.',
          '**Karst + faecal bacteria:** Al flocculation → sedimentation → sand filter *or* UF → O₃ → biological GAC → Cl₂ or UV.',
          'Generic surface water: screen → (air stripping) → coag./floc. → sed. → rapid filter → AC → disinfection. Membrane train: screen → microscreen → MF/UF (→ RO) → disinfection.',
        ],
        tip: 'Justify the order: particles **before** disinfection (shielding), O₃ **before** biological GAC (AOC removal), iron **before** manganese, pretreatment **before** RO, residual chlorine **at the end** for the network.',
      },
      {
        h: '⚖️ Process choice – factors',
        li: ['Raw-water quality & variability · target (standards) · plant size · cost (capex/opex, energy, chemicals) · residuals/sludge · robustness & ease of operation · multi-barrier · by-product formation · space · sustainability.'],
      },
      {
        h: '📝 Worked cases',
        ex: { t: 'Water type 1: karst spring in the Jura', s: [
          'Fails: atrazine 150 ng/L (> 100), PCE 20 µg/L, TCE 15 µg/L (> 10), turbidity up to 150 FTU; DOC 1–5 variable; hard (122 mg Ca/L ≈ 30 °fH).',
          'Source: ~10 °C, very variable turbidity/DOC, hard, agriculture + industry → **karst spring**.',
          'Train: **AOP (O₃ + H₂O₂) → flocculant → rapid sand filter → GAC → Cl₂** (AOP for atrazine/solvents that react poorly with O₃; floc + filter for turbidity peaks; GAC for residues and AOC; Cl₂ residual). Alternative for solvents: air stripping (PCE H ≈ 0.4–0.8).',
        ] },
      },
      {
        ex: { t: 'Water type 2: reduced groundwater in Alpnach', s: [
          'Fails: Fe 6.6 mg/L, Mn 0.22 mg/L, NH₄⁺ 1.2 mg/L (anaerobic limit 0.1); O₂ = 0, nitrate < 0.01 → **reduced groundwater**.',
          'In-situ? O₂ demand: NH₄⁺ 2·7·10⁻⁵ + Fe ¼·1.17·10⁻⁴ = 1.69·10⁻⁴ M vs 8 mg/L O₂ (2.5·10⁻⁴ M) → **E ≈ 1.5** → not economical (without NH₄⁺ E ≈ 10).',
          'Above ground: **aeration (O₂ in, CO₂ out → pH ↑) → Fe(II) filter → nitrification → Mn filter (or KMnO₄) → disinfection**.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Three passes to read a raw-water analysis', b: '1) compare with standards, 2) identify the source from the clues, 3) choose processes, order them and justify.' },
      { t: 'card', f: 'Swiss limits for PCE/TCE and pesticides', b: '10 µg/L each; pesticides 0.1 µg/L each.' },
      { t: 'card', f: 'Hardness conversions', b: '1 mmol/L (Ca + Mg) = 10 °fH = 5.6 °dH = 40 mg Ca/L; soft < 1.5, hard > 2.5 mmol/L.' },
      { t: 'card', f: 'Clue: O₂ = 0, Fe²⁺, Mn²⁺, NH₄⁺, no nitrate', b: 'Reduced (anoxic) groundwater.' },
      { t: 'card', f: 'Clue: constant 4 °C all year', b: 'Deep lake water (hypolimnion) – water is densest at 4 °C.' },
      { t: 'card', f: 'Clue: turbidity peaks after rain, hard water, variable DOC', b: 'Karst spring.' },
      { t: 'card', f: 'Clue: EDTA in the raw water', b: 'Wastewater influence.' },
      { t: 'card', f: 'Bromide in the raw water – what to keep in mind?', b: 'Ozonation forms bromate (limit 10 µg/L).' },
      { t: 'card', f: 'Why a biological filter after ozonation?', b: 'Ozone creates AOC; bacteria on BAC/sand consume it and prevent regrowth in the network.' },
      { t: 'card', f: 'Why particles before disinfection?', b: 'Particles shield pathogens from chlorine and UV.' },
      { t: 'card', f: 'Lake Zurich (Lengg) train', b: 'Pre-ozonation → rapid filter → intermediate ozonation → GAC → slow sand filter → pH correction.' },
      { t: 'card', f: 'Processes for VOCs (PCE, TCE)', b: 'Air stripping, GAC (or AOP).' },
      { t: 'card', f: 'Factors for process selection', b: 'Quality & variability, target, size, cost, energy, chemicals, residuals, robustness, multi-barrier, DBPs, space, sustainability.' },

      { t: 'mcq', q: 'A water has 4–8 °C all year, DOC 1.2 mg/L, EDTA 2 µg/L. Source?', a: ['Lake water from the hypolimnion with slight wastewater influence', 'Karst spring', 'Reduced groundwater', 'River water'], x: 'Lake Zurich.' },
      { t: 'mcq', q: 'Why is in-situ iron removal not economical for the Alpnach groundwater?', a: ['NH₄⁺ consumes most of the injected O₂ (E ≈ 1.5)', 'Too much manganese', 'Too cold', 'Too much nitrate'], x: '' },
      { t: 'mcq', q: 'Karst spring with atrazine and PCE: why AOP rather than ozone alone?', a: ['Atrazine and chlorinated solvents react slowly with O₃ but fast with •OH', 'AOP leaves a residual', 'AOP removes turbidity', 'Ozone forms THMs'], x: '' },
      { t: 'mcq', q: 'Which ordering is correct for a reduced groundwater with Fe, Mn and NH₄⁺?', a: ['Aeration → Fe filter → nitrification → Mn filter → disinfection', 'Mn filter → Fe filter → aeration', 'Chlorine → Mn filter → Fe filter', 'GAC → aeration → Fe filter'], x: 'Mn bacteria are inhibited by Fe²⁺ and NH₄⁺.' },
      { t: 'mcq', q: 'Which process is the safest barrier against Cryptosporidium?', a: ['UF or UV', 'Free chlorine', 'Monochloramine', 'Aeration'], x: '' },
      { t: 'mcq', q: 'You propose ozonation for a water with high bromide. What must you mention?', a: ['Bromate formation (10 µg/L limit) – control or choose another process', 'THM formation', 'NDMA formation', 'Nothing'], x: '' },
      { t: 'mcq', q: 'Why is breakpoint chlorination not favoured for ammonium removal?', a: ['≈ 7.6 mg Cl₂ per mg N and chlorinated by-products; nitrification is cheaper', 'It does not remove ammonium', 'It produces nitrate', 'It needs UV'], x: '' },
      { t: 'mcq', q: 'RO for inland brackish water – what must you mention?', a: ['Pretreatment against fouling/scaling and the concentrate disposal', 'That RO removes no ions', 'That RO needs no energy', 'Bromate formation'], x: '' },

      { t: 'trend', q: 'Ozonation is added to a train. What happens to …', r: [['AOC (biodegradable carbon)', 1], ['need for a biological filter afterwards', 1], ['bromate risk (if Br⁻ present)', 1]], x: '' },
      { t: 'trend', q: 'Raw water turbidity increases. What happens to …', r: [['UV disinfection efficiency', -1], ['chlorine demand', 1], ['need for particle removal upstream', 1]], x: '' },

      { t: 'order', q: 'Karst spring with PCE/TCE, atrazine and turbidity (Jura): order the train', s: ['O₃ + H₂O₂ (AOP)', 'Flocculant dosing', 'Rapid sand filter', 'GAC', 'Chlorination'], x: 'Lecture solution, water type 1.' },
      { t: 'order', q: 'Lake Zurich (Lengg) treatment train: order', s: ['Pre-ozonation', 'Rapid filtration', 'Intermediate ozonation', 'GAC', 'Slow sand filtration', 'pH correction'], x: '' },
      { t: 'order', q: 'Generic surface-water treatment: order', s: ['Screen', 'Coagulation / flocculation', 'Sedimentation', 'Rapid filtration', 'Activated carbon', 'Disinfection'], x: '' },
      { t: 'order', q: 'Karst spring with faecal bacteria: order', s: ['Al flocculation', 'Sedimentation', 'Sand filter or UF', 'Ozonation', 'Biological GAC', 'Chlorine or UV'], x: '' },

      { t: 'bug', q: 'Proposed train for a lake water with algae and bromide:', s: ['Screen and microscreen against algae', 'Chlorination first to kill algae and pathogens', 'Coagulation, flocculation, sedimentation', 'Rapid filter, then GAC'], w: 1, fix: 'Disinfect **after** particle removal (shielding) – and pre-chlorination of algae-rich water forms many THMs. Use pre-ozonation with bromate control or oxidise later.' },

      { t: 'match', q: 'Match the clue with the water source', p: [['Constant ≈ 10 °C, O₂ = 0, Fe²⁺', 'Reduced groundwater'], ['Turbidity peaks, hard, variable DOC', 'Karst spring'], ['4 °C all year', 'Lake hypolimnion'], ['O₂ supersaturation, varying pH', 'Surface water with algae']], x: '' },
      { t: 'match', q: 'Match the contaminant with a suitable process', p: [['PCE / TCE', 'Air stripping or GAC'], ['Atrazine', 'AOP or GAC'], ['Ammonium', 'Biological nitrification'], ['Cryptosporidium', 'UF or UV'], ['Nitrate', 'Denitrification, IX or RO']], x: '' },
    ],
  });
})();
