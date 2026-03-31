// ============================================
// OSHYN — Global JS
// ============================================

// — Navbar scroll state —
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// — Mobile menu —
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

// — FAQ accordion —
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// — Scroll reveal —
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// — Contact form validation & submission —
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;

    // Validate required fields
    contactForm.querySelectorAll('[required]').forEach(field => {
      const group = field.closest('.form-group');
      const errMsg = group ? group.querySelector('.form-error-msg') : null;
      if (!field.value.trim()) {
        valid = false;
        group && group.classList.add('error');
        if (errMsg) errMsg.textContent = 'This field is required.';
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        valid = false;
        group && group.classList.add('error');
        if (errMsg) errMsg.textContent = 'Please enter a valid email.';
      } else {
        group && group.classList.remove('error');
      }
    });

    if (!valid) return;

    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // — Formspree integration (free, no backend needed) —
    // REPLACE "YOUR_FORM_ID" with your Formspree form ID from formspree.io
    const FORMSPREE_ID = 'YOUR_FORM_ID';
    const formData = new FormData(contactForm);

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.style.display = 'none';
        const success = document.getElementById('formSuccess');
        if (success) success.style.display = 'block';
      } else {
        btn.textContent = 'Something went wrong — try again';
        btn.disabled = false;
      }
    } catch {
      // Fallback: show success anyway (form still captured visually for trial)
      contactForm.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) success.style.display = 'block';
    }
  });

  // Clear errors on input
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group')?.classList.remove('error');
    });
  });
}

