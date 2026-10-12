(function () {
  const R = String.raw;
  PE.topic({
    id: 't12', n: 12, title: 'Granular media filtration', short: 'Filtration', grp: 'part', pri: 'A', spick: '§12',
    exams: ['14W-3', '16S-2', '18S-2', '19S-1', '21W-3', '22S-1'],
    oneMin: R`A rapid filter (pores ~100 µm) removes 1 µm bacteria by **attachment, not sieving**. Three questions: clean-bed **head loss** (Ergun), **removal** (Yao: η = η_I + η_G + η_D, minimum near 1 µm), **run length** = min(t_B breakthrough, t_HL head-loss limit). New grain size? → t_B from σ_B(d), and **recompute h_L0 with Ergun** before t_HL.`,
    learn: [
      {
        h: '🏞️ Slow sand vs rapid filters',
        tbl: [['', 'slow sand', 'rapid'], ['v_F [m/h]', '0.08–0.25', '5–15'], ['grain / bed', '0.15–0.3 mm / 0.9–1.5 m', '0.5–1.2 mm / 0.6–1.8 m'], ['head / run', '0.9–1.8 m / 30–365 d', '1.8–3 m / 1–4 d'], ['mechanism', 'straining + biology (Schmutzdecke)', 'depth filtration (attachment)'], ['cleaning', 'scrape the top layer', 'backwash (water + air)'], ['raw water', '< 10 NTU, pathogens, biodegradables', 'after coagulation/sedimentation']],
        li: ['Dual media: coarse **light** anthracite on top of fine **dense** sand → true depth filtration, restratifies after backwash.', 'Ripening at the start (grains not yet coated), breakthrough at the end.'],
      },
      {
        h: '💧 Clean-bed head loss (Ergun form)',
        f: [
          { m: R`h_L = \kappa_V\frac{\mu(1 - \varepsilon)^2 L v}{\rho g\varepsilon^3 d^2} + \kappa_I\frac{(1 - \varepsilon)L v^2}{\varepsilon^3 g d}`, u: 'm', w: 'viscous + inertial term; sand κ_V 110–115, κ_I 2–2.5, ε 0.40–0.43; anthracite κ_V 210–245, κ_I 3.5–5.3, ε 0.47–0.52' },
          { m: R`v = k_p\frac{h_L}{L} \;\Rightarrow\; k_p = \frac{vL}{h_L}`, u: 'm/s', w: 'Darcy permeability; layers in series add head losses (Schmutzdecke share = h_L,SD/h_L,tot, 14W-3c)' },
        ],
        li: ['Laminar (small Re): the viscous term dominates → h_L ∝ v and ∝ 1/d². Larger grains or porosity → less head loss.', 'Backwash: fluidisation at h_L = (ρ_p − ρ_w)(1 − ε)L/ρ_w; expansion L_E = L(1 − ε)/(1 − ε_E).'],
      },
      {
        h: '🎯 Yao model (removal)',
        f: [
          { m: R`\ln\frac{C}{C_0} = -\frac{3}{2}\frac{(1 - \varepsilon)\,\alpha\,\eta\,L}{d_c}, \quad \eta = \eta_I + \eta_G + \eta_D`, u: '-', w: 'α attachment efficiency (≈ 1 after good coagulation), d_c grain (collector) diameter' },
          { m: R`\eta_I = \frac32\left(\frac{d_p}{d_c}\right)^2,\quad \eta_G = \frac{(\rho_p - \rho_w)g\,d_p^2}{18\mu v_F} = \frac{v_s}{v_F},\quad \eta_D = 4\,Pe^{-2/3}`, u: '-', w: R`$Pe = \frac{3\pi\mu d_pd_cv_F}{k_BT}$` },
          { m: R`L = \frac{2\,d_c\,\ln(C_0/C)}{3(1 - \varepsilon)\,\alpha\,\eta}`, u: 'm', w: '2 log: ln 100 = 4.6 (21W-3b: 7.8 m for Crypto!)' },
        ],
        g: 'yao',
        li: [
          'd_p × 5: η_I and η_G × 25, η_D × 5^(−2/3) = 0.34 (16S-2c).',
          'v_F ↑: η_G and η_D ↓ → worse. T ↑: µ ↓ → η_G ↑ and Pe ↓ → η_D ↑ → better (21W-3d). Smaller grains: better removal, more head loss (21W-3e).',
          R`Macroscale: $C = C_0e^{-\lambda L}$, $\partial\sigma/\partial t = v_F\lambda C$; λ = λ₀ + kσ (ripening), Tien adds a breakthrough term. λ → 0 = hardly any removal (≠ clogged).`,
        ],
      },
      {
        h: '⏱️ Solids storage & run length',
        g: 'filterrun',
        f: [
          { m: R`\sigma = \frac{v_F\,C_0\,t}{L}, \qquad H_L(t) = h_{L0} + k_{HL}\,\sigma`, u: 'mg/L', w: 'average deposit if everything is retained uniformly; k_HL in L·m/mg' },
          { m: R`\boxed{t_B = \frac{\sigma_B\,L}{v_F\,C_0}} \qquad \boxed{t_{HL} = \frac{(h_{L,max} - h_{L0})\,L}{k_{HL}\,v_F\,C_0}}`, u: 'h', w: 'run length = min(t_B, t_HL); total head at breakthrough H = h_L0 + k_HL·σ_B' },
        ],
        li: [
          'Fits: σ_B = b₁·d^m₁, k_HL = b₂·d^m₂ (straight lines in log–log): larger d → t_B ↓, t_HL ↑; optimum t_B ≈ t_HL.',
          R`Net production $v_{net} = (v_Ft_{run} - v_bt_b)/(t_{run} + t_b)$; lowering v_F alone does not raise throughput much (22S-1c).`,
        ],
        tbl: [['increase of …', 't_B', 't_HL'], ['grain size', '↓', '↑'], ['bed depth', '↑', '↓'], ['filtration rate / C₀', '↓ / ↓', '↓ / ↓'], ['floc strength', '↑', '↓']],
        tip: 'New grain size: σ_B(d) → t_B; **Ergun at the new d → h_L0**, then t_HL; the run is the shorter. Never back-calculate d with Ergun when t_B is given (22S-1a).',
      },
      {
        h: '📉 Pressure profile',
        li: ['Deposits concentrate head loss where they sit. **Cake at the surface** → almost all head lost in the top layer → pressure below can drop under atmospheric → gas release, air binding (bad). Deep-bed filtration spreads the loss (good).', 'Why the water level must rise during a run: deposits narrow the pores, resistance ↑, constant v_F needs more head.'],
      },
      {
        h: '📝 Worked examples',
        ex: { t: '22S-1: finer anthracite – which limit ends the run?', s: [
          'a) Breakthrough after 48 h: σ_B = 48·14·2.4/1.9 = 849 mg/L = 800·d^(−0.8) → **d = 0.93 mm** (not Ergun!).',
          'b) d = 0.74 mm: σ_B = 1015 → t_B = 1015·1.9/(14·2.4) = **57.4 h**.',
          'Ergun at 0.74 mm: h_L0 = 0.223 + 0.031 = **0.25 m**; k_HL = 0.00246 → t_HL = (2.5 − 0.25)·1.9/(0.00246·14·2.4) = **51.6 h** → head loss limits.',
          'c) Lower v_F: not substantially – there is one optimum where both limits coincide.',
        ] },
      },
      {
        ex: { t: '21W-3: sand filter for Cryptosporidium (Yao)', s: [
          'v_F = 12 m/h; η_I = 1.5·(5/500)² = 1.5·10⁻⁴; η_G = 3.6·10⁻⁴ (largest); η_D = 5·10⁻⁵ → η = 5.6·10⁻⁴.',
          'L = 2·0.0005·4.605/(3·0.58·0.6·5.6·10⁻⁴) = **7.8 m**.',
          'Ergun at 7.8 m: viscous 6.07 + inertial 0.28 → **h_L ≈ 6.4 m** of water column.',
          '25 °C: η = 6.8·10⁻⁴ → C/C₀ = 0.0037 (better). Smaller grains: better removal, more head.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Main removal mechanism of rapid filtration', b: 'Particle **attachment** after transport to the grain (depth filtration), not size exclusion.' },
      { t: 'card', f: 'Ergun head loss – the two terms', b: R`Viscous $\kappa_V\mu(1-\varepsilon)^2Lv/(\rho g\varepsilon^3d^2)$ + inertial $\kappa_I(1-\varepsilon)Lv^2/(\varepsilon^3gd)$.` },
      { t: 'card', f: 'Yao model', b: R`$\ln(C/C_0) = -1.5(1-\varepsilon)\alpha\eta L/d_c$, η = η_I + η_G + η_D.` },
      { t: 'card', f: 'Interception and sedimentation efficiencies', b: R`$\eta_I = 1.5(d_p/d_c)^2$; $\eta_G = v_s/v_F = (\rho_p - \rho_w)gd_p^2/(18\mu v_F)$.` },
      { t: 'card', f: 'Diffusion efficiency', b: R`$\eta_D = 4Pe^{-2/3}$, $Pe = 3\pi\mu d_pd_cv_F/(k_BT)$.` },
      { t: 'card', f: 'Where is the minimum of η?', b: 'Near d_p ≈ 1 µm – bacteria and Crypto pass most easily.' },
      { t: 'card', f: 'Time to breakthrough', b: R`$t_B = \sigma_BL/(v_FC_0)$.` },
      { t: 'card', f: 'Time to limiting head loss', b: R`$t_{HL} = (h_{L,max} - h_{L0})L/(k_{HL}v_FC_0)$.` },
      { t: 'card', f: 'Effect of grain size on t_B and t_HL', b: 'Larger grains: t_B ↓ (less storage), t_HL ↑ (less head loss). Optimum: t_B ≈ t_HL.' },
      { t: 'card', f: 'Slow sand filter: mechanism and cleaning', b: 'Straining + biology in the Schmutzdecke; cleaned by scraping the top layer every 1–12 months.' },
      { t: 'card', f: 'Why is negative pressure in a filter bad?', b: 'Dissolved gases come out as bubbles (air binding) and block pores – happens with surface cake.' },
      { t: 'card', f: 'Dual media filter – why that layering?', b: 'Coarse, light anthracite on top catches large particles, fine dense sand below catches fine ones → whole depth used, restratifies after backwash.' },
      { t: 'card', f: 'What does λ → 0 mean?', b: 'The bed hardly removes solids any more (breakthrough) – not the same as clogged.' },

      { t: 'mcq', q: '22S-1a: today\'s run ends by breakthrough after 48 h. How do you find the grain size?', a: ['From σ_B = t_B·v_F·C₀/L and the fit σ_B = 800·d^(−0.8)', 'From Ergun with h_L,max', 'From the head-loss fit k_HL', 'From Yao'], x: 'Breakthrough is about storage, not head loss.' },
      { t: 'mcq', q: '22S-1b: the grain size is reduced by 20 %. Before computing t_HL you must …', a: ['recompute the clean-bed head loss h_L0 with Ergun at the new d', 'keep h_L0 from before', 'set h_L0 = 0', 'compute σ_B first, then h_L0 = k_HL·σ_B'], x: 'Skipping it gives t_HL = t_B and no decision.' },
      { t: 'mcq', q: '19S-1b: which grain size prevents breakthrough within 48 h and is as large as possible?', a: ['The largest d with t_B ≥ 48 h (here 1.0 mm)', 'The smallest d', 'The d with the lowest head loss', 'The d where t_B = t_HL'], x: 't_B: 0.9 → 52.8 h, 1.0 → 48.5 h, 1.3 → 39.3 h.' },
      { t: 'mcq', q: '21W-3a: Crypto 5 µm, ρ 1100, sand 0.5 mm, 12 m/h. Dominant mechanism?', a: ['Sedimentation (η_G 3.6·10⁻⁴), then interception', 'Diffusion', 'Interception', 'Straining'], x: '16S-2 had ρ_p = 999 → interception dominated instead!' },
      { t: 'mcq', q: '16S-2c: oocyst size 5 → 25 µm. How do the efficiencies change?', a: ['η_I ×25, η_G ×25, η_D ×0.34', 'All ×5', 'η_I ×5, η_G ×25, η_D ×5', 'All ÷5'], x: 'η_I, η_G ∝ d_p²; η_D ∝ d_p^(−2/3).' },
      { t: 'mcq', q: '21W-3d: the water is 25 °C instead of 15 °C. Removal?', a: ['Better: µ ↓ → η_G ↑ and Pe ↓ → η_D ↑', 'Worse: diffusion slower', 'Unchanged', 'Worse: attachment drops'], x: 'C/C₀ = 0.0037 < 0.01.' },
      { t: 'mcq', q: '14W-3b: why must the total head rise during a filter run?', a: ['Deposits narrow the pores, the resistance rises; constant v_F needs more head', 'The water gets colder', 'Ripening raises porosity', 'Backwash water accumulates'], x: '' },
      { t: 'mcq', q: '22S-1c: would a lower filtration velocity substantially increase throughput?', a: ['No – both limits change, there is one optimum v_F where they coincide', 'Yes – both t_B and t_HL grow linearly', 'Yes – throughput ∝ 1/v_F', 'No – v_F has no effect on t_B'], x: 'Slide L18/29.' },
      { t: 'mcq', g: 'yao', gp: { dc: 0.5, vf: 10, T: 15, rp: 1050 }, q: 'Where is the minimum of the total transport efficiency (plot)?', a: ['Around 1 µm', 'Around 0.01 µm', 'Around 50 µm', 'There is no minimum'], x: 'Diffusion falls, interception/sedimentation rise.' },

      { t: 'trend', q: 'Filtration rate v_F increases. What happens to …', r: [['η_G', -1], ['η_D', -1], ['clean-bed head loss', 1], ['t_B', -1]], x: '' },
      { t: 'trend', q: 'Grain size increases (other parameters equal). What happens to …', r: [['clean-bed head loss', -1], ['η_I', -1], ['t_B', -1], ['t_HL', 1]], x: 'MWH Table 11-5.' },
      { t: 'trend', q: 'Bed depth increases. What happens to …', r: [['removal', 1], ['t_B', 1], ['t_HL', -1]], x: 'More storage but more head loss.' },
      { t: 'trend', q: 'Water temperature rises. What happens to …', r: [['viscosity', -1], ['clean-bed head loss', -1], ['Yao removal', 1]], x: '' },

      { t: 'factor', q: 'Laminar Ergun: grain diameter halved. Clean-bed head loss …', a: ['×4', '×2', '×½', '×8'], x: 'Viscous term ∝ 1/d².' },
      { t: 'factor', q: 'Laminar Ergun: filtration rate doubled. Head loss …', a: ['×2', '×4', '×1', '×√2'], x: 'Viscous term ∝ v.' },
      { t: 'factor', q: 'Yao: η_G when v_F doubles …', a: ['×½', '×2', '×¼', '×1'], x: 'η_G = v_s/v_F.' },
      { t: 'factor', q: 'Particle size ×5: diffusion efficiency η_D …', a: ['×0.34', '×5', '×25', '×0.2'], x: '5^(−2/3).' },

      { t: 'gap', q: 'Time to breakthrough', f: R`$$t_B = \frac{▢\cdot L}{v_F\,C_0}$$`, a: [R`$\sigma_B$`, R`$k_{HL}$`, R`$h_{L0}$`, R`$\lambda$`], x: '' },
      { t: 'gap', q: 'Time to the head-loss limit', f: R`$$t_{HL} = \frac{(h_{L,max} - ▢)\,L}{k_{HL}\,v_F\,C_0}$$`, a: [R`$h_{L0}$`, R`$\sigma_B$`, R`$L$`, R`$k_{HL}\sigma$`], x: 'Clean-bed head loss from Ergun.' },
      { t: 'gap', q: 'Required bed depth (Yao)', f: R`$$L = \frac{2\,d_c\ln(C_0/C)}{3(1 - \varepsilon)\,\alpha\,▢}$$`, a: [R`$\eta$`, R`$d_p$`, R`$v_F$`, R`$\lambda$`], x: '' },
      { t: 'gap', q: 'Sedimentation efficiency', f: R`$$\eta_G = \frac{▢}{v_F}$$`, a: [R`$v_s$ (Stokes)`, R`$d_p/d_c$`, R`$k_BT$`, R`$\varepsilon$`], x: '' },

      { t: 'order', q: 'Filter run for a new grain size (22S-1b): order', s: ['σ_B at the new d (fit) → t_B', 'k_HL at the new d (fit)', 'Ergun at the new d → h_L0', 't_HL = (h_max − h_L0)L/(k_HL v_F C₀)', 'Run = min(t_B, t_HL) → name the limiting factor'], x: '' },
      { t: 'order', q: 'Yao filter design (21W-3, 16S-2): order', s: ['v_F = Q/A (m/s), µ and ρ at T', 'η_I, η_G, η_D (+ Pe) → dominant mechanism', 'Total η', 'L from ln(C₀/C) (or removal for a given L)', 'Head needed: Ergun at that L'], x: '' },

      { t: 'bug', q: '19S-1c: total head at breakthrough for d = 1 mm (h_L0 = 0.51 m, k_HL = 0.002, σ_B = 800 mg/L).', s: ['H = h_L0 + k_HL·σ_B', 'k_HL·σ_B = 0.002·800 = 1.6 m', 'H = 1.6 m'], w: 2, fix: 'Add the clean-bed head loss: H = 0.51 + 1.6 = **2.1 m** (official 2.09–2.11).' },
      { t: 'bug', q: '21W-3a: η_G for a 5 µm oocyst (ρ 1100), v_F = 12 m/h, µ = 1.14·10⁻³.', s: ['η_G = (ρ_p − ρ_w)·g·d_p²/(18·µ·v_F)', 'v_F = 12 m/h inserted directly', 'η_G = 101·9.81·25·10⁻¹²/(18·1.14·10⁻³·12) = 1·10⁻⁷'], w: 1, fix: 'v_F in **m/s**: 12/3600 = 3.33·10⁻³ → η_G = **3.6·10⁻⁴**.' },

      { t: 'match', q: 'Match the Yao mechanism with the particles it removes best', p: [['Diffusion', 'Very small particles (< 1 µm, viruses, colloids)'], ['Interception', 'Large particles relative to the grain'], ['Sedimentation', 'Large, dense particles at low v_F'], ['Minimum of all three', '≈ 1 µm (bacteria, Crypto)']], x: '' },
    ],
  });
})();
