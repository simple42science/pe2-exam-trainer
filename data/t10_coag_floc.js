(function () {
  const R = String.raw;
  PE.topic({
    id: 't10', n: 10, title: 'Coagulation & flocculation', short: 'Coag. & flocculation', grp: 'part', pri: 'B', spick: '§10',
    exams: ['14S-3', '18W-4', '20S-1', '22S-4', '22W-4'],
    oneMin: R`**Coagulation** (seconds, rapid mixing) removes the particles' electric "force field" so they *can* stick – 4 mechanisms. **Flocculation** (20–30 min, gentle mixing) makes them *collide*: Brownian (micro, small particles), shear (macro, G), differential settling. Macro-flocculation is 1st order in N with **Ω = π/6·d³·N constant**; in a **CSTR use effluent conditions**. Power from G: **P = G²·µ·V**.`,
    learn: [
      {
        h: '⚡ Why colloids are stable',
        g: 'dlvo',
        li: [
          'Most natural particles are **negative** at pH 7 → electric double layer → repulsion beats van der Waals at intermediate distance = **energy barrier**. Van der Waals cannot be changed, repulsion can.',
          R`Double-layer thickness $\kappa^{-1} \approx 0.30\,\text{nm}/\sqrt{I}$ (25 °C): higher ionic strength → thinner layer.`,
          'Surface charge from: isomorphous substitution (Al³⁺ for Si⁴⁺ in clays), adsorption of ions (NOM, phosphate), ionisation of –COOH/–OH (pH dependent).',
          'pH_zpc: bacteria 2–4, algae 3–5, humic acid 3, silica 2–3.5, clays 2.5–4.6 (negative at pH 7) | Al(OH)₃ 7.5–8.5, Fe(OH)₃ 8.5 (positive at pH 7).',
        ],
      },
      {
        h: '🧲 Four coagulation mechanisms',
        g: 'coagdose',
        tbl: [
          ['mechanism', 'how', 'overdose?'],
          ['(a) double-layer compression', 'counter-ions shrink the layer (Al³⁺ ≫ Ca²⁺ ≫ Na⁺)', 'no restabilisation'],
          ['(b) adsorption & charge neutralisation', 'hydrolysed Al/Fe, cationic polymers cancel the charge; dose ∝ surface', '**charge reversal → restabilisation**'],
          ['(c) sweep floc', 'Al(OH)₃/Fe(OH)₃ precipitate enmeshes particles; robust', 'no'],
          ['(d) bridging', 'long polymers bind several particles', 'steric restabilisation'],
        ],
        li: ['Alum: Al₂(SO₄)₃ → 2 Al³⁺; Al³⁺ + 3 H₂O → Al(OH)₃ + 3 H⁺ (−3 Alk per Al).', 'Clean water with few particles is hard to flocculate: small Ω → add particles/sludge recycle, sweep floc, ballast.'],
      },
      {
        h: '💥 Collision frequencies β',
        g: 'collision',
        f: [
          { m: R`r_{ij} = \alpha\,\beta_{ij}\,n_i\,n_j \quad (\text{equal sizes: } r = \tfrac12\alpha\beta n^2)`, u: '#/(m^3 s)', w: 'α attachment efficiency (sticking/colliding)' },
          { m: R`\beta_\mu = \frac{2k_BT}{3\mu}\left(\frac{1}{d_i} + \frac{1}{d_j}\right)(d_i + d_j) \quad\text{equal sizes:}\quad  \frac{8k_BT}{3\mu}`, u: 'm^3/s', w: 'micro (perikinetic, Brownian) – size independent for equal sizes' },
          { m: R`\beta_M = \frac{G}{6}(d_i + d_j)^3 \quad\text{equal sizes:}\quad  \frac{4}{3}G\,d^3`, u: 'm^3/s', w: 'macro (orthokinetic, shear)' },
          { m: R`\beta_{DS} = \frac{\pi(\rho_p - \rho_w)g}{72\mu}(d_i + d_j)^3\,|d_i - d_j|`, u: 'm^3/s', w: 'differential sedimentation – zero for equal sizes' },
        ],
        trap: 'In a **CSTR** use the **effluent** particle size for β_M: d³ = 6Ω/(π·N_e) (20S-1c). Units: µm → m, per mL → per m³ (×10⁶).',
      },
      {
        h: '🏭 Reactor models',
        f: [
          { m: R`\frac{dN}{dt} = -\frac{4\alpha\Omega G}{\pi}N \;(\text{macro}), \qquad \frac{dN}{dt} = -\frac{4\alpha k_BT}{3\mu}N^2 \;(\text{micro})`, u: '#/(m^3 s)', w: R`$\Omega = \frac{\pi}{6}d^3N$ = floc volume fraction, **constant** → $N_1d_1^3 = N_2d_2^3$` },
        ],
        tbl: [
          ['', 'micro', 'macro'],
          ['batch / PFR', R`$N = \frac{N_0}{1 + \frac{4\alpha k_BT}{3\mu}N_0t}$`, R`$N = N_0\exp\left(-\frac{4\alpha\Omega G}{\pi}t\right)$`],
          ['CSTR', R`$0 = N_0 - N - \frac{4\alpha k_BT}{3\mu}N^2\tau$`, R`$\frac{N_0}{N} = 1 + \frac{4\alpha\Omega G\tau}{\pi}$`],
          ['m CSTRs', 'quadratic per tank', R`$\frac{N_0}{N} = \left(1 + \frac{4\alpha\Omega G\tau}{\pi m}\right)^m$`],
        ],
        li: [
          R`Half-lives: macro $t_{1/2} = \frac{\pi\ln2}{4\alpha\Omega G}$, micro $t_{1/2} = \frac{3\mu}{4\alpha k_BTN_0}$. Adding coagulant raises Ω massively → much faster (18W-4e: 481 h → 91 s).`,
          R`Break-up (qualitative): $\frac{N_0}{N} = \frac{1 + K_AG\Omega\tau}{1 + K_BG^\delta\tau}$, δ ≈ 2, $r_B = K_BG^\delta$ → optimum **G ≈ 60–80 s⁻¹**; more tanks in series always help.`,
        ],
      },
      {
        h: '🌀 Energy input & G',
        f: [
          { m: R`G = \sqrt{\frac{P}{\mu V}} \;\Leftrightarrow\; P = G^2\mu V`, u: '1/s', w: 'Camp–Stein; colder water (higher µ) → more power for the same G' },
          { m: R`P = N_P\,\rho\,n^3D^5 \;(\text{turbine}), \quad P = \frac{C_DA_P\rho v_r^3}{2},\; v_r = 0.75\cdot2\pi r n \;(\text{paddle})`, u: 'W', w: 'n in **rev/s** (MWH lists rev/min!)' },
          { m: R`P = \rho g Q h_L, \quad G = \sqrt{\frac{\rho g h_L}{\mu\tau}}`, u: 'W', w: 'hydraulic flocculator' },
        ],
        li: ['Typical: rapid mix G 600–1000 s⁻¹ (seconds); flocculation G 10–80 s⁻¹, 20–30 min, tapered.', 'Power numbers N_P: flat-blade turbine 3.6, pitched blade 1.26, hydrofoil 0.2–0.3.'],
        tip: 'CSTR task gives N₀/N (or the effluent size)? Solve the macro CSTR equation for G, then P = G²µV – no paddle formula, no reading G from the break-up figure (22W-4b).',
      },
      {
        h: '📝 Worked examples',
        ex: { t: '22S-4: one CSTR flocculator (10 → 100 µm)', s: [
          'Ω constant: N_e = N₀·(d₀/d_e)³ = 10⁵·(0.1)³ = **100 per mL** (dummy 10⁴).',
          'Ω = π/6·(10⁻⁵)³·10¹¹ = 5.24·10⁻⁵; τ = 30/(6000/86 400) = 432 s.',
          'G = π(N₀/N − 1)/(4αΩτ) = π·999/(4·5.24·10⁻⁵·432) = 34 700 s⁻¹ → P = G²µV = **47 MW** at 10 °C (36 MW at 20 °C).',
          'Absurd on purpose: a 1000-fold reduction in one small CSTR is hopeless.',
        ] },
      },
      {
        ex: { t: '20S-1: G, removal and micro vs macro', s: [
          'G = √(2500/(1.31·10⁻³·100)) = **138 s⁻¹**.',
          'τ = 1440 s → N₀/N = 1 + 4·0.25·5·10⁻⁴·138·1440/π = 32.7 → **N/N₀ = 0.031**.',
          'Effluent: N_e = 3.1·10¹⁰ m⁻³ → d³ = 6Ω/(πN_e) → d ≈ 31 µm → β_M = 4/3·G·d³ = 5.7·10⁻¹² ≫ β_µ = 8k_BT/(3µ) = 8·10⁻¹⁸ m³/s → micro negligible.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Coagulation vs flocculation', b: 'Coagulation: destabilise (rapid mixing, seconds, high G). Flocculation: make particles collide and grow (slow mixing, 20–30 min, G 10–80 s⁻¹).' },
      { t: 'card', f: 'Why are colloids stable?', b: 'Negative surface charge → electric double layer → repulsion exceeds van der Waals attraction at intermediate distance (energy barrier).' },
      { t: 'card', f: 'Double-layer thickness vs ionic strength', b: R`$\kappa^{-1} \approx 0.30\,\text{nm}/\sqrt{I}$ – higher I, thinner layer.` },
      { t: 'card', f: 'The four coagulation mechanisms', b: '(a) double-layer compression, (b) adsorption + charge neutralisation, (c) sweep floc, (d) inter-particle bridging.' },
      { t: 'card', f: 'Which mechanisms show restabilisation?', b: 'Charge neutralisation (charge reversal) and bridging (steric). Compression and sweep floc do not.' },
      { t: 'card', f: 'β for Brownian collisions of equal particles', b: R`$\beta_\mu = 8k_BT/(3\mu)$ – independent of size.` },
      { t: 'card', f: 'β for shear collisions of equal particles', b: R`$\beta_M = \frac43 G d^3$.` },
      { t: 'card', f: 'Macro-flocculation rate law and what stays constant', b: R`$dN/dt = -\frac{4\alpha\Omega G}{\pi}N$ with Ω = π/6·d³·N constant → N₁d₁³ = N₂d₂³.` },
      { t: 'card', f: 'Macro-flocculation in a CSTR', b: R`$N_0/N = 1 + 4\alpha\Omega G\tau/\pi$.` },
      { t: 'card', f: 'G and power', b: R`$G = \sqrt{P/(\mu V)}$, $P = G^2\mu V$.` },
      { t: 'card', f: 'Why is there an optimum G?', b: 'More G = more collisions but also floc break-up (r_B = K_B·G^δ, δ ≈ 2) → optimum ≈ 60–80 s⁻¹.' },
      { t: 'card', f: 'Effect of adding coagulant on macro-flocculation speed', b: 'Precipitated hydroxide raises Ω massively → t½ = π·ln2/(4αΩG) drops (18W-4: 481 h → 91 s).' },
      { t: 'card', f: 'pH_zpc of Al(OH)₃ and Fe(OH)₃', b: '7.5–8.5 and 8.5 → positive at pH 7 (bacteria, clay, humics are negative).' },

      { t: 'mcq', q: '20S-1c: is it reasonable to neglect micro-flocculation in the CSTR?', a: ['Yes – with the effluent floc size (≈ 31 µm) β_M ≈ 6·10⁻¹² ≫ β_µ ≈ 8·10⁻¹⁸ m³/s', 'No – β_µ is always larger', 'Yes – because G > 100 s⁻¹', 'Cannot be checked without break-up data'], x: 'Use effluent conditions in a CSTR.' },
      { t: 'mcq', q: '22S-4: particles grow from 10 to 100 µm at constant Ω. Effluent number?', a: ['N₀/1000', 'N₀/10', 'N₀/100', 'N₀'], x: '(10/100)³ = 1/1000.' },
      { t: 'mcq', q: '22W-4b: required mixing power for a CSTR flocculator – how?', a: ['Solve N₀/N = 1 + 4αΩGτ/π for G, then P = G²µV', 'Paddle formula with C_D', 'Read G from the break-up figure', 'P = ρ·g·Q·h_L'], x: 'The tip on the Spick.' },
      { t: 'mcq', q: 'Overdosing a cationic polymer causes …', a: ['charge reversal and restabilisation', 'better flocculation', 'double-layer compression', 'sweep floc'], x: 'Narrow optimum dose for charge neutralisation.' },
      { t: 'mcq', q: 'Which collision mechanism dominates for particles below ~1 µm?', a: ['Brownian (perikinetic, micro)', 'Shear (orthokinetic, macro)', 'Differential sedimentation', 'Straining'], x: 'Fig. 21 / collision graph.' },
      { t: 'mcq', q: '22S-4c: the water warms from 10 to 20 °C. Power for the same G?', a: ['Lower (47 → 36 MW) because µ drops', 'Higher', 'Unchanged', 'Depends on α'], x: 'P ∝ µ.' },
      { t: 'mcq', q: '18W-4c: during batch macro-flocculation the volume fraction Ω …', a: ['stays constant (particles merge)', 'decreases', 'increases', 'oscillates'], x: '' },
      { t: 'mcq', q: 'Why are several flocculation tanks in series better than one?', a: ['A CSTR works at effluent conditions; a cascade approaches plug flow', 'More tanks give more G', 'Break-up only happens in the first tank', 'Ω increases from tank to tank'], x: 'Same reactor logic as §0.' },
      { t: 'mcq', g: 'coagdose', gp: { m: 'b' }, q: 'The plot shows mechanism (b). What happens at high dose?', a: ['Charge reversal → restabilisation (turbidity rises again)', 'Sweep floc', 'Nothing – residual stays low', 'Double-layer compression'], x: '' },

      { t: 'trend', q: 'Ionic strength increases (salt added). What happens to …', r: [['double-layer thickness', -1], ['energy barrier', -1], ['coagulation tendency', 1]], x: 'Mechanism (a).' },
      { t: 'trend', q: 'Velocity gradient G is raised from 30 to 300 s⁻¹. What happens to …', r: [['collision rate', 1], ['floc break-up', 1], ['mixing power', 1]], x: 'P ∝ G², break-up ∝ G^δ.' },
      { t: 'trend', q: 'Coagulant (100 mg/L Al(OH)₃) added before batch flocculation. What happens to …', r: [['Ω', 1], ['half-life of primary particles', -1]], x: '18W-4e.' },
      { t: 'trend', q: 'Water gets colder. What happens to …', r: [['viscosity µ', 1], ['power for the same G', 1], ['β_µ (Brownian)', -1]], x: 'β_µ = 8k_BT/(3µ).' },

      { t: 'factor', q: 'G doubles in a turbulent mixer: power P …', a: ['×4', '×2', '×8', '×1.41'], x: 'P = G²µV.' },
      { t: 'factor', q: 'Turbine speed n doubles: power P …', a: ['×8', '×4', '×2', '×32'], x: 'P = N_P·ρ·n³·D⁵.' },
      { t: 'factor', q: 'Floc diameter ×10 at constant Ω: number …', a: ['×1/1000', '×1/10', '×1/100', '×1'], x: '' },
      { t: 'factor', q: 'Equal particles, d doubles: β_M …', a: ['×8', '×4', '×2', '×1'], x: 'β_M ∝ d³; β_µ stays the same.' },

      { t: 'gap', q: 'Macro-flocculation in one CSTR', f: R`$$\frac{N_0}{N} = 1 + \frac{4\alpha\,▢\,G\tau}{\pi}$$`, a: [R`$\Omega$`, R`$N_0$`, R`$k_BT$`, R`$d$`], x: 'Ω = floc volume fraction.' },
      { t: 'gap', q: 'Camp–Stein', f: R`$$G = \sqrt{\frac{P}{▢}}$$`, a: [R`$\mu V$`, R`$\rho V$`, R`$\mu Q$`, R`$V$`], x: '' },
      { t: 'gap', q: 'Shear collision frequency (equal sizes)', f: R`$$\beta_M = \frac{4}{3}\,G\,▢$$`, a: [R`$d^3$`, R`$d^2$`, R`$d$`, R`$k_BT$`], x: '' },
      { t: 'gap', q: 'Brownian collision frequency (equal sizes)', f: R`$$\beta_\mu = \frac{8\,k_B\,T}{▢}$$`, a: [R`$3\mu$`, R`$3\rho$`, R`$\mu d$`, R`$6\pi\mu$`], x: '' },

      { t: 'order', q: 'CSTR flocculator power (22S-4 / 22W-4): order', s: ['Effluent number: N_e = N₀(d₀/d_e)³ (Ω const.)', 'Ω = π/6·d₀³·N₀ in SI units', 'τ = V/Q', 'G from N₀/N = 1 + 4αΩGτ/π', 'P = G²µV with µ at the water temperature'], x: '' },
      { t: 'order', q: 'Micro vs macro: which dominates? (18W-4a, 20S-1c)', s: ['Decide the particle size to use (CSTR: effluent!)', 'β_µ = 8k_BT/(3µ)', 'β_M = 4/3·G·d³ (d in m)', 'Compare and conclude in one sentence'], x: '' },

      { t: 'bug', q: '20S-1c: CSTR, N₀ = 10⁶/mL, N/N₀ = 0.031, Ω = 5·10⁻⁴. Particle size for β_M?', s: ['In a CSTR the rate is evaluated at tank (= effluent) conditions', 'Use the influent number: d³ = 6Ω/(π·N₀) with N₀ = 10¹² m⁻³', 'd ≈ 9.8 µm → β_M = 4/3·G·d³'], w: 1, fix: 'Use the **effluent** number N_e = 3.1·10¹⁰ m⁻³ → d ≈ 31 µm → β_M = 5.7·10⁻¹² m³/s.' },
      { t: 'bug', q: '22S-4b: Ω = 5.24·10⁻⁵, τ = 432 s, α = 1, N₀/N = 1000. G?', s: ['N₀/N − 1 = 4αΩGτ/π', 'G = π·999/(4·5.24·10⁻⁵·432)', 'G = 3.5·10⁴ s⁻¹', 'P = G·µ·V = 3.5·10⁴·1.3·10⁻³·30 = 1.4 kW'], w: 3, fix: 'P = **G²**·µ·V = (3.47·10⁴)²·1.307·10⁻³·30 = **47 MW**.' },

      { t: 'match', q: 'Match the coagulant mechanism with its typical agent', p: [['Double-layer compression', 'High concentration of counter-ions (salt)'], ['Charge neutralisation', 'Hydrolysed Al/Fe species, cationic polymer'], ['Sweep floc', 'High alum/Fe dose → hydroxide precipitate'], ['Bridging', 'Long-chain polymer']], x: '' },
    ],
  });
})();
