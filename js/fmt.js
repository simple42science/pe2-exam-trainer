/* PE II Trainer – text & formula renderer.
 * Content strings use a tiny TeX subset inside $…$ (inline) or $$…$$ (display):
 *   _{…} ^{…}  \frac{a}{b}  \sqrt{x}  \text{…}  \un{m/s}  greek letters  \cdot \to \le …
 * Outside math: **bold**, `\n` = line break, raw HTML allowed (content is authored, not user input).
 */
(function () {
  const PE = (window.PE = window.PE || {});

  // registries filled by the data files (loaded before app.js)
  PE.topics = PE.topics || [];
  PE.exams = PE.exams || [];
  PE.topic = (t) => { PE.topics.push(t); };
  PE.exam = (e) => { PE.exams.push(e); };

  const SYM = {
    alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', Delta: 'Δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ',
    eta: 'η', theta: 'θ', vartheta: 'ϑ', kappa: 'κ', lambda: 'λ', Lambda: 'Λ', mu: 'μ', nu: 'ν', xi: 'ξ',
    pi: 'π', Pi: 'Π', rho: 'ρ', sigma: 'σ', Sigma: 'Σ', tau: 'τ', phi: 'φ', varphi: 'φ', Phi: 'Φ', chi: 'χ',
    psi: 'ψ', Psi: 'Ψ', omega: 'ω', Omega: 'Ω', Gamma: 'Γ', Theta: 'Θ',
    cdot: '·', times: '×', pm: '±', mp: '∓', le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠',
    approx: '≈', sim: '∼', equiv: '≡', propto: '∝', ll: '≪', gg: '≫', infty: '∞', partial: '∂', nabla: '∇',
    to: '→', rightarrow: '→', leftarrow: '←', Rightarrow: '⇒', Leftarrow: '⇐', Leftrightarrow: '⇔',
    leftrightarrow: '↔', rightleftharpoons: '⇌', uparrow: '↑', downarrow: '↓', mapsto: '↦',
    sum: '∑', int: '∫', prod: '∏', circ: '°', degree: '°', prime: '′', bullet: '•', ldots: '…', dots: '…',
    cdots: '⋯', checkmark: '✓', hat: '^', perp: '⊥', angle: '∠', star: '⋆', triangle: '△', square: '□',
    lbrace: '{', rbrace: '}', vert: '|', percent: '%', box: '▢',
  };
  const OPS = new Set(['=', '+', '−', '<', '>', '≤', '≥', '≈', '≠', '→', '⇒', '⇔', '←', '↔', '⇌', '∝', '≪', '≫', '·', '×', '±', '∼', '≡']);
  const FUNCS = new Set(['ln', 'log', 'exp', 'min', 'max', 'sin', 'cos', 'tan', 'tanh', 'lim']);

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---- math parser -------------------------------------------------------
  function parse(s, i, ctx, stop) {
    // ctx.up = letters upright (subscripts, units)
    let out = '';
    while (i < s.length) {
      const c = s[i];
      if (c === '}' && stop === '}') return { h: out, i: i + 1 };
      if (stop === 'right' && s.startsWith('\\right', i)) return { h: out, i };
      if (c === '{') { const g = parse(s, i + 1, ctx, '}'); out += g.h; i = g.i; continue; }
      if (c === ' ' || c === '\n' || c === '\t') { i++; continue; }
      if (c === '_' || c === '^') {
        const a = atom(s, i + 1, c === '_' ? { up: true } : ctx);
        out += c === '_' ? `<sub>${a.h}</sub>` : `<sup>${a.h}</sup>`;
        i = a.i; continue;
      }
      if (c === '\\') { const r = command(s, i, ctx); out += r.h; i = r.i; continue; }
      if (/[A-Za-z]/.test(c)) {
        let j = i; while (j < s.length && /[A-Za-z]/.test(s[j])) j++;
        const w = s.slice(i, j);
        if (w.length === 1 && !ctx.up) out += `<i>${w}</i>`;
        else if (FUNCS.has(w)) out += `<span class="fn">${w}</span>`;
        else out += `<span class="w">${w}</span>`;
        i = j; continue;
      }
      if (c === '-') { out += opSpan('−', ctx); i++; continue; }
      if (c === '*') { out += opSpan('·', ctx); i++; continue; }
      if (c === "'") { out += '′'; i++; continue; }
      if (c === '~') { out += '&nbsp;'; i++; continue; }
      if (OPS.has(c)) { out += opSpan(c, ctx); i++; continue; }
      if (c === '<') { out += opSpan('&lt;', ctx); i++; continue; }
      if (c === '>') { out += opSpan('&gt;', ctx); i++; continue; }
      if (c === '&') { out += '&amp;'; i++; continue; }
      out += c; i++;
    }
    return { h: out, i };
  }

  function opSpan(c, ctx) {
    return ctx.small ? c : `<span class="op">${c}</span>`;
  }

  function atom(s, i, ctx) {
    while (s[i] === ' ') i++;
    const c = s[i];
    if (c === '{') return parse(s, i + 1, ctx, '}');
    if (c === '\\') return command(s, i, ctx);
    if (c === '-') return { h: '−', i: i + 1 };
    if (c === undefined) return { h: '', i };
    if (/[A-Za-z]/.test(c) && !ctx.up) return { h: `<i>${c}</i>`, i: i + 1 };
    return { h: esc(c), i: i + 1 };
  }

  function rawGroup(s, i) {
    while (s[i] === ' ') i++;
    if (s[i] !== '{') return { t: s[i] || '', i: i + 1 };
    let depth = 0, j = i;
    for (; j < s.length; j++) {
      if (s[j] === '{') depth++;
      else if (s[j] === '}') { depth--; if (depth === 0) break; }
    }
    return { t: s.slice(i + 1, j), i: j + 1 };
  }

  function command(s, i, ctx) {
    let j = i + 1;
    if (/[A-Za-z]/.test(s[j])) { while (j < s.length && /[A-Za-z]/.test(s[j])) j++; }
    else j++;
    const name = s.slice(i + 1, j);
    switch (name) {
      case 'frac': case 'dfrac': case 'tfrac': {
        const a = atom(s, j, ctx), b = atom(s, a.i, ctx);
        return { h: `<span class="fr"><span>${a.h}</span><span>${b.h}</span></span>`, i: b.i };
      }
      case 'sqrt': {
        const a = atom(s, j, ctx);
        return { h: `<span class="sqrt">√<span class="sq">${a.h}</span></span>`, i: a.i };
      }
      case 'text': case 'mathrm': case 'rm': case 'textrm': case 'mathsf': {
        const g = rawGroup(s, j);
        return { h: `<span class="tx">${fmtText(g.t)}</span>`, i: g.i };
      }
      case 'un': {
        const g = rawGroup(s, j);
        return { h: `<span class="un">[${unit(g.t)}]</span>`, i: g.i };
      }
      case 'bar': case 'overline': {
        const a = atom(s, j, ctx);
        return { h: `<span class="ov">${a.h}</span>`, i: a.i };
      }
      case 'hat': { const a = atom(s, j, ctx); return { h: `${a.h}̂`, i: a.i }; }
      case 'dot': { const a = atom(s, j, ctx); return { h: `${a.h}̇`, i: a.i }; }
      case 'boxed': {
        const a = atom(s, j, ctx);
        return { h: `<span class="bx">${a.h}</span>`, i: a.i };
      }
      case 'left': {
        let d = s[j]; let k = j + 1;
        if (d === '\\') { d = s[j + 1]; k = j + 2; }
        const inner = parse(s, k, ctx, 'right');
        let k2 = inner.i + 6; // skip \right
        let e = s[k2]; let k3 = k2 + 1;
        if (e === '\\') { e = s[k2 + 1]; k3 = k2 + 2; }
        const dl = d === '.' ? '' : esc(d), dr = e === '.' ? '' : esc(e);
        return { h: `<span class="lr"><span class="dl">${dl}</span>${inner.h}<span class="dl">${dr}</span></span>`, i: k3 };
      }
      case 'big': case 'Big': case 'bigg': case 'Bigg': return { h: '', i: j };
      case ',': return { h: '<span class="ts"></span>', i: j };
      case ';': case ':': return { h: '<span class="ms"></span>', i: j };
      case ' ': return { h: ' ', i: j };
      case 'quad': return { h: '<span class="qd"></span>', i: j };
      case 'qquad': return { h: '<span class="qd"></span><span class="qd"></span>', i: j };
      case '{': return { h: '{', i: j };
      case '}': return { h: '}', i: j };
      case '%': return { h: '%', i: j };
      case '$': return { h: '$', i: j };
      case '_': return { h: '_', i: j };
      case '#': return { h: '#', i: j };
      case '\\': return { h: '<br>', i: j };
      case 'OH': return { h: '•OH', i: j };
      default:
        if (SYM[name] !== undefined) {
          const ch = SYM[name];
          if (OPS.has(ch)) return { h: opSpan(ch, ctx), i: j };
          return { h: ch, i: j };
        }
        if (FUNCS.has(name)) return { h: `<span class="fn">${name}</span>`, i: j };
        return { h: `<span class="w">${esc(name)}</span>`, i: j };
    }
  }

  function unit(t) {
    if (t === '-' || t === '') return '−';
    return parse(t, 0, { up: true, small: true }).h;
  }

  function math(tex, display) {
    const h = parse(tex, 0, {}).h;
    return display ? `<div class="mb"><span class="m">${h}</span></div>` : `<span class="m">${h}</span>`;
  }

  // ---- text with inline math --------------------------------------------
  // plain-text notation: X_{ab} / X_ab,c → subscript; ^{…}, ^(…), ^2 → superscript
  const BASE = 'A-Za-zα-ωΑ-Ωµκλσητβπφ′\\]\\)';
  const RE_SUB_BR = new RegExp(`([${BASE}])_\\{([^}]+)\\}`, 'g');
  const RE_SUB = new RegExp(`([${BASE}])_([A-Za-z0-9]+(?:,[A-Za-z0-9]+)*)`, 'g');
  function fmtText(t) {
    return String(t)
      .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
      .replace(RE_SUB_BR, '$1<sub>$2</sub>')
      .replace(RE_SUB, '$1<sub>$2</sub>')
      .replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>')
      .replace(/\^\(([^()]+)\)/g, '<sup>$1</sup>')
      .replace(/\^([−+-]?[0-9.]*[0-9])/g, '<sup>$1</sup>')
      .replace(/\n/g, '<br>');
  }

  function fmt(str) {
    if (str === undefined || str === null) return '';
    str = String(str);
    let out = '', i = 0;
    while (i < str.length) {
      const k = str.indexOf('$', i);
      if (k < 0) { out += fmtText(str.slice(i)); break; }
      if (k > 0 && str[k - 1] === '\\') { out += fmtText(str.slice(i, k - 1)) + '$'; i = k + 1; continue; }
      out += fmtText(str.slice(i, k));
      const disp = str[k + 1] === '$';
      const start = k + (disp ? 2 : 1);
      const end = str.indexOf(disp ? '$$' : '$', start);
      if (end < 0) { out += fmtText(str.slice(k)); break; }
      out += math(str.slice(start, end), disp);
      i = end + (disp ? 2 : 1);
    }
    return out;
  }

  PE.fmt = fmt;
  PE.math = math;
  PE.esc = esc;
})();
