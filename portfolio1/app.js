/**
 * AETHELGARD // FRONT-END ENGINEER PORTFOLIO ENGINE
 * Synthesizing Cybercore Performance, Gothic Architecture, and Art Nouveau Motion
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize subsystems
  initCustomCursor();
  initGenerativeCanvas();
  initAudioSynthesizer();
  initThemeSwitcher();
  initAestheticBlender();
  initPortfolioFiltersAndModal();
  initSkillTreeGrimoire();
  initTarotOracle();
  initCommunionForm();
  initNavigationAndScrollspy();
});

/* ==========================================================================
   1. CUSTOM CYBER-GOTHIC CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const glow = document.getElementById('cursor-glow');
  if (!dot || !glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth trailing for the outer glow ring
  function renderCursor() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover expansion on interactive elements
  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .skill-node, .tarot-card, .relic-card, .triad-card');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      glow.style.width = '64px';
      glow.style.height = '64px';
      glow.style.borderColor = 'var(--neon-cyan)';
      glow.style.boxShadow = '0 0 20px var(--neon-cyan-glow)';
      dot.style.transform = 'translate(-50%, -50%) scale(1.6)';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width = '44px';
      glow.style.height = '44px';
      glow.style.borderColor = 'rgba(212, 175, 55, 0.6)';
      glow.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.25)';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}

/* ==========================================================================
   2. GENERATIVE BACKGROUND CANVAS (BIOCYBER VINES & GOTHIC PARTICLES)
   ========================================================================== */
function initGenerativeCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initVines();
  });

  // Mouse coordinates for reactive interaction
  let mouse = { x: width / 2, y: height / 2, radius: 180 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Embers / Gothic Dust Particles
  const particles = [];
  const particleCount = 45;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      color: Math.random() > 0.5 ? '#d4af37' : '#00f0ff',
      pulse: Math.random() * Math.PI * 2,
    });
  }

  // Sinuous Whiplash Vines (Art Nouveau meets Cyber PCB)
  let vines = [];
  function initVines() {
    vines = [];
    const vineCount = Math.max(3, Math.floor(width / 400));
    for (let i = 0; i < vineCount; i++) {
      vines.push({
        baseX: (width / (vineCount + 1)) * (i + 1),
        amplitude: 40 + Math.random() * 40,
        frequency: 0.003 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.008,
        color: i % 2 === 0 ? 'rgba(212, 175, 55, 0.18)' : 'rgba(0, 240, 255, 0.14)',
        glowColor: i % 2 === 0 ? '#d4af37' : '#00f0ff',
        segments: 80,
      });
    }
  }
  initVines();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw Sinuous Vines
    vines.forEach((vine) => {
      vine.phase += vine.speed;
      ctx.beginPath();
      ctx.strokeStyle = vine.color;
      ctx.lineWidth = 1.8;

      let startX = vine.baseX + Math.sin(vine.phase) * vine.amplitude;
      ctx.moveTo(startX, 0);

      for (let y = 0; y <= height; y += height / vine.segments) {
        // Whiplash curve equation
        let wave = Math.sin(y * vine.frequency + vine.phase) * vine.amplitude;
        let wave2 = Math.cos(y * vine.frequency * 0.5 + vine.phase * 0.5) * (vine.amplitude * 0.4);
        let currentX = vine.baseX + wave + wave2;

        // Interactive mouse deflection
        let dx = currentX - mouse.x;
        let dy = y - mouse.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          let force = (1 - dist / mouse.radius) * 35;
          currentX += (dx / dist) * force;
        }

        ctx.lineTo(currentX, y);

        // Draw periodic cybernetic nodes along vine
        if (Math.floor(y) % 180 === 0) {
          ctx.save();
          ctx.fillStyle = vine.glowColor;
          ctx.shadowColor = vine.glowColor;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(currentX, y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.stroke();
    });

    // Draw Particles
    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.pulse += 0.03;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      let dynamicAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);

      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0.1, dynamicAlpha);
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   3. WEB AUDIO API SYNTHESIZER (AMBIENT ATMOSPHERE & SFX)
   ========================================================================== */
let audioCtx = null;
let masterGain = null;
let isAudioPlaying = false;
let droneOscs = [];

