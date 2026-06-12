/* ============================================================
   GENSHIN WISH SIMULATOR — SOUND
   All effects are synthesized with the Web Audio API at runtime;
   no audio assets. The AudioContext is created lazily on the
   first wish (browsers require a user gesture).
   ============================================================ */

const SFX = (() => {
  let ctx = null;
  let enabled = true;

  function ac() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  /* one decaying tone */
  function tone(freq, at, dur, { type = "sine", vol = 0.18, detune = 0 } = {}) {
    const c = ac(), t0 = c.currentTime + at;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = freq; o.detune.value = detune;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  /* filtered noise sweep (comet whoosh / flash hiss) */
  function noise(at, dur, fStart, fEnd, vol = 0.2, q = 1) {
    const c = ac(), t0 = c.currentTime + at;
    const len = Math.ceil(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(); src.buffer = buf;
    const f = c.createBiquadFilter(); f.type = "bandpass"; f.Q.value = q;
    f.frequency.setValueAtTime(fStart, t0);
    f.frequency.exponentialRampToValueAtTime(fEnd, t0 + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + dur * 0.25);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f).connect(g).connect(c.destination);
    src.start(t0); src.stop(t0 + dur);
  }

  return {
    setEnabled(v) { enabled = v; },

    /* comet streaking across the sky */
    whoosh() {
      if (!enabled) return;
      noise(0, 1.5, 300, 2400, 0.22, 0.8);
      noise(0.25, 1.1, 200, 1400, 0.12, 1.2);
    },

    /* white flash before the reveals */
    flash() {
      if (!enabled) return;
      noise(0, 0.3, 3000, 6000, 0.12, 2);
      tone(1568, 0, 0.3, { vol: 0.1 });
    },

    /* per-item reveal chime */
    reveal(rarity, radiance) {
      if (!enabled) return;
      if (radiance) {
        // rising glissando into a sparkling arpeggio
        const c = ac(), t0 = c.currentTime;
        const o = c.createOscillator(), g = c.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(420, t0);
        o.frequency.exponentialRampToValueAtTime(1680, t0 + 0.45);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.14, t0 + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
        o.connect(g).connect(c.destination); o.start(t0); o.stop(t0 + 0.55);
        [659, 831, 988, 1319, 1661].forEach((f, i) => {
          tone(f, 0.4 + i * 0.09, 0.7, { vol: 0.16 });
          tone(f * 2, 0.4 + i * 0.09, 0.5, { vol: 0.05, detune: 6 });
        });
      } else if (rarity === 5) {
        [523, 659, 784, 1047].forEach((f, i) => {
          tone(f, i * 0.1, 0.8, { vol: 0.17 });
          tone(f * 2, i * 0.1, 0.5, { vol: 0.05, detune: 5 });
        });
      } else if (rarity === 4) {
        tone(587, 0, 0.5, { vol: 0.16 });
        tone(880, 0.09, 0.6, { vol: 0.16 });
      } else {
        tone(660, 0, 0.35, { type: "triangle", vol: 0.1 });
      }
    },
  };
})();
