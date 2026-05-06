/**
 * ============================================================
 * SHADOW DEV BOT - TEMPLATE ENGINE
 * ============================================================
 * Generates high-quality HTML/CSS/JS websites with animations
 * ============================================================
 */

const config = require('../config');

// CSS Animation Library
const ANIMATION_CSS = `
/* Shadow Dev Animation Library */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideDown { from { transform: translateY(-60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideLeft { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideRight { from { transform: translateX(-60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes zoomIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes zoomOut { from { transform: scale(1.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes rotateIn { from { transform: rotate(-180deg) scale(0); opacity: 0; } to { transform: rotate(0) scale(1); opacity: 1; } }
@keyframes bounceIn { 0% { transform: scale(0); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
@keyframes flipIn { from { transform: rotateY(90deg); opacity: 0; } to { transform: rotateY(0); opacity: 1; } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
@keyframes glow { 0%, 100% { box-shadow: 0 0 5px var(--primary), 0 0 10px var(--primary), 0 0 20px var(--primary); } 50% { box-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 40px var(--primary); } }
@keyframes neon { 0%, 100% { text-shadow: 0 0 5px var(--primary), 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 40px var(--primary); } 50% { text-shadow: 0 0 10px var(--primary), 0 0 20px var(--primary), 0 0 40px var(--primary), 0 0 80px var(--primary); } }
@keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
@keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes borderGlow { 0%, 100% { border-color: var(--primary); box-shadow: 0 0 5px var(--primary); } 50% { border-color: var(--secondary); box-shadow: 0 0 20px var(--secondary); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
@keyframes typewriter { from { width: 0; } to { width: 100%; } }
@keyframes blink { 50% { border-color: transparent; } }
@keyframes wave { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
@keyframes particle { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; } }
@keyframes aurora { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes morph { 0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; } }
@keyframes matrix { 0% { transform: translateY(-100%); opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }

.animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
.animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
.animate-slideDown { animation: slideDown 0.8s ease-out forwards; }
.animate-slideLeft { animation: slideLeft 0.8s ease-out forwards; }
.animate-slideRight { animation: slideRight 0.8s ease-out forwards; }
.animate-zoomIn { animation: zoomIn 0.6s ease-out forwards; }
.animate-zoomOut { animation: zoomOut 0.6s ease-out forwards; }
.animate-rotateIn { animation: rotateIn 0.8s ease-out forwards; }
.animate-bounceIn { animation: bounceIn 0.8s ease-out forwards; }
.animate-flipIn { animation: flipIn 0.8s ease-out forwards; }
.animate-pulse { animation: pulse 2s infinite; }
.animate-shake { animation: shake 0.5s ease-in-out; }
.animate-glow { animation: glow 2s infinite; }
.animate-neon { animation: neon 2s infinite; }
.animate-glitch { animation: glitch 0.3s infinite; }
.animate-gradient { background-size: 200% 200%; animation: gradientShift 3s ease infinite; }
.animate-borderGlow { animation: borderGlow 2s infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-wave { animation: wave 2s ease-in-out infinite; }
.animate-morph { animation: morph 8s ease-in-out infinite; }
.animate-aurora { background-size: 200% 200%; animation: aurora 6s ease infinite; }

.delay-1 { animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards; }
.delay-2 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
.delay-3 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
.delay-4 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
.delay-5 { animation-delay: 0.5s; opacity: 0; animation-fill-mode: forwards; }
.delay-6 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
.delay-7 { animation-delay: 0.7s; opacity: 0; animation-fill-mode: forwards; }
.delay-8 { animation-delay: 0.8s; opacity: 0; animation-fill-mode: forwards; }

/* Scroll Reveal */
.reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
.reveal.active { opacity: 1; transform: translateY(0); }

/* 3D Tilt */
.tilt-3d { transform-style: preserve-3d; transition: transform 0.3s ease; }
.tilt-3d:hover { transform: perspective(1000px) rotateX(5deg) rotateY(5deg); }

/* Magnetic Button */
.magnetic-btn { transition: transform 0.2s ease; }

/* Liquid Effect */
.liquid { position: relative; overflow: hidden; }
.liquid::before { content: ''; position: absolute; top: 50%; left: 50%; width: 0; height: 0; border-radius: 50%; background: rgba(255,255,255,0.1); transform: translate(-50%, -50%); transition: width 0.6s, height 0.6s; }
.liquid:hover::before { width: 300px; height: 300px; }

/* Text Scramble */
.scramble { display: inline-block; }

/* Particle Background */
.particles { position: relative; overflow: hidden; }
.particle { position: absolute; width: 4px; height: 4px; background: var(--primary); border-radius: 50%; animation: particle linear infinite; }
`;

