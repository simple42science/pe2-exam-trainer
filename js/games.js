/* PE II Trainer – item engines (flashcards, quiz, trends, factors, gaps, ordering, bug hunt, matching, exam tackle)
 * and the session runner that strings items together, grades them (spaced repetition) and awards XP.
 */
(function () {
  const PE = window.PE;
  const fmt = PE.fmt;
  const st = () => PE.store;

  // ---------------------------------------------------------------- helpers
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  PE.shuffle = shuffle;
  const LETTERS = 'ABCDEFGH';

  const KIND = {
    card: ['🃏', 'Flashcard'], mcq: ['❓', 'Quiz'], trend: ['↕️', 'Up or down?'], factor: ['✖️', 'Factor estimate'],
    gap: ['🧩', 'Formula builder'], order: ['🪜', 'Solution path'], bug: ['🐞', 'Bug hunt'], match: ['🔗', 'Match it'],
    tackle: ['🧭', 'Which tool?'], where: ['🗺️', 'Where in the plant?'],
  };
  PE.KIND = KIND;

  // ---------------------------------------------------------------- item index
  PE.items = [];
  PE.itemById = {};
  PE.buildItems = function () {
    const all = [];
    (PE.topics || []).forEach((tp) => {
      (tp.q || []).forEach((q) => {
        const key = q.t + '|' + (q.q || q.f || '') + '|' + (q.b || '') + '|' + (q.s ? q.s.join('|') : '') + '|' + (q.p ? q.p.map((x) => x.join('=')).join('|') : '');
        q.id = tp.id + ':' + PE.store.hash(key);
        q.topic = tp.id;
        all.push(q);
      });
    });
    (PE.exams || []).forEach((ex) => {
      ex.tasks.forEach((tk) => {
        tk.subs.forEach((sb) => {
          sb.t = 'tackle';
          sb.id = `x:${ex.id}.${tk.n}.${sb.l}`;
          sb.topic = tk.topic;
          sb.exam = ex; sb.task = tk;
          all.push(sb);
        });
      });
    });
    ((PE.plant && PE.plant.quiz) || []).forEach((q) => {
      const stn = PE.plant.st[q.map] && PE.plant.st[q.map][q.a];
      if (!stn) return;
      q.t = 'where';
      q.id = 'm:' + PE.store.hash(q.map + '|' + q.q);
      q.topic = stn.t[0];
      all.push(q);
    });
    const seen = {};
    all.forEach((it) => { if (seen[it.id]) it.id += '~' + Object.keys(seen).length; seen[it.id] = 1; });
    PE.items = all;
    PE.itemById = {};
    all.forEach((it) => { PE.itemById[it.id] = it; });
  };

  /** pick items for a mode */
  PE.selectItems = function (o) {
    const types = o.types, topics = o.topics && o.topics.length ? new Set(o.topics) : null;
    let pool = PE.items.filter((it) => types.includes(it.t) && (!topics || topics.has(it.topic)));
    if (o.filter) pool = pool.filter(o.filter);
    if (o.tackleWithPick) pool = pool.filter((it) => it.t !== 'tackle' || (it.pick && it.pick.length > 1));
    const S = st();
    const due = shuffle(pool.filter((it) => S.seen(it.id) && S.isDue(it.id))).sort((a, b) => S.box(a.id) - S.box(b.id));
    const unseen = shuffle(pool.filter((it) => !S.seen(it.id)));
    const rest = shuffle(pool.filter((it) => S.seen(it.id) && !S.isDue(it.id)));
    let out;
    if (o.order === 'random') out = shuffle(pool);
    else out = due.concat(unseen, rest);
    return out.slice(0, o.n || 12);
  };

  // ---------------------------------------------------------------- renderers
  const R = {};

  function feedback(ok, html) {
    return `<div class="fb ${ok === null ? 'neutral' : ok ? 'ok' : 'bad'}"><h4>${ok === null ? '' : ok ? '✅ Correct' : '❌ Not quite'}</h4>${html || ''}</div>`;
  }
  function explain(it, extra) {
    let h = '';
    if (extra) h += `<div>${extra}</div>`;
    if (it.x) h += `<div style="margin-top:4px">${fmt(it.x)}</div>`;
    return h;
  }
  function graphHTML(it) {
    return it.g ? `<div class="gwrap" style="padding:6px"><div class="gsvg">${PE.G.svg(it.g, it.gp)}</div></div>` : '';
  }

  // multiple choice (also used by factor / gap)
  R.mcq = function (el, it, ctx) {
    const opts = shuffle(it.a.map((a, i) => ({ a, ok: i === 0 })));
    const kind = it.t === 'factor' ? 'factor-opts' : 'opts';
    let head = '';
    if (it.t === 'gap') head = `${it.q ? `<div class="q-ctx">${fmt(it.q)}</div>` : ''}<div class="fx">${fmt(it.f)}</div><div class="q-text">Which term fills the gap ▢?</div>`;
    else head = `${graphHTML(it)}<div class="q-text">${fmt(it.q)}</div>`;
    el.innerHTML = `${head}<div class="${kind}">${opts.map((o, i) => `<button class="opt" data-i="${i}">${it.t === 'factor' ? '' : `<span class="ol">${LETTERS[i]}</span>`}${fmt(o.a)}</button>`).join('')}</div><div class="fbw"></div>`;
    let done = false;
    el.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
      if (done) return;
      done = true;
      const i = +b.dataset.i, ok = opts[i].ok;
      el.querySelectorAll('.opt').forEach((x, j) => {
        if (opts[j].ok) x.classList.add('ok');
        else if (j === i) x.classList.add('bad');
        else x.classList.add('dim');
      });
      el.querySelector('.fbw').innerHTML = feedback(ok, explain(it, ok ? '' : `Answer: <b>${fmt(it.a[0])}</b>`));
      ctx.done(ok);
    }));
  };
  R.factor = R.mcq;
  R.gap = R.mcq;

  R.card = function (el, it, ctx) {
    el.innerHTML = `
      <div class="flash"><div class="flash-in">
        <div class="flash-face"><div class="q-text" style="margin:0">${fmt(it.f)}</div><div class="hint">tap to flip</div></div>
        <div class="flash-face back"><div>${fmt(it.b)}</div></div>
      </div></div>
      <div class="grades hidden">
        <button class="btn bad" data-g="0">Again<small>forgot</small></button>
        <button class="btn ghost" data-g="1">Hard<small>1 d</small></button>
        <button class="btn ghost" data-g="2">Good<small>later</small></button>
        <button class="btn ok" data-g="3">Easy<small>much later</small></button>
      </div>`;
    const fl = el.querySelector('.flash'), gr = el.querySelector('.grades');
    fl.addEventListener('click', () => { fl.classList.toggle('flip'); gr.classList.remove('hidden'); });
    gr.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => {
      ctx.done(+b.dataset.g >= 2, +b.dataset.g, true);
    }));
  };

  R.trend = function (el, it, ctx) {
    const sym = { 1: '↑', '-1': '↓', 0: '=' };
    el.innerHTML = `<div class="q-text">${fmt(it.q)}</div>
      <div class="card flat" style="padding:6px 12px">${it.r.map((r, i) => `
        <div class="trend-row" data-r="${i}"><div class="tl">${fmt(r[0])}</div>
          <div class="tbtns">${[1, -1, 0].map((v) => `<button class="tbtn" data-v="${v}">${sym[v]}</button>`).join('')}</div></div>`).join('')}
      </div>
      <button class="btn block chk" disabled>Check</button><div class="fbw"></div>`;
    const ans = new Array(it.r.length).fill(null);
    const chk = el.querySelector('.chk');
    let done = false;
    el.querySelectorAll('.trend-row').forEach((row) => {
      const ri = +row.dataset.r;
      row.querySelectorAll('.tbtn').forEach((b) => b.addEventListener('click', () => {
        if (done) return;
        ans[ri] = +b.dataset.v;
        row.querySelectorAll('.tbtn').forEach((x) => x.classList.toggle('sel', x === b));
        chk.disabled = ans.some((a) => a === null);
        if (it.r.length === 1 && ctx.fast) chk.click();
      }));
    });
    chk.addEventListener('click', () => {
      if (done) return;
      done = true;
      let ok = true;
      el.querySelectorAll('.trend-row').forEach((row) => {
        const ri = +row.dataset.r, want = it.r[ri][1];
        row.querySelectorAll('.tbtn').forEach((x) => {
          const v = +x.dataset.v;
          x.classList.remove('sel');
          if (v === want) x.classList.add('ok');
          else if (v === ans[ri]) x.classList.add('bad');
        });
        if (ans[ri] !== want) ok = false;
      });
      chk.classList.add('hidden');
      el.querySelector('.fbw').innerHTML = feedback(ok, explain(it));
      ctx.done(ok);
    });
  };

  R.order = function (el, it, ctx) {
    const items = shuffle(it.s.map((s, i) => ({ s, i })));
    el.innerHTML = `<div class="q-kind" style="color:var(--muted)">Tap the steps in the right order</div><div class="q-text">${fmt(it.q)}</div>
      <div class="opts">${items.map((o, k) => `<button class="opt ostep" data-k="${k}"><span class="on"></span><span>${fmt(o.s)}</span></button>`).join('')}</div>
      <div class="row" style="margin-top:10px"><button class="btn ghost sm rst">Reset</button><span class="spacer"></span><button class="btn chk" disabled>Check order</button></div><div class="fbw"></div>`;
    let seq = [], done = false;
    const btns = [...el.querySelectorAll('.ostep')], chk = el.querySelector('.chk');
    function paint() {
      btns.forEach((b, k) => {
        const pos = seq.indexOf(k);
        b.classList.toggle('picked', pos >= 0);
        b.querySelector('.on').textContent = pos >= 0 ? pos + 1 : '';
      });
      chk.disabled = seq.length !== items.length;
    }
    btns.forEach((b, k) => b.addEventListener('click', () => {
      if (done) return;
      const pos = seq.indexOf(k);
      if (pos >= 0) seq.splice(pos, 1); else seq.push(k);
      paint();
    }));
    el.querySelector('.rst').addEventListener('click', () => { if (!done) { seq = []; paint(); } });
    chk.addEventListener('click', () => {
      if (done) return;
      done = true;
      let ok = true;
      seq.forEach((k, pos) => {
        const good = items[k].i === pos;
        if (!good) ok = false;
        btns[k].classList.remove('picked');
        btns[k].classList.add(good ? 'ok' : 'bad');
        btns[k].querySelector('.on').textContent = items[k].i + 1;
      });
      el.querySelector('.rst').classList.add('hidden'); chk.classList.add('hidden');
      const correct = `<ol style="margin:4px 0 0 18px;padding:0">${it.s.map((s) => `<li>${fmt(s)}</li>`).join('')}</ol>`;
      el.querySelector('.fbw').innerHTML = feedback(ok, (ok ? '' : `<b>Correct order</b> (numbers on the steps show it):${correct}`) + explain(it));
      ctx.done(ok);
    });
  };

  R.bug = function (el, it, ctx) {
    el.innerHTML = `<div class="q-kind" style="color:var(--muted)">One step contains a typical mistake – tap it</div><div class="q-text">${fmt(it.q)}</div>
      <div class="opts">${it.s.map((s, k) => `<button class="opt ostep" data-k="${k}"><span class="on">${k + 1}</span><span>${fmt(s)}</span></button>`).join('')}</div><div class="fbw"></div>`;
    let done = false;
    el.querySelectorAll('.ostep').forEach((b) => b.addEventListener('click', () => {
      if (done) return;
      done = true;
      const k = +b.dataset.k, ok = k === it.w;
      el.querySelectorAll('.ostep').forEach((x, j) => {
        if (j === it.w) x.classList.add(ok ? 'ok' : 'bad');
        else if (j === k) x.classList.add('dim');
      });
      if (!ok) el.querySelectorAll('.ostep')[it.w].classList.add('bad');
      el.querySelector('.fbw').innerHTML = feedback(ok, `<b>${ok ? 'Found it!' : `The bug is in step ${it.w + 1}.`}</b> Fix: ${fmt(it.fix)}` + explain(it));
      if (ok) { st().S.best.bugs = (st().S.best.bugs || 0) + 1; if (st().S.best.bugs >= 10) st().award('bugs10'); }
      ctx.done(ok);
    }));
  };

  R.match = function (el, it, ctx) {
    const left = it.p.map((p, i) => ({ t: p[0], i })), right = shuffle(it.p.map((p, i) => ({ t: p[1], i })));
    el.innerHTML = `<div class="q-text">${fmt(it.q)}</div><div class="match">
      <div class="col">${left.map((o) => `<button class="opt ml" data-i="${o.i}">${fmt(o.t)}</button>`).join('')}</div>
      <div class="col">${right.map((o) => `<button class="opt mr" data-i="${o.i}">${fmt(o.t)}</button>`).join('')}</div></div><div class="fbw"></div>`;
    let selL = null, mistakes = 0, left2 = it.p.length, done = false;
    const L = [...el.querySelectorAll('.ml')], Rr = [...el.querySelectorAll('.mr')];
    function tryPair(rb) {
      if (selL === null) return;
      const li = +selL.dataset.i, ri = +rb.dataset.i;
      if (li === ri) {
        selL.classList.remove('sel'); selL.classList.add('ok', 'done'); rb.classList.add('ok', 'done');
        selL = null; left2--;
        if (left2 === 0 && !done) {
          done = true;
          const ok = mistakes === 0;
          el.querySelector('.fbw').innerHTML = feedback(ok, `${mistakes ? `${mistakes} wrong pairing${mistakes > 1 ? 's' : ''} on the way.` : 'All pairs right first time.'}` + explain(it));
          ctx.done(ok);
        }
      } else {
        mistakes++;
        rb.classList.add('bad');
        setTimeout(() => rb.classList.remove('bad'), 450);
      }
    }
    L.forEach((b) => b.addEventListener('click', () => {
      if (b.classList.contains('done')) return;
      L.forEach((x) => x.classList.remove('sel'));
      b.classList.add('sel'); selL = b;
    }));
    Rr.forEach((b) => b.addEventListener('click', () => { if (!b.classList.contains('done')) tryPair(b); }));
  };

  /** exam sub-question: pick the approach, then reveal the plan */
  R.tackle = function (el, it, ctx) {
    const tk = it.task, ex = it.exam;
    const openCtx = ctx.openContext || (ctx.openFirst && tk.subs[0] === it);
    const ctxHTML = ctx.showContext === false ? '' : `<details class="ctx-card"${openCtx ? ' open' : ''}><summary class="ctx-h">${ex.label} · Task ${tk.n}: ${tk.title}</summary><div style="margin-top:6px">${fmt(tk.ctx)}</div></details>`;
    const hasPick = it.pick && it.pick.length > 1;
    const opts = hasPick ? shuffle(it.pick.map((a, i) => ({ a, ok: i === 0 }))) : [];
    el.innerHTML = `${ctxHTML}
      <div class="sub-head"><span class="sub-l">${it.l})</span><span class="pts">${it.pts || '?'} pts</span>${it.dummy ? `<span class="dummy">dummy ${it.dummy}</span>` : ''}</div>
      <div class="q-text">${fmt(it.q)}</div>
      ${hasPick ? `<div class="q-kind">How do you tackle it?</div><div class="opts">${opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="ol">${LETTERS[i]}</span>${fmt(o.a)}</button>`).join('')}</div>` : `<button class="btn block line rev">Think it through, then reveal the plan</button>`}
      <div class="fbw"></div><div class="plan"></div>`;
    let picked = !hasPick, pickOk = true;
    function reveal() {
      const plan = el.querySelector('.plan');
      plan.innerHTML = `<div class="card flat" style="margin-top:12px">
        <div class="q-kind">Tackle plan ${it.spick ? `<span class="spick">Spick ${it.spick}</span>` : ''}</div>
        <ol class="steps">${(it.steps || []).map((s) => `<li>${fmt(s)}</li>`).join('')}</ol>
        ${it.trap ? `<div class="trap">${fmt(it.trap)}</div>` : ''}
        ${it.ans ? `<div class="answer">${fmt(it.ans)}</div>` : ''}
        ${ctx.selfGrade === false ? '' : `<div class="row" style="margin-top:10px"><button class="btn bad sm" data-s="0" style="flex:1">↺ Review later</button><button class="btn ok sm" data-s="2" style="flex:1">✓ I'd nail this</button></div>`}
      </div>`;
      plan.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => {
        const self = +b.dataset.s;
        const ok = self === 2 && pickOk;
        st().S.tackled[it.id.slice(2)] = self === 2 ? 2 : 1;
        st().save();
        ctx.done(ok, ok ? 2 : self === 2 ? 1 : 0, true);
      }));
      if (ctx.selfGrade === false) ctx.done(pickOk);
    }
    if (hasPick) {
      el.querySelectorAll('.opt').forEach((b) => b.addEventListener('click', () => {
        if (picked) return;
        picked = true;
        const i = +b.dataset.i;
        pickOk = opts[i].ok;
        el.querySelectorAll('.opt').forEach((x, j) => {
          if (opts[j].ok) x.classList.add('ok'); else if (j === i) x.classList.add('bad'); else x.classList.add('dim');
        });
        el.querySelector('.fbw').innerHTML = feedback(pickOk, pickOk ? '' : `The right tool: <b>${fmt(it.pick[0])}</b>`);
        reveal();
      }));
    } else {
      el.querySelector('.rev').addEventListener('click', (e) => { e.target.classList.add('hidden'); reveal(); });
    }
  };

  /** plant roadmap: tap the unit where it happens */
  R.where = function (el, it, ctx) {
    const P = PE.plant, mp = P.maps[it.map];
    el.innerHTML = `<div class="q-text">${fmt(it.q)}</div>
      <div class="small muted" style="margin:-6px 0 8px">${mp.icon} ${mp.name} – tap the unit</div>
      <div class="card pm-card"><div class="pm-wrap">${PE.MAP.svg(it.map, { quiz: true })}</div></div><div class="fbw"></div>`;
    let done = false;
    function pick(s) {
      if (done) return;
      done = true;
      const ok = s === it.a, right = P.st[it.map][it.a];
      el.querySelectorAll('.st').forEach((g) => {
        if (g.dataset.s === it.a) g.classList.add('ok');
        else if (g.dataset.s === s) g.classList.add('bad');
      });
      const fb = el.querySelector('.fbw');
      fb.innerHTML = feedback(ok, `<b>${right.ic} ${right.n}</b>${ok ? '' : ` – you tapped ${P.st[it.map][s].n}`}` + explain(it));
      ctx.done(ok);
      setTimeout(() => fb.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
    }
    el.querySelectorAll('.st').forEach((g) => {
      g.addEventListener('click', () => pick(g.dataset.s));
      g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(g.dataset.s); } });
    });
  };

  PE.renderItem = function (el, it, ctx) { (R[it.t] || R.mcq)(el, it, ctx); };

  // ---------------------------------------------------------------- session
  /**
   * opts: {title, items, timed (s), fast (auto-advance), mode, onExit, showContext}
   */
  PE.runSession = function (root, opts) {
    const S = st();
    let idx = 0, correct = 0, xpGain = 0, timeLeft = opts.timed || 0, timer = null, finished = false;
    const results = [];
    const items = opts.items.slice();
    const t0 = Date.now();

    if (!items.length) {
      root.innerHTML = `<div class="card center"><div class="big-emoji">🌱</div><p>No items match this selection yet.</p><button class="btn" data-go="back">Back</button></div>`;
      root.querySelector('[data-go]').addEventListener('click', () => (opts.onExit ? opts.onExit() : history.back()));
      return;
    }

    root.innerHTML = `
      <div class="play-top"><button class="back-btn" aria-label="Quit">✕</button><div class="bar"><i style="width:0%"></i></div>
      <span class="timer">${opts.timed ? timeLeft + 's' : `1/${items.length}`}</span></div>
      <div class="q-kind" id="qk"></div><div id="stage"></div><div class="next-bar hidden"><button class="btn block" id="nextBtn">Next ›</button></div>`;
    const stage = root.querySelector('#stage'), bar = root.querySelector('.bar > i'), tm = root.querySelector('.timer');
    const nextBar = root.querySelector('.next-bar'), nextBtn = root.querySelector('#nextBtn'), qk = root.querySelector('#qk');
    root.querySelector('.back-btn').addEventListener('click', () => { stop(); if (results.length) finish(true); else (opts.onExit ? opts.onExit() : history.back()); });

    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    if (opts.timed) {
      timer = setInterval(() => {
        timeLeft--;
        tm.textContent = timeLeft + 's';
        bar.style.width = (100 * (1 - timeLeft / opts.timed)) + '%';
        if (timeLeft <= 0) { stop(); finish(); }
      }, 1000);
    }

    function show() {
      if (finished) return;
      if (idx >= items.length) {
        if (opts.timed) { items.push(...PE.shuffle(opts.items)); } else { finish(); return; }
      }
      const it = items[idx];
      const k = KIND[it.t] || ['❓', 'Question'];
      const tp = PE.topicById[it.topic];
      qk.innerHTML = `${k[0]} ${k[1]}${tp ? ` · <span style="color:var(--muted)">${tp.n}. ${tp.title}</span>` : ''}`;
      if (!opts.timed) { tm.textContent = `${idx + 1}/${items.length}`; bar.style.width = (100 * idx / items.length) + '%'; }
      nextBar.classList.add('hidden');
      stage.innerHTML = '';
      const box = document.createElement('div');
      stage.appendChild(box);
      PE.renderItem(box, it, {
        fast: !!opts.fast,
        showContext: opts.showContext,
        openContext: opts.openContext,
        openFirst: opts.openFirst,
        done(ok, g, immediateNext) {
          const grade = g === undefined ? (ok ? 2 : 0) : g;
          S.grade(it.id, grade);
          const xp = it.t === 'card' ? [2, 5, 8, 10][grade] : it.t === 'tackle' ? (ok ? 15 : 5) : ok ? 10 : 2;
          xpGain += xp; S.addXP(xp);
          if (ok) correct++;
          results.push({ it, ok });
          if (opts.timed || opts.fast) {
            setTimeout(() => { idx++; show(); }, ok ? 650 : 1600);
          } else if (immediateNext) { idx++; show(); }
          else { nextBar.classList.remove('hidden'); nextBtn.focus({ preventScroll: true }); }
        },
      });
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
    nextBtn.addEventListener('click', () => { idx++; show(); });

    function finish(quit) {
      if (finished) return;
      finished = true;
      stop();
      S.award('first');
      const n = results.length;
      const missed = results.filter((r) => !r.ok).map((r) => r.it);
      const secs = Math.round((Date.now() - t0) / 1000);
      let rec = '';
      if (opts.mode && opts.timed) {
        const prev = S.S.best[opts.mode] || 0;
        if (correct > prev) { S.S.best[opts.mode] = correct; S.save(); rec = `<p class="center"><b>🏅 New highscore!</b> (before: ${prev})</p>`; }
        else rec = `<p class="center muted">Highscore: ${prev}</p>`;
        if (opts.mode === 'speed') { if (correct >= 15) S.award('speed15'); if (correct >= 25) S.award('speed25'); }
      }
      if (n >= 10 && missed.length === 0) { S.award('perfect'); PE.ui && PE.ui.confetti(); }
      if (opts.onFinish) opts.onFinish({ n, correct, missed });
      const emoji = n === 0 ? '👋' : correct / n >= 0.9 ? '🏆' : correct / n >= 0.7 ? '💪' : correct / n >= 0.5 ? '🙂' : '📚';
      root.innerHTML = `
        <div class="card center">
          <div class="big-emoji">${emoji}</div>
          <h2>${quit ? 'Session ended' : 'Session complete'}</h2>
          <div class="stat-grid" style="margin:12px 0">
            <div><div class="sv">${correct}/${n}</div><div class="sl">correct</div></div>
            <div><div class="sv">+${xpGain}</div><div class="sl">XP</div></div>
            <div><div class="sv">${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</div><div class="sl">time</div></div>
          </div>${rec}
          ${missed.length ? `<button class="btn block" id="retry">↺ Retry the ${missed.length} missed</button><div style="height:8px"></div>` : ''}
          <div class="row"><button class="btn ghost" id="again" style="flex:1">New round</button><button class="btn line" id="done" style="flex:1">Done</button></div>
        </div>
        ${missed.length ? `<div class="card"><h3>To review</h3>${missed.map((it) => `<div class="small" style="padding:6px 0;border-bottom:1px solid var(--line)">${(KIND[it.t] || ['•'])[0]} ${fmt(it.q || it.f || '')}</div>`).join('')}</div>` : ''}`;
      const rt = root.querySelector('#retry');
      if (rt) rt.addEventListener('click', () => PE.runSession(root, Object.assign({}, opts, { items: missed, timed: 0, fast: false })));
      root.querySelector('#again').addEventListener('click', () => (opts.again ? opts.again() : PE.runSession(root, opts)));
      root.querySelector('#done').addEventListener('click', () => (opts.onExit ? opts.onExit() : history.back()));
      PE.ui && PE.ui.refreshHeader();
    }

    show();
  };
})();