function initAudioSynthesizer() {
  const audioBtn = document.getElementById('audio-toggle');
  const audioIcon = document.getElementById('audio-icon');
  if (!audioBtn) return;

  function setupAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }

  function startAtmosphere() {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Create a rich Gothic-Cyber chord (D Minor Modal: D2, A2, F3, C4)
    const baseFreqs = [73.42, 110.0, 174.61, 261.63];
    droneOscs = [];

    baseFreqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280 + idx * 80, audioCtx.currentTime);
      filter.Q.setValueAtTime(4.0, audioCtx.currentTime);

      oscGain.gain.setValueAtTime(0.03 / (idx + 1), audioCtx.currentTime);

      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.setValueAtTime(0.1 + idx * 0.05, audioCtx.currentTime);
      lfoGain.gain.setValueAtTime(60, audioCtx.currentTime);
      lfo.connect(filter.frequency);
      lfo.start();

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();

      droneOscs.push({ osc, lfo });
    });

    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 2.5);

    isAudioPlaying = true;
    audioBtn.classList.add('playing');
    if (audioIcon) audioIcon.className = 'fa-solid fa-volume-high';
  }

  function stopAtmosphere() {
    if (!audioCtx || !isAudioPlaying) return;
    masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

    setTimeout(() => {
      droneOscs.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
        } catch (e) {}
      });
      droneOscs = [];
      isAudioPlaying = false;
      audioBtn.classList.remove('playing');
      if (audioIcon) audioIcon.className = 'fa-solid fa-volume-xmark';
    }, 1200);
  }

  audioBtn.addEventListener('click', () => {
    setupAudioContext();
    if (isAudioPlaying) {
      stopAtmosphere();
    } else {
      startAtmosphere();
      playSfx('chime');
    }
  });

  window.playSfx = function (type = 'click') {
    if (!audioCtx || !isAudioPlaying) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'chime') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.35);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'tarot') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(329.63, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.5);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.52);
      }
    } catch (e) {}
  };

  document.querySelectorAll('button, .filter-btn, .skill-node, .tarot-card').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.playSfx) window.playSfx('click');
    });
  });
}

/* ==========================================================================
   4. THEME SWITCHER
   ========================================================================== */
