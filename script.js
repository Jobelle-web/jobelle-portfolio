document.addEventListener('DOMContentLoaded', () => {

  /* Year */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* Nav scroll state */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* Cursor glow (desktop only) */
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(min-width:1000px)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const skillFills = document.querySelectorAll('.skill-bar .fill');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(fill => fill.classList.add('animate'));
        skillsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) skillsObserver.observe(skillsSection);

  /* Testimonial carousel */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const slides = track ? Array.from(track.children) : [];
  let current = 0;
  let autoplay;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('button').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  if (slides.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => { goTo(i); restartAutoplay(); });
      dotsWrap.appendChild(dot);
    });

    function restartAutoplay() {
      clearInterval(autoplay);
      autoplay = setInterval(() => goTo(current + 1), 6000);
    }
    restartAutoplay();
  }

  /* Contact form (demo submission) */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      note.textContent = 'Sending...';

      setTimeout(() => {
        note.textContent = 'Thank you! Your message has been sent. I will get back to you within 24 hours.';
        form.reset();
        submitBtn.disabled = false;
      }, 900);
    });
  }

  /* Smooth anchor scroll offset for fixed nav (native scroll-behavior handles most; small enhancement) */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

});