// Base styles
const BASE_CSS = `
:root {
  --primary: {{PRIMARY_COLOR}};
  --secondary: {{SECONDARY_COLOR}};
  --accent: {{ACCENT_COLOR}};
  --dark: #0a0a0a;
  --light: #ffffff;
  --gray: #888888;
  --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: var(--dark);
  color: var(--light);
  overflow-x: hidden;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

/* Gradient Text */
.gradient-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 14px 32px;
  background: var(--gradient);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
}

/* Cards */
.card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.4s ease;
}

.card:hover {
  transform: translateY(-10px);
  border-color: var(--primary);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
}

.nav-links a {
  color: var(--light);
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary);
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 20%, rgba(var(--primary-rgb), 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(var(--secondary-rgb), 0.1) 0%, transparent 50%);
}

.hero-content {
  text-align: center;
  z-index: 1;
  max-width: 800px;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.1;
}

.hero p {
  font-size: 1.25rem;
  color: var(--gray);
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Sections */
.section {
  padding: 100px 0;
  position: relative;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
}

.section-subtitle {
  text-align: center;
  color: var(--gray);
  margin-bottom: 60px;
  font-size: 1.1rem;
}

/* Grid */
.grid {
  display: grid;
  gap: 30px;
}

.grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.grid-4 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }

/* Features */
.feature-icon {
  width: 60px;
  height: 60px;
  background: var(--gradient);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

/* Footer */
.footer {
  padding: 60px 0 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
}

.footer-text {
  color: var(--gray);
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
}

.social-links a {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--light);
  text-decoration: none;
  transition: all 0.3s;
}

.social-links a:hover {
  background: var(--primary);
  transform: translateY(-3px);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hero h1 { font-size: 2.5rem; }
  .hero-buttons { flex-direction: column; align-items: center; }
  .section { padding: 60px 0; }
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}

/* Scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: var(--dark); }
::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 4px; }
`;

// Particle background script
const PARTICLE_SCRIPT = `
<script>
// Particle Background
(function() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
      ctx.globalAlpha = 0.5;
      ctx.fill();
    });
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
          ctx.globalAlpha = 0.1 * (1 - dist / 150);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
})();
</script>
`;

// Scroll reveal script
const SCROLL_REVEAL_SCRIPT = `
<script>
// Scroll Reveal
(function() {
  const reveals = document.querySelectorAll('.reveal');
  
  function checkReveal() {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkReveal);
  window.addEventListener('load', checkReveal);
  checkReveal();
})();
</script>
`;

// Magnetic button script
const MAGNETIC_SCRIPT = `
<script>
// Magnetic Buttons
(function() {
  const buttons = document.querySelectorAll('.magnetic-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
})();
</script>
`;

// Text scramble script
const TEXT_SCRAMBLE_SCRIPT = `
<script>
// Text Scramble Effect
(function() {
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\\\/[]{}--=+*^?#________';
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];
      
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    
    update() {
      let output = '';
      let complete = 0;
      
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += \`<span style="color: var(--primary)">\${char}</span>\`;
        } else {
          output += from;
        }
      }
      
      this.el.innerHTML = output;
      
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }
  
  document.querySelectorAll('.scramble').forEach(el => {
    const fx = new TextScramble(el);
    const text = el.innerText;
    let counter = 0;
    
    const run = () => {
      fx.setText(text).then(() => {
        setTimeout(run, 3000);
      });
    };
    
    run();
  });
})();
</script>
`;

