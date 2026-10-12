/* PE II Trainer – router, screens, UI utilities. */
(function () {
  const PE = window.PE;
  const fmt = PE.fmt;
  const S = PE.store;
  const $ = (sel, el) => (el || document).querySelector(sel);
  const view = () => $('#view');

  // ------------------------------------------------------------- registries
  PE.topics = PE.topics || [];
  PE.exams = PE.exams || [];
  PE.topicById = {};
  PE.examById = {};
  const GRP = { tool: 'Toolbox', chem: 'Water chemistry', ox: 'Oxidation & disinfection', gas: 'Gas exchange', part: 'Particles', mem: 'Membranes', ac: 'Activated carbon', sys: 'System' };
  const MOCK_SET = new Set(['21S', '21W', '22S', '22W', '23S', '23W']);

  // ------------------------------------------------------------- UI utils
  const ui = (PE.ui = {});
  let toastT = null;
  ui.toast = function (msg) {
    const t = $('#toast');
    t.innerHTML = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 2600);
  };
  ui.confetti = function () {
    const c = $('#confetti');
    if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = c.getContext('2d');
    c.width = innerWidth; c.height = innerHeight;
    const cols = ['#0b7f8a', '#2563eb', '#ea580c', '#059669', '#7c3aed', '#facc15', '#db2777'];
    const P = Array.from({ length: 140 }, () => ({
      x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5, vx: (Math.random() - 0.5) * 3,
      vy: 2 + Math.random() * 3, s: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: cols[(Math.random() * cols.length) | 0],
    }));
    let f = 0;
    (function loop() {
      ctx.clearRect(0, 0, c.width, c.height);
      P.forEach((p) => { p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.66); ctx.restore(); });
      if (++f < 170) requestAnimationFrame(loop); else ctx.clearRect(0, 0, c.width, c.height);
    })();
  };
  function ring(frac, label, size) {
    const r = 22, C = 2 * Math.PI * r;
    return `<svg class="ring" viewBox="0 0 54 54" style="${size ? `width:${size}px;height:${size}px` : ''}"><circle class="rb" cx="27" cy="27" r="${r}"/><circle class="rf" cx="27" cy="27" r="${r}" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - Math.max(0, Math.min(1, frac)))}"/><text x="27" y="32" text-anchor="middle">${label}</text></svg>`;
  }
  ui.ring = ring;

  ui.refreshHeader = function () {
    const lv = S.level();
    $('#hStreak').textContent = `🔥 ${S.streak()}`;
    $('#hLevel').textContent = `${lv.icon} ${lv.n}`;
  };

  S.onLevelUp = (lv) => { ui.toast(`${lv.icon} Level ${lv.n}: <b>${lv.name}</b>!`); ui.confetti(); };
  S.onBadge = (id, b) => { setTimeout(() => ui.toast(`${b[0]} Badge unlocked: <b>${b[1]}</b>`), 900); };

  // ------------------------------------------------------------- stats
  function topicItems(tid) { return PE.items.filter((it) => it.topic === tid); }
  function mastery(tid) {
    const its = topicItems(tid);
    if (!its.length) return 0;
    return its.reduce((a, it) => a + S.box(it.id), 0) / (its.length * S.MAXBOX);
  }
  function dueCount(filter) {
    return PE.items.filter((it) => (!filter || filter(it)) && S.seen(it.id) && S.isDue(it.id)).length;
  }
  function examProgress(ex) {
    let n = 0, d = 0;
    ex.tasks.forEach((tk) => tk.subs.forEach((sb) => { n++; if (S.S.tackled[`${ex.id}.${tk.n}.${sb.l}`]) d++; }));
    return { n, d };
  }
  function checkMasteryBadges() {
    const m = PE.topics.filter((t) => mastery(t.id) >= 0.8).length;
    if (m >= 1) S.award('master1');
    if (m >= 5) S.award('master5');
    const full = PE.exams.filter((e) => { const p = examProgress(e); return p.n && p.d === p.n; }).length;
    if (Object.keys(S.S.tackled).length) S.award('tackle1');
    if (full >= 1) S.award('exam1');
    if (full >= 5) S.award('exams5');
    if (full >= PE.exams.length && PE.exams.length) S.award('examsAll');
    if (PE.topics.every((t) => S.S.read[t.id])) S.award('allTopics');
    if (Object.keys(S.S.graphs).length >= 10) S.award('graphs10');
  }
  function examRefLink(ref) {
    const m = /^(\d\d[SW])-(\d)/.exec(ref);
    if (!m || !PE.examById[m[1]]) return `<span class="exam-ref">${ref}</span>`;
    return `<a class="exam-ref" href="#/tackle/${m[1]}/${m[2]}">${ref}</a>`;
  }
  function tnum(tp) { return `<span class="tnum grp-${tp.grp}">${tp.n}</span>`; }
  function daysToExam() {
    const d = S.S.settings.examDate;
    if (!d) return null;
    const ms = new Date(d + 'T08:00:00').getTime() - Date.now();
    return Math.ceil(ms / 86400000);
  }

  // ------------------------------------------------------------- modes
  const MODES = [
    { id: 'review', icon: '🔁', name: 'Smart review', desc: 'Due items from every game, spaced repetition', types: ['card', 'mcq', 'trend', 'factor', 'gap', 'order', 'bug', 'match', 'tackle', 'where'], n: 15 },
    { id: 'cards', icon: '🃏', name: 'Flashcards', desc: 'Concepts, definitions, numbers to know', types: ['card'], n: 20 },
    { id: 'quiz', icon: '❓', name: 'Quiz', desc: 'Concept & exam-logic multiple choice', types: ['mcq'], n: 12 },
    { id: 'tool', icon: '🧭', name: 'Which tool?', desc: 'Real exam sub-questions: pick the approach', types: ['tackle'], n: 10, pickOnly: true },
    { id: 'where', icon: '🗺️', name: 'Where in the plant?', desc: 'Tap the unit on the plant map where it happens', types: ['where'], n: 10 },
    { id: 'trend', icon: '↕️', name: 'Up or down?', desc: 'What rises, what falls – the qualitative questions', types: ['trend'], n: 10 },
    { id: 'factor', icon: '✖️', name: 'Factor sprint', desc: '75 s of mental scaling (×4, ×100 …), no calculator', types: ['factor'], n: 40, timed: 75 },
    { id: 'gap', icon: '🧩', name: 'Formula builder', desc: 'Fill the missing term of a Spick formula', types: ['gap'], n: 10 },
    { id: 'order', icon: '🪜', name: 'Solution path', desc: 'Put the solving steps in the right order', types: ['order'], n: 6 },
    { id: 'bug', icon: '🐞', name: 'Bug hunt', desc: 'Find the step with the classic mistake', types: ['bug'], n: 6 },
    { id: 'match', icon: '🔗', name: 'Match it', desc: 'Pair concepts, processes, by-products …', types: ['match'], n: 4 },
    { id: 'speed', icon: '⚡', name: 'Speed round', desc: '90 s mixed quick-fire, beat your highscore', types: ['mcq', 'factor', 'trend'], n: 60, timed: 90, filter: (it) => it.t !== 'trend' || it.r.length === 1 },
  ];
  const modeById = {};
  MODES.forEach((m) => { modeById[m.id] = m; });

  function topicFilter() { return S.S.settings.topics || []; }

  // ------------------------------------------------------------- router
  const routes = [];
  function route(re, fn, opt) { routes.push({ re, fn, opt: opt || {} }); }

  function go() {
    const h = location.hash.replace(/^#/, '') || '/';
    const [path, qs] = h.split('?');
    const params = new URLSearchParams(qs || '');
    for (const r of routes) {
      const m = r.re.exec(path);
      if (m) {
        setChrome(r.opt, path);
        view().classList.remove('pm-open');
        view().innerHTML = '';
        try { r.fn(m, params); } catch (e) { console.error(e); view().innerHTML = `<div class="card"><b>Something went wrong.</b><pre class="small">${PE.esc(e.stack || e)}</pre></div>`; }
        window.scrollTo(0, 0);
        ui.refreshHeader();
        return;
      }
    }
    location.hash = '#/';
  }
  function setChrome(opt, path) {
    $('#backBtn').classList.toggle('hidden', !opt.back);
    $('#hTitle').textContent = opt.title || 'PE II Trainer';
    $('#hSub').textContent = opt.sub || 'Process Engineering II · exam coach';
    const tab = opt.tab || '';
    document.querySelectorAll('.bottom-nav a').forEach((a) => a.classList.toggle('on', a.dataset.tab === tab));
  }
  function setTitle(t, sub) { $('#hTitle').textContent = t; if (sub !== undefined) $('#hSub').textContent = sub; }

  // ------------------------------------------------------------- HOME
  route(/^\/$/, () => {
    const lv = S.level(), due = dueCount(), unseen = PE.items.filter((it) => !S.seen(it.id)).length;
    const dte = daysToExam();
    const nextEx = (() => {
      const order = PE.exams.filter((e) => !MOCK_SET.has(e.id));
      for (const e of order) for (const tk of e.tasks) if (tk.subs.some((sb) => !S.S.tackled[`${e.id}.${tk.n}.${sb.l}`])) return [e, tk];
      return null;
    })();
    const weak = PE.topics.filter((t) => t.pri === 'A').map((t) => [t, mastery(t.id)]).sort((a, b) => a[1] - b[1]).slice(0, 3);
    const totalSubs = PE.exams.reduce((a, e) => a + examProgress(e).n, 0), doneSubs = Object.keys(S.S.tackled).length;
    view().innerHTML = `
      <div class="card">
        <div class="lvl">${ring(lv.frac, lv.icon, 58)}
          <div style="flex:1;min-width:0">
            <div style="font-weight:800">Level ${lv.n} · ${lv.name}</div>
            <div class="small muted">${S.S.xp} XP${lv.next ? ` · ${lv.next - S.S.xp} to next level` : ' · max level!'}</div>
            <div class="small" style="margin-top:2px">🔥 ${S.streak()}-day streak${S.S.streak.best ? ` · best ${S.S.streak.best}` : ''}</div>
          </div>
          <div class="center" style="min-width:70px">
            ${dte === null ? `<a class="small" href="#/progress">Set exam date</a>` : `<div style="font-size:1.6rem;font-weight:900;line-height:1">${dte > 0 ? dte : '🎓'}</div><div class="small muted">${dte > 0 ? 'days to exam' : 'exam day'}</div>`}
          </div>
        </div>
      </div>
      <div class="grid">
        <a class="tile hero" href="#/play/review"><span class="ti">🔁</span><span class="tt">Daily mix – smart review</span>
          <span class="ts">${due ? `${due} items are due` : 'Nothing due'} · ${unseen} new items waiting · all games mixed</span></a>
        <a class="tile wide" href="#/map"><span class="tt">🗺️ Plant roadmap</span><span class="ts">Where every process sits in a wastewater and a drinking-water plant – tap a unit, follow a pollutant</span>
          <span class="trail" aria-hidden="true">🚽 → ⏬ → 🦠 🫧 → 🌀 → ⚡ → ⏳ → 🏞️</span></a>
        ${nextEx ? `<a class="tile" href="#/tackle/${nextEx[0].id}/${nextEx[1].n}"><span class="ti">🧭</span><span class="tt">Tackle next exam task</span><span class="ts">${nextEx[0].label} · ${nextEx[1].title}</span></a>`
          : `<a class="tile" href="#/exams"><span class="ti">🧭</span><span class="tt">Exam walkthroughs</span><span class="ts">All 2014–2020 tasks tackled!</span></a>`}
        <a class="tile" href="#/mock"><span class="ti">⏱️</span><span class="tt">Mock exam</span><span class="ts">4 random tasks, exam-style</span></a>
        <a class="tile" href="#/play/speed"><span class="ti">⚡</span><span class="tt">Speed round</span><span class="ts">Highscore ${S.S.best.speed || 0}</span></a>
        <a class="tile" href="#/graphs"><span class="ti">📈</span><span class="tt">Graph lab</span><span class="ts">${PE.G.order.length} interactive graphs</span></a>
        <a class="tile" href="#/strategy"><span class="ti">🎯</span><span class="tt">Exam strategy</span><span class="ts">How to attack every task</span></a>
        <a class="tile" href="#/search"><span class="ti">🔎</span><span class="tt">Find on the Spick</span><span class="ts">Search formulas & concepts</span></a>
      </div>
      <h3>Topic mastery</h3>
      <div class="heat">${PE.topics.map((t) => { const m = mastery(t.id); return `<a href="#/topic/${t.id}" title="${t.title}"><i class="grp-${t.grp}" style="height:${Math.round(m * 100)}%"></i><span>${t.n}</span></a>`; }).join('')}</div>
      <p class="small muted" style="margin:6px 2px 0">Fill = mastery (spaced-repetition level of the topic's items). Colours = Spick chapter colours.</p>
      <h3>Focus next (priority A, lowest mastery)</h3>
      ${weak.map(([t, m]) => `<a class="topic-row" href="#/topic/${t.id}">${tnum(t)}<div class="tb"><div class="tt">${t.title}</div><div class="bar thin" style="margin-top:5px"><i style="width:${Math.round(m * 100)}%"></i></div></div><span class="small muted">${Math.round(m * 100)}%</span></a>`).join('')}
      <div class="card flat small muted">Exam coverage: <b>${doneSubs}</b> of ${totalSubs} original sub-questions tackled. Everything is saved only on this device (Progress → backup).</div>`;
  }, { tab: 'home' });

  // ------------------------------------------------------------- LEARN list
  route(/^\/learn$/, () => {
    const groups = {};
    PE.topics.forEach((t) => { (groups[t.grp] = groups[t.grp] || []).push(t); });
    view().innerHTML = `<h2>Learn – all topics</h2>
      <p class="small muted">Same numbering as your Spick, Lernplan and podcasts. Priority from 19 past exams: <span class="prio A">A</span> very frequent, <span class="prio B">B</span> regular, <span class="prio">C</span> qualitative.</p>
      <a class="topic-row" href="#/map"><span class="pm-ic">🗺️</span><div class="tb"><div class="tt">Plant roadmap</div><div class="ts">See where each topic sits in a WWTP and a drinking-water plant</div></div>›</a>
      ${PE.topics.map((t) => { const m = mastery(t.id); return `<a class="topic-row" href="#/topic/${t.id}">${tnum(t)}
        <div class="tb"><div class="tt">${t.title} ${S.S.read[t.id] ? '✓' : ''}</div><div class="ts">${GRP[t.grp]} · ${t.exams.length ? `${t.exams.length} exam task${t.exams.length > 1 ? 's' : ''}` : 'qualitative'} · ${topicItems(t.id).length} items</div>
        <div class="bar thin" style="margin-top:5px"><i style="width:${Math.round(m * 100)}%"></i></div></div>
        <span class="prio ${t.pri}">${t.pri}</span></a>`; }).join('')}`;
  }, { tab: 'learn', title: 'Learn' });

  // ------------------------------------------------------------- TOPIC page
  function learnSection(sec) {
    let h = `<div class="card learn">`;
    if (sec.h) h += `<h3>${fmt(sec.h)}</h3>`;
    (Array.isArray(sec.p) ? sec.p : sec.p ? [sec.p] : []).forEach((p) => { h += `<p>${fmt(p)}</p>`; });
    (sec.f || []).forEach((f) => {
      h += `<div class="fx">${fmt('$$' + f.m + (f.u ? ` \\un{${f.u}}` : '') + '$$')}${f.w ? `<div class="wh">${fmt(f.w)}</div>` : ''}</div>`;
    });
    if (sec.li) h += `<ul>${sec.li.map((x) => `<li>${fmt(x)}</li>`).join('')}</ul>`;
    if (sec.rec) h += `<ol class="recipe">${sec.rec.map((x) => `<li>${fmt(x)}</li>`).join('')}</ol>`;
    if (sec.tbl) h += `<div class="tscroll"><table class="t"><tr>${sec.tbl[0].map((c) => `<th>${fmt(c)}</th>`).join('')}</tr>${sec.tbl.slice(1).map((r) => `<tr>${r.map((c) => `<td>${fmt(c)}</td>`).join('')}</tr>`).join('')}</table></div>`;
    if (sec.g) h += `<div class="gmount" data-g="${sec.g}"></div>`;
    if (sec.trap) h += `<div class="trap">${fmt(sec.trap)}</div>`;
    if (sec.tip) h += `<div class="tip">${fmt(sec.tip)}</div>`;
    if (sec.note) h += `<div class="note">${fmt(sec.note)}</div>`;
    if (sec.ex) h += `<details class="ex"><summary>📝 ${fmt(sec.ex.t)}</summary><ol class="steps">${sec.ex.s.map((x) => `<li>${fmt(x)}</li>`).join('')}</ol></details>`;
    return h + '</div>';
  }
  function mountGraphs(root) {
    root.querySelectorAll('.gmount').forEach((el) => PE.G.mount(el, el.dataset.g));
  }

  route(/^\/topic\/(\w+)$/, (m) => {
    const t = PE.topicById[m[1]];
    if (!t) { location.hash = '#/learn'; return; }
    setTitle(`${t.n}. ${t.short || t.title}`, `${GRP[t.grp]} · Spick ${t.spick || '§' + t.n}`);
    const its = topicItems(t.id);
    const cnt = (ty) => its.filter((it) => it.t === ty).length;
    const pm = MODES.filter((md) => md.id !== 'review' && md.id !== 'speed' && its.some((it) => md.types.includes(it.t)));
    view().innerHTML = `
      <div class="card">
        <div class="row">${tnum(t)}<div style="flex:1"><div style="font-weight:800;font-size:1.1rem;line-height:1.2">${t.title}</div>
        <div class="small muted">${t.exams.length} exam task(s) · ${its.length} practice items · mastery ${Math.round(mastery(t.id) * 100)}%</div></div><span class="prio ${t.pri}">${t.pri}</span></div>
        ${t.oneMin ? `<p style="margin:10px 0 4px">${fmt(t.oneMin)}</p>` : ''}
        <div class="chips" style="margin-top:8px">${t.exams.map(examRefLink).join('')}</div>
        ${(() => { const sp = stationsForTopic(t.id); return sp.length ? `<div class="chips" style="margin-top:8px">${sp.map(([mp, id, st]) => `<a class="chip sm" href="#/map?m=${mp}&s=${id}">📍 ${PE.plant.maps[mp].icon} ${st.n}</a>`).join('')}</div>` : ''; })()}
      </div>
      <div class="chips scroll" style="margin-bottom:10px">
        <a class="chip on" href="#/play/review?t=${t.id}">🔁 Review topic</a>
        ${pm.map((md) => `<a class="chip" href="#/play/${md.id}?t=${t.id}">${md.icon} ${md.name} (${md.types.reduce((a, ty) => a + cnt(ty), 0)})</a>`).join('')}
      </div>
      <div id="learnBody">${(t.learn || []).map(learnSection).join('')}</div>
      <div class="card"><h3>🧭 Original exam tasks on this topic</h3><div class="task-list">${taskLinksForTopic(t.id)}</div></div>
      <button class="btn block ${S.S.read[t.id] ? 'ghost' : ''}" id="readBtn">${S.S.read[t.id] ? '✓ Marked as read' : 'Mark topic as read (+20 XP)'}</button>`;
    mountGraphs(view());
    $('#readBtn').addEventListener('click', (e) => {
      if (!S.S.read[t.id]) { S.S.read[t.id] = 1; S.addXP(20); S.save(); e.target.textContent = '✓ Marked as read'; e.target.classList.add('ghost'); checkMasteryBadges(); }
    });
  }, { back: true, tab: 'learn' });

  function taskLinksForTopic(tid) {
    const out = [];
    PE.exams.forEach((e) => e.tasks.forEach((tk) => {
      if (tk.topic !== tid && !(tk.also || []).includes(tid)) return;
      const n = tk.subs.length, d = tk.subs.filter((sb) => S.S.tackled[`${e.id}.${tk.n}.${sb.l}`]).length;
      out.push(`<a class="topic-row" href="#/tackle/${e.id}/${tk.n}" style="margin:0"><span class="exam-year" style="width:46px;height:46px;font-size:0.9rem">${e.id}<small>T${tk.n}</small></span><div class="tb"><div class="tt">${tk.title}</div><div class="ts">${tk.pts} pts · ${n} sub-questions${MOCK_SET.has(e.id) ? ' · Phase-2 mock' : ''}</div></div><span class="small muted">${d}/${n}</span></a>`);
    }));
    return out.join('') || '<p class="muted small">No calculation task so far – expect qualitative questions.</p>';
  }

  // ------------------------------------------------------------- PRACTICE
  route(/^\/practice$/, () => {
    const sel = new Set(topicFilter());
    const counts = (md) => PE.items.filter((it) => md.types.includes(it.t) && (!sel.size || sel.has(it.topic)) && (!md.filter || md.filter(it)) && (!md.pickOnly || (it.pick && it.pick.length > 1))).length;
    view().innerHTML = `<h2>Practice</h2>
      <div class="card flat"><div class="row" style="margin-bottom:6px"><b class="small">Topics</b><span class="spacer"></span>
        <button class="link-btn small" data-f="all">All</button><button class="link-btn small" data-f="A">Priority A</button><button class="link-btn small" data-f="none">Clear</button></div>
        <div class="chips">${PE.topics.map((t) => `<button class="chip ${sel.has(t.id) ? 'on' : ''}" data-t="${t.id}">${t.n} ${t.short || t.title}</button>`).join('')}</div>
        <p class="small muted" style="margin:6px 0 0">${sel.size ? `${sel.size} topic(s) selected` : 'No selection = all topics'}</p></div>
      <div class="grid">${MODES.map((md) => `<a class="tile" href="#/play/${md.id}"><span class="tn">${counts(md)}</span><span class="ti">${md.icon}</span><span class="tt">${md.name}</span><span class="ts">${md.desc}</span></a>`).join('')}
        <a class="tile" href="#/graphs"><span class="ti">📈</span><span class="tt">Graph lab</span><span class="ts">Play with the key diagrams of every chapter</span></a></div>`;
    view().querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => {
      const s = new Set(topicFilter());
      s.has(b.dataset.t) ? s.delete(b.dataset.t) : s.add(b.dataset.t);
      S.S.settings.topics = [...s]; S.save(); go();
    }));
    view().querySelectorAll('[data-f]').forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.f;
      S.S.settings.topics = f === 'all' || f === 'none' ? [] : PE.topics.filter((t) => t.pri === 'A').map((t) => t.id);
      S.save(); go();
    }));
  }, { tab: 'practice', title: 'Practice' });

  route(/^\/play\/(\w+)$/, (m, params) => {
    const md = modeById[m[1]];
    if (!md) { location.hash = '#/practice'; return; }
    const tq = params.get('t');
    const topics = tq ? [tq] : topicFilter();
    const tp = tq ? PE.topicById[tq] : null;
    setTitle(`${md.icon} ${md.name}`, tp ? `${tp.n}. ${tp.title}` : topics.length ? `${topics.length} selected topics` : 'All topics');
    const start = () => {
      const items = PE.selectItems({ types: md.types, topics, n: md.n, filter: md.filter, tackleWithPick: md.pickOnly, order: md.timed ? 'random' : undefined });
      PE.runSession(view(), {
        items, timed: md.timed, fast: md.id === 'speed', mode: md.id,
        onExit: () => history.back(), again: start,
        onFinish: () => checkMasteryBadges(),
      });
    };
    start();
  }, { back: true, tab: 'practice' });

  // ------------------------------------------------------------- EXAMS
  route(/^\/exams$/, () => {
    const list = PE.exams.slice();
    view().innerHTML = `<h2>Original exams 2014–2023</h2>
      <p class="small muted">Every task is broken into its sub-questions: you pick the approach, then see the tackle plan, the trap and the official result. No calculator needed.</p>
      <div class="note small">Lernplan: the six newest exams (2021–2023, marked <b>Phase-2 mock</b>) are meant to be solved on paper under exam conditions first. Their walkthroughs are here for afterwards.</div>
      ${list.map((e) => {
        const p = examProgress(e);
        return `<a class="topic-row" href="#/exam/${e.id}"><span class="exam-year">${e.y}<small>${e.s}</small></span>
          <div class="tb"><div class="tt">${e.tasks.map((tk) => `<span class="tdot grp-${PE.topicById[tk.topic] ? PE.topicById[tk.topic].grp : 'tool'}"></span>`).join('')} ${e.tasks.map((tk) => tk.title).join(' · ')}</div>
          <div class="ts">${e.tasks.reduce((a, tk) => a + tk.pts, 0)} pts${MOCK_SET.has(e.id) ? ' · <b>Phase-2 mock</b>' : e.id === '20S' ? ' · diagnosis exam (Lernplan)' : ''}</div>
          <div class="bar thin" style="margin-top:5px"><i style="width:${p.n ? Math.round((100 * p.d) / p.n) : 0}%"></i></div></div><span class="small muted">${p.d}/${p.n}</span></a>`;
      }).join('')}`;
  }, { tab: 'exams', title: 'Exams' });

  function guardMock(eid, cont) {
    if (!MOCK_SET.has(eid) || sessionStorage.getItem('mockOk_' + eid)) return cont();
    view().innerHTML = `<div class="card center"><div class="big-emoji">🔒</div><h2>${PE.examById[eid].label} is a Phase-2 mock</h2>
      <p>Your Lernplan keeps 2021–2023 fresh for exam simulations (on paper, with Spick + calculator, timed). Walkthroughs show the solutions.</p>
      <div class="row"><button class="btn ghost" style="flex:1" id="gb">Not yet</button><button class="btn" style="flex:1" id="go">Show walkthrough</button></div></div>`;
    $('#gb').addEventListener('click', () => history.back());
    $('#go').addEventListener('click', () => { sessionStorage.setItem('mockOk_' + eid, '1'); cont(); });
  }

  route(/^\/exam\/(\w+)$/, (m) => {
    const e = PE.examById[m[1]];
    if (!e) { location.hash = '#/exams'; return; }
    setTitle(e.label, 'Original exam · walkthrough');
    guardMock(e.id, () => {
      const pts = e.tasks.reduce((a, tk) => a + tk.pts, 0), mins = S.S.settings.examMin || 120;
      view().innerHTML = `
        <div class="card"><div class="exam-card"><span class="exam-year">${e.y}<small>${e.s}</small></span><div><div style="font-weight:800">${e.label}</div>
          <div class="small muted">${pts} points · with ${mins} min ≈ ${(mins / pts).toFixed(1)} min per point</div></div></div>
          <div class="note small" style="margin-bottom:0">Start: read all 4 tasks (5 min), mark the dummy values {…}, begin with your strongest task. Stuck > 5 min → use the dummy and move on.</div></div>
        <div class="task-list">${e.tasks.map((tk) => {
          const tp = PE.topicById[tk.topic]; const n = tk.subs.length, d = tk.subs.filter((sb) => S.S.tackled[`${e.id}.${tk.n}.${sb.l}`]).length;
          return `<a class="topic-row" href="#/tackle/${e.id}/${tk.n}" style="margin:0">${tp ? tnum(tp) : ''}<div class="tb"><div class="tt">Task ${tk.n}: ${tk.title}</div><div class="ts">${tk.pts} pts · ${n} sub-questions · ${tp ? tp.title : ''}</div></div><span class="small muted">${d}/${n} ${d === n ? '✓' : '›'}</span></a>`;
        }).join('')}</div>`;
    });
  }, { back: true, tab: 'exams' });

  route(/^\/tackle\/(\w+)\/(\d)$/, (m) => {
    const e = PE.examById[m[1]];
    const tk = e && e.tasks.find((x) => String(x.n) === m[2]);
    if (!tk) { location.hash = '#/exams'; return; }
    setTitle(`${e.id} · Task ${tk.n}`, tk.title);
    guardMock(e.id, () => {
      const items = tk.subs.map((sb) => PE.itemById[`x:${e.id}.${tk.n}.${sb.l}`]).filter(Boolean);
      const tp = PE.topicById[tk.topic];
      const head = `<details class="ctx-card" open><summary class="ctx-h">${e.label} · Task ${tk.n} · ${tk.pts} pts${tp ? ` · Spick §${tp.n}` : ''}</summary><div style="margin-top:6px">${fmt(tk.ctx)}</div></details>`;
      const wrap = document.createElement('div');
      view().appendChild(wrap);
      PE.runSession(wrap, {
        items, showContext: false, header: head,
        onExit: () => { location.hash = `#/exam/${e.id}`; },
        again: () => go(),
        onFinish: () => checkMasteryBadges(),
      });
      const hd = document.createElement('div'); hd.innerHTML = head;
      wrap.insertBefore(hd.firstChild, wrap.querySelector('#qk'));
    });
  }, { back: true, tab: 'exams' });

  // ------------------------------------------------------------- MOCK
  route(/^\/mock$/, () => {
    const mins = S.S.settings.examMin || 120;
    view().innerHTML = `<h2>⏱️ Mock exam</h2>
      <div class="card"><p>Four tasks from <b>four different topics</b>, drawn from the original exams – like the real exam (always 4 tasks, 10–30 points each).</p>
      <div class="field"><span>Pool</span><div class="seg" id="pool"><button data-v="old" class="on">2014–2020 only</button><button data-v="all">all 2014–2023</button></div></div>
      <div class="field"><span>Prefer</span><div class="seg" id="pref"><button data-v="new" class="on">untackled tasks</button><button data-v="any">anything</button></div></div>
      <p class="small muted">Time budget: your setting is ${mins} min for the exam. Note the clock when you start; the summary shows your time.</p>
      <button class="btn block" id="startMock">Start mock exam</button></div>
      <div class="card flat small muted">For a <b>real</b> simulation use paper, Spick and calculator with a 2021–2023 PDF (Lernplan Phase 2). This mock trains the decisions: which approach, which formula, which trap.</div>`;
    const segs = (id) => { const el = $('#' + id); el.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { el.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b)); })); };
    segs('pool'); segs('pref');
    $('#startMock').addEventListener('click', () => {
      const all = $('#pool .on').dataset.v === 'all', pref = $('#pref .on').dataset.v === 'new';
      const tasks = [];
      PE.exams.forEach((e) => { if (all || !MOCK_SET.has(e.id)) e.tasks.forEach((tk) => tasks.push([e, tk])); });
      const untouched = (x) => x[1].subs.every((sb) => !S.S.tackled[`${x[0].id}.${x[1].n}.${sb.l}`]);
      let pool = PE.shuffle(tasks);
      if (pref) pool = pool.filter(untouched).concat(pool.filter((x) => !untouched(x)));
      const pick = [], used = new Set();
      for (const x of pool) { if (pick.length >= 4) break; if (!used.has(x[1].topic)) { used.add(x[1].topic); pick.push(x); } }
      const items = [];
      pick.forEach(([e, tk]) => tk.subs.forEach((sb) => { const it = PE.itemById[`x:${e.id}.${tk.n}.${sb.l}`]; if (it) items.push(it); }));
      const pts = pick.reduce((a, x) => a + x[1].pts, 0);
      setTitle('Mock exam', `${pick.map((x) => x[1].title).join(' · ')} · ${pts} pts`);
      PE.runSession(view(), {
        items, showContext: true, openFirst: true,
        onExit: () => { location.hash = '#/'; },
        again: () => go(),
        onFinish: (r) => { S.award('mock'); checkMasteryBadges(); },
      });
    });
  }, { back: true, tab: 'exams', title: 'Mock exam' });

  // ------------------------------------------------------------- GRAPHS
  route(/^\/graphs$/, () => {
    const byTopic = {};
    PE.G.order.forEach((id) => { const d = PE.G.defs[id]; (byTopic[d.topic] = byTopic[d.topic] || []).push(d); });
    view().innerHTML = `<h2>📈 Graph lab</h2><p class="small muted">Move the sliders and watch what happens – exactly the "what if …?" thinking the qualitative questions need. Diagrams marked 🖼️ are schematics.</p>
      ${PE.topics.filter((t) => byTopic[t.id]).map((t) => `<h3>${t.n}. ${t.title}</h3>${byTopic[t.id].map((d) => `<a class="topic-row" href="#/graph/${d.id}">${tnum(t)}<div class="tb"><div class="tt">${d.diagram ? '🖼️ ' : ''}${d.title}</div></div><span>${S.S.graphs[d.id] ? '✓' : '›'}</span></a>`).join('')}`).join('')}`;
  }, { tab: 'practice', title: 'Graph lab', back: true });

  route(/^\/graph\/(\w+)$/, (m) => {
    const d = PE.G.defs[m[1]];
    if (!d) { location.hash = '#/graphs'; return; }
    const tp = PE.topicById[d.topic];
    setTitle('Graph lab', tp ? `${tp.n}. ${tp.title}` : '');
    view().innerHTML = `<div id="gm"></div>${tp ? `<a class="btn ghost block" href="#/topic/${tp.id}">Open topic ${tp.n}: ${tp.title}</a>` : ''}`;
    PE.G.mount($('#gm'), d.id);
    checkMasteryBadges();
  }, { back: true, tab: 'practice' });

  // ------------------------------------------------------------- PLANT ROADMAP
  function stationsForTopic(tid) {
    const out = [];
    if (!PE.plant) return out;
    Object.keys(PE.plant.maps).forEach((mp) => PE.plant.maps[mp].order.forEach((id) => {
      const st = PE.plant.st[mp][id];
      if (!st.minor && st.t.includes(tid)) out.push([mp, id, st]);
    }));
    return out;
  }
  function allStationsVisited() {
    const P = PE.plant;
    return Object.keys(P.maps).every((mp) => P.maps[mp].order.every((id) => P.st[mp][id].minor || S.S.map[`${mp}.${id}`]));
  }
  function stationHTML(mp, id) {
    const P = PE.plant, st = P.st[mp][id];
    const tps = st.t.map((tid) => PE.topicById[tid]).filter(Boolean);
    const gr = (st.g || []).filter((g) => PE.G.defs[g]);
    return `<p style="margin:2px 0 8px">${fmt(st.what)}</p>
      ${st.tags.length ? `<div class="chips">${st.tags.map((tg) => `<button class="chip sm" data-tag="${tg}">${P.tags[tg][0]} ${P.tags[tg][1]}</button>`).join('')}</div>` : ''}
      <h4>📘 Spick chapter</h4><div class="chips">${tps.map((tp) => `<a class="chip" href="#/topic/${tp.id}"><span class="tnum xs grp-${tp.grp}">${tp.n}</span>${tp.short || tp.title}</a>`).join('')}</div>
      ${st.apply.length ? `<h4>🧭 How you apply it</h4><ol class="recipe">${st.apply.map((a) => `<li>${fmt(a)}</li>`).join('')}</ol>` : ''}
      ${(st.f || []).map((f) => `<div class="fx">${fmt('$$' + f.m + (f.u ? ` \\un{${f.u}}` : '') + '$$')}</div>`).join('')}
      ${st.ex.length ? `<h4>📝 Original exam tasks</h4><div class="chips">${st.ex.map(examRefLink).join('')}</div>` : ''}
      ${gr.length ? `<h4>📈 Try it</h4><div class="chips">${gr.map((g) => `<a class="chip" href="#/graph/${g}">${PE.G.defs[g].diagram ? '🖼️' : '📈'} ${PE.G.defs[g].title}</a>`).join('')}</div>` : ''}`;
  }

  route(/^\/map$/, (m0, params) => {
    const P = PE.plant;
    let mp = params.get('m') === 'dw' ? 'dw' : 'ww', sel = null, tag = params.get('f') || '';
    view().innerHTML = `
      <div class="seg" id="pmSeg" style="margin-bottom:8px">${Object.keys(P.maps).map((k) => `<button data-m="${k}">${P.maps[k].icon} ${P.maps[k].short}</button>`).join('')}</div>
      <p class="small muted" style="margin:0 2px 8px">Tap a unit: what happens there, the Spick chapter, the formula, how the exam asks it and the original tasks.</p>
      <div class="chips scroll" id="pmTags"></div>
      <div id="pmStory"></div>
      <div class="card pm-card"><div class="pm-wrap" id="pmSvg"></div></div>
      <div class="row" style="margin-bottom:10px"><button class="btn" style="flex:1" id="pmTour">▶ Walk through</button><a class="btn ghost" style="flex:1" href="#/play/where">🎯 Map quiz</a></div>
      <div class="card flat small" id="pmProg"></div>
      <h3>All stations</h3><div id="pmList"></div>
      <div class="pm-sheet" id="pmSheet" role="dialog" aria-labelledby="pmT">
        <div class="sh-head"><span class="sh-ic" id="pmIc"></span><div style="flex:1;min-width:0"><div class="sh-t" id="pmT"></div><div class="sh-s" id="pmSub"></div></div><button class="back-btn" id="pmX" aria-label="Close">✕</button></div>
        <div class="sh-body" id="pmBody"></div>
        <div class="sh-nav"><button class="btn ghost sm" id="pmPrev">‹ Prev</button><span class="spacer center small muted" id="pmPos"></span><button class="btn sm" id="pmNext">Next ›</button></div>
      </div>`;
    const sheet = $('#pmSheet');

    function syncUrl() {
      const q = new URLSearchParams();
      if (mp !== 'ww') q.set('m', mp);
      if (sel) q.set('s', sel);
      if (tag) q.set('f', tag);
      const h = '#/map' + (q.toString() ? '?' + q : '');
      if (location.hash !== h) history.replaceState(null, '', h);
    }
    function paint() {
      const svg = $('#pmSvg svg');
      svg.classList.toggle('flt', !!tag);
      svg.querySelectorAll('.st').forEach((g) => {
        g.classList.toggle('on', g.dataset.s === sel);
        g.classList.toggle('hl', !!tag && P.st[mp][g.dataset.s].tags.includes(tag));
      });
    }
    function setTag(tg) { tag = tg; renderTags(); renderStory(); paint(); syncUrl(); }
    function renderTags() {
      const avail = Object.keys(P.tags).filter((tg) => P.maps[mp].order.some((id) => P.st[mp][id].tags.includes(tg)));
      if (tag && !avail.includes(tag)) tag = '';
      $('#pmTags').innerHTML = `<span class="small muted">Follow:</span>` + ['', ...avail].map((tg) =>
        `<button class="chip ${tg === tag ? 'on' : ''}" data-tg="${tg}">${tg ? `${P.tags[tg][0]} ${P.tags[tg][1]}` : 'All'}</button>`).join('');
      $('#pmTags').querySelectorAll('[data-tg]').forEach((b) => b.addEventListener('click', () => setTag(b.dataset.tg)));
    }
    function renderStory() {
      const el = $('#pmStory');
      if (!tag) { el.innerHTML = ''; return; }
      const ids = P.maps[mp].order.filter((id) => P.st[mp][id].tags.includes(tag));
      el.innerHTML = `<div class="card flat pm-story"><b>${P.tags[tag][0]} ${P.tags[tag][1]}:</b> ${fmt(P.stories[mp][tag] || '')}
        <div class="chips" style="margin-top:8px">${ids.map((id) => `<button class="chip sm" data-open="${id}">${P.st[mp][id].ic} ${P.st[mp][id].n}</button>`).join('')}</div></div>`;
      el.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => open(b.dataset.open)));
    }
    function renderMap() {
      $('#pmSvg').innerHTML = PE.MAP.svg(mp);
      $('#pmSvg').querySelectorAll('.st').forEach((g) => {
        g.addEventListener('click', () => open(g.dataset.s, false));
        g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(g.dataset.s, false); } });
      });
      paint();
    }
    function renderList() {
      $('#pmList').innerHTML = P.maps[mp].order.map((id) => {
        const st = P.st[mp][id];
        const tps = st.t.map((tid) => PE.topicById[tid]).filter(Boolean);
        return `<button class="topic-row pm-row" data-open="${id}"><span class="pm-ic">${st.ic}</span><div class="tb"><div class="tt">${st.n}${st.opt ? ' <span class="small muted">· optional</span>' : ''}</div>
          <div class="ts">${tps.map((tp) => `§${tp.n} ${tp.short || tp.title}`).join(' · ')}${st.ex.length ? ` · ${st.ex.length} exam task${st.ex.length > 1 ? 's' : ''}` : ''}</div></div><span>${S.S.map[`${mp}.${id}`] ? '✓' : '›'}</span></button>`;
      }).join('');
      $('#pmList').querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => open(b.dataset.open)));
    }
    function renderProg() {
      const ids = P.maps[mp].order.filter((id) => !P.st[mp][id].minor);
      const v = ids.filter((id) => S.S.map[`${mp}.${id}`]).length;
      $('#pmProg').innerHTML = `${P.maps[mp].icon} <b>${v}/${ids.length}</b> stations of the ${P.maps[mp].short.toLowerCase()} plant opened (+5 XP each the first time)
        <div class="bar thin" style="margin-top:6px"><i style="width:${Math.round((100 * v) / ids.length)}%"></i></div>`;
    }
    function open(id, scroll) {
      const st = P.st[mp][id];
      if (!st) return;
      sel = id;
      const order = P.maps[mp].order, k = order.indexOf(id);
      $('#pmIc').textContent = st.ic;
      $('#pmT').textContent = st.n;
      $('#pmSub').textContent = `${P.maps[mp].name}${st.opt ? ' · optional unit' : ''}${st.minor ? ' · not calculated in PE II' : ''}`;
      $('#pmBody').innerHTML = stationHTML(mp, id);
      $('#pmBody').scrollTop = 0;
      $('#pmBody').querySelectorAll('[data-tag]').forEach((b) => b.addEventListener('click', () => setTag(b.dataset.tag)));
      $('#pmPos').textContent = `${k + 1} / ${order.length}`;
      $('#pmPrev').disabled = k === 0;
      $('#pmNext').textContent = k === order.length - 1 ? 'Done ✓' : 'Next ›';
      sheet.classList.add('open');
      view().classList.add('pm-open');
      paint(); syncUrl();
      const key = `${mp}.${id}`;
      if (!S.S.map[key]) {
        S.S.map[key] = 1; S.addXP(5); S.save();
        renderList(); renderProg(); ui.refreshHeader();
        if (allStationsVisited() && S.award('explorer')) ui.confetti();
      }
      const g = $(`#pmSvg .st[data-s="${id}"]`);
      if (g && scroll !== false) {
        const r = g.getBoundingClientRect(), top = 70, room = innerHeight * 0.38;
        if (r.top < top || r.bottom > room) window.scrollBy({ top: r.top - top, behavior: 'smooth' });
      }
    }
    function close() { sel = null; sheet.classList.remove('open'); view().classList.remove('pm-open'); paint(); syncUrl(); }
    function setMap(k) {
      mp = k;
      view().querySelectorAll('#pmSeg button').forEach((b) => b.classList.toggle('on', b.dataset.m === mp));
      sel = null; sheet.classList.remove('open'); view().classList.remove('pm-open');
      renderTags(); renderStory(); renderMap(); renderList(); renderProg(); syncUrl();
    }
    view().querySelectorAll('#pmSeg button').forEach((b) => b.addEventListener('click', () => setMap(b.dataset.m)));
    $('#pmX').addEventListener('click', close);
    $('#pmPrev').addEventListener('click', () => { const o = P.maps[mp].order, k = o.indexOf(sel); if (k > 0) open(o[k - 1]); });
    $('#pmNext').addEventListener('click', () => {
      const o = P.maps[mp].order, k = o.indexOf(sel);
      if (k < o.length - 1) open(o[k + 1]);
      else { close(); ui.toast(`${P.maps[mp].icon} Walk-through complete – try 🎯 Where in the plant?`); }
    });
    $('#pmTour').addEventListener('click', () => open(P.maps[mp].order[0]));
    setMap(mp);
    const s0 = params.get('s');
    if (s0 && P.st[mp][s0]) setTimeout(() => open(s0), 60);
  }, { back: true, tab: 'learn', title: 'Plant roadmap', sub: 'Where every process sits' });

  // ------------------------------------------------------------- STRATEGY
  route(/^\/strategy$/, () => {
    const st = PE.strategy || { learn: [] };
    view().innerHTML = `<h2>🎯 Exam strategy</h2>${st.learn.map(learnSection).join('')}`;
    mountGraphs(view());
  }, { back: true, tab: 'home', title: 'Exam strategy' });

  // ------------------------------------------------------------- SEARCH
  function searchIndex() {
    if (PE._idx) return PE._idx;
    const strip = (s) => String(s || '').replace(/\$|\\[a-zA-Z]+|[{}_^]/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const idx = [];
    PE.topics.forEach((t) => {
      (t.learn || []).forEach((sec, k) => {
        const txt = [sec.h, ...(Array.isArray(sec.p) ? sec.p : [sec.p]), ...(sec.f || []).map((f) => f.m + ' ' + (f.w || '')), ...(sec.li || []), ...(sec.rec || []), sec.trap, sec.tip, sec.note].filter(Boolean).join(' ');
        idx.push({ t, k, h: sec.h || t.title, txt: strip(txt).toLowerCase(), raw: sec });
      });
    });
    PE._idx = idx;
    return idx;
  }
  route(/^\/search$/, (m, params) => {
    const q0 = params.get('q') || '';
    view().innerHTML = `<h2>🔎 Find on the Spick</h2><div class="field"><input id="sq" type="search" placeholder="e.g. hydraulic diameter, breakpoint, k_C, MTZ …" value="${PE.esc(q0)}" autocomplete="off"></div><div id="sr"></div>`;
    const inp = $('#sq'), out = $('#sr');
    function run() {
      const q = inp.value.trim().toLowerCase();
      if (q.length < 2) { out.innerHTML = '<p class="small muted">Type at least 2 letters. Results show the topic and the Spick chapter where it lives.</p>'; return; }
      const words = q.split(/\s+/);
      const res = searchIndex().filter((r) => words.every((w) => r.txt.includes(w))).slice(0, 30);
      out.innerHTML = res.length ? res.map((r) => `<a class="topic-row" href="#/topic/${r.t.id}">${tnum(r.t)}<div class="tb"><div class="tt">${fmt(r.h)}</div><div class="ts">Spick §${r.t.n} · ${r.t.title}</div></div>›</a>`).join('') : '<p class="muted">Nothing found.</p>';
    }
    inp.addEventListener('input', run);
    run();
    setTimeout(() => inp.focus(), 50);
  }, { back: true, tab: 'learn', title: 'Search' });

  // ------------------------------------------------------------- PROGRESS & SETTINGS
  route(/^\/progress$/, () => {
    const lv = S.level();
    const seen = PE.items.filter((it) => S.seen(it.id));
    let tot = 0, cor = 0;
    seen.forEach((it) => { const r = S.rec(it.id); tot += r[2]; cor += r[3]; });
    const t0 = S.today();
    const days = Array.from({ length: 28 }, (_, i) => t0 - 27 + i);
    const maxD = Math.max(1, ...days.map((d) => S.S.days[d] || 0));
    const totalSubs = PE.exams.reduce((a, e) => a + examProgress(e).n, 0);
    const set = S.S.settings;
    view().innerHTML = `<h2>📊 Progress</h2>
      <div class="card"><div class="lvl">${ring(lv.frac, lv.icon, 64)}<div><div style="font-weight:800">Level ${lv.n} · ${lv.name}</div><div class="small muted">${S.S.xp} XP${lv.next ? ` · next level at ${lv.next}` : ''}</div></div></div>
        <div class="stat-grid" style="margin-top:12px">
          <div><div class="sv">${seen.length}</div><div class="sl">items seen of ${PE.items.length}</div></div>
          <div><div class="sv">${tot ? Math.round((100 * cor) / tot) : 0}%</div><div class="sl">answers correct</div></div>
          <div><div class="sv">${dueCount()}</div><div class="sl">due now</div></div>
          <div><div class="sv">🔥 ${S.streak()}</div><div class="sl">day streak (best ${S.S.streak.best || 0})</div></div>
          <div><div class="sv">${Object.keys(S.S.tackled).length}/${totalSubs}</div><div class="sl">exam sub-questions</div></div>
          <div><div class="sv">${Object.keys(S.S.read).length}/${PE.topics.length}</div><div class="sl">topics read</div></div>
        </div>
        <div style="display:flex;align-items:flex-end;gap:3px;height:46px;margin-top:14px">${days.map((d) => `<div title="${S.S.days[d] || 0}" style="flex:1;border-radius:3px;background:${S.S.days[d] ? 'var(--accent)' : 'var(--surface3)'};height:${8 + (38 * (S.S.days[d] || 0)) / maxD}px;opacity:${S.S.days[d] ? 0.45 + (0.55 * S.S.days[d]) / maxD : 1}"></div>`).join('')}</div>
        <div class="small muted center">answers per day, last 4 weeks</div></div>
      <div class="card"><h3>Mastery per topic</h3>${PE.topics.map((t) => { const m = mastery(t.id); return `<a class="row" href="#/topic/${t.id}" style="text-decoration:none;color:inherit;margin:7px 0">${tnum(t)}<div style="flex:1;min-width:0"><div class="small" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.title}</div><div class="bar thin"><i style="width:${Math.round(m * 100)}%"></i></div></div><span class="small muted" style="width:36px;text-align:right">${Math.round(m * 100)}%</span></a>`; }).join('')}</div>
      <div class="card"><h3>Badges</h3><div class="badges">${Object.entries(S.BADGES).map(([id, b]) => `<div class="bdg ${S.S.badges[id] ? '' : 'locked'}" title="${b[2]}"><span class="be">${b[0]}</span><b>${b[1]}</b><div class="muted">${b[2]}</div></div>`).join('')}</div></div>
      <div class="card"><h3>⚙️ Settings</h3>
        <div class="field"><span>Theme</span><div class="seg" id="theme">${['auto', 'light', 'dark'].map((v) => `<button data-v="${v}" class="${set.theme === v ? 'on' : ''}">${v}</button>`).join('')}</div></div>
        <label class="field"><span>Exam date (for the countdown)</span><input type="date" id="exDate" value="${set.examDate || ''}"></label>
        <label class="field"><span>Exam duration in minutes (for time per point)</span><input type="number" id="exMin" min="30" max="300" step="5" value="${set.examMin || 120}"></label>
        <div class="sep"></div>
        <h3>💾 Backup (local only)</h3>
        <p class="small muted">Progress lives only in this browser (no server, no account). Clearing Safari website data deletes it – export a backup now and then.</p>
        <div class="row wrap"><button class="btn ghost sm" id="exp">Export backup</button><label class="btn ghost sm" style="cursor:pointer">Import backup<input type="file" id="imp" accept="application/json,.json" class="hidden"></label><span class="spacer"></span><button class="btn bad sm" id="rst">Reset all</button></div>
      </div>
      <p class="small muted center">PE II Trainer · built from your Spick, Lernplan, podcast notes and the 19 original exams.</p>`;
    $('#theme').querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { set.theme = b.dataset.v; S.save(); applyTheme(); go(); }));
    $('#exDate').addEventListener('change', (e) => { set.examDate = e.target.value; S.save(); });
    $('#exMin').addEventListener('change', (e) => { set.examMin = Math.max(30, Math.min(300, +e.target.value || 120)); S.save(); });
    $('#exp').addEventListener('click', () => {
      const blob = new Blob([S.exportJSON()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `pe2-trainer-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    });
    $('#imp').addEventListener('change', (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { try { S.importJSON(r.result); ui.toast('Backup restored ✓'); applyTheme(); go(); } catch (err) { ui.toast('Import failed: ' + PE.esc(err.message)); } };
      r.readAsText(f);
    });
    $('#rst').addEventListener('click', () => {
      if (confirm('Delete ALL progress on this device? This cannot be undone (export a backup first).')) { S.reset(); applyTheme(); go(); ui.toast('Progress reset'); }
    });
  }, { tab: 'progress', title: 'Progress' });

  // ------------------------------------------------------------- boot
  function applyTheme() {
    const t = S.S.settings.theme;
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }

  PE.boot = function () {
    PE.topics.sort((a, b) => a.n - b.n);
    PE.topics.forEach((t) => { PE.topicById[t.id] = t; });
    const ord = (e) => e.y * 10 + (e.s === 'Winter' ? 1 : 0);
    PE.exams.sort((a, b) => ord(a) - ord(b));
    PE.exams.forEach((e) => { e.label = `${e.y} ${e.s}`; PE.examById[e.id] = e; });
    PE.buildItems();
    applyTheme();
    $('#backBtn').addEventListener('click', () => { if (history.length > 1) history.back(); else location.hash = '#/'; });
    window.addEventListener('hashchange', go);
    go();
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  };
})();
