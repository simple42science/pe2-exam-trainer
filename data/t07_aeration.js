(function () {
  const R = String.raw;
  PE.topic({
    id: 't07', n: 7, title: 'Aeration design', short: 'Aeration', grp: 'gas', pri: 'A', spick: '§7',
    exams: ['14W-1', '17S-3', '19S-4', '19W-2', '21W-2', '22S-2', '22W-2'],
    oneMin: R`Aeration links **oxygen demand** (what the bacteria or the iron need) with **oxygen transfer** (what the diffusers really deliver) and **air flow / blower power**. Manufacturers rate diffusers at **standard conditions** (clean water, 20 °C, 1 atm, C_L = 0); real conditions are converted with **α, k_T and k_C**. The two killer tasks: air flow from a demand, and the **maximum inflow** of a plant (OD = a·Q − b = OTR).`,
    learn: [
      {
        h: '📏 Definitions',
        f: [
          { m: R`SOTR = K_La^*\,C_S^*\,V`, u: 'gO_2/d', w: 'standard: clean water, 20 °C, 1 atm, C_L = 0, C*_S = 9.08 g/m³' },
          { m: R`OTR = K_La_{T,op}\,(C_{S,T,m} - C_L)\,V`, u: 'gO_2/d', w: 'actual transfer rate in operation (AOTR)' },
          { m: R`SOTE = \frac{SOTR}{Q_G\,C_{G,O_2,20°C}}, \quad OTE = \frac{OTR}{Q_G\,C_{G,O_2}(T,p)}, \quad SOTE = SOTE_h\cdot h_{inj}`, u: '-', w: 'C_G,O₂ = 282 g/m³ at 20 °C, 1 atm; fine bubbles 4–8 %/m' },
          { m: R`\boxed{OTR = \frac{\alpha}{k_C\,k_T}\,SOTR}`, u: 'gO_2/d', w: '' },
          { m: R`k_T = e^{0.02(20 - T)} = \frac{K_La^*}{K_La_T}, \quad k_C = \frac{C_S^*}{C_{S,T,m} - C_L}`, u: '-', w: 'k_T: 10 °C → 1.22, 25 °C → 0.90; k_C = standard / real driving force' },
          { m: R`\alpha = \frac{K_La(\text{wastewater})}{K_La(\text{clean water})}`, u: '-', w: 'fine bubbles 0.75 (foaming 0.4–0.5), medium 0.8, coarse 0.85, surface 0.9' },
        ],
        note: 'M&E style tasks (14W-1) add a salinity factor β on C_S and a fouling factor F on the diffusers: OTR = SOTR·α·F·(β·C_S,T,m − C_L)/C*_S·θ^(T−20).',
      },
      {
        h: '🌡️ Saturation at mid-depth: C_S,T,m',
        f: [{ m: R`C_{S,T,m} = C_{S,T,1atm}\cdot\frac{p_{amb} + 0.5\,h_{inj}/10.33}{1\,\text{atm}}\cdot\frac{100 - 0.5\,h_{inj}\,OTE_h}{100}`, u: 'g/m^3', w: '**S** saturation, **T** actual temperature, **m** mid-depth; 2nd factor = O₂ depletion of the bubble (omit if the task says so)' }],
        g: 'csat',
        li: [
          R`OTE from SOTE: $\frac{OTE}{SOTE} = \frac{\alpha}{k_Ck_T}\cdot\frac{C_{G,20°C,1atm}}{C_{G,T,p}}$ (2nd factor ≈ 1; ≈ 1.06 at 25 °C, 0.96 atm – 19S-4a gives 3.6 %).`,
          'OTE_h appears inside C_S,T,m → iterate (or solve algebraically as in Ex4).',
          '"10 m water = 1 atm" if the exam says so (14W-1); otherwise 10.33 m.',
        ],
      },
      {
        h: '🧾 Recipe: air flow and blower from the O₂ demand',
        rec: [
          'Oxygen demand OD (= the OTR you need).',
          R`$k_T$, $C_{S,T,m}$ and $k_C$ (with the tank's C_L).`,
          R`$OTE = SOTE\cdot\frac{\alpha}{k_Ck_T}$ (× gas ratio); $C_{G,O_2}(T,p) = \frac{0.21\,p\,M}{RT}$.`,
          R`$Q_G = \frac{OD}{OTE\cdot C_{G,O_2}(T,p)}$ – standard conditions: $Q_G = \frac{SOTR}{SOTE\cdot282}$.`,
          R`Blower $N_G = \frac{Q_G\,\rho\,g\,(h_{inj} + h_{loss})}{\eta}$ with **Q_G in m³/s**; aeration efficiency AE = OTR/N_G [kg O₂/kWh].`,
        ],
        li: [
          R`Which depth? OTR = SOTE_h·h·Q_G·282·α/(k_C k_T) with k_C depending on h → iterate (19W-2c: 4.99 m).`,
          R`K_La from SOTR: $K_La^* = SOTR/(C_S^*V)$, $K_La_{op} = \alpha K_La^*/k_T$ (17S-3b).`,
          R`Off-gas method: $K_La = Q_G(C_{G,in} - C_{G,out})/(\Delta V(C_{S,T,m} - C_L))$; clean-water test: $\ln\frac{C_S - C_t}{C_S - C_0} = -K_La\,t$.`,
        ],
      },
      {
        h: '🏭 Oxygen demand of a WWTP & maximum inflow',
        f: [
          { m: R`\boxed{OD = Q\,\Delta COD - M_{ex} + (4.57 + Y_{nitr})\,N_{nitr} - 2.86\,N_{denit} + Q\,C_L}`, u: 'kgO_2/d', w: 'ΔCOD = COD_in − COD_e (dissolved + particulate effluent COD); M_ex excess sludge as COD' },
          { m: R`N_{nitr} = Q\,(TKN_{in} - TKN_e) - i_N\,M_{ex}`, u: 'kgN/d', w: 'N in the excess sludge is not nitrified' },
        ],
        li: [
          '**Q·ΔCOD − M_ex:** COD removed and not wasted as sludge was oxidised.',
          '**+Y_nitr·N_nitr:** nitrifier biomass sits in M_ex but was made from CO₂, not influent COD → add back (official: **+**, reproduces 19W-2b, 14W-1b, 22W-2b).',
          '**−2.86·N_denit:** denitrification credit (22W-2c). **+Q·C_L:** O₂ leaving with the effluent (14W-1b, 22W-2b).',
          'Special cases: only to N₂/nitrite 1.71 g O₂/g N (14W-1); COD only: Q·ΔCOD·(1 − Y_obs) (17S-3a); Fe(II): 0.143·ΔFe·Q + Q·C_L (Ex4b).',
        ],
        rec: [
          R`Capacity: $OTR = OTE\cdot Q_G\cdot C_{G,O_2}(T,p)$; if OTE_h is given **at operating conditions**, OTE = OTE_h·h_inj with no α/k corrections (22W-2a). $C_{G,O_2} = 282\,\frac{p}{1\,atm}\frac{293.15}{T}$ (both variants accepted).`,
          'Write every OD term as a function of Q → OD = a·Q − b.',
          'Max inflow: OD = OTR → Q = (OTR + b)/a.',
        ],
        g: 'odq',
      },
      {
        h: '💬 Qualitative answers',
        li: [
          '**Deeper diffusers:** OTR ∝ h (SOTE_h·h) but blower power ∝ h → aeration efficiency (kg O₂/kWh) stays about the same (14W-1c).',
          '**Winter, bubble aeration:** K_La lower but C_S higher, and cold air is denser (more O₂/m³) → you need **less** air, not more (21W-2c, 19W-2d). Desorption is temperature sensitive.',
          '**Surface aeration:** absorption decreases with T (C_S falls); desorption T-independent.',
          '**Specific area a [m²/m³]:** bubbles 5–100, surface 50–600, spray 20–60, packed column 100–200. Surfactants: a ↑ but K_L ↓ → α.',
          '**More driving force:** low C_L (0.5–2 g/m³), pure O₂, deeper injection.',
          'Typical: SOTE_h fine bubble 4–8 %/m, AE 1–4 kg O₂/kWh; aeration ≈ up to 75 % of the plant energy. Best: membrane plates 7.6 %/m, 3.9 kg/kWh.',
        ],
      },
      {
        h: '📝 Worked examples',
        ex: { t: '22W-2: how much wastewater can the aeration handle?', s: [
          'OTE = 4 %/m·2.8 m = 11.2 % (already at operating conditions); C_G = 282·0.96·293.15/283.15 = 280.3 g/m³ → **OTR = 0.112·40 000·0.2803 = 1256 kg O₂/d**.',
          'OD = 0.202Q − 1000 + 4.81(0.028Q − 60) + 0.0025Q = **0.3392Q − 1288.6**.',
          'OD = OTR → Q = (1256 + 1288.6)/0.3392 ≈ **7500 m³/d**.',
          'c) Denitrify all nitrate: 2.86·(0.028·7500 − 60) = **429 kg O₂/d** saved.',
        ] },
      },
      {
        ex: { t: 'Exercise 4b/c: air flow and blower for iron removal', s: [
          'OD = 0.143·6.5·3000 + 2·3000 = 2796 + 6000 = **8796 g/d** (the effluent term dominates!).',
          'SOTE = 7 %·3 m = 21 %; C_S,T,m = 9.08·(1 + 1.5/10.33)·(1 − 0.005·OTE) → solve OTE = 21·(C_S,T,m − 2)/9.08 → **OTE = 17.3 %**.',
          'Q_G = 8796/(0.173·282) = **180 m³/d**; N_G = (180/86 400)·1000·9.81·3/0.9 = **68 W**.',
        ] },
      },
    ],
    q: [
      { t: 'card', f: 'Standard conditions of an aeration rating', b: 'Clean water, 20 °C, 1 atm, C_L = 0 (C*_S = 9.08 g/m³, C_G,O₂ = 282 g/m³).' },
      { t: 'card', f: 'Conversion from SOTR to OTR', b: R`$OTR = \frac{\alpha}{k_C\,k_T}SOTR$.` },
      { t: 'card', f: 'k_T – definition and values', b: R`$k_T = K_La^*/K_La_T = e^{0.02(20 - T)}$: 10 °C 1.22, 15 °C 1.11, 25 °C 0.90.` },
      { t: 'card', f: 'k_C – definition', b: R`$k_C = C_S^*/(C_{S,T,m} - C_L)$ = standard / real driving force.` },
      { t: 'card', f: 'Typical α values', b: 'Fine bubbles 0.75 (foaming 0.4–0.5), medium 0.8, coarse 0.85, surface aerators 0.9.' },
      { t: 'card', f: 'What do S, T, m stand for in C_S,T,m?', b: 'Saturation, at the actual Temperature, at mid-depth (half the injection depth).' },
      { t: 'card', f: 'Pressure factor at mid-depth', b: R`$(p_{amb} + 0.5\,h_{inj}/10.33)/1$ atm (or "10 m = 1 atm" if the exam says so).` },
      { t: 'card', f: 'Air flow from an oxygen demand', b: R`$Q_G = OD/(OTE\cdot C_{G,O_2}(T,p))$; standard: $SOTR/(SOTE\cdot282)$.` },
      { t: 'card', f: 'Blower power', b: R`$N_G = Q_G\rho g(h_{inj} + h_{loss})/\eta$ [W] – Q_G in **m³/s**.` },
      { t: 'card', f: 'Boxed O₂ demand of a WWTP', b: R`$OD = Q\Delta COD - M_{ex} + (4.57 + Y_{nitr})N_{nitr} - 2.86N_{denit} + QC_L$.` },
      { t: 'card', f: 'N nitrified in the WWTP balance', b: R`$N_{nitr} = Q(TKN_{in} - TKN_e) - i_N M_{ex}$.` },
      { t: 'card', f: 'Why +Y_nitr·N_nitr in the OD formula?', b: 'Nitrifier biomass is part of M_ex but was not made from influent COD; since M_ex is subtracted, it is added back.' },
      { t: 'card', f: 'Why +Q·C_L in the OD formula?', b: 'The effluent leaves with the tank O₂ concentration – that oxygen must also be transferred (anaerobic inflow).' },
      { t: 'card', f: 'Maximum-inflow recipe', b: 'OTR = OTE·Q_G·C_G → write OD = a·Q − b → Q = (OTR + b)/a.' },
      { t: 'card', f: 'Does a deeper tank improve the aeration efficiency (kg O₂/kWh)?', b: 'No – OTR and blower power both grow ∝ depth; AE stays about the same (14W-1c).' },

      { t: 'mcq', q: 'In winter (10 °C) instead of summer, how does the required air flow change (bubble aeration, same demand)?', a: ['Less air: higher C_S and denser cold air outweigh the lower K_La', 'More air: K_La drops 22 %', 'Unchanged', 'Only the blower power changes'], x: '21W-2c, 19W-2d: weak temperature dependence for absorption.' },
      { t: 'mcq', q: '22W-2a gives OTE_h = 4 %/m "at 0.96 atm and 10 °C" (operating conditions). What do you do with α and k?', a: ['Nothing – OTE = OTE_h·h_inj is already the operating value', 'Divide by α·k_C·k_T', 'Multiply by α/(k_C·k_T)', 'Convert with 282/280'], x: 'Only standard values (SOTE) need corrections.' },
      { t: 'mcq', q: 'k_T for a tank at 10 °C?', a: ['1.22', '0.82', '1.0', '0.90'], x: 'e^{0.02·10} = 1.22 (> 1 in cold water).' },
      { t: 'mcq', q: 'Which term of the OD formula is easily forgotten and was decisive in 14W-1b and 22W-2b?', a: ['+Q·C_L (O₂ leaving with the effluent)', '−M_ex', '4.57·N_nitr', '−2.86·N_denit'], x: 'With C_L = 2.5 g/m³ and Q = 7500 m³/d it is 19 kg/d.' },
      { t: 'mcq', q: '22W-2b: OD = 0.339·Q − 1289 [kg/d], OTR = 1256 kg/d. Q_max?', a: ['≈ 7500 m³/d', '≈ 3700 m³/d', '≈ 11 000 m³/d', '≈ 1300 m³/d'], x: '(1256 + 1289)/0.339.' },
      { t: 'mcq', q: 'For the blower power you have Q_G = 180 m³/d. What do you insert?', a: ['180/86 400 m³/s', '180 m³/d', '180/24 m³/h', '180·1000 L/d'], x: 'W = J/s needs m³/s.' },
      { t: 'mcq', q: 'COD-only plant (no nitrification): oxygen demand?', a: ['Q·ΔCOD·(1 − Y_obs,COD)', 'Q·ΔCOD', '4.57·Q·TKN', 'Q·ΔCOD − Q·C_L'], x: '17S-3a: 10·176·0.6 = 1056 g/d.' },
      { t: 'mcq', q: 'Why is α lowest for fine bubbles?', a: ['Their large specific surface is most affected by the surfactant layer', 'Fine bubbles rise faster', 'Fine bubbles have less O₂', 'α only applies to surface aerators'], x: 'Surfactants increase a but reduce K_L.' },
      { t: 'mcq', g: 'csat', gp: { T: 10, p: 0.96, h: 2.8, ote: 0, cl: 2.5 }, q: '22S-2a with the plot: C_S,T,m ≈ 12.35 g/m³, C_L = 2.5 g/m³. k_C?', a: ['≈ 0.92', '≈ 1.08', '≈ 0.74', '≈ 1.22'], x: '9.08/(12.35 − 2.5) = 0.92. The dummy in the exam was 0.8.' },

      { t: 'trend', q: 'The tank O₂ setpoint C_L is raised from 1 to 2.5 g/m³. What happens to …', r: [['driving force C_S,T,m − C_L', -1], ['k_C', 1], ['required air flow', 1]], x: 'Higher setpoint = less driving force.' },
      { t: 'trend', q: 'Diffusers moved deeper (h_inj ↑). What happens to …', r: [['SOTE', 1], ['C_S,T,m', 1], ['blower pressure', 1], ['aeration efficiency AE', 0]], x: 'The gains and costs cancel for AE.' },
      { t: 'trend', q: 'Surfactants (detergents) increase. What happens to …', r: [['α', -1], ['OTR at the same air flow', -1]], x: 'α = K_La(ww)/K_La(clean).' },
      { t: 'trend', q: 'Part of the nitrate is denitrified. What happens to …', r: [['oxygen demand', -1], ['alkalinity', 1], ['maximum treatable inflow', 1]], x: '2.86 g O₂/g N credit and +1 Alk/N.' },

      { t: 'factor', q: 'SOTE_h = 5 %/m, diffusers moved from 2 m to 4 m. SOTE …', a: ['×2', '×4', '×1.41', '×1'], x: 'SOTE = SOTE_h·h.' },
      { t: 'factor', q: 'Q_G given in m³/d instead of m³/s in the blower formula: result wrong by …', a: ['×86 400', '×24', '×3600', '×1000'], x: 'Classic unit trap.' },
      { t: 'factor', q: 'Oxygen demand doubles (same OTE): air flow …', a: ['×2', '×4', '×1.41', '×1'], x: 'Q_G = OD/(OTE·C_G).' },

      { t: 'gap', q: 'Actual vs standard oxygen transfer rate', f: R`$$OTR = \frac{\alpha}{▢}\,SOTR$$`, a: [R`$k_C\,k_T$`, R`$k_C$`, R`$k_T$`, R`$C_S^*$`], x: '' },
      { t: 'gap', q: 'Driving-force factor', f: R`$$k_C = \frac{C_S^*}{▢}$$`, a: [R`$C_{S,T,m} - C_L$`, R`$C_{S,T,m}$`, R`$C_S^* - C_L$`, R`$C_L$`], x: '' },
      { t: 'gap', q: 'Air flow', f: R`$$Q_G = \frac{OD}{OTE\cdot ▢}$$`, a: [R`$C_{G,O_2}(T,p)$`, R`$C_{S,T,m}$`, R`$K_La$`, R`$\rho g h$`], x: 'O₂ content of the air ≈ 280 g/m³.' },
      { t: 'gap', q: 'O₂ demand – nitrification term', f: R`$$\ldots + (4.57 + ▢)\,N_{nitr} - 2.86\,N_{denit} + Q\,C_L$$`, a: [R`$Y_{nitr}$`, R`$i_N$`, R`$1.71$`, R`$-Y_{nitr}$`], x: '4.57 + 0.24 = 4.81.' },

      { t: 'order', q: 'Air flow and blower power from an oxygen demand (Ex4, 19S-4): order', s: ['Oxygen demand OD (incl. Q·C_L if relevant)', 'k_T and C_S,T,m (pressure at mid-depth)', 'k_C = 9.08/(C_S,T,m − C_L)', 'OTE = SOTE·α/(k_C·k_T) (iterate if OTE_h is inside C_S,T,m)', 'Q_G = OD/(OTE·C_G,O₂)', 'N_G = Q_G·ρ·g·(h + h_loss)/η with Q_G in m³/s'], x: '' },
      { t: 'order', q: 'Maximum inflow of a WWTP (22W-2b): order', s: ['OTR = OTE·Q_G·C_G,O₂ (capacity)', 'ΔCOD and TKN removed per m³', 'N_nitr = Q·ΔTKN − i_N·M_ex', 'OD = Q·ΔCOD − M_ex + 4.81·N_nitr + Q·C_L = a·Q − b', 'Q_max = (OTR + b)/a'], x: '≈ 7500 m³/d.' },

      { t: 'bug', q: '19W-2b: Q 8000 m³/d, ΔCOD 0.275 kg/m³, M_ex 1000 kgCOD/d, ΔTKN 0.034 kg/m³, i_N 0.06, Y_nitr 0.24.', s: ['COD term: 8000·0.275 − 1000 = 1200 kg/d', 'N_nitr = 8000·0.034 = 272 kg N/d', 'OD = 1200 + 4.81·272 = 2508 kg/d'], w: 1, fix: 'Subtract the N in the excess sludge: N_nitr = 272 − 0.06·1000 = 212 → OD = 1200 + 4.81·212 = **2220 kg/d** (official 2219.72).' },
      { t: 'bug', q: '22S-2a: 10 °C, 0.96 atm, h_inj 2.8 m, C_L 2.5 g/m³, depletion neglected. k_C?', s: ['C_S,10°C,1atm = 11.27 g/m³', 'C_S,T,m = 11.27 × (0.96 + 2.8/10.33) = 13.87 g/m³', 'k_C = 9.08/(13.87 − 2.5) = 0.80'], w: 1, fix: 'Mid-depth: 0.5·h_inj → C_S,T,m = 11.27·(0.96 + 1.4/10.33) = 12.35 → **k_C = 0.92** (official).' },

      { t: 'match', q: 'Match the factor with what it corrects', p: [['α', 'wastewater vs clean water (surfactants)'], ['k_T', 'temperature effect on K_La'], ['k_C', 'real vs standard driving force (C_S,T,m − C_L)'], ['β (M&E)', 'salinity effect on C_S']], x: '' },
    ],
  });
})();
