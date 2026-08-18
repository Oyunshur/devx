/**
 * Interactive Profile Card & Dynamic Parallax Background Engine
 */
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const cardWrapper = document.getElementById('cardWrapper');
  const profileCard = document.getElementById('profileCard');
  const cardGlare = document.getElementById('cardGlare');
  const subscribeBtn = document.getElementById('subscribeBtn');
  const btnText = document.getElementById('btnText');
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  const orb1 = document.getElementById('orb1');
  const orb2 = document.getElementById('orb2');
  const orb3 = document.getElementById('orb3');
  const orb4 = document.getElementById('orb4');

  // Mouse State
  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
    normX: 0,
    normY: 0,
    isHoveringCard: false
  };

  // Linear Interpolation helper
  const lerp = (start, end, factor) => start + (end - start) * factor;

  /* ==========================================================================
     1. Interactive Particle Canvas Setup
     ========================================================================== */
  let particles = [];
  const particleCount = 45;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2.2 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: ['rgba(204, 91, 119, 0.35)', 'rgba(242, 172, 102, 0.35)', 'rgba(80, 169, 154, 0.3)'][i % 3]
      });
    }
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  resizeCanvas();
  initParticles();

  /* ==========================================================================
     2. Mouse Tracking & Window Listeners
     ========================================================================== */
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.normX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
    mouse.normY = (e.clientY / window.innerHeight) * 2 - 1; // -1 to 1
  });

  // Touch device fallback
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
      mouse.normX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouse.normY = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
    }
  }, { passive: true });

  if (cardWrapper) {
    cardWrapper.addEventListener('mouseenter', () => {
      mouse.isHoveringCard = true;
    });

    cardWrapper.addEventListener('mouseleave', () => {
      mouse.isHoveringCard = false;
    });
  }

  /* ==========================================================================
     3. Smooth Render Loop (Parallax Orbs, 3D Card Tilt, Canvas Particles)
     ========================================================================== */
  let currentTiltX = 0;
  let currentTiltY = 0;
  let currentGlareX = 50;
  let currentGlareY = 50;
  let currentGlareOpacity = 0;

  function render() {
    // Smooth lerp mouse coordinates
    mouse.x = lerp(mouse.x, mouse.targetX, 0.08);
    mouse.y = lerp(mouse.y, mouse.targetY, 0.08);

    const normX = (mouse.x / window.innerWidth) * 2 - 1;
    const normY = (mouse.y / window.innerHeight) * 2 - 1;

    // A) Dynamic Ambient Background Orbs Parallax
    if (orb1) orb1.style.transform = `translate3d(${normX * -45}px, ${normY * -45}px, 0)`;
    if (orb2) orb2.style.transform = `translate3d(${normX * 55}px, ${normY * 55}px, 0)`;
    if (orb3) orb3.style.transform = `translate3d(${normX * -35}px, ${normY * 40}px, 0)`;
    if (orb4) orb4.style.transform = `translate3d(${normX * 40}px, ${normY * -30}px, 0)`;

    // B) 3D Card Tilt & Glare
    if (profileCard && cardWrapper) {
      const rect = cardWrapper.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      let targetTiltX = 0;
      let targetTiltY = 0;
      let targetGlareOpacity = 0;

      if (mouse.isHoveringCard) {
        const mouseXRelative = mouse.x - cardCenterX;
        const mouseYRelative = mouse.y - cardCenterY;

        // Tilt angles (max ~10 degrees)
        targetTiltX = -(mouseYRelative / (rect.height / 2)) * 9;
        targetTiltY = (mouseXRelative / (rect.width / 2)) * 9;

        // Glare coordinates (0% to 100%)
        currentGlareX = ((mouse.x - rect.left) / rect.width) * 100;
        currentGlareY = ((mouse.y - rect.top) / rect.height) * 100;
        targetGlareOpacity = 0.55;
      } else {
        // Subtle ambient tilt following viewport mouse
        targetTiltX = -normY * 4.5;
        targetTiltY = normX * 4.5;
        targetGlareOpacity = 0.15;
      }

      currentTiltX = lerp(currentTiltX, targetTiltX, 0.1);
      currentTiltY = lerp(currentTiltY, targetTiltY, 0.1);
      currentGlareOpacity = lerp(currentGlareOpacity, targetGlareOpacity, 0.1);

      profileCard.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
      profileCard.style.setProperty('--glare-x', `${currentGlareX.toFixed(1)}%`);
      profileCard.style.setProperty('--glare-y', `${currentGlareY.toFixed(1)}%`);
      profileCard.style.setProperty('--glare-opacity', currentGlareOpacity.toFixed(2));
    }

    // C) Canvas Reactive Particle Background
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Natural drift
        p.x += p.vx;
        p.y += p.vy;

        // Screen wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse avoidance/reaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.x -= (dx / dist) * force * 1.8;
          p.y -= (dy / dist) * force * 1.8;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  /* ==========================================================================
     4. Interactive Subscribe Button Toggle
     ========================================================================== */
  if (subscribeBtn && btnText) {
    let isSubscribed = false;

    subscribeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isSubscribed = !isSubscribed;

      if (isSubscribed) {
        subscribeBtn.classList.add('is-subscribed');
        subscribeBtn.setAttribute('aria-pressed', 'true');
        btnText.textContent = 'Subscribed';
      } else {
        subscribeBtn.classList.remove('is-subscribed');
        subscribeBtn.setAttribute('aria-pressed', 'false');
        btnText.textContent = 'Subscribe';
      }
    });
  }
});
