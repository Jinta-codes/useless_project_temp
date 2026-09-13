/**
 * OverThink AI - Cartoon Procedural Web Audio Engine
 * High-quality, delightful cartoon sound effects (Zero external files).
 */
class OverThinkAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  playBloop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(720, now);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    } catch (e) {}
  }

  playBoing() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.35);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }

  playBonk() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  }

  playErrorBuzz() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.setValueAtTime(100, now + 0.15);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {}
  }

  playWhoosh() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.22);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.24);
    } catch (e) {}
  }

  playLetterThrow() {
    this.playWhoosh();
  }

  playLetterOpenFanfare() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      // Triumphant cartoon fanfare: C5, E5, G5, C6
      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.12 },
        { freq: 659.25, time: 0.12, dur: 0.12 },
        { freq: 783.99, time: 0.24, dur: 0.16 },
        { freq: 1046.50, time: 0.40, dur: 0.60 }
      ];
      const start = this.ctx.currentTime + 0.02;

      notes.forEach(n => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, start + n.time);
        gain.gain.setValueAtTime(0.16, start + n.time);
        gain.gain.exponentialRampToValueAtTime(0.001, start + n.time + n.dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start + n.time);
        osc.stop(start + n.time + n.dur + 0.05);
      });
    } catch (e) {}
  }

  playSadTrombone() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [
        { freq: 293.66, time: 0.0, dur: 0.28 },
        { freq: 277.18, time: 0.30, dur: 0.28 },
        { freq: 261.63, time: 0.60, dur: 0.32 },
        { freq: 246.94, time: 0.96, dur: 0.85, bendTo: 175.0 }
      ];
      const start = this.ctx.currentTime + 0.05;
      notes.forEach(n => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.freq, start + n.time);
        if (n.bendTo) {
          osc.frequency.exponentialRampToValueAtTime(n.bendTo, start + n.time + n.dur);
        }
        gain.gain.setValueAtTime(0.12, start + n.time);
        gain.gain.exponentialRampToValueAtTime(0.001, start + n.time + n.dur);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start + n.time);
        osc.stop(start + n.time + n.dur + 0.05);
      });
    } catch (e) {}
  }

  playAccelerateFail() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.linearRampToValueAtTime(320, now + 0.1);
      osc.frequency.linearRampToValueAtTime(120, now + 0.35);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.55);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.56);
    } catch (e) {}
  }

  playRobotChatter() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        const freq = 400 + Math.random() * 350;
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.05, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.05);
      }
    } catch (e) {}
  }
}

window.OverThinkAudio = OverThinkAudio;
