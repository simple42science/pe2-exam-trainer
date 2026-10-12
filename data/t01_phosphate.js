(function () {
  const R = String.raw;
  PE.topic({
    id: 't01', n: 1, title: 'Phosphate precipitation', short: 'P precipitation', grp: 'chem', pri: 'A', spick: '§1',
    exams: ['16W-1', '17W-2', '18W-3', '21W-1', '22S-3', '22W-1'],
    oneMin: R`Bacteria take up some P when they grow; the rest is **locked into FePO₄/AlPO₄** by dosing Fe or Al salts. Every exam task tells the same **five-step story**: P balance → metal dose (mL/L of FeCl₃ solution) → chemical sludge → **alkalinity check for nitrification** → where to dose. Six exams, almost identical pattern.`,
    learn: [
      {
        h: '🧭 The five-step story of every P task',
        rec: [
          R`**P balance:** what leaves with biomass, what may stay dissolved, what must be precipitated.`,
          R`**Dose:** mol metal per mol *initial soluble* P (given ratio or the dosing chart) → g/m³ → mL of commercial solution per L.`,
          R`**Sludge:** MePO₄ + Me(OH)₃ from the excess metal.`,
          R`**Alkalinity:** is there enough buffer left for nitrification? (boxed formula)`,
          R`**Qualitative:** dosing point, extra measures (filtration, EBPR).`,
        ],
      },
      {
        h: '⚖️ P balance (per m³ wastewater, all as g **P**)',
        f: [
          { m: R`P_{tot,in} = P_{bio} + P_{prec} + S_{P,e}`, u: 'gP/m^3', w: 'P in all new biomass + P precipitated + dissolved P allowed in the effluent' },
          { m: R`P_{bio} = i_P \cdot Y_{obs} \cdot \Delta COD, \quad \Delta COD = COD_{in} - S_{COD,e}`, u: 'gP/m^3', w: R`$i_P$ 0.015–0.023 gP/gVSS; $Y_{obs}$ 0.3–0.45 gVSS/gCOD` },
          { m: R`S_{P,e} = C_{P,standard} - i_P \cdot X_{VSS,e}`, u: 'gP/m^3', w: 'effluent solids carry P that counts against the standard (0.8 gP/m³, sensitive areas 0.2)' },
          { m: R`P_{prec} = P_{tot,in} - P_{bio} - S_{P,e}`, u: 'gP/m^3', w: 'P that the metal must precipitate' },
        ],
        li: [
          R`P removed **with the excess sludge** (no chemicals) $= i_P(Y_{obs}\Delta COD - X_{VSS,e})$ – the effluent VSS goes to the river (18W-3a, 22S-3a: 8.6 kg/d).`,
          R`**Initial soluble P** for the dosing chart = soluble P after biological uptake, before precipitation $= S_{P,0} - P_{bio}$.`,
        ],
        trap: 'Write everything as g **P** (1 g P = 3.06 g PO₄). And the P in the effluent VSS is *not removed* – it reduces the allowed dissolved P.',
      },
      {
        h: '🧴 Metal dose → mL of solution',
        g: 'pdose',
        f: [
          { m: R`S_{Me} = \text{ratio}\cdot\frac{S_{P,init}}{M_P}\cdot M_{Me}`, u: 'g/m^3', w: 'ratio = mol metal per mol initial soluble P (molar!)' },
          { m: R`\frac{V_{sol}}{V_{WW}} = \frac{S_{Fe}}{w_{Fe}\,\rho_{sol}}`, u: 'mL/L', w: '24 % Fe, 1.43 kg/L → 0.24·1430 = **343 g Fe per L solution**' },
        ],
        tbl: [['Alum Al:P (M&E)', '75 % removal', '85 %', '95 %'], ['range', '1.25–1.5', '1.6–1.9', '2.1–2.6'], ['typical', '1.4', '1.7', '2.3']],
        li: [
          '**Alum** Al₂(SO₄)₃·18H₂O contains **2 Al** → n_alum = n_Al/2 (18W-3b).',
          '**FeSO₄ is Fe(II)** → must be oxidised first → dose into the **aerated** tank.',
          'Chart (M&E 6-14): roughly fraction remaining ≈ 10^(−0.44·ratio): 80 % → 1.6, 90 % → 2.2, 95 % → 2.9; exam figures differ slightly (21W-1: 89.5 % → 2.4).',
        ],
        trap: R`Ratio **given** in the task ("Fe to initial soluble P 1.4 mol/mol")? Do not read the chart, and multiply by the **initial soluble P**, not by $P_{prec}$ – 17W-2c: 1.353 gP/m³ → 0.0100 mL/L ✓ (with P_prec: 0.0077 ✗).`,
      },
      {
        h: '🪨 Reactions, alkalinity, sludge',
        li: [
          'Fe³⁺ + H₂PO₄⁻ → FePO₄↓ + 2 H⁺  (−2 Alk per P)',
          'Fe³⁺ + 3 H₂O → Fe(OH)₃↓ + 3 H⁺  (−3 Alk per excess Fe)',
          'Fe²⁺ + ¼ O₂ + 5/2 H₂O → Fe(OH)₃ + 2 H⁺  (−2 Alk per Fe(II))',
          'Al analogous (AlPO₄ 122, Al(OH)₃ 78 g/mol). Lime: hydroxyapatite Ca₁₀(PO₄)₆(OH)₂ + CaCO₃ → huge sludge.',
        ],
        f: [
          { m: R`X_{MePO_4} = M_{MePO_4}\,n_{P,prec}, \quad X_{Me(OH)_3} = M_{Me(OH)_3}\,(n_{Me} - n_{P,prec})`, u: 'g/m^3', w: 'FePO₄ 150.8, Fe(OH)₃ 106.8 g/mol; typically +10 % on the biological sludge' },
          { m: R`P_{X,TSS} = Q\,Y_{obs}\,\Delta COD / (VSS/TSS)`, u: 'gTSS/d', w: 'biological sludge production (16W-1b)' },
        ],
      },
      {
        h: '🧽 Enough alkalinity for nitrification?',
        f: [
          { m: R`\boxed{\text{Alk}_e = \text{Alk}_{in} - 2\,n_{N,nitr} - (3\,n_{Me} - n_{P,prec})}`, u: 'mmol/L', w: R`$3n_{Me} - n_P$ = 2 per P (MePO₄) + 3 per excess Me (hydroxide). Reproduces 21W-1b exactly (−0.336).` },
          { m: R`N_{nitr} = TKN_{in} - N_{bio} - TKN_e, \quad N_{bio} = i_N\,Y_{obs}\,\Delta COD`, u: 'gN/m^3', w: 'N built into biomass is **not** nitrified; n = N/14 in mmol/L' },
        ],
        li: ['Alk_e < 0 (in practice < 1 mmol/L) → pH drops → nitrification inhibited.', 'Remedies: **post-precipitation** (after the biology), denitrification (+1 Alk/N), base/lime, less metal.'],
      },
      {
        h: '📍 Where to dose?',
        tbl: [
          ['Point', 'Pro', 'Con'],
          ['Pre-precipitation (primary clarifier)', 'also removes COD/particles', 'COD missing for denitrification, more primary sludge'],
          ['Co-/simultaneous (AS tank)', 'simple, cheap, Fe(II) possible (O₂ present)', 'mixed sludge, Alk consumed where nitrifiers need it'],
          ['Post-precipitation', 'best effluent, no Alk competition', 'extra flocculation + settling/filter, costly'],
          ['Flocculation filtration', '< 0.2 gP/m³, also particulate P', 'filter needed'],
        ],
        li: ['Extra measures: **filtration** of effluent solids (removes at most i_P·X_VSS,e·Q, 22S-3e: 2.9 kg/d), EBPR, 2-point dosing.', 'Kinetics: mineral formation & adsorption very fast, micro-flocculation fast, macro-flocculation slow (polymer helps).'],
      },
      {
        h: '📝 Worked example 17W-2 (ratio given)',
        ex: { t: 'Open the full walkthrough', s: [
          'Data: COD 250, P_tot 3.0, TKN 30 g/m³, Alk 3.6 mM; effluent S_I 19, VSS 21; Y_obs 0.31, i_P 0.023, i_N 0.08; FeCl₃ 24 %, 1.43 kg/L; Fe:P_init 1.4.',
          'a) X_P,e = 21·0.023 = 0.483 → S_P,e = 0.8 − 0.483 = **0.32 gP/m³**.',
          'b) ΔCOD = 231, biomass 71.6 gVSS/m³, P_bio = 1.647 → initial soluble P = 1.353 → P_prec = 1.353 − 0.317 = **1.04 gP/m³**.',
          'c) Fe = 1.4·1.353/31 = 0.0611 mol/m³ = 3.42 g/m³ → 3.42/343 = **0.0100 mL/L**.',
          'd) N_bio = 5.73 → N_nitr = 24.27 g/m³ = 1.734 mM → 3.47 mM Alk; metal 3·0.0611 − 0.033 = 0.15 → needed 3.62 > 3.6 available → **yes, Alk could limit nitrification**.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'P balance of a WWTP (per m³)', b: R`$P_{tot,in} = P_{bio} + P_{prec} + S_{P,e}$ – all in g P/m³.` },
      { t: 'card', f: 'How do you compute P_bio?', b: R`$P_{bio} = i_P\cdot Y_{obs}\cdot\Delta COD$ with $\Delta COD = COD_{in} - S_{COD,e}$ – P in **all** new biomass (incl. effluent VSS).` },
      { t: 'card', f: 'Allowed dissolved P in the effluent?', b: R`$S_{P,e} = C_{P,standard} - i_P\cdot X_{VSS,e}$ – the effluent solids already use part of the standard.` },
      { t: 'card', f: 'P removed with the excess sludge (no chemicals)?', b: R`$i_P\,(Y_{obs}\Delta COD - X_{VSS,e})$ – the P in the effluent VSS goes to the river (22S-3a: 8.6 kgP/d).` },
      { t: 'card', f: 'What is the "initial soluble P" of the dosing chart?', b: 'Soluble P **after** biological uptake and **before** precipitation: S_P,0 − P_bio.' },
      { t: 'card', f: 'Fe content of the usual FeCl₃ solution (24 %, 1.43 kg/L)?', b: '0.24 · 1430 g/L = **343 g Fe per L** → mL solution per L wastewater = (mg Fe/L) / 343.' },
      { t: 'card', f: 'Boxed alkalinity formula (precipitation + nitrification)', b: R`$\text{Alk}_e = \text{Alk}_{in} - 2n_{N,nitr} - (3n_{Me} - n_{P,prec})$ [mmol/L]` },
      { t: 'card', f: 'Where does "3 n_Me − n_P" come from?', b: '2 Alk per mol P precipitated as MePO₄ + 3 Alk per mol excess metal as Me(OH)₃: 2n_P + 3(n_Me − n_P) = 3n_Me − n_P.' },
      { t: 'card', f: 'Which N is nitrified?', b: R`$N_{nitr} = TKN_{in} - N_{bio} - TKN_e$ with $N_{bio} = i_N Y_{obs}\Delta COD$ – biomass N is not nitrified.` },
      { t: 'card', f: 'Alum: formula and how many Al?', b: 'Al₂(SO₄)₃·18H₂O (666 g/mol): **2 Al** per formula unit → mol alum = mol Al / 2.' },
      { t: 'card', f: 'Why is FeSO₄ dosed into the aerated tank?', b: 'It is **Fe(II)**: it must first be oxidised to Fe(III) by O₂ before it precipitates P efficiently.' },
      { t: 'card', f: 'Chemical sludge from Fe precipitation?', b: R`FePO₄ = 150.8·n_P,prec + Fe(OH)₃ = 106.8·(n_Fe − n_P,prec) [g/m³]. Typically +10 % on the bio sludge; lime ≈ 13× more (21W-1c).` },
      { t: 'card', f: 'Fe:P from the chart for 80 / 90 / 95 % removal of initial soluble P?', b: '≈ 1.6 / 2.2 / 2.9 mol/mol (≈ 10^(−0.44·ratio)); 21W-1 official reading: 89.5 % → 2.4.' },
      { t: 'card', f: 'Remedies when the alkalinity is too low for nitrification', b: 'Post-precipitation (dose after the biology), denitrification (+1 Alk/N), base or lime, less metal.' },
      { t: 'card', f: 'Swiss effluent standard for total P', b: '0.8 g P/m³ (0.2 in sensitive lake catchments and large plants; old value 1.0).' },

      { t: 'mcq', q: 'The task gives "Fe to initial soluble P ratio 1.4 mol/mol". You multiply 1.4 by …', a: ['the initial soluble P (soluble P after biological uptake)', 'the P that must be precipitated (P_prec)', 'the total influent P', 'the allowed dissolved effluent P'], x: '17W-2c decides it: with 1.353 g P/m³ you get 0.0100 mL/L = official answer; P_prec would give 0.0077.' },
      { t: 'mcq', q: 'Why does the effluent VSS lower the allowed dissolved P?', a: ['Its P (i_P·X_VSS,e) counts against the total-P standard', 'VSS adsorbs dissolved P in the river', 'It increases the Fe demand', 'It consumes alkalinity'], x: '21 g VSS/m³ × 0.023 = 0.48 g P/m³ – more than half of a 0.8 standard.' },
      { t: 'mcq', q: 'Which dosing point avoids competition with nitrification for alkalinity?', a: ['Post-precipitation (after the biology)', 'Co-precipitation in the aeration tank', 'Pre-precipitation in the primary clarifier', 'Dosing FeSO₄ into the sewer'], x: 'After the biology the nitrifiers have already used the buffer they need; Fe³⁺ needs no oxidation there (21W-1e).' },
      { t: 'mcq', q: 'Why is the Fe:P ratio needed in practice much larger than 1?', a: ['Competing hydroxide formation, adsorption and kinetics – and low residuals need excess', 'FePO₄ contains two Fe per P', 'Half of the Fe is lost as gas', 'Because the chart is on a mass basis'], x: 'The chart axis is **molar** (an old M&E version had a typo, see 16W-1).' },
      { t: 'mcq', q: 'Main drawback of pre-precipitation in the primary clarifier?', a: ['It also removes COD that is then missing for denitrification (and more primary sludge)', 'Fe(II) cannot be used', 'It needs a separate filter', 'It cannot reach 0.8 g P/m³'], x: 'Organic carbon is the electron donor for denitrification.' },
      { t: 'mcq', q: '21W-1b gives Alk_e = −0.34 mmol/L. What do you conclude?', a: ['Alkalinity deficit: pH would drop and nitrification be inhibited', 'Nitrification is fine, alkalinity is never negative', 'The Fe dose is too low', 'Denitrification will stop'], x: 'A negative balance means the buffer is used up – suggest post-precipitation or base.' },
      { t: 'mcq', q: 'The operator wants Ca(OH)₂ instead of FeCl₃. Your main counter-argument?', a: ['Sludge production explodes (CaCO₃ + hydroxyapatite: ~418 vs 31 g/m³)', 'Lime cannot precipitate phosphate', 'Lime consumes alkalinity', 'Lime is Fe(II)'], x: 'Lime also precipitates the carbonate. Alkalinity actually increases (OH⁻), so nitrification would be fine.' },
      { t: 'mcq', q: 'How much alkalinity does one mol of **excess** Fe³⁺ (forming Fe(OH)₃) consume?', a: ['3 mol', '2 mol', '1 mol', '0 mol'], x: 'Fe³⁺ + 3 H₂O → Fe(OH)₃ + 3 H⁺.' },
      { t: 'mcq', q: '22S-3e: "What additional measure could reach the effluent standard?"', a: ['Filtration of the effluent solids (removes up to i_P·X_VSS,e·Q = 2.9 kg P/d)', 'More Fe in the primary clarifier', 'Stripping CO₂', 'Lower the sludge age'], x: 'Alternative: EBPR (not quantifiable with the given data).' },
      { t: 'mcq', g: 'pdose', gp: { eta: 0.9 }, q: 'From the dosing chart: which Fe : initial-soluble-P ratio for 90 % removal?', a: ['≈ 2.2 mol/mol', '≈ 1.0 mol/mol (stoichiometric)', '≈ 0.9 mol/mol', '≈ 4.4 mol/mol'], x: 'Fraction remaining 0.1 → read the x-axis. Exam charts may differ slightly; always take your own reading and state it.' },

      { t: 'trend', q: 'The secondary clarifier loses **more VSS** in the effluent. What happens to …', r: [['allowed dissolved P S_P,e', -1], ['P that must be precipitated', 1], ['Fe dose', 1]], x: 'X_P,e = i_P·X_VSS,e eats into the standard.' },
      { t: 'trend', q: 'The observed yield **Y_obs increases** (more biomass). What happens to …', r: [['P_bio', 1], ['P to precipitate', -1], ['N available for nitrification', -1]], x: 'More P and N end up in biomass.' },
      { t: 'trend', q: 'More Fe is dosed for the same P. What happens to …', r: [['residual soluble P', -1], ['alkalinity consumed', 1], ['chemical sludge', 1]], x: 'Excess Fe forms Fe(OH)₃: 3 Alk and 106.8 g each.' },
      { t: 'trend', q: 'You switch from co-precipitation to **post-precipitation**. What happens to …', r: [['alkalinity left for nitrification', 1], ['investment cost', 1], ['risk of a pH drop in the aeration tank', -1]], x: 'Classic trade-off.' },

      { t: 'factor', q: 'Alum: mol Al₂(SO₄)₃·18H₂O per mol Al needed …', a: ['×½', '×2', '×1', '×⅓'], x: 'Two Al per formula unit (18W-3b: 0.0365 mol/m³ alum).' },
      { t: 'factor', q: '1 g of P corresponds to how many g of PO₄?', a: ['×3.06', '×1', '×0.33', '×31'], x: '95/31 = 3.06. Always use g P.' },
      { t: 'factor', q: 'Chart line 10^(−0.44·ratio): going from 90 % to 99 % removal, the Fe:P ratio …', a: ['×2', '×10', '×1.1', '×4.4'], x: '1/0.44 = 2.27 → 2/0.44 = 4.55.' },

      { t: 'gap', q: 'P to be precipitated', f: R`$$P_{prec} = P_{tot,in} - P_{bio} - ▢$$`, a: [R`$S_{P,e}$ (allowed dissolved effluent P)`, R`$X_{P,e}$ (P in effluent VSS)`, R`$i_P\,Y_{obs}$`, R`$C_{P,standard}$`], x: R`$S_{P,e} = C_{P,standard} - i_P X_{VSS,e}$.` },
      { t: 'gap', q: 'Alkalinity after precipitation and nitrification', f: R`$$\text{Alk}_e = \text{Alk}_{in} - 2n_{N,nitr} - (▢)$$`, a: [R`$3n_{Me} - n_{P,prec}$`, R`$2n_{Me}$`, R`$3n_{P,prec}$`, R`$n_{Me} - n_{P,prec}$`], x: '2 per MePO₄ + 3 per excess Me(OH)₃.' },
      { t: 'gap', q: 'Volume of commercial solution per volume of wastewater', f: R`$$\frac{V_{sol}}{V_{WW}} = \frac{S_{Fe}}{▢}$$`, a: [R`$w_{Fe}\cdot\rho_{sol}$`, R`$M_{Fe}$`, R`$\rho_{sol}/w_{Fe}$`, R`$M_{FeCl_3}$`], x: '0.24 · 1430 g/L = 343 g Fe/L.' },
      { t: 'gap', q: 'P built into new biomass', f: R`$$P_{bio} = i_P\cdot ▢ \cdot\Delta COD$$`, a: [R`$Y_{obs}$`, R`$i_N$`, R`$X_{VSS,e}$`, R`$1.42$`], x: 'Y_obs in gVSS/gCOD, i_P in gP/gVSS.' },

      { t: 'order', q: 'Classic P-precipitation task (17W-2, 21W-1, 22S-3): order the steps.', s: [R`Effluent solids: $X_{P,e} = i_P X_{VSS,e}$ → allowed $S_{P,e}$`, R`$\Delta COD$, $P_{bio} = i_P Y_{obs}\Delta COD$ → initial soluble P`, R`$P_{prec}$ = initial soluble P − $S_{P,e}$`, 'Fe dose: ratio (given / chart) × initial soluble P → g Fe/m³ → mL/L', 'Alkalinity check with the boxed formula', 'Qualitative: dosing point / extra measures'], x: 'Exactly the order of the sub-questions in most exams.' },
      { t: 'order', q: 'From the ratio to millilitres of FeCl₃ solution', s: ['mol initial soluble P per m³ = S_P,init / 31', '× ratio (mol Fe / mol P) = mol Fe per m³', '× 55.8 g/mol = g Fe/m³ (= mg/L)', '÷ 343 g Fe per L solution = mL solution per L wastewater'], x: '17W-2c: 0.0437 → 0.0611 mol → 3.42 g → 0.0100 mL/L.' },

      { t: 'bug', q: '17W-2c: "Fe to initial soluble P ratio 1.4 mol/mol", P_tot 3.0, P_bio 1.647, P_prec 1.04 gP/m³. FeCl₃ dose?', s: ['Initial soluble P = 3.0 − 1.647 = 1.353 g P/m³', 'Allowed dissolved P = 0.317 g/m³, so P_prec = 1.04 g/m³', 'Fe = 1.4 × (1.04/31) × 55.9 = 2.62 g Fe/m³', '2.62 / 343 = 0.0077 mL/L'], w: 2, fix: 'Multiply the ratio by the **initial soluble P** (1.353): Fe = 3.42 g/m³ → **0.0100 mL/L** (official).' },
      { t: 'bug', q: '21W-1: TKN 22 gN/m³, biomass 76 gVSS/m³ with i_N 0.08. Alkalinity used by nitrification?', s: ['N_bio = 0.08 × 76 = 6.08 g N/m³', 'N nitrified = TKN = 22 g N/m³ = 1.57 mmol/L', 'Alkalinity used = 2 × 1.57 = 3.14 mmol/L'], w: 1, fix: 'Biomass N is not nitrified: N_nitr = 22 − 6.08 = 15.92 g/m³ = 1.137 mM → 2.27 mM Alk.' },

      { t: 'match', q: 'Match the dosing point with its key property', p: [['Pre-precipitation', 'Removes COD needed for denitrification'], ['Co-precipitation', 'Cheap, Fe(II) possible, eats Alk in the AS tank'], ['Post-precipitation', 'Best effluent, no Alk competition, costly'], ['Flocculation filtration', '< 0.2 g P/m³, removes particulate P too']], x: 'Spick §1 "Dosing point".' },
    ],
  });
})();