function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle-btn');
  const dropdown = document.getElementById('theme-dropdown');
  const options = document.querySelectorAll('.theme-option');
  const quickBtns = document.querySelectorAll('.lens-quick-btn');

  if (!themeToggle || !dropdown) return;

  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = dropdown.classList.toggle('active');
    themeToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== themeToggle) {
      dropdown.classList.remove('active');
      themeToggle.setAttribute('aria-expanded', 'false');
    }
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    options.forEach((opt) => {
      if (opt.dataset.style === theme) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Update aesthetic blender sliders to match theme preset
    const sliderCyber = document.getElementById('slider-cyber');
    const sliderGothic = document.getElementById('slider-gothic');
    const sliderNouveau = document.getElementById('slider-nouveau');
    if (sliderCyber && sliderGothic && sliderNouveau) {
      if (theme === 'cyber') {
        sliderCyber.value = 95;
        sliderGothic.value = 30;
        sliderNouveau.value = 20;
      } else if (theme === 'gothic') {
        sliderCyber.value = 25;
        sliderGothic.value = 95;
        sliderNouveau.value = 40;
      } else if (theme === 'nouveau') {
        sliderCyber.value = 30;
        sliderGothic.value = 45;
        sliderNouveau.value = 95;
      } else {
        sliderCyber.value = 65;
        sliderGothic.value = 75;
        sliderNouveau.value = 80;
      }
      sliderCyber.dispatchEvent(new Event('input'));
      sliderGothic.dispatchEvent(new Event('input'));
      sliderNouveau.dispatchEvent(new Event('input'));
    }

    dropdown.classList.remove('active');
    themeToggle.setAttribute('aria-expanded', 'false');
    if (window.playSfx) window.playSfx('chime');
  }

  options.forEach((opt) => {
    opt.addEventListener('click', () => {
      setTheme(opt.dataset.style);
    });
  });

  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetStyle = btn.dataset.targetStyle;
      setTheme(targetStyle);
      const aboutSection = document.getElementById('about');
      if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ==========================================================================
   5. REAL-TIME AESTHETIC BLENDER TOOL
   ========================================================================== */
function initAestheticBlender() {
  const sCyber = document.getElementById('slider-cyber');
  const sGothic = document.getElementById('slider-gothic');
  const sNouveau = document.getElementById('slider-nouveau');
  const valCyber = document.getElementById('val-cyber');
  const valGothic = document.getElementById('val-gothic');
  const valNouveau = document.getElementById('val-nouveau');
  const indicator = document.getElementById('blender-indicator');
  const previewBox = document.getElementById('blender-preview-box');
  const descDynamic = document.getElementById('blender-desc-dynamic');

  if (!sCyber || !sGothic || !sNouveau) return;

  function updateBlend() {
    const c = parseInt(sCyber.value, 10);
    const g = parseInt(sGothic.value, 10);
    const n = parseInt(sNouveau.value, 10);

    valCyber.textContent = `${c}%`;
    valGothic.textContent = `${g}%`;
    valNouveau.textContent = `${n}%`;

    // Apply custom properties to CSS root
    document.documentElement.style.setProperty('--cyber-intensity', (c / 100).toFixed(2));
    document.documentElement.style.setProperty('--gothic-depth', (g / 100).toFixed(2));
    document.documentElement.style.setProperty('--nouveau-bloom', (n / 100).toFixed(2));

    if (c >= g && c >= n) {
      indicator.textContent = `CYBER DOMINANT [${c}% // NEON GLITCH]`;
      indicator.style.borderColor = 'var(--neon-cyan)';
      indicator.style.color = 'var(--neon-cyan)';
      descDynamic.textContent = `Cybercore telemetry active: high-voltage electric cyan overlays, phosphor matrix lines, and low-latency algorithmic framing.`;
      previewBox.style.boxShadow = '0 0 30px rgba(0, 240, 255, 0.35)';
    } else if (g >= c && g >= n) {
      indicator.textContent = `GOTHIC DOMINANT [${g}% // OBSIDIAN VAULT]`;
      indicator.style.borderColor = 'var(--crimson-accent)';
      indicator.style.color = 'var(--gold-light)';
      descDynamic.textContent = `Gothic structural focus active: cathedral obsidian depths, pointed lancet geometries, and blood-crimson ecclesiastical radiance.`;
      previewBox.style.boxShadow = '0 0 30px rgba(139, 14, 47, 0.45)';
    } else {
      indicator.textContent = `NOUVEAU DOMINANT [${n}% // ORGANIC FLORA]`;
      indicator.style.borderColor = 'var(--gold-primary)';
      indicator.style.color = 'var(--gold-primary)';
      descDynamic.textContent = `Art Nouveau motion active: golden whiplash tendrils, asymmetrical botanical framing, and warm gilded brass luminescence.`;
      previewBox.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.35)';
    }
  }

  sCyber.addEventListener('input', updateBlend);
  sGothic.addEventListener('input', updateBlend);
  sNouveau.addEventListener('input', updateBlend);
  updateBlend();
}

/* ==========================================================================
   6. PORTFOLIO SHOWCASE & PROJECT CASE STUDY MODAL
   ========================================================================== */
