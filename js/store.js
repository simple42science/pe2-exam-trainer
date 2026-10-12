/* PE II Trainer – local state: spaced repetition (Leitner), XP, streak, badges.
 * Everything lives in localStorage on this device. No server, no database.
 */
(function () {
  const PE = (window.PE = window.PE || {});
  const KEY = 'pe2trainer.v1';
  const INTERVALS = [0, 1, 2, 4, 8, 16]; // days per Leitner box 0..5
  const MAXBOX = 5;

  const fresh = () => ({
    v: 1,
    srs: {},          // itemId -> [box, dueDay, seen, correct, lastDay]
    xp: 0,
    streak: { last: 0, count: 0, best: 0 },
    days: {},         // dayNumber -> answers that day
    best: {},         // mode -> highscore
    badges: {},       // badgeId -> dayNumber
    tackled: {},      // 'exam.task.sub' -> 1 (review) | 2 (got it)
    read: {},         // topicId -> 1
    graphs: {},       // graphId -> 1
    settings: { theme: 'auto', examDate: '', examMin: 120, topics: [] },
    created: Date.now(),
  });

  let S = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return fresh();
      const d = JSON.parse(raw);
      const f = fresh();
      return Object.assign(f, d, { settings: Object.assign(f.settings, d.settings || {}) });
    } catch (e) {
      return fresh();
    }
  }

  let saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage full or blocked */ }
    }, 80);
  }
  function saveNow() {
    clearTimeout(saveTimer);
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ }
  }

  function today() {
    const d = new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  }

  // ---- ids ---------------------------------------------------------------
  function hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  // ---- SRS ---------------------------------------------------------------
  function rec(id) { return S.srs[id]; }
  function box(id) { const r = S.srs[id]; return r ? r[0] : 0; }
  function isDue(id) {
    const r = S.srs[id];
    return !r || r[1] <= today();
  }
  function seen(id) { return !!S.srs[id]; }

  /** grade: 0 = wrong/again, 1 = hard, 2 = good, 3 = easy */
  function grade(id, g) {
    const t = today();
    const r = S.srs[id] || [0, t, 0, 0, t];
    let b = r[0];
    if (g === 0) b = 1;
    else if (g === 1) b = Math.max(1, b);
    else if (g === 2) b = Math.min(MAXBOX, b + 1);
    else b = Math.min(MAXBOX, b + 2);
    r[0] = b;
    r[1] = t + (g === 0 ? 0 : g === 1 ? 1 : INTERVALS[b]);
    r[2] += 1;
    if (g > 0) r[3] += 1;
    r[4] = t;
    S.srs[id] = r;
    S.days[t] = (S.days[t] || 0) + 1;
    touchStreak();
    save();
    return b;
  }

  function touchStreak() {
    const t = today();
    const st = S.streak;
    if (st.last === t) return;
    st.count = st.last === t - 1 ? st.count + 1 : 1;
    st.last = t;
    st.best = Math.max(st.best || 0, st.count);
    if (st.count >= 3) award('streak3');
    if (st.count >= 7) award('streak7');
    if (st.count >= 30) award('streak30');
  }
  function streak() {
    const t = today();
    const st = S.streak;
    return st.last >= t - 1 ? st.count : 0;
  }

  // ---- XP & levels -------------------------------------------------------
  const LEVELS = [
    [0, 'Raw Water', '🌊'], [80, 'Screened', '🪣'], [200, 'Coagulated', '🧂'], [400, 'Flocculated', '🫧'],
    [700, 'Settled', '⬇️'], [1100, 'Filtered', '⏳'], [1600, 'Ozonated', '⚡'], [2200, 'Carbon-Polished', '🖤'],
    [3000, 'Membrane-Clean', '🧪'], [4000, 'Disinfected', '🛡️'], [5200, 'Drinking Water', '💧'],
    [6600, 'Plant Operator', '🏭'], [8200, 'Process Engineer', '🎓'], [10000, 'PE II Master', '🏆'],
  ];
  function level(xp) {
    xp = xp === undefined ? S.xp : xp;
    let i = 0;
    while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1][0]) i++;
    const cur = LEVELS[i], next = LEVELS[i + 1];
    return {
      n: i + 1, name: cur[1], icon: cur[2], min: cur[0], next: next ? next[0] : null,
      frac: next ? (xp - cur[0]) / (next[0] - cur[0]) : 1,
    };
  }
  let onLevelUp = null;
  function addXP(n) {
    const before = level().n;
    S.xp += n;
    save();
    const after = level();
    if (after.n > before && onLevelUp) onLevelUp(after);
    return after;
  }

  // ---- badges ------------------------------------------------------------
  const BADGES = {
    first: ['🚀', 'First Steps', 'Finish your first practice session'],
    tackle1: ['🧭', 'Tackler', 'Tackle your first original exam task'],
    exam1: ['📝', 'Exam Hero', 'Tackle every sub-question of one full exam'],
    exams5: ['🗂️', 'Old-Exam Veteran', 'Tackle 5 complete exams'],
    examsAll: ['👑', 'Archive Conqueror', 'Tackle all 19 original exams'],
    streak3: ['🔥', 'Warming Up', '3-day streak'],
    streak7: ['🔥', 'On Fire', '7-day streak'],
    streak30: ['🌋', 'Unstoppable', '30-day streak'],
    perfect: ['💯', 'Perfect Run', 'A session of 10+ questions without a mistake'],
    speed15: ['⚡', 'Quick Thinker', 'Score 15+ in the Speed Round'],
    speed25: ['🏎️', 'Lightning', 'Score 25+ in the Speed Round'],
    bugs10: ['🐞', 'Trap Hunter', 'Find 10 bugs in Bug Hunt'],
    graphs10: ['📈', 'Graph Guru', 'Explore 10 interactive graphs'],
    allTopics: ['🌈', 'Full Spectrum', 'Read every topic page'],
    master1: ['🎯', 'Topic Master', 'Reach 80 % mastery in one topic'],
    master5: ['🧠', 'Polymath', 'Reach 80 % mastery in five topics'],
    mock: ['⏱️', 'Mock Survivor', 'Finish a mock exam'],
  };
  let onBadge = null;
  function award(id) {
    if (S.badges[id] || !BADGES[id]) return false;
    S.badges[id] = today();
    save();
    if (onBadge) onBadge(id, BADGES[id]);
    return true;
  }

  // ---- export / import -----------------------------------------------------
  function exportJSON() { return JSON.stringify(S, null, 1); }
  function importJSON(txt) {
    const d = JSON.parse(txt);
    if (!d || typeof d !== 'object' || !d.srs) throw new Error('Not a PE II Trainer backup');
    const f = fresh();
    S = Object.assign(f, d, { settings: Object.assign(f.settings, d.settings || {}) });
    saveNow();
  }
  function reset() { S = fresh(); saveNow(); }

  PE.store = {
    get S() { return S; },
    save, saveNow, today, hash, rec, box, isDue, seen, grade, streak,
    addXP, level, LEVELS, award, BADGES, MAXBOX,
    exportJSON, importJSON, reset,
    set onLevelUp(f) { onLevelUp = f; },
    set onBadge(f) { onBadge = f; },
  };
})();
