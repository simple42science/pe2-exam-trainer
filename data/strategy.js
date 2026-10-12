(function () {
  const R = String.raw;
  PE.strategy = {
    learn: [
      {
        h: '📌 What we know about the exam',
        li: [
          'All 19 past exams (2014–2023) had **exactly 4 tasks**, 10–30 points each, from **at least 4 different topics**.',
          '**Dummy values {…}** are given for intermediate results: if you are stuck, continue with them – you only lose that sub-question. They are *not* the answers.',
          'Tasks mix **calculation and interpretation** ("Explain…", "Which is better and why?", "in one sentence").',
          '**Open book:** everything except communication devices. Your Spick is the index; time, not knowledge, is the bottleneck.',
        ],
      },
      {
        h: '🧭 The workflow for every task',
        rec: [
          'Sketch the system and the control volume; write **given** and **wanted**; convert to SI or moles.',
          'Write the **assumptions** (steady state, ideal mixing, Alk ≈ HCO₃⁻, X ≫ 1 …) – they earn points.',
          'Solve **symbolically**, then insert numbers **with units**, underline the result.',
          'Plausibility: unit in the [ ] of the Spick formula, order of magnitude, sign, η ≤ 100 %.',
          'Stuck > 5 min? **Dummy value** and move on.',
          'Interpret in **one sentence with a number**.',
        ],
      },
      {
        h: '⏱️ Time management',
        li: [
          '**5 min:** read all four tasks, mark the dummy values, start with your **strongest** task.',
          '**Time per point** = exam duration ÷ total points (set your exam duration in Progress → Settings; every walkthrough shows it).',
          'Never let one sub-question block the rest – dummies exist for exactly that.',
          'Last 5 min: units, magnitudes, η ≤ 100 %, did you answer the qualitative part?',
        ],
      },
      {
        h: '✍️ Writing qualitative answers',
        p: [R`Pattern: **claim + mechanism + number from your calculation.** Example: "Plug flow is better (99.99 % vs 97.8 %), because for a 1st-order reaction the CSTR runs at the low effluent concentration everywhere." Give exactly as many arguments as asked.`],
        li: [
          '"Which is limiting?" → compute both (t_B vs t_HL, SHC I vs II, X ≫ 1 vs X ≪ 1, κ_rev vs κ_irr) and name the smaller/larger one.',
          '"What changes if …?" → say what rises, what falls, why (the **Up or down?** game trains exactly this).',
          '"Is the assumption reasonable?" → compare two numbers (β_M vs β_µ, rate via O₃ vs via •OH, NH₃ off-gas vs inflow load).',
        ],
      },
      {
        h: '📊 What comes up (19 exams 2014–2023)',
        tbl: [
          ['topic (Spick §)', 'tasks', 'priority'],
          ['13 Ultrafiltration', '7', 'A'], ['14 Reverse osmosis', '6 (+19S-2)', 'A'], ['7 Aeration', '7', 'A'], ['15 Activated carbon', '7', 'A'],
          ['1 P precipitation', '6', 'A'], ['4 Oxidation', '6', 'A'], ['11 Sedimentation', '6', 'A'], ['12 Filtration', '6', 'A'],
          ['8 Stripping', '5', 'A'], ['2 Scaling', '5', 'A'], ['10 Coagulation/flocculation', '5', 'B'], ['3 Fe/Mn', '4', 'B'],
          ['5 Disinfection', '4', 'B'], ['9 Particles (PSD)', '4', 'B'], ['6 Gas exchange basics', '1 (+parts)', 'B – basis for 7/8!'], ['16 System integration', '0', 'C – qualitative'],
        ],
        note: 'Membranes (UF + RO) appeared in 13 of 19 exams, gas exchange (aeration + stripping) also in 13 of 19. The carbonate system/alkalinity hides in roughly every third task.',
      },
      {
        h: '🔄 Reverse training – prepare for "new" tasks',
        li: [
          'After each task ask: what if given and wanted were swapped? (area → removal, removal → volume/air/dose)',
          'Switch the reactor: batch ↔ PFR ↔ CSTR ↔ cascade.',
          'Change a parameter (T, pH, grain size, flow, concentration): what rises, what falls, why – one sentence + number.',
          'Practise the sketches: solids flux curve + state point, isotherm + operating line, PSD before/after flocculation, breakpoint curve, filter run, log k_app vs pH.',
        ],
        tip: 'Open book rewards preparation, not searching: practise with exactly the documents you will bring (Spick, scripts with tabs, calculator).',
      },
      {
        h: '🗓️ Your plan (Lernplan)',
        li: [
          'Phase 1: topic by topic with the 2014–2019 exam tasks (use the walkthroughs here after solving on paper).',
          'Phase 2: the six newest exams (2021–2023) as **real mocks** on paper, timed – they are marked "Phase-2 mock" in this app.',
          'Phase 3: mixed mock exams, blind formula tests, qualitative questions out loud, final Spick.',
          'Exam day − 2: only light review, sleep, no new topics.',
        ],
      },
    ],
  };
})();