const projectCaseStudies = {
  '1': {
    title: 'Chrysalis 3D Configurator Storefront',
    category: 'WebGL & Interactive 3D',
    badge: 'CASE STUDY 01',
    tech: 'Vanilla JS / WebGL / Three.js / CSS3 Custom Properties',
    date: 'ANNO 2026 // PRODUCTION',
    desc: 'An immersive 3D product customization storefront built without heavy front-end frameworks. Features custom GLSL PBR physical material shaders, dynamic camera choreographies, responsive touch controls, and silky 60 FPS performance on low-tier mobile devices.',
    lore: 'Architected with a modular vanilla JavaScript event-driven state manager and GPU-accelerated canvas render passes, achieving a sub-1.2s First Contentful Paint.',
    features: [
      'Real-time PBR material and lighting customization in 60 FPS',
      'Zero-dependency vanilla JavaScript component engine',
      'Mobile-optimized touch gestures and camera orbits',
      'Integrated e-commerce cart drawer with smooth micro-animations'
    ]
  },
  '2': {
    title: 'Cathedral UI Design System & Component Library',
    category: 'Design Systems & UI Architecture',
    badge: 'CASE STUDY 02',
    tech: 'HTML5 / Modern CSS / Web Components / a11y',
    date: 'ANNO 2026 // OPEN SOURCE',
    desc: 'A comprehensive, accessible design system containing over 45 custom front-end components. Combines Dark Gothic architecture tokens with Cybercore HUD elements, achieving 100% WCAG AAA accessibility compliance and zero-runtime CSS footprint.',
    lore: 'Designed with CSS Custom Properties tokenization, full keyboard navigation traps for modals, ARIA live region announcements, and extensive automated visual regression tests.',
    features: [
      '45+ accessible UI components (inputs, modals, carousels, menus)',
      'WCAG 2.2 AAA certified with full keyboard & screen reader support',
      'Multi-theme token engine (Cyber, Gothic, Art Nouveau)',
      'Zero external runtime CSS dependencies'
    ]
  },
  '3': {
    title: 'L\'Orchidée Vector & Generative Canvas Studio',
    category: 'Creative Tech & SVG Math',
    badge: 'CASE STUDY 03',
    tech: 'HTML5 Canvas / SVG Math / Web Audio API',
    date: 'ANNO 2026 // CREATIVE LAB',
    desc: 'A browser-based generative art studio computing authentic Art Nouveau whiplash curves in mathematical vectors. Features interactive bezier control points, audio-reactive bloom transformations, and instant vector SVG / PNG exports.',
    lore: 'Utilizes cubic bezier calculus and harmonic trigonometric functions to create living organic curves that synchronize with audio input frequencies.',
    features: [
      'Interactive vector bezier path editor with spring physics',
      'Audio-reactive procedural blossom and tendril generation',
      'Direct client-side SVG and high-resolution raster export',
      '60+ FPS canvas rendering using double-buffered render loops'
    ]
  },
  '4': {
    title: 'Aetherius Real-Time Telemetry OS Dashboard',
    category: 'High-Performance Web App',
    badge: 'CASE STUDY 04',
    tech: 'TypeScript / WebSockets / Canvas API / Modern ESNext',
    date: 'ANNO 2026 // ENTERPRISE',
    desc: 'A high-frequency real-time telemetry dashboard designed for monitoring streaming systems and financial feeds. Capable of processing over 10,000 WebSocket events per second without dropping frames, using an optimized Canvas chart rendering pipeline.',
    lore: 'Implemented Web Workers for off-thread data deserialization, virtualized scrolling tables, and memory-efficient ring buffers.',
    features: [
      '10,000+ data events per second with zero UI frame drops',
      'Custom HTML5 Canvas charting engine with sub-5ms draw times',
      'Web Worker multithreading for JSON streaming and filtering',
      'Modular draggable dashboard widgets with persistent layout storage'
    ]
  },
  '5': {
    title: 'Basilica 3D WebGPU Architectural Experience',
    category: 'Next-Gen 3D & WebGPU',
    badge: 'CASE STUDY 05',
    tech: 'WebGPU / WGSL / GLSL / Spatial Web Audio',
    date: 'ANNO 2026 // EXPERIMENTAL',
    desc: 'A pioneering WebGPU spatial exploration featuring volumetric stained-glass light shafts, raymarched Gothic vaulted ceilings, and spatial 3D binaural sound positioning. Demonstrates the cutting edge of web rendering capabilities.',
    lore: 'Built with native WGSL compute and fragment shaders, showcasing forward+ clustered lighting techniques in the modern browser.',
    features: [
      'Hardware-accelerated WebGPU compute shaders',
      'Real-time volumetric lighting and chromatic dispersion',
      'Spatial 3D audio panning mapped to camera coordinates',
      'Smooth progressive asset streaming with fallback WebGL renderer'
    ]
  },
  '6': {
    title: 'Sinfonia Web Audio Workstation',
    category: 'Web Audio API & Creative DSP',
    badge: 'CASE STUDY 06',
    tech: 'Web Audio API / Custom DSP / Pointer Events',
    date: 'ANNO 2026 // WEB AUDIO LAB',
    desc: 'An in-browser procedural sound synthesizer and 16-step arpeggiator. Generates cathedral organ acoustics and cyberpunk frequency modulation purely via browser DSP nodes without downloading a single sound sample.',
    lore: 'Features custom convolution reverb impulses, ADSR envelope generators, multi-touch virtual keyboards, and WebMIDI hardware integration.',
    features: [
      'Zero-sample pure Web Audio synthesis engine',
      '16-step polyphonic sequencer with modal scale presets',
      'Low-latency pointer event triggers with velocity simulation',
      'WebMIDI controller plug-and-play support'
    ]
  }
};