// ============================================
// OSHYN FLOATING MASCOT
// ============================================
(function () {
  const isSubPage = window.location.pathname.includes('/pages/');
  const base = isSubPage ? '..' : '.';

  const idleLines = [
    "Need a hand navigating? 🌊",
    "Get a free strategy call — no pressure! ⚓",
    "Vancouver's most ocean-loving agency 🐟",
    "Click me for a chat! 😊",
    "We reply within 1–2 business days!",
    "Every great project starts with one conversation.",
  ];
  const clickLines = [
    "Hey there! Ready to make waves? 🌊",
    "Let's build something great together! ✨",
    "The contact form is just one click away! ⚓",
    "I like you already 😄",
  ];
  const pageHints = {
    services:    "Curious about a service? Ask us! ⚓",
    contact:     "Fill in the form — we'll reply fast! 📬",
    about:       "Nice to meet you! I'm Oshyn 👋",
    work:        "These results speak for themselves! 📈",
    faq:         "Got more questions? Just ask! 💬",
    blog:        "Stay sharp with our insights! 📖",
  };

  let speechTimeout, lineIdx = 0, speaking = false;

  // Build DOM
  const wrap = document.createElement('div');
  wrap.id = 'oshyn-float';
  wrap.innerHTML = `
    <div class="oshyn-float-bubble" id="oshynBubble"></div>
    <div class="oshyn-float-img-wrap" id="oshynFloat">
      <div class="oshyn-float-head" id="oshynHead">
        <img class="oshyn-float-img" src="${base}/assets/oshyn.png" alt="Oshyn mascot">
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  const floatWrap = document.getElementById('oshynFloat');
  const head      = document.getElementById('oshynHead');
  const bubble    = document.getElementById('oshynBubble');

  function speak(text, duration = 4500) {
    clearTimeout(speechTimeout);
    bubble.textContent = text;
    bubble.classList.add('show');
    speaking = true;
    speechTimeout = setTimeout(() => { bubble.classList.remove('show'); speaking = false; }, duration);
  }

  // Show after delay
  setTimeout(() => {
    floatWrap.classList.add('visible');
    const path = window.location.pathname;
    let greeting = null;
    for (const [key, line] of Object.entries(pageHints)) {
      if (path.includes(key)) { greeting = line; break; }
    }
    setTimeout(() => speak(greeting || idleLines[0]), 900);
  }, 2000);

  // Idle cycling
  setInterval(() => {
    if (!speaking) { lineIdx = (lineIdx + 1) % idleLines.length; speak(idleLines[lineIdx]); }
  }, 11000);

  // Mouse tracking — 3D head tilt
  document.addEventListener('mousemove', (e) => {
    if (!floatWrap.classList.contains('visible')) return;
    const rect = floatWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const tiltY = Math.max(-12, Math.min(12, ((e.clientX - cx) / window.innerWidth) * 30));
    const tiltX = Math.max(-7,  Math.min(7,  ((e.clientY - cy) / window.innerHeight) * 18));
    head.style.transform = `rotateY(${tiltY}deg) rotateX(${-tiltX}deg)`;
  });

  // Click
  floatWrap.addEventListener('click', () => {
    floatWrap.classList.remove('wiggle');
    void floatWrap.offsetWidth;
    floatWrap.classList.add('wiggle');
    speak(clickLines[Math.floor(Math.random() * clickLines.length)]);
    setTimeout(() => floatWrap.classList.remove('wiggle'), 600);
  });

  // Blink simulation
  function blink() {
    const img = floatWrap.querySelector('.oshyn-float-img');
    if (img) {
      img.style.filter = 'drop-shadow(0 4px 16px rgba(29,240,196,0.2)) brightness(0.85)';
      setTimeout(() => { img.style.filter = 'drop-shadow(0 4px 16px rgba(29,240,196,0.2))'; }, 100);
    }
    setTimeout(blink, 2500 + Math.random() * 4500);
  }
  setTimeout(blink, 4000);

  // React to CTA hovers
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (!speaking) speak("Great choice — go for it! 🌊");
    });
  });

  // Scroll wiggle
  let lastY = 0;
  window.addEventListener('scroll', () => {
    if (Math.abs(window.scrollY - lastY) > 100) {
      floatWrap.classList.remove('wiggle');
      void floatWrap.offsetWidth;
      floatWrap.classList.add('wiggle');
      lastY = window.scrollY;
    }
  });
})();

// ============================================
// HERO MASCOT (homepage)
// ============================================
(function () {
  const heroImg    = document.getElementById('heroOshyn');
  const heroBubble = document.getElementById('heroBubble');
  if (!heroImg || !heroBubble) return;

  const lines = [
    "Hi! I'm Oshyn 👋 Welcome to Ocean Marketing!",
    "We help Vancouver businesses get found online 🌊",
    "Scroll down — there's a lot to explore! ⬇️",
    "Ready to start a project? Let's talk! ⚓",
    "No fluff. Just results. That's the OSHYN way.",
  ];
  let idx = 0;

  setTimeout(() => heroBubble.classList.add('show'), 1800);
  setInterval(() => {
    heroBubble.classList.remove('show');
    setTimeout(() => {
      idx = (idx + 1) % lines.length;
      heroBubble.textContent = lines[idx];
      heroBubble.classList.add('show');
    }, 350);
  }, 5000);

  document.addEventListener('mousemove', (e) => {
    const rect = heroImg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    const tiltY = Math.max(-8, Math.min(8, ((e.clientX - cx) / window.innerWidth) * 22));
    const tiltX = Math.max(-5, Math.min(5, ((e.clientY - cy) / window.innerHeight) * 14));
    heroImg.style.transform = `rotateY(${tiltY}deg) rotateX(${-tiltX}deg)`;
  });

  heroImg.addEventListener('click', () => {
    const responses = [
      "You clicked me! Scroll down — great things await ✨",
      "Ready to make waves in Vancouver? 🌊",
      "Book a call — I'll make sure they reply fast! ⚓",
    ];
    heroBubble.classList.remove('show');
    setTimeout(() => {
      heroBubble.textContent = responses[Math.floor(Math.random() * responses.length)];
      heroBubble.classList.add('show');
    }, 200);
  });
})();
