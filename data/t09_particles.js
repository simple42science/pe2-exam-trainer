(function () {
  const R = String.raw;
  PE.topic({
    id: 't09', n: 9, title: 'Particle size distributions & the power law', short: 'Particles (PSD)', grp: 'part', pri: 'B', spick: '§9',
    exams: ['14S-3', '15S-1', '18S-1', '21S-3'],
    oneMin: R`Particle size distributions say *how many particles of which size*. Natural waters follow a **power law F_N = A·d^(−β)** (straight line in log–log, slope −β). Integrate it to count particles or volume in a size range. Key insight: **number is dominated by small, volume/mass by large particles** (β ≈ 3), so a filter can remove 97 % of the mass but only 79 % of the particles. Flocculation flattens the curve (β ↓), filters struggle near 1 µm.`,
    learn: [
      {
        h: '📏 Definitions',
        f: [
          { m: R`Q_N(d_p) = \frac{N(d < d_p)}{N_\infty}`, u: '-', w: 'cumulative distribution (0 … 1)' },
          { m: R`q_N = \frac{dQ_N}{d(d_p)} \approx \frac{\Delta Q_N}{\Delta d_p}`, u: '1/µm', w: 'frequency, normalised: ∫ q dd = 1 – **divide by the bin width!**' },
          { m: R`F_N = \frac{dN}{d(d_p)} \approx \frac{\Delta N}{\Delta d_p} = N_\infty\,q_N`, u: '#/(mL µm)', w: 'absolute size distribution function' },
          { m: R`F'_N = \frac{dN}{d\log d_p} = 2.303\,d_p\,F_N`, u: '#/mL', w: 'per decade – the right axis for a log d axis' },
          { m: R`N = \frac{C_{TSS}}{\rho_p\,\pi d^3/6}, \qquad \Omega = N\frac{\pi}{6}d^3 = \frac{C_{TSS}}{\rho_p}`, u: '1/m^3', w: 'number from mass (SI units!); volume fraction: mg/L ÷ g/cm³ = ppm by volume' },
        ],
        li: ['Bin mean: arithmetic (d₁ + d₂)/2 on a linear axis, geometric √(d₁d₂) on a log axis.', 'Same functions by volume/mass: Q_V, q_V (constant density: q_M = q_V).'],
      },
      {
        h: '📉 The power law',
        g: 'psd',
        f: [
          { m: R`F_N = A\,d_p^{-\beta} \;\Leftrightarrow\; \log F_N = \log A - \beta\log d_p`, u: '#/(mL µm)', w: R`A = F_N at d = 1 µm; units of A: # mL⁻¹ µm^(β−1) (asked in 18S-1a!)` },
          { m: R`\beta = -\frac{\log F_2 - \log F_1}{\log d_2 - \log d_1}, \quad A = F_1\,d_1^{\beta}`, u: '-', w: 'two points read from the plot' },
          { m: R`\Delta N_{1\to2} = \frac{A}{1 - \beta}\left(d_2^{1-\beta} - d_1^{1-\beta}\right)`, u: '#/mL', w: 'β = 1: ΔN = A·ln(d₂/d₁)' },
          { m: R`\Delta V_{1\to2} = \frac{\pi A}{6(4 - \beta)}\left(d_2^{4-\beta} - d_1^{4-\beta}\right)`, u: 'µm^3/mL', w: 'β = 4: ΔV = (πA/6)·ln(d₂/d₁); × 10⁻¹² = volume fraction' },
        ],
        li: [R`Approximation $\Delta N \approx F_N(\bar d)\cdot\Delta d$ with $\bar d = \sqrt{d_1d_2}$ – fine for narrow bins, **not** over wide ranges (14S-3a). Say which option you use.`],
        tbl: [['dominated by small particles if …', 'number', 'surface', 'volume / mass'], ['β >', '1', '3', '4']],
        note: 'Natural waters β ≈ 2.7–3.2 → number: small particles, surface: balanced, volume/mass: large particles.',
      },
      {
        h: '🧹 Removal & processes',
        f: [{ m: R`\eta_N = 1 - \frac{\Delta N_e}{\Delta N_i}, \qquad \eta_V = \eta_{TSS} = \eta_{TOC} = 1 - \frac{\Delta V_e}{\Delta V_i}`, u: '-', w: 'constant density and composition: mass, TOC ∝ volume' }],
        li: [
          '**Only A changes, β the same:** all sizes removed equally (q_N unchanged); reduction by a factor f in all classes: A_e = A/f (21S-3b).',
          '**Flocculation:** small ↓, large ↑ → curve flatter (β ↓); number drops, volume stays (18S-1e, 21S-3d).',
          '**Sedimentation:** removes the large ones. **Filtration:** worst near 1 µm (Yao minimum); straining, interception and sedimentation remove large ones well (18S-1c).',
          'Which measure for what: mass → TSS & standards; volume → filter head loss; surface → adsorption; number → hygiene.',
          'Measurement: Coulter counter (electrical sensing zone), light blockage/scattering, laser diffraction, microscopy (SEM/TEM), turbidity (NTU, not size resolved), TSS. Mostly spheres assumed – state the method.',
          'Sizes: viruses 0.01–0.1 µm · bacteria 0.5–2 · Crypto 3–5 · Giardia 8–15 · algae 5–100 · clay < 2 · colloids 0.001–1 µm.',
          'Process selection (Boller & Kaegi): < 0.5 µm perikinetic flocculation, UF · 0.5–30 µm orthokinetic flocculation + sedimentation/filtration, MF · > 30 µm screens, sedimentation · > 50 mg TSS/L: settle/float before filtering.',
        ],
      },
      {
        h: '📊 q_M constant within a class (15S-1)',
        li: [R`$q_M = \frac{\text{mass fraction of the class}}{\Delta d}$ – rectangles; $Q_M$ rises linearly inside the class.`, 'Volume fraction = (m_i/ρ_i)/Σ(m/ρ); number fraction = (V_i/(π/6·d̄³))/Σ(…).', '15S-1: small (2 µm, 0.2 g/L, 1.1 g/cm³) vs large (15 µm, 0.3 g/L, 1.5 g/cm³): small = **47.6 % of the volume** but **99.7 % of the number**.'],
      },
      {
        h: '📝 Worked example 18S-1',
        ex: { t: 'Number vs TOC removal in a rapid sand filter', s: [
          'Read: influent F_N ≈ 3.16·10⁷·d⁻³, effluent ≈ 1.0·10⁷·d⁻⁴ (A units: µm²/cm³ for β = 3, µm³/cm³ for β = 4).',
          'Number 1–50 µm: ΔN_i = 3.16·10⁷/2·(1 − 50⁻²) = 1.58·10⁷; ΔN_e = 10⁷/3·(1 − 50⁻³) = 3.33·10⁶ → **η_N = 79 %**.',
          'Volume: ΔV_i = π·3.16·10⁷/6·(50 − 1) = 8.1·10⁸; ΔV_e = π·10⁷/6·ln 50 = 2.05·10⁷ (β = 4 case!) → **η_TOC = 97 %**.',
          'Bacteria removed only 63 %: Yao minimum near 1 µm, attachment efficiency size dependent, straining only for large particles.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Q_N, q_N, F_N – what is what?', b: 'Q_N cumulative fraction (0–1); q_N = ΔQ_N/Δd frequency [1/µm]; F_N = ΔN/Δd absolute [#/(mL·µm)] = N_total·q_N.' },
      { t: 'card', f: 'F′_N (per decade)', b: R`$F'_N = dN/d\log d = 2.303\,d\,F_N$ [#/mL] – use with a log d axis.` },
      { t: 'card', f: 'Power law and its log form', b: R`$F_N = A d^{-\beta}$ ⇔ log F = log A − β·log d (slope −β, A = F_N at 1 µm).` },
      { t: 'card', f: 'Units of A in F_N = A·d^−β', b: '# mL⁻¹ µm^(β−1) (β = 3: µm²/mL; β = 4: µm³/mL).' },
      { t: 'card', f: 'Number of particles between d₁ and d₂', b: R`$\Delta N = \frac{A}{1-\beta}(d_2^{1-\beta} - d_1^{1-\beta})$; β = 1: A·ln(d₂/d₁).` },
      { t: 'card', f: 'Particle volume between d₁ and d₂', b: R`$\Delta V = \frac{\pi A}{6(4-\beta)}(d_2^{4-\beta} - d_1^{4-\beta})$; β = 4: (πA/6)·ln(d₂/d₁).` },
      { t: 'card', f: 'Dominance rules', b: 'Number dominated by small particles if β > 1, surface if β > 3, volume/mass if β > 4.' },
      { t: 'card', f: 'Typical β of natural waters', b: '≈ 2.7–3.2 → number: small, volume: large particles.' },
      { t: 'card', f: 'What does flocculation do to the PSD?', b: 'Small particles disappear, large ones appear → flatter line (β ↓); total number ↓, total volume constant.' },
      { t: 'card', f: 'A filter removes the same fraction in every size class. Effect on A and β?', b: 'β unchanged, A ÷ f (21S-3b: ÷10 000).' },
      { t: 'card', f: 'Typical sizes: viruses, bacteria, Crypto, Giardia', b: '0.01–0.1 µm · 0.5–2 µm · 3–5 µm · 8–15 µm.' },
      { t: 'card', f: 'Which measure for what purpose?', b: 'Mass → TSS/standards; volume → filter head loss; surface → adsorption; number → hygiene.' },
      { t: 'card', f: 'Number from a mass concentration', b: R`$N = C_{TSS}/(\rho_p\pi d^3/6)$ – all in SI.` },

      { t: 'mcq', q: '18S-1: the same filter removes 79 % by number but 97 % by TOC. Why?', a: ['The effluent line is steeper (β 3 → 4): relatively more small particles pass; small particles dominate the number, large ones the volume', 'TOC is measured with a different method', 'The filter removes TOC chemically', 'Number counts are always lower'], x: 'Different weighting of sizes.' },
      { t: 'mcq', q: 'For 1–50 µm with β = 4 you need the volume integral. Which form?', a: ['ΔV = (πA/6)·ln(d₂/d₁)', 'ΔV = πA/(6(4 − β))·(…)', 'ΔV = A/(1 − β)·(…)', 'ΔV = πA/6·(d₂ − d₁)'], x: 'The general formula would divide by zero.' },
      { t: 'mcq', q: '14S-3a: "You cannot assume a linear PSD in 0.5–2 µm". What do you do?', a: ['Integrate the power law between the limits', 'Use F_N at the arithmetic mean × Δd', 'Use F_N at 0.5 µm × Δd', 'Read Q_N from a graph'], x: 'Over a factor 4 the approximation is too rough.' },
      { t: 'mcq', q: 'Coagulation–flocculation before a filter changes the raw-water PSD how?', a: ['Fewer small, more large particles – the line becomes flatter', 'More small particles – steeper line', 'A drops, β constant', 'No change'], x: '18S-1e sketch.' },
      { t: 'mcq', q: 'Why are bacteria (≈ 1 µm) removed worse than the 1–50 µm average in a filter?', a: ['Transport efficiency η has its minimum near 1 µm; attachment may also be size dependent', 'Bacteria are positively charged', 'Bacteria are denser than water', 'Large particles block the filter'], x: '18S-1c: give two reasons.' },
      { t: 'mcq', q: 'Which property does a surface-based PSD matter for?', a: ['Adsorption of metals and organics', 'Filter head loss', 'Hygiene', 'TSS standards'], x: '' },
      { t: 'mcq', q: '15S-1b: arithmetic class means 2 µm and 15 µm. Number fraction of the small class ≈ 99.7 %, volume fraction ≈ 48 %. Why so different?', a: ['Number ∝ V/d³: a 2 µm particle has 1/422 of the volume of a 15 µm one', 'Densities differ by a factor 1000', 'The small class contains more mass', 'Because q_M is constant'], x: '(15/2)³ = 422.' },
      { t: 'mcq', g: 'psd', gp: { la: 7, b: 3 }, q: 'Raw water with β = 3 (plot). Which statement is right?', a: ['Number dominated by small, volume by large particles', 'Number and volume dominated by small particles', 'Number dominated by large particles', 'Surface dominated by large particles'], x: 'β > 1 but < 4.' },

      { t: 'trend', q: 'Raw water is flocculated. What happens to …', r: [['β', -1], ['total particle number', -1], ['total particle volume', 0]], x: 'Ω is conserved in macro-flocculation.' },
      { t: 'trend', q: 'A filter removes 90 % in every size class. What happens to …', r: [['A', -1], ['β', 0], ['q_N (shape)', 0]], x: 'Parallel line on log–log paper.' },
      { t: 'trend', q: 'β increases (steeper line) at constant A. What happens to …', r: [['share of small particles', 1], ['number between 1 and 10 µm', -1]], x: 'At d > 1 µm, d^−β drops faster.' },

      { t: 'factor', q: 'Particle diameter ×2: particle volume …', a: ['×8', '×4', '×2', '×16'], x: '' },
      { t: 'factor', q: 'All classes reduced by 10 000 (slow sand filter, 21S-3b): A …', a: ['×10⁻⁴', '×10⁻²', '×1', '×10⁻⁸'], x: 'β unchanged.' },
      { t: 'factor', q: 'F′_N vs F_N at d = 10 µm: F′_N/F_N …', a: ['×23', '×10', '×2.3', '×100'], x: '2.303·d.' },

      { t: 'gap', q: 'Number of particles in a size range', f: R`$$\Delta N = \frac{A}{▢}\left(d_2^{1-\beta} - d_1^{1-\beta}\right)$$`, a: [R`$1 - \beta$`, R`$4 - \beta$`, R`$\beta$`, R`$\beta - 1$`], x: '' },
      { t: 'gap', q: 'Volume of particles in a size range', f: R`$$\Delta V = \frac{\pi A}{6(▢)}\left(d_2^{4-\beta} - d_1^{4-\beta}\right)$$`, a: [R`$4 - \beta$`, R`$1 - \beta$`, R`$3 - \beta$`, R`$\beta$`], x: '' },
      { t: 'gap', q: 'Logarithmic distribution', f: R`$$F'_N = ▢\cdot d_p\,F_N$$`, a: ['2.303', '1', 'π/6', '0.434'], x: 'ln 10.' },

      { t: 'order', q: 'PSD task with a plot (18S-1, 21S-3): order', s: ['Read two points of each line (log ΔN/Δd vs log d)', 'β = −slope, A = F₁·d₁^β (+ units of A)', 'Integrate ΔN (or ΔV, special case β = 4) between the limits', 'Removal η = 1 − ΔN_e/ΔN_i (or by volume)', 'Interpret: number vs mass, process effects'], x: '' },

      { t: 'bug', q: '14S-3a: F_N = 8·10⁵·d⁻⁴ [mL⁻¹µm⁻¹]. Bacteria 0.5–2 µm per mL?', s: ['β = 4, A = 8·10⁵', 'ΔN = A/(1 − β)·(d₂^(1−β) − d₁^(1−β))', 'ΔN = F_N(1.25 µm) × 1.5 µm = 3.3·10⁵ × 1.5 ≈ 5·10⁵ per mL'], w: 2, fix: 'Integrate: 8·10⁵/(−3)·(2⁻³ − 0.5⁻³) = **2.1·10⁶ per mL** (official). The linear estimate is far off.' },

      { t: 'match', q: 'Match the size range with the suitable separation process', p: [['< 0.5 µm (colloids, viruses)', 'Perikinetic flocculation, UF'], ['0.5–30 µm', 'Orthokinetic flocculation + settling/filtration, MF'], ['> 30 µm', 'Screens, sedimentation'], ['> 50 mg TSS/L', 'Settle or float before filtering']], x: 'Boller & Kaegi chart.' },
    ],
  });
})();