function initPortfolioFiltersAndModal() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.relic-item');
  const modal = document.getElementById('relic-modal');
  const modalContent = document.getElementById('modal-dynamic-content');
  const modalClose = document.getElementById('modal-close');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;
      items.forEach((item) => {
        const cat = item.dataset.category;
        if (filterVal === 'all' || cat === filterVal) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          setTimeout(() => (item.style.opacity = '1'), 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  document.querySelectorAll('[data-relic-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const relicId = trigger.getAttribute('data-relic-trigger');
      const data = projectCaseStudies[relicId];
      if (!data) return;

      modalContent.innerHTML = `
        <div class="modal-relic-header" style="margin-bottom: 24px; border-bottom: 1px solid var(--gold-primary); padding-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-family: var(--font-cyber-mono); font-size: 0.75rem; color: var(--neon-cyan); letter-spacing: 0.15em;">
              ${data.category}
            </span>
            <span style="font-family: var(--font-cyber-mono); font-size: 0.7rem; color: var(--gold-primary); border: 1px solid var(--gold-primary); padding: 2px 8px; border-radius: 4px;">
              ${data.date}
            </span>
          </div>
          <h2 style="font-family: var(--font-gothic-serif); font-size: clamp(1.8rem, 3.5vw, 2.4rem); color: #fff; line-height: 1.2;">
            ${data.title}
          </h2>
        </div>

        <div class="modal-relic-body" style="display: flex; flex-direction: column; gap: 20px;">
          <p style="font-size: 1.15rem; line-height: 1.7; color: #ddd7cb;">
            ${data.desc}
          </p>

          <div style="background: rgba(14, 10, 22, 0.7); border: 1px dashed rgba(212, 175, 55, 0.4); border-radius: 8px; padding: 18px;">
            <h4 style="font-family: var(--font-cyber-mono); font-size: 0.8rem; color: var(--gold-primary); letter-spacing: 0.1em; margin-bottom: 8px;">
              <i class="fa-solid fa-scroll"></i> FRONT-END ARCHITECTURE & CHALLENGES
            </h4>
            <p style="font-size: 1rem; color: #b0aabf; font-style: italic;">
              ${data.lore}
            </p>
          </div>

          <div>
            <h4 style="font-family: var(--font-cyber-mono); font-size: 0.8rem; color: var(--neon-cyan); letter-spacing: 0.1em; margin-bottom: 12px;">
              <i class="fa-solid fa-list-check"></i> KEY TECHNICAL HIGHLIGHTS
            </h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
              ${data.features
                .map(
                  (f) => `
                <li style="display: flex; align-items: center; gap: 10px; font-size: 0.95rem; color: #e5e0d8;">
                  <i class="fa-solid fa-sparkles" style="color: var(--gold-primary); font-size: 0.75rem;"></i>
                  ${f}
                </li>
              `
                )
                .join('')}
            </ul>
          </div>

          <div style="margin-top: 10px; padding-top: 16px; border-top: 1px solid rgba(212, 175, 55, 0.2); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <span style="font-family: var(--font-cyber-mono); font-size: 0.75rem; color: #8c8599;">
              CORE STACK: <strong style="color: #fff;">${data.tech}</strong>
            </span>
            <button id="modal-live-demo-btn" class="header-btn" style="border-color: var(--neon-cyan); color: var(--neon-cyan);">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> LIVE DEMO LAUNCHED
            </button>
          </div>
        </div>
      `;

      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');

      const liveBtn = document.getElementById('modal-live-demo-btn');
      if (liveBtn) {
        liveBtn.addEventListener('click', () => {
          liveBtn.innerHTML = '<i class="fa-solid fa-check"></i> SIMULATED DEMO ACTIVE';
          liveBtn.style.background = 'rgba(0, 240, 255, 0.2)';
          if (window.playSfx) window.playSfx('chime');
        });
      }

      if (window.playSfx) window.playSfx('click');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   7. INTERACTIVE SKILL TREE TELEMETRY
   ========================================================================== */
const skillsTelemetryData = {
  html5: {
    title: 'Semantic HTML5 & Accessibility (WCAG)',
    class: '[ CORE DOM ARCHITECTURE ]',
    desc: 'Engineering accessible, search-optimized, and resilient HTML5 structures with strict landmark roles, ARIA attributes, keyboard focus management, and screen-reader fidelity.',
    mastery: '98% // Senior Level',
    tech: 'WCAG 2.2 AAA / WAI-ARIA / Semantic Tags',
    alignment: 'Accessible Component Patterns',
    perf: '100/100 Accessibility Score',
    icon: 'fa-html5'
  },
  css3: {
    title: 'Advanced CSS3, Grid & Custom Properties',
    class: '[ VISUAL ARCHITECTURE ]',
    desc: 'Mastery of modern CSS: CSS Grid, Flexbox, subgrid, container queries, custom properties, CSS animations, and complex vector filigree without external CSS frameworks.',
    mastery: '99% // Expert Level',
    tech: 'CSS Grid / Flexbox / Custom Properties / Houdini',
    alignment: 'Art Nouveau Whiplash & Fluid Layouts',
    perf: 'Sub-millisecond composite layers',
    icon: 'fa-css3-alt'
  },
  typescript: {
    title: 'TypeScript & Modern ESNext',
    class: '[ CLIENT LOGIC & TYPES ]',
    desc: 'Bulletproof type systems, reactive architecture, event-driven state engines, and clean modular component pipelines engineered for high stability and zero runtime crashes.',
    mastery: '96% // Senior Level',
    tech: 'TypeScript 5.x / ESNext / Async Iterators',
    alignment: 'Cybernetic Precision & Formal Logic',
    perf: 'Strict Null / Zero Any / Type Safety',
    icon: 'fa-js'
  },
  performance: {
    title: 'Web Performance & Core Web Vitals',
    class: '[ HIGH PERFORMANCE ]',
    desc: 'Optimizing LCP, INP, and CLS scores through critical rendering path tuning, asset compression, lazy loading, and Web Worker offloading.',
    mastery: '95% // Senior Level',
    tech: 'Lighthouse / WebPageTest / Chrome DevTools',
    alignment: 'Sub-Second Page Loads',
    perf: '100/100 Performance on Lighthouse',
    icon: 'fa-gauge-high'
  },
  components: {
    title: 'Design Systems & Component Architecture',
    class: '[ UI ARCHITECTURE ]',
    desc: 'Building modular, scalable UI component systems with consistent design tokens, state management, and strict documentation.',
    mastery: '94% // Senior Level',
    tech: 'Design Tokens / Storybook / Web Components',
    alignment: 'Cathedral Durability & Modularity',
    perf: 'Re-usable across multiple projects',
    icon: 'fa-layer-group'
  },
  responsive: {
    title: 'Responsive Cross-Browser Engineering',
    class: '[ ADAPTIVE LAYOUTS ]',
    desc: 'Seamless user experience across all form factors: mobile, tablet, 4K desktop, and foldable screens with touch and pointer event normalization.',
    mastery: '97% // Senior Level',
    tech: 'Media Queries / Container Queries / Touch API',
    alignment: 'Universal Viewport Fluidity',
    perf: 'Flawless across Chrome, Safari, Firefox',
    icon: 'fa-mobile-screen'
  },
  webgl: {
    title: 'WebGL, Three.js & Shaders (GLSL)',
    class: '[ 3D & CREATIVE TECH ]',
    desc: 'Crafting custom fragment shaders, raymarching 3D scenes, refractive glass shaders, and physics-based particle engines in the browser.',
    mastery: '92% // Senior Level',
    tech: 'GLSL / Three.js / WebGL / WebGPU',
    alignment: 'Cybercore Stained Glass Refraction',
    perf: '60+ FPS on mobile & desktop',
    icon: 'fa-cube'
  },
  svg: {
    title: 'HTML5 Canvas & SVG Path Morphing',
    class: '[ CREATIVE TECH ]',
    desc: 'Mathematical bezier curve choreography, procedural rosette filigree generation, and responsive vector framing that scales infinitely.',
    mastery: '95% // Senior Level',
    tech: 'HTML5 Canvas / Raw SVG / Path2D / Bezier Math',
    alignment: 'Gilded Brass & Whiplash Flora',
    perf: 'Sub-pixel crispness on Retina/HiDPI',
    icon: 'fa-bezier-curve'
  },
  webaudio: {
    title: 'Web Audio API & Sound Design',
    class: '[ AUDIO DSP ]',
    desc: 'Programmatic sound design generating modal gothic pipe organ polyphonies, cybernetic arpeggios, and interactive spatial audio in pure JS.',
    mastery: '90% // Senior Level',
    tech: 'Web Audio API / BiquadDSP / WebMIDI',
    alignment: 'Atmospheric Interactive Immersion',
    perf: 'Zero external audio assets needed',
    icon: 'fa-wave-square'
  }
};

function initSkillTreeGrimoire() {
  const nodes = document.querySelectorAll('.skill-node');
  const titleEl = document.getElementById('telemetry-title');
  const classEl = document.getElementById('telemetry-class');
  const descEl = document.getElementById('telemetry-desc');
  const masteryEl = document.getElementById('telemetry-mastery');
  const techEl = document.getElementById('telemetry-tech');
  const alignEl = document.getElementById('telemetry-alignment');
  const perfEl = document.getElementById('telemetry-perf');
  const card = document.getElementById('telemetry-card');

  if (!nodes.length || !titleEl) return;

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      nodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');

      const skillKey = node.dataset.skill;
      const data = skillsTelemetryData[skillKey];
      if (!data) return;

      card.style.opacity = '0.5';
      card.style.transform = 'scale(0.98)';

      setTimeout(() => {
        titleEl.textContent = data.title;
        classEl.textContent = data.class;
        descEl.textContent = data.desc;
        masteryEl.textContent = data.mastery;
        techEl.textContent = data.tech;
        alignEl.textContent = data.alignment;
        perfEl.textContent = data.perf;

        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 150);

      if (window.playSfx) window.playSfx('click');
    });
  });
}

/* ==========================================================================
   8. INTERACTIVE CYBER-TAROT ORACLE
   ========================================================================== */
const oracleDeck = [
  {
    num: '0 // THE PIONEER',
    type: 'INNOVATION',
    title: 'The Creative Engineer',
    text: 'Ship breakthrough web experiences without fear. Trust clean code and bold aesthetics.',
    keyword: 'KEYWORD: BOLD ARCHITECTURE',
    icon: 'fa-code',
    artClass: 'art-fool',
    log: 'ORACLE DECODED: High innovation index detected. Build the future of front-end web design.'
  },
  {
    num: 'I // THE ALCHEMIST',
    type: 'CRAFTSMANSHIP',
    title: 'The UI Alchemist',
    text: 'Transmute raw HTML & CSS into gilded stained-glass interfaces and responsive art.',
    keyword: 'KEYWORD: PIXEL PERFECTION',
    icon: 'fa-wand-magic-sparkles',
    artClass: 'art-magician',
    log: 'ORACLE DECODED: Aesthetic craft verified. Flawless execution of micro-interactions.'
  },
  {
    num: 'XVII // THE STAR',
    type: 'PERFORMANCE',
    title: 'The 100 Lighthouse',
    text: 'Whiplash curves render at 60 FPS. Lightning speed and zero layout shifts illuminate the user journey.',
    keyword: 'KEYWORD: ULTRA SPEED',
    icon: 'fa-gauge-high',
    artClass: 'art-star',
    log: 'ORACLE DECODED: Core Web Vitals score 100/100. Sub-second performance achieved.'
  },
  {
    num: 'IV // THE ARCHON',
    type: 'SYSTEM DESIGN',
    title: 'The Design System Sovereign',
    text: 'Impose sacred order upon component chaos. Build scalable web architecture upon reusable tokens.',
    keyword: 'KEYWORD: DESIGN SYSTEMS',
    icon: 'fa-cubes',
    artClass: 'art-fool',
    log: 'ORACLE DECODED: Scalable front-end architecture is the bedrock of long-term maintainability.'
  },
  {
    num: 'VIII // ACCESSIBILITY',
    type: 'WCAG AAA',
    title: 'The Inclusive Guardian',
    text: 'Equilibrium for every user. Keyboard navigation, ARIA semantics, and high contrast welcome all.',
    keyword: 'KEYWORD: UNIVERSAL ACCESS',
    icon: 'fa-universal-access',
    artClass: 'art-magician',
    log: 'ORACLE DECODED: WCAG 2.2 AAA standards verified. Accessibility built from the foundation.'
  },
  {
    num: 'XXI // THE SYNTHESIS',
    type: 'CREATIVE MASTERY',
    title: 'The Grand Cathedral',
    text: 'The triad is complete: Cybercore speed, Gothic rigor, and Art Nouveau beauty unite in harmony.',
    keyword: 'KEYWORD: TRANSCENDENCE',
    icon: 'fa-infinity',
    artClass: 'art-star',
    log: 'ORACLE DECODED: Total aesthetic & technical mastery. The trinity resonates with excellence.'
  }
];

function initTarotOracle() {
  const cards = document.querySelectorAll('.tarot-card');
  const drawBtn = document.getElementById('draw-cards-btn');
  const oracleLog = document.getElementById('oracle-log');

  function logToConsole(message, isHighlight = false) {
    if (!oracleLog) return;
    const p = document.createElement('p');
    p.className = 'term-line';
    if (isHighlight) p.style.color = 'var(--neon-cyan)';
    p.innerHTML = `<span class="prompt-arrow">❯</span> ${message}`;
    oracleLog.appendChild(p);

    while (oracleLog.children.length > 5) {
      oracleLog.removeChild(oracleLog.children[0]);
    }
    oracleLog.scrollTop = oracleLog.scrollHeight;
  }

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const isFlipped = card.classList.toggle('flipped');
      if (isFlipped) {
        const cardTitle = card.querySelector('.card-arcana-footer h4')?.textContent || `Arcana ${idx}`;
        logToConsole(`MANIFESTED: [${cardTitle}] // State dispatched to active DOM.`, true);
        if (window.playSfx) window.playSfx('tarot');
      } else {
        logToConsole(`CONCEALED: Card #${idx + 1} flipped back.`);
      }
    });
  });

  if (drawBtn) {
    drawBtn.addEventListener('click', () => {
      cards.forEach((c) => c.classList.remove('flipped'));
      logToConsole('SHUFFLING THE EXPERIMENTAL DECK // RE-CALIBRATING PROBABILITIES...');

      setTimeout(() => {
        const shuffled = [...oracleDeck].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        cards.forEach((cardEl, idx) => {
          const item = selected[idx];
          const headerRoman = cardEl.querySelector('.arcana-roman');
          const headerType = cardEl.querySelector('.arcana-type');
          const artFrame = cardEl.querySelector('.card-art-frame');
          const artIcon = cardEl.querySelector('.art-sigil-icon i');
          const footerH4 = cardEl.querySelector('.card-arcana-footer h4');
          const footerP = cardEl.querySelector('.card-arcana-footer p');
          const keyword = cardEl.querySelector('.card-keyword');

          if (headerRoman) headerRoman.textContent = item.num;
          if (headerType) headerType.textContent = item.type;
          if (footerH4) footerH4.textContent = item.title;
          if (footerP) footerP.textContent = item.text;
          if (keyword) keyword.textContent = item.keyword;
          if (artIcon) artIcon.className = `fa-solid ${item.icon}`;

          if (artFrame) {
            artFrame.className = `card-art-frame ${item.artClass}`;
          }

          setTimeout(() => {
            cardEl.classList.add('flipped');
            if (idx === 0) logToConsole(item.log, true);
          }, 300 + idx * 250);
        });

        if (window.playSfx) window.playSfx('chime');
      }, 500);
    });
  }
}

