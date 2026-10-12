(function () {
  const R = String.raw;
  PE.topic({
    id: 't05', n: 5, title: 'Disinfection: CT, UV, chlorine, by-products', short: 'Disinfection', grp: 'ox', pri: 'B', spick: '§5',
    exams: ['15W-1', '17W-4', '19W-3', '22W-3'],
    oneMin: R`**Chick–Watson:** a constant *fraction* of the survivors dies per time, proportional to the disinfectant concentration → the kill depends on **C·t**. Log levels scale linearly (3 log = 1.5 × CT₉₉). Reactor hydraulics are brutal: 3-log in one CSTR needs ~145× the PFR volume. Chlorine first reacts with ammonia (**breakpoint 7.6 mg Cl₂/mg N**), only HOCl disinfects well, and every chemical disinfectant makes by-products.`,
    learn: [
      {
        h: '☠️ Chick–Watson & the CT concept',
        f: [
          { m: R`\frac{dN}{dt} = -k\,C\,N \;\Rightarrow\; \ln\frac{N}{N_0} = -k\,C\,t`, u: '-', w: 'batch or PFR with constant C; k in L/(mg·min)' },
          { m: R`k = \frac{\ln(N_0/N)}{(Ct)_{ref}}, \quad \text{99 %: } k = \frac{4.605}{Ct_{99}}`, u: 'L/(mg min)', w: '' },
          { m: R`Ct_{x\,\log} = Ct_{2\log}\cdot\frac{x}{2}`, u: 'mg min/L', w: '3 log = 1.5 × Ct₉₉ (17W-4a)' },
          { m: R`\ln\frac{N}{N_0} = -\frac{k C_0}{k^*}\left(1 - e^{-k^* t}\right)`, u: '-', w: R`decaying disinfectant $C = C_0e^{-k^*t}$ (ozone)` },
        ],
        g: 'chick',
        li: ['**Lag (Rennecker–Mariñas):** no kill until Ct = b, then linear – several critical sites, diffusion to the target, heterogeneity.', '**Tailing (Collins–Selleck):** kill slows down – resistant subpopulations, shielding by particles, clumps, oxidant decay.'],
      },
      {
        h: '🏗️ Reactor hydraulics',
        f: [
          { m: R`\text{PFR: } \frac{N}{N_0} = e^{-kC\tau} \quad \text{CSTR: } \frac{N}{N_0} = \frac{1}{1 + kC\tau} \quad n\text{ CSTRs: } \left(1 + \frac{kC\tau}{n}\right)^{-n}`, u: '-', w: '' },
          { m: R`\tau_{n} = \frac{n\left[(N_0/N)^{1/n} - 1\right]}{kC}`, u: 'min', w: 'n CSTRs solved for τ' },
        ],
        li: ['Example (Ex2 T3): 1 log per 100 s, Q = 1 m³/s, 3 log → **PFR 300 m³, one CSTR 43 400 m³, two CSTRs 2 660 m³** → contact tanks with baffles.'],
        trap: '"Ct for 99 %" holds for a **PFR**. If the task says CSTR, use 1/(1 + kCτ) – the 15W-1 solution simplified with C = Ct/τ, 22W-3 used the CSTR formula. Write your assumption!',
      },
      {
        h: '📊 CT table (99 %, 5 °C, mg·min/L) and UV doses',
        tbl: [
          ['', 'free Cl₂', 'NH₂Cl', 'ClO₂', 'O₃', 'UV [mJ/cm²]'],
          ['E. coli', '0.034–0.05', '95–180', '0.4–0.75', '0.02', '9–13'],
          ['Polio 1', '1.1–2.5', '770–3740', '0.2–6.7', '0.1–0.2', '14–21'],
          ['Adenovirus', '0.01–0.3', '30–150', '0.04–0.1', '0.1–0.2', '**60–100**'],
          ['Giardia', '47–>150', '–', '–', '0.5–0.6', '2–3'],
          ['Cryptosporidium', '**7200**', '–', '>78', '~20', '3–5'],
        ],
        li: ['Protozoa: chlorine useless, **UV excellent**; viruses: chlorine/ozone good, UV weak for adenovirus; E. coli: everything works (O₃ 0.02 ≪ UV ~10 → O₃, 17W-4d).', 'Combine barriers: UV for protozoa, Cl₂/O₃ for viruses, Cl₂ residual for the network.'],
      },
      {
        h: '🔆 UV',
        f: [{ m: R`D = I_{avg}\cdot t, \quad \ln\frac{N}{N_0} = -k\,D, \quad V = Q\,t`, u: 'mJ/cm^2', w: '1 mJ/cm² = 1 mW·s/cm²; 254 nm → thymine dimers → no replication' }],
        li: ['No residual, hardly any by-products; turbidity (shading) and UV absorbance reduce the effective dose. UV reactors are tiny (17W-4b: 1.7 L).'],
      },
      {
        h: '🧴 Chlorine chemistry & breakpoint',
        f: [
          { m: R`\text{HOCl} \rightleftharpoons \text{OCl⁻} + \text{H⁺}, \quad \text{fraction HOCl} = \frac{1}{1 + 10^{\text{pH} - 7.5}}`, u: '-', w: 'pH 8: only 24 % HOCl; HOCl ≫ OCl⁻ as disinfectant' },
          { m: R`2\,\text{NH₃} + 3\,\text{HOCl} \to \text{N₂} + 3\,\text{H₂O} + 3\,\text{H⁺} + 3\,\text{Cl⁻}`, u: '', w: '1.5 mol Cl₂ per mol N = 1.5·70.9/14 = **7.6 mg Cl₂/mg N**' },
        ],
        g: 'breakpoint',
        li: ['1 mol HOCl = 1 mol OCl⁻ = 1 mol NaOCl = **70.9 g "Cl₂"**. Free = Cl₂ + HOCl + OCl⁻; combined = chloramines; total = free + combined.', 'Free residual wanted → dose = 7.6·NH₄-N + residual (19W-3b: 7.6 + 1 = 8.6 mg/L). Practice 8–10 mg/mg.'],
        note: '19W-3c (official): at pH 8 only 24 % is HOCl → breakpoint dose / 0.24 = 7.6/0.24 ≈ **31.6 mg Cl₂/L**. Adding the 1 mg/L residual on top would give ≈ 36 – state your assumption.',
      },
      {
        h: '☣️ Disinfection by-products',
        tbl: [['disinfectant', 'by-products'], ['Cl₂', 'THMs (chloroform …), HAAs – more with NOM, Br⁻, T, pH'], ['NH₂Cl', 'fewer THM, but **NDMA** (10⁻⁵ risk at ~100 ng/L)'], ['ClO₂', 'chlorite, chlorate (CH 200 µg/L)'], ['O₃', '**bromate** (10 µg/L), aldehydes, **AOC** → biological filter after'], ['UV', 'minimal']],
        li: ['Residual limits: Cl₂ and NH₂Cl 4 mg/L, ClO₂ 0.8 mg/L; ozone and UV leave none.'],
      },
      {
        h: '📝 Worked example 17W-4 (ozone vs UV, PFR)',
        ex: { t: 'Open the walkthrough', s: [
          'a) 3 log with ozone: 1.5 × 4 = 6 mg·min/L; at 0.5 mg/L → t = 12 min → V = 10 m³/h × 0.2 h = **2.0 m³**.',
          'b) UV: 1.5 × 6 = 9 mJ/cm²; at 15 mW/cm² → 0.6 s → V = (10/3600)·0.6 = **1.7 L**.',
          'c) "Well soluble" ozone, minimum gas: Q_G·C_G = Q·C_L → Q_G = 10·0.5/70 = 0.071 m³/h = **1.7 m³/d**.',
          'd) E. coli: ozone exposure ≈ 0.01 mg·min/L vs UV ≈ 10 mJ/cm² → **ozone**.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Chick–Watson law', b: R`$\ln(N/N_0) = -kCt$ – kill depends on the product C·t.` },
      { t: 'card', f: 'k from a CT₉₉ value', b: R`$k = \ln 100/Ct_{99} = 4.605/Ct_{99}$ [L/(mg·min)].` },
      { t: 'card', f: 'How do log levels scale with CT?', b: 'Linearly: CT(x log) = CT₉₉ · x/2 → 3 log = 1.5 × CT₉₉, 4 log = 2 × CT₉₉.' },
      { t: 'card', f: 'Disinfection in PFR, CSTR, n CSTRs', b: R`PFR $e^{-kC\tau}$; CSTR $1/(1 + kC\tau)$; n CSTRs $(1 + kC\tau/n)^{-n}$.` },
      { t: 'card', f: '3-log example (Ex2): PFR vs one vs two CSTRs', b: '300 m³ vs 43 400 m³ vs 2 660 m³ → baffled contact tanks.' },
      { t: 'card', f: 'Causes of lag (shoulder) curves', b: 'Several critical sites must be hit, diffusion of the oxidant to the target, heterogeneous populations.' },
      { t: 'card', f: 'Causes of tailing curves', b: 'Resistant subpopulations, shielding by particles, clumps, decaying oxidant.' },
      { t: 'card', f: 'Which disinfectant for Cryptosporidium?', b: 'UV (3–5 mJ/cm²) or ozone (CT ~20); free chlorine is practically useless (CT 7200).' },
      { t: 'card', f: 'Which pathogen is hardest for UV?', b: 'Adenovirus (60–100 mJ/cm²), while it is easy for free chlorine.' },
      { t: 'card', f: 'UV dose definition', b: R`$D = I_{avg}\cdot t$ [mJ/cm² = mW·s/cm²].` },
      { t: 'card', f: 'HOCl fraction vs pH', b: R`$1/(1 + 10^{\text{pH}-7.5})$: pH 7.5 → 50 %, pH 8 → 24 %.` },
      { t: 'card', f: 'Breakpoint chlorination ratio', b: '1.5 mol Cl₂/mol N = **7.6 mg Cl₂/mg NH₄-N** (practice 8–10).' },
      { t: 'card', f: 'Zones of the breakpoint curve', b: 'Offset (immediate demand) → A: chloramines form (combined residual ↑) → B: chloramines destroyed (residual ↓) → breakpoint → C: free chlorine 1:1.' },
      { t: 'card', f: 'Chlorine units', b: '1 mol HOCl = 1 mol OCl⁻ = 1 mol NaOCl = 70.9 g Cl₂.' },
      { t: 'card', f: 'By-products of Cl₂, NH₂Cl, ClO₂, O₃', b: 'THM/HAA · NDMA · chlorite/chlorate · bromate + AOC.' },

      { t: 'mcq', q: 'CT₉₉ = 2 mg·min/L. Which CT for 4 log?', a: ['4 mg·min/L', '8 mg·min/L', '16 mg·min/L', '2.6 mg·min/L'], x: 'Linear: 4/2 × 2 = 4.' },
      { t: 'mcq', q: 'Why is a single CSTR so bad for disinfection?', a: ['Part of the water short-circuits; a log kill punishes every survivor that leaves early', 'Mixing destroys the disinfectant', 'The CT concept does not apply to CSTRs', 'CSTRs cannot hold a residual'], x: '3-log: ~145× the PFR volume.' },
      { t: 'mcq', q: '19W-3b: 1 mg N/L ammonium, 1 mg/L free chlorine required at all times. Dose?', a: ['7.6 + 1 = 8.6 mg Cl₂/L', '1 mg/L', '7.6 mg/L', '1.5 mg/L'], x: 'All ammonia must be destroyed (breakpoint) before free chlorine can exist.' },
      { t: 'mcq', q: 'At pH 8, why must more chlorine be dosed for the same CT?', a: ['Only 24 % of free chlorine is the strong disinfectant HOCl', 'Chlorine decays faster', 'Chloramines form', 'Ammonia volatilises'], x: 'pKa(HOCl) = 7.5.' },
      { t: 'mcq', q: '17W-4d: maximise E. coli removal – ozone or UV?', a: ['Ozone: required exposure ~0.01 mg·min/L vs UV ~10 mJ/cm²', 'UV: protozoa and bacteria behave alike', 'Both identical', 'Neither inactivates E. coli'], x: 'MWH Fig. 13-5. UV is the champion for protozoa, not for E. coli.' },
      { t: 'mcq', q: 'A task asks for the ozone concentration in a CSTR for 3-log Giardia (k = 2.3, τ = 6 min). Formula?', a: ['C = (N₀/N − 1)/(k·τ) = 999/(2.3·6)', 'C = ln(1000)/(k·τ)', 'C = Ct₉₉/τ', 'C = 1.5·Ct₉₉/τ'], x: '22W-3b: 72 mg/L – absurd, but the official answer. CSTRs are terrible for log kills.' },
      { t: 'mcq', q: 'Ozonation of a bromide-rich water. Main concern?', a: ['Bromate formation', 'THM formation', 'NDMA formation', 'Chlorite formation'], x: 'Bromate limit 10 µg/L.' },
      { t: 'mcq', q: 'Why do we still chlorinate after UV disinfection?', a: ['UV leaves no residual to protect the distribution network', 'UV does not inactivate bacteria', 'Chlorine removes UV by-products', 'UV increases AOC'], x: 'Multi-barrier: UV for protozoa, chlorine residual for the network.' },
      { t: 'mcq', g: 'breakpoint', gp: { r: 6.5, off: 0 }, q: 'The marker sits in zone B. What is happening?', a: ['Extra chlorine destroys the chloramines; the residual falls', 'Free chlorine accumulates', 'Immediate demand by Fe²⁺ and H₂S', 'Monochloramine forms'], x: 'Between mole ratio 1 and 1.5 (≈5–7.6 by mass).' },

      { t: 'trend', q: 'The contact tank gets baffles (closer to plug flow). What happens to …', r: [['short-circuiting', -1], ['log removal at the same volume', 1], ['required volume for 3 log', -1]], x: 'PFR is the ideal for log kills.' },
      { t: 'trend', q: 'The pH rises from 7 to 8.5 during chlorination. What happens to …', r: [['HOCl share of free chlorine', -1], ['disinfection efficiency at the same dose', -1], ['required chlorine dose', 1]], x: 'OCl⁻ is a weak disinfectant.' },
      { t: 'trend', q: 'More ammonium in the raw water. What happens to …', r: [['breakpoint chlorine demand', 1], ['THM formation (at the same dose)', -1]], x: 'Ammonia binds chlorine as chloramine.' },
      { t: 'trend', q: 'Turbidity of the water increases. What happens to …', r: [['effective UV dose', -1], ['shielding of pathogens', 1], ['tailing of the inactivation curve', 1]], x: 'Particles shade and protect.' },

      { t: 'factor', q: 'Disinfectant concentration doubled: contact time for the same log kill …', a: ['×½', '×2', '×¼', '×1'], x: 'Only C·t counts.' },
      { t: 'factor', q: '2 log → 3 log: required CT …', a: ['×1.5', '×10', '×3', '×2'], x: 'Linear in log units.' },
      { t: 'factor', q: 'UV intensity doubled: exposure time for the same dose …', a: ['×½', '×2', '×1', '×¼'], x: 'D = I·t.' },

      { t: 'gap', q: 'Chick–Watson in a PFR', f: R`$$\ln\frac{N}{N_0} = -k\cdot ▢$$`, a: [R`$C\,t$`, R`$C/t$`, R`$t$`, R`$\ln(Ct)$`], x: 'The CT concept.' },
      { t: 'gap', q: 'Disinfection in one CSTR', f: R`$$\frac{N}{N_0} = \frac{1}{1 + ▢}$$`, a: [R`$kC\tau$`, R`$k\tau$`, R`$kC/\tau$`, R`$e^{kC\tau}$`], x: '' },
      { t: 'gap', q: 'Dose for a free chlorine residual', f: R`$$\text{dose} = ▢\cdot \text{NH₄-N} + \text{residual}$$`, a: ['7.6', '1.5', '5', '70.9'], x: 'mg Cl₂ per mg N at the breakpoint.' },

      { t: 'order', q: 'Ozone contact tank (CSTR) for Giardia (22W-3): order the steps', s: ['k = 4.605/Ct₉₉', 'τ = V/Q', 'C_L = (N₀/N − 1)/(k·τ) for the required log level', 'Gas balance: Q_G = Q·C_L/(C_G,0 − H·C_L)', 'Negative Q_G → target impossible, say so'], x: '22W-3: k = 2.3, C = 72 mg/L, Q_G = −7.2 m³/h.' },

      { t: 'bug', q: '17W-4a: Ct₉₉ (ozone, Crypto) = 4 mg·min/L, 3 log wanted, 0.5 mg/L O₃, PFR, Q = 10 m³/h.', s: ['Ct for 3 log = 4³/2 = 32 mg·min/L', 't = 32/0.5 = 64 min', 'V = 10 m³/h × 64/60 h = 10.7 m³'], w: 0, fix: 'CT scales **linearly** with log units: 4 × 3/2 = 6 → t = 12 min → **V = 2.0 m³**.' },
      { t: 'bug', q: 'Exercise 2 T3: 1 log per 100 s, Q = 1 m³/s, 3 log in one CSTR.', s: ['k = ln(10)/100 s = 0.023 s⁻¹', 'CSTR: τ = ln(1000)/k = 300 s', 'V = Q·τ = 300 m³'], w: 1, fix: 'That is the PFR result. CSTR: kτ = 999 → τ = 43 400 s → **43 400 m³**.' },

      { t: 'match', q: 'Match the pathogen with the best disinfectant', p: [['Cryptosporidium', 'UV'], ['Adenovirus', 'Free chlorine'], ['E. coli', 'Ozone (tiny CT)'], ['Network protection', 'Chlorine / chloramine residual']], x: 'Multi-barrier thinking.' },
    ],
  });
})();
