// Interactive features: explore chips, play tab, scroll reveals, cursor glow

const EXPLORE_TOPICS = {
  design: {
    title: 'Design',
    body: 'Figma is my go-to. I love turning messy ideas into polished flows and testing them with real people.',
  },
  code: {
    title: 'Code',
    body: 'React and TypeScript are in heavy rotation. Right now I\'m diving into PyTorch, AI/ML, and Rust.',
  },
  impact: {
    title: 'Social impact',
    body: 'A lot of my projects start with "who does this help?" Tech should feel useful, not just flashy.',
  },
  skating: {
    title: 'Figure skating',
    body: 'I\'m on Waterloo\'s varsity figure skating team. Ice time = my favorite kind of problem-solving.',
  },
  music: {
    title: 'Music',
    body: 'Concerts and festivals are my happy place. Osheaga in Montreal? Already a core memory.',
  },
};

const SOPHIA_FACTS = [
  'Systems Design Engineering student at the University of Waterloo.',
  'Varsity figure skater. Ice time is non-negotiable.',
  'Live music lover. Festivals like Osheaga are a whole mood.',
  'Usually building with React, Figma, and a very large coffee.',
  'Exploring AI/ML with PyTorch and curious about Rust.',
  'I care most about projects with real social impact.',
  'Soft skills I\'m proud of: curious, communicative, and team-oriented.',
  'Click the floating icons on any page. They\'re secretly playful.',
];

const MOOD_THEMES = {
  blush: {
    '--background': '#fef5f8',
    '--primary': '#e91e8c',
    '--muted': '#fce4ec',
    '--border': 'rgba(233, 30, 140, 0.15)',
    '--accent': '#c9a0dc',
  },
  mint: {
    '--background': '#f0faf9',
    '--primary': '#5eb8b0',
    '--muted': '#e0f5f3',
    '--border': 'rgba(94, 184, 176, 0.2)',
    '--accent': '#a7d8de',
  },
  lavender: {
    '--background': '#f8f4fc',
    '--primary': '#9b6db8',
    '--muted': '#ede4f5',
    '--border': 'rgba(155, 109, 184, 0.2)',
    '--accent': '#c9a0dc',
  },
  sunset: {
    '--background': '#fff8f5',
    '--primary': '#e87d5a',
    '--muted': '#ffe8df',
    '--border': 'rgba(232, 125, 90, 0.2)',
    '--accent': '#ffb3ba',
  },
};

const SKILL_TIPS = {
  React: 'Built portfolio UIs and project frontends with component-driven workflows.',
  TypeScript: 'Types save me from my own 2 a.m. coding decisions.',
  'Tailwind CSS': 'Utility-first styling for fast iteration and clean layouts.',
  Figma: 'Wireframes → hi-fi mocks → prototypes, all in one place.',
  Python: 'Scripts, data, and ML experiments.',
  PyTorch: 'Currently learning. Neural nets are fascinating.',
  Git: 'Version control for every team project, no exceptions.',
};

let selectedSticker = null;
let factSpinning = false;

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCursorGlow();
  initExploreChips();
  initMoodStudio();
  initFactSpinner();
  initStickerBoard();
  initSkillTags();
  document.querySelectorAll('[data-goto-play]').forEach((el) => {
    el.addEventListener('click', () => {
      if (typeof switchTab === 'function') switchTab('play');
    });
  });
});

function initExploreChips() {
  const result = document.getElementById('explore-result');
  if (!result) return;

  document.querySelectorAll('.explore-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const topic = chip.getAttribute('data-topic');
      const data = EXPLORE_TOPICS[topic];
      if (!data) return;

      document.querySelectorAll('.explore-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      result.classList.remove('explore-result-pop');
      void result.offsetWidth;
      result.classList.add('explore-result-pop');
      result.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
    });
  });
}