/* ==========================================================================
   9. CONTACT FORM HANDLING
   ========================================================================== */
function initCommunionForm() {
  const form = document.getElementById('transmission-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('caller-name').value.trim();
    const email = document.getElementById('caller-email').value.trim();
    const discipline = document.getElementById('project-discipline').value;
    const message = document.getElementById('project-message').value.trim();

    if (!name || !email || !message) {
      feedback.className = 'form-feedback-box error';
      feedback.style.display = 'block';
      feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> PLEASE COMPLETE FORM: Please specify name, email, and message.';
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      feedback.className = 'form-feedback-box error';
      feedback.style.display = 'block';
      feedback.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> INVALID EMAIL: Please provide a valid email address.';
      return;
    }

    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITTING MESSAGE...';
    submitBtn.disabled = true;

    setTimeout(() => {
      feedback.className = 'form-feedback-box success';
      feedback.style.display = 'block';
      feedback.innerHTML = `
        <div style="font-size: 1.1rem; margin-bottom: 6px; font-weight: 700;">
          <i class="fa-solid fa-circle-check"></i> MESSAGE DISPATCHED // TRANSMISSION RECEIVED
        </div>
        <div>
          Thank you, <strong>${name}</strong>. Your inquiry regarding <em>[${discipline.toUpperCase()}]</em> has been received. I will reply within 24 hours.
        </div>
      `;

      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      if (window.playSfx) window.playSfx('chime');
    }, 1200);
  });
}

/* ==========================================================================
   10. TRADITIONAL NAVBAR NAVIGATION, SCROLLSPY & 3D TILT
   ========================================================================== */
function initNavigationAndScrollspy() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scrollspy active state detection
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const isOpen = navMenu.classList.contains('mobile-open');
      mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach((item) => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        if (mobileToggle) mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 3D Tilt Effect on cards
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}