// Count up animation script
const COUNT_UP_SCRIPT = `
<script>
// Count Up Animation
(function() {
  const counters = document.querySelectorAll('.count-up');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const update = () => {
      current += step;
      if (current < target) {
        counter.innerText = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          update();
          observer.unobserve(counter);
        }
      });
    });
    
    observer.observe(counter);
  });
})();
</script>
`;

/**
 * Generate color palette from primary color
 */
function generateColors(primaryColor) {
  // Convert hex to RGB
  const hex = primaryColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Generate secondary (complementary)
  const sr = 255 - r;
  const sg = 255 - g;
  const sb = 255 - b;

  // Generate accent (analogous)
  const ar = Math.min(255, r + 50);
  const ag = Math.min(255, g + 30);
  const ab = Math.min(255, b + 70);

  return {
    primary: primaryColor,
    secondary: `#${sr.toString(16).padStart(2, '0')}${sg.toString(16).padStart(2, '0')}${sb.toString(16).padStart(2, '0')}`,
    accent: `#${ar.toString(16).padStart(2, '0')}${ag.toString(16).padStart(2, '0')}${ab.toString(16).padStart(2, '0')}`,
    primaryRgb: `${r}, ${g}, ${b}`,
    secondaryRgb: `${sr}, ${sg}, ${sb}`
  };
}

/**
 * Generate website HTML
 */