function initMoodStudio() {
  const saved = localStorage.getItem('site-mood');
  if (saved && MOOD_THEMES[saved]) {
    applyMood(saved, false);
    document.querySelectorAll('.mood-card').forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-mood') === saved);
    });
  }

  document.querySelectorAll('.mood-card').forEach((card) => {
    card.addEventListener('click', () => {
      const mood = card.getAttribute('data-mood');
      applyMood(mood, true);
      document.querySelectorAll('.mood-card').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

function applyMood(mood, save) {
  const theme = MOOD_THEMES[mood];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => root.style.setProperty(key, value));
  root.setAttribute('data-mood', mood);
  if (save) localStorage.setItem('site-mood', mood);
}

function initFactSpinner() {
  const btn = document.getElementById('fact-spin-btn');
  const display = document.getElementById('fact-display');
  if (!btn || !display) return;

  btn.addEventListener('click', () => {
    if (factSpinning) return;
    factSpinning = true;
    btn.disabled = true;
    btn.classList.add('spinning');

    let ticks = 0;
    const maxTicks = 18;
    const interval = setInterval(() => {
      const fact = SOPHIA_FACTS[Math.floor(Math.random() * SOPHIA_FACTS.length)];
      display.innerHTML = `<p class="fact-tick">${fact}</p>`;
      display.classList.add('fact-shuffle');
      ticks += 1;

      if (ticks >= maxTicks) {
        clearInterval(interval);
        const finalFact = SOPHIA_FACTS[Math.floor(Math.random() * SOPHIA_FACTS.length)];
        display.classList.remove('fact-shuffle');
        display.classList.add('fact-landed');
        display.innerHTML = `<p>${finalFact}</p>`;
        burstConfetti(btn);
        factSpinning = false;
        btn.disabled = false;
        btn.classList.remove('spinning');
        setTimeout(() => display.classList.remove('fact-landed'), 600);
      }
    }, 80);
  });
}

function initStickerBoard() {
  const board = document.getElementById('sticker-board');
  const clearBtn = document.getElementById('sticker-clear');
  if (!board) return;

  document.querySelectorAll('.sticker-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedSticker = btn.getAttribute('data-sticker');
      document.querySelectorAll('.sticker-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      board.classList.add('sticker-board-ready');
    });
  });

  board.addEventListener('click', (e) => {
    if (!selectedSticker || e.target.closest('.placed-sticker')) return;
    const rect = board.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    placeSticker(board, selectedSticker, x, y);
    const hint = board.querySelector('.sticker-board-hint');
    if (hint) hint.style.display = 'none';
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      board.querySelectorAll('.placed-sticker').forEach((el) => el.remove());
      const hint = board.querySelector('.sticker-board-hint');
      if (hint) hint.style.display = '';
      board.classList.remove('sticker-board-ready');
    });
  }
}

function placeSticker(board, emoji, x, y) {
  const el = document.createElement('span');
  el.className = 'placed-sticker';
  el.textContent = emoji;
  el.style.left = `${Math.min(92, Math.max(4, x))}%`;
  el.style.top = `${Math.min(88, Math.max(8, y))}%`;
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', 'Placed sticker');
  makeDraggable(el);
  board.appendChild(el);
  el.animate(
    [{ transform: 'scale(0) rotate(-20deg)' }, { transform: 'scale(1.2) rotate(8deg)' }, { transform: 'scale(1) rotate(0deg)' }],
    { duration: 350, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
  );
}

function makeDraggable(el) {
  let startX;
  let startY;
  let origLeft;
  let origTop;

  const onPointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const parent = el.parentElement;
    if (!parent) return;
    el.setPointerCapture(e.pointerId);
    el.classList.add('dragging');
    const rect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    origLeft = ((elRect.left + elRect.width / 2 - rect.left) / rect.width) * 100;
    origTop = ((elRect.top + elRect.height / 2 - rect.top) / rect.height) * 100;

    const onMove = (ev) => {
      const dx = ((ev.clientX - startX) / rect.width) * 100;
      const dy = ((ev.clientY - startY) / rect.height) * 100;
      el.style.left = `${Math.min(92, Math.max(4, origLeft + dx))}%`;
      el.style.top = `${Math.min(88, Math.max(8, origTop + dy))}%`;
    };

    const onUp = () => {
      el.classList.remove('dragging');
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
  };

  el.addEventListener('pointerdown', onPointerDown);
}

function initSkillTags() {
  document.querySelectorAll('.skill-card li').forEach((li) => {
    const name = li.textContent.replace(/^\s*/, '').trim();
    const tip = SKILL_TIPS[name];
    if (!tip) return;
    li.classList.add('skill-tag');
    li.setAttribute('tabindex', '0');
    li.setAttribute('role', 'button');
    li.setAttribute('aria-label', `${name}: ${tip}`);

    const showTip = () => {
      document.querySelectorAll('.skill-tag.active').forEach((t) => {
        if (t !== li) t.classList.remove('active');
      });
      li.classList.toggle('active');
      let pop = li.querySelector('.skill-tip-pop');
      if (li.classList.contains('active')) {
        if (!pop) {
          pop = document.createElement('span');
          pop.className = 'skill-tip-pop';
          pop.textContent = tip;
          li.appendChild(pop);
        }
      } else if (pop) {
        pop.remove();
      }
    };

    li.addEventListener('click', showTip);
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showTip();
      }
    });
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) {
    if (glow) glow.style.display = 'none';
    return;
  }

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let targetX = x;
  let targetY = y;

  document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function tick() {
    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    glow.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(tick);
  }
  tick();
}

function burstConfetti(originEl) {
  const rect = originEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ['#e91e8c', '#c9a0dc', '#a7d8de', '#ffb3ba', '#f9e4b7', '#5eb8b0'];

  for (let i = 0; i < 24; i++) {
    const p = document.createElement('span');
    p.className = 'confetti-particle';
    p.style.left = `${cx}px`;
    p.style.top = `${cy}px`;
    p.style.background = colors[i % colors.length];
    const angle = (Math.PI * 2 * i) / 24 + Math.random() * 0.5;
    const dist = 60 + Math.random() * 80;
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist - 40}px`);
    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}