function generateWebsite(options) {
  const { customData, template, websiteId } = options;

  const name = customData.name || 'Shadow';
  const email = customData.email || 'contact@shadow.dev';
  const title = customData.title || template.name;
  const description = customData.description || template.description;
  const primaryColor = customData.color || '#6366f1';

  const colors = generateColors(primaryColor);
  const animations = template.animations || ['fadeIn', 'slideUp'];

  // Build animation classes
  const animClasses = animations.map((a, i) => `animate-${a} delay-${i + 1}`).join(' ');

  // Generate features HTML
  const features = template.features || ['Responsive', 'SEO Optimized', 'Fast Loading', 'Customizable'];
  const featuresHtml = features.map((f, i) => `
    <div class="card reveal" style="transition-delay: ${i * 0.1}s">
      <div class="feature-icon">${i + 1}</div>
      <h3>${f}</h3>
      <p>Premium ${f.toLowerCase()} features for your ${template.category.toLowerCase()} website.</p>
    </div>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${name}</title>
  <meta name="description" content="${description}">
  <meta name="author" content="${name}">
  <meta name="keywords" content="${template.category.toLowerCase()}, ${name.toLowerCase()}, website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌑</text></svg>">
  <style>
    ${ANIMATION_CSS}
    ${BASE_CSS}
    
    :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --primary-rgb: ${colors.primaryRgb};
      --secondary-rgb: ${colors.secondaryRgb};
    }
    
    /* Template Specific Styles */
    .hero { background: linear-gradient(135deg, var(--dark) 0%, rgba(var(--primary-rgb), 0.1) 100%); }
    
    .stats-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      padding: 60px 0;
    }
    
    .stat-item {
      text-align: center;
      padding: 30px;
    }
    
    .stat-number {
      font-size: 3rem;
      font-weight: 800;
      color: var(--primary);
    }
    
    .stat-label {
      color: var(--gray);
      margin-top: 10px;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
    }
    
    .service-card {
      padding: 40px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      transition: all 0.4s ease;
    }
    
    .service-card:hover {
      transform: translateY(-10px);
      border-color: var(--primary);
      background: rgba(var(--primary-rgb), 0.05);
    }
    
    .service-icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }
    
    .testimonials {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
    }
    
    .testimonial-card {
      padding: 30px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.03);
      border-left: 4px solid var(--primary);
    }
    
    .testimonial-text {
      font-style: italic;
      margin-bottom: 20px;
      line-height: 1.8;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .author-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    
    .contact-form {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .form-group {
      margin-bottom: 25px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: var(--gray);
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 15px 20px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      color: var(--light);
      font-size: 1rem;
      transition: all 0.3s;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
    }
    
    .pricing-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
      align-items: start;
    }
    
    .pricing-card {
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      transition: all 0.4s ease;
    }
    
    .pricing-card.featured {
      border: 2px solid var(--primary);
      transform: scale(1.05);
    }
    
    .pricing-card:hover {
      transform: translateY(-10px);
    }
    
    .pricing-card.featured:hover {
      transform: scale(1.05) translateY(-10px);
    }
    
    .price {
      font-size: 3.5rem;
      font-weight: 800;
      color: var(--primary);
      margin: 20px 0;
    }
    
    .price-features {
      list-style: none;
      margin: 30px 0;
    }
    
    .price-features li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .gallery-item {
      aspect-ratio: 1;
      border-radius: 16px;
      background: var(--gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      transition: all 0.4s ease;
      cursor: pointer;
      overflow: hidden;
    }
    
    .gallery-item:hover {
      transform: scale(1.05);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .timeline {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 100%;
      background: var(--gradient);
    }
    
    .timeline-item {
      display: flex;
      justify-content: flex-end;
      padding-right: 50%;
      position: relative;
      margin-bottom: 50px;
    }
    
    .timeline-item:nth-child(even) {
      justify-content: flex-start;
      padding-right: 0;
      padding-left: 50%;
    }
    
    .timeline-content {
      background: rgba(255, 255, 255, 0.05);
      padding: 25px;
      border-radius: 16px;
      max-width: 350px;
      position: relative;
    }
    
    .timeline-dot {
      position: absolute;
      width: 16px;
      height: 16px;
      background: var(--primary);
      border-radius: 50%;
      top: 25px;
    }
    
    .timeline-item:nth-child(odd) .timeline-dot { right: -8px; }
    .timeline-item:nth-child(even) .timeline-dot { left: -8px; }
    
    .cta-section {
      text-align: center;
      padding: 100px 0;
      background: var(--gradient);
      position: relative;
      overflow: hidden;
    }
    
    .cta-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    
    .cta-section h2,
    .cta-section p {
      position: relative;
      z-index: 1;
    }
    
    .cta-section .btn {
      background: white;
      color: var(--primary);
      position: relative;
      z-index: 1;
    }
    
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .team-member {
      text-align: center;
      padding: 30px;
    }
    
    .member-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: var(--gradient);
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
    }
    
    .skills-bar {
      margin: 15px 0;
    }
    
    .skill-track {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    
    .skill-fill {
      height: 100%;
      background: var(--gradient);
      border-radius: 4px;
      transition: width 1.5s ease;
    }
    
    .portfolio-filter {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 10px 25px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50px;
      color: var(--light);
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
      background: var(--primary);
      border-color: var(--primary);
    }
    
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: var(--gradient);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s;
      z-index: 999;
    }
    
    .back-to-top.visible {
      opacity: 1;
    }
    
    .back-to-top:hover {
      transform: translateY(-5px);
    }
  </style>
</head>
<body>
  <!-- Particle Canvas -->
  <canvas id="particle-canvas" style="position:fixed;inset:0;z-index:0;pointer-events:none;"></canvas>

  <!-- Navigation -->
  <nav class="navbar animate-fadeIn">
    <div class="nav-container">
      <a href="#" class="logo">${name}</a>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero" id="home">
    <div class="hero-bg"></div>
    <div class="hero-content">
      <h1 class="${animClasses}">
        <span class="gradient-text">${title}</span>
      </h1>
      <p class="animate-fadeIn delay-3">${description}</p>
      <div class="hero-buttons">
        <a href="#contact" class="btn animate-slideUp delay-4 magnetic-btn">Get Started</a>
        <a href="#about" class="btn btn-outline animate-slideUp delay-5 magnetic-btn">Learn More</a>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="section">
    <div class="container">
      <div class="stats-bar">
        <div class="stat-item reveal">
          <div class="stat-number count-up" data-target="500">0</div>
          <div class="stat-label">Projects Completed</div>
        </div>
        <div class="stat-item reveal">
          <div class="stat-number count-up" data-target="100">0</div>
          <div class="stat-label">Happy Clients</div>
        </div>
        <div class="stat-item reveal">
          <div class="stat-number count-up" data-target="50">0</div>
          <div class="stat-label">Awards Won</div>
        </div>
        <div class="stat-item reveal">
          <div class="stat-number count-up" data-target="10">0</div>
          <div class="stat-label">Years Experience</div>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="section" id="about" style="background: rgba(255,255,255,0.02);">
    <div class="container">
      <h2 class="section-title reveal">About <span class="gradient-text">${name}</span></h2>
      <p class="section-subtitle reveal">${description}</p>
      <div class="grid grid-2">
        <div class="card reveal tilt-3d">
          <div class="feature-icon">🎯</div>
          <h3>Our Mission</h3>
          <p>To deliver exceptional ${template.category.toLowerCase()} solutions that exceed expectations and drive real results for our clients.</p>
        </div>
        <div class="card reveal tilt-3d" style="transition-delay: 0.2s">
          <div class="feature-icon">👁️</div>
          <h3>Our Vision</h3>
          <p>To become the leading ${template.category.toLowerCase()} provider, known for innovation, quality, and customer satisfaction.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="section" id="services">
    <div class="container">
      <h2 class="section-title reveal">Our <span class="gradient-text">Services</span></h2>
      <p class="section-subtitle reveal">Comprehensive solutions tailored to your needs</p>
      <div class="services-grid">
        <div class="service-card reveal">
          <div class="service-icon">⚡</div>
          <h3>Fast Performance</h3>
          <p>Lightning-fast loading speeds and optimized performance for the best user experience.</p>
        </div>
        <div class="service-card reveal" style="transition-delay: 0.1s">
          <div class="service-icon">🎨</div>
          <h3>Custom Design</h3>
          <p>Unique, eye-catching designs that perfectly represent your brand and captivate visitors.</p>
        </div>
        <div class="service-card reveal" style="transition-delay: 0.2s">
          <div class="service-icon">📱</div>
          <h3>Fully Responsive</h3>
          <p>Perfect display on all devices - from mobile phones to large desktop screens.</p>
        </div>
        <div class="service-card reveal" style="transition-delay: 0.3s">
          <div class="service-icon">🔒</div>
          <h3>Secure & Reliable</h3>
          <p>Top-notch security measures and reliable hosting for peace of mind.</p>
        </div>
        <div class="service-card reveal" style="transition-delay: 0.4s">
          <div class="service-icon">🚀</div>
          <h3>SEO Optimized</h3>
          <p>Better search engine rankings with our SEO-friendly development practices.</p>
        </div>
        <div class="service-card reveal" style="transition-delay: 0.5s">
          <div class="service-icon">💬</div>
          <h3>24/7 Support</h3>
          <p>Round-the-clock customer support to assist you whenever you need help.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section class="section" id="portfolio" style="background: rgba(255,255,255,0.02);">
    <div class="container">
      <h2 class="section-title reveal">Our <span class="gradient-text">Work</span></h2>
      <p class="section-subtitle reveal">Check out some of our recent projects</p>
      <div class="portfolio-filter reveal">
        <button class="filter-btn active">All</button>
        <button class="filter-btn">Web</button>
        <button class="filter-btn">App</button>
        <button class="filter-btn">Brand</button>
      </div>
      <div class="gallery">
        <div class="gallery-item reveal">🎨</div>
        <div class="gallery-item reveal" style="transition-delay: 0.1s">💻</div>
        <div class="gallery-item reveal" style="transition-delay: 0.2s">📱</div>
        <div class="gallery-item reveal" style="transition-delay: 0.3s">🚀</div>
        <div class="gallery-item reveal" style="transition-delay: 0.4s">⚡</div>
        <div class="gallery-item reveal" style="transition-delay: 0.5s">🎯</div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section class="section">
    <div class="container">
      <h2 class="section-title reveal">Pricing <span class="gradient-text">Plans</span></h2>
      <p class="section-subtitle reveal">Choose the perfect plan for your needs</p>
      <div class="pricing-cards">
        <div class="pricing-card reveal">
          <h3>Starter</h3>
          <div class="price">$29</div>
          <ul class="price-features">
            <li>✓ 5 Pages</li>
            <li>✓ Basic SEO</li>
            <li>✓ Mobile Responsive</li>
            <li>✓ Contact Form</li>
            <li>✗ Custom Features</li>
          </ul>
          <a href="#contact" class="btn btn-outline">Get Started</a>
        </div>
        <div class="pricing-card featured reveal" style="transition-delay: 0.2s">
          <h3>Professional</h3>
          <div class="price">$79</div>
          <ul class="price-features">
            <li>✓ 15 Pages</li>
            <li>✓ Advanced SEO</li>
            <li>✓ Mobile Responsive</li>
            <li>✓ Contact Form</li>
            <li>✓ Custom Features</li>
          </ul>
          <a href="#contact" class="btn">Get Started</a>
        </div>
        <div class="pricing-card reveal" style="transition-delay: 0.4s">
          <h3>Enterprise</h3>
          <div class="price">$199</div>
          <ul class="price-features">
            <li>✓ Unlimited Pages</li>
            <li>✓ Premium SEO</li>
            <li>✓ Mobile Responsive</li>
            <li>✓ Advanced Forms</li>
            <li>✓ Full Customization</li>
          </ul>
          <a href="#contact" class="btn btn-outline">Contact Us</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="section" style="background: rgba(255,255,255,0.02);">
    <div class="container">
      <h2 class="section-title reveal">What Clients <span class="gradient-text">Say</span></h2>
      <p class="section-subtitle reveal">Testimonials from our satisfied customers</p>
      <div class="testimonials">
        <div class="testimonial-card reveal">
          <p class="testimonial-text">"Working with ${name} was an incredible experience. They delivered beyond our expectations with amazing attention to detail."</p>
          <div class="testimonial-author">
            <div class="author-avatar">JD</div>
            <div>
              <strong>John Doe</strong>
              <p style="color: var(--gray); font-size: 0.9rem;">CEO, TechCorp</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal" style="transition-delay: 0.2s">
          <p class="testimonial-text">"The best ${template.category.toLowerCase()} service we've ever used. Professional, creative, and always on time. Highly recommended!"</p>
          <div class="testimonial-author">
            <div class="author-avatar">AS</div>
            <div>
              <strong>Alice Smith</strong>
              <p style="color: var(--gray); font-size: 0.9rem;">Director, Creative Agency</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card reveal" style="transition-delay: 0.4s">
          <p class="testimonial-text">"Outstanding results! Our conversion rate increased by 150% after launching the new website. Simply amazing work!"</p>
          <div class="testimonial-author">
            <div class="author-avatar">MJ</div>
            <div>
              <strong>Michael Johnson</strong>
              <p style="color: var(--gray); font-size: 0.9rem;">Founder, StartupX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Team Section -->
  <section class="section">
    <div class="container">
      <h2 class="section-title reveal">Meet Our <span class="gradient-text">Team</span></h2>
      <p class="section-subtitle reveal">Talented professionals behind our success</p>
      <div class="team-grid">
        <div class="team-member reveal">
          <div class="member-avatar">👨‍💼</div>
          <h3>Alex Chen</h3>
          <p style="color: var(--primary);">Founder & CEO</p>
          <p style="color: var(--gray); font-size: 0.9rem;">Visionary leader with 10+ years of experience</p>
        </div>
        <div class="team-member reveal" style="transition-delay: 0.1s">
          <div class="member-avatar">👩‍🎨</div>
          <h3>Sarah Williams</h3>
          <p style="color: var(--primary);">Creative Director</p>
          <p style="color: var(--gray); font-size: 0.9rem;">Award-winning designer and artist</p>
        </div>
        <div class="team-member reveal" style="transition-delay: 0.2s">
          <div class="member-avatar">👨‍💻</div>
          <h3>David Park</h3>
          <p style="color: var(--primary);">Lead Developer</p>
          <p style="color: var(--gray); font-size: 0.9rem;">Full-stack expert and tech enthusiast</p>
        </div>
        <div class="team-member reveal" style="transition-delay: 0.3s">
          <div class="member-avatar">👩‍💼</div>
          <h3>Emma Davis</h3>
          <p style="color: var(--primary);">Marketing Head</p>
          <p style="color: var(--gray); font-size: 0.9rem;">Growth hacker and brand strategist</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="container">
      <h2 class="animate-zoomIn">Ready to Get Started?</h2>
      <p class="animate-fadeIn delay-2" style="margin: 20px 0 40px; font-size: 1.2rem;">Let's create something amazing together!</p>
      <a href="#contact" class="btn animate-bounceIn delay-3 magnetic-btn" style="font-size: 1.1rem; padding: 16px 40px;">Start Your Project</a>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="section" id="contact" style="background: rgba(255,255,255,0.02);">
    <div class="container">
      <h2 class="section-title reveal">Get In <span class="gradient-text">Touch</span></h2>
      <p class="section-subtitle reveal">We'd love to hear from you</p>
      <div class="grid grid-2">
        <div class="reveal">
          <h3 style="margin-bottom: 30px;">Contact Information</h3>
          <p style="margin-bottom: 20px;">📧 ${email}</p>
          <p style="margin-bottom: 20px;">🌐 ${config.deployment.baseUrl}</p>
          <p style="margin-bottom: 30px;">📍 Your Location Here</p>
          <div class="social-links" style="justify-content: flex-start;">
            <a href="#">f</a>
            <a href="#">t</a>
            <a href="#">in</a>
            <a href="#">ig</a>
          </div>
        </div>
        <div class="contact-form reveal" style="transition-delay: 0.2s">
          <form onsubmit="event.preventDefault(); alert('Thank you! We will contact you soon.');">
            <div class="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Enter your name" required>
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
              <label>Subject</label>
              <input type="text" placeholder="How can we help?">
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Tell us about your project..." required></textarea>
            </div>
            <button type="submit" class="btn magnetic-btn" style="width: 100%;">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p class="footer-text">© 2024 ${name}. All rights reserved. | Built with Shadow Dev Bot 🌑</p>
      <div class="social-links">
        <a href="#">f</a>
        <a href="#">t</a>
        <a href="#">in</a>
        <a href="#">ig</a>
      </div>
      <p style="color: var(--gray); font-size: 0.85rem;">Powered by Shadow Dev Bot</p>
    </div>
  </footer>

  <!-- Back to Top -->
  <div class="back-to-top" id="backToTop" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">↑</div>

  <!-- Scripts -->
  ${PARTICLE_SCRIPT}
  ${SCROLL_REVEAL_SCRIPT}
  ${MAGNETIC_SCRIPT}
  ${TEXT_SCRAMBLE_SCRIPT}
  ${COUNT_UP_SCRIPT}

  <script>
    // Back to Top Button
    (function() {
      const btn = document.getElementById('backToTop');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });
    })();

    // Smooth Scroll
    (function() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    })();

    // Active Navigation
    (function() {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a');
      
      window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--primary)';
          }
        });
      });
    })();

    // Portfolio Filter
    (function() {
      const filterBtns = document.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    })();

    // Loading Animation
    window.addEventListener('load', () => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });
  </script>
</body>
</html>`;

  return html;
}

module.exports = {
  generateWebsite,
  generateColors,
  ANIMATION_CSS,
  BASE_CSS
};
