// Tab Navigation
let activeTab = 'home';

function switchTab(tab) {
  activeTab = tab;
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  const selectedPage = document.getElementById(`page-${tab}`);
  if (selectedPage) {
    selectedPage.classList.add('active');
    selectedPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Reset typing animation when returning to home page
    if (tab === 'home') {
      resetTypingAnimation();
    } else {
      // Trigger page title typing animation
      initPageTitleTyping(tab);
    }
  }
  
  // Update navigation tabs
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeBtn = document.querySelector(`[data-tab="${tab}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }
}

// Typing Animation - Generic function
function typeText(elementId, text, delay = 500, speed = 100, hideCursor = false) {
  const typingElement = document.getElementById(elementId);
  if (!typingElement) return;
  
  // Find the cursor element (should be a sibling span with typing-cursor class)
  const cursorElement = typingElement.nextElementSibling;
  
  let index = 0;
  typingElement.textContent = '';
  
  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else {
      // Hide cursor after typing is complete
      if (hideCursor && cursorElement && cursorElement.classList.contains('typing-cursor')) {
        cursorElement.style.opacity = '0';
      }
    }
  }
  
  // Show cursor if it was hidden
  if (cursorElement && cursorElement.classList.contains('typing-cursor')) {
    cursorElement.style.opacity = '1';
  }
  
  setTimeout(type, delay);
}

// Home page typing animation
function initTypingAnimation() {
  typeText('typing-text', "Hello! I'm...", 500, 100);
}

function resetTypingAnimation() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  typingElement.textContent = '';
  initTypingAnimation();
}

// Page title typing animations
function initPageTitleTyping(page) {
  const pageTexts = {
    'experience': 'Experience',
    'projects': 'Projects',
    'resume': 'Resume'
  };
  
  const elementId = `typing-${page}`;
  const text = pageTexts[page];
  
  if (text && document.getElementById(elementId)) {
    // Reset first
    document.getElementById(elementId).textContent = '';
    // Then type (hide cursor after completion)
    typeText(elementId, text, 300, 80, true);
  }
}

// Initialize typing animations on page load if a page is already active
function initPageTypingOnLoad() {
  const activePage = document.querySelector('.page.active');
  if (activePage) {
    const pageId = activePage.id.replace('page-', '');
    if (pageId !== 'home') {
      initPageTitleTyping(pageId);
    }
  }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  // Set up navigation buttons
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchTab(tab);
    });
  });
  
  // Initialize floating elements
  initFloatingElements();
  
  // Initialize typing animation
  initTypingAnimation();
  
  // Initialize page title typing if on a page other than home
  initPageTypingOnLoad();
});

// Floating Elements
const icons = [
  'heart', 'star', 'sparkles', 'coffee', 'music', 'laptop', 'paintbrush', 'iceskate', 'piano', 'computer'
];

const colors = [
  '#e91e8c', // primary pink
  '#c9a0dc', // lavender
  '#a7d8de', // mint
  '#ffb3ba', // peach
  '#ff88c1', // rose
  '#f9e4b7', // lemon
];

const iconSVGs = {
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364 6.364l-2.121-2.121M6.757 6.757L4.636 4.636m14.728 0l-2.121 2.121M6.757 17.243l-2.121 2.121"></path></svg>',
  coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>',
  laptop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="12" rx="2" ry="2"></rect><line x1="2" y1="20" x2="22" y2="20"></line></svg>',
  paintbrush: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.37 2.63l3 3-9 9-3-3 9-9z"></path><path d="M9 11L3 17v4h4l6-6"></path><circle cx="11" cy="13" r="2"></circle></svg>',
  iceskate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z"></path><path d="M6 17V7a4 4 0 0 1 8 0v10"></path><path d="M14 17V12a2 2 0 0 1 4 0v5"></path><path d="M3 19h2"></path><path d="M19 19h2"></path></svg>',
  piano: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="14" rx="2"></rect><line x1="6" y1="6" x2="6" y2="14"></line><line x1="10" y1="6" x2="10" y2="14"></line><line x1="14" y1="6" x2="14" y2="14"></line><line x1="18" y1="6" x2="18" y2="14"></line><rect x="7" y="6" width="2" height="6" fill="currentColor"></rect><rect x="15" y="6" width="2" height="6" fill="currentColor"></rect></svg>',
  computer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>'
};

function initFloatingElements() {
  const container = document.getElementById('floating-elements');
  if (!container) return;
  
  const clickedIcons = new Set();
  
  // Create 15 floating icons
  for (let i = 0; i < 15; i++) {
    const icon = createFloatingIcon(i, clickedIcons);
    container.appendChild(icon);
  }
}

function createFloatingIcon(id, clickedIcons) {
  const iconName = icons[Math.floor(Math.random() * icons.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;
  const size = 24 + Math.random() * 24;
  const duration = 3 + Math.random() * 2;
  const xDuration = 4 + Math.random() * 2;
  
  const iconDiv = document.createElement('div');
  iconDiv.className = 'floating-icon';
  iconDiv.style.left = `${initialX}%`;
  iconDiv.style.top = `${initialY}%`;
  iconDiv.style.color = color;
  iconDiv.style.width = `${size}px`;
  iconDiv.style.height = `${size}px`;
  iconDiv.innerHTML = iconSVGs[iconName];
  
  // Add animation
  iconDiv.style.animation = `float ${duration}s ease-in-out infinite, floatX ${xDuration}s ease-in-out infinite`;
  
  // Add click handler
  iconDiv.addEventListener('click', () => {
    if (clickedIcons.has(id)) {
      clickedIcons.delete(id);
      iconDiv.style.transform = 'scale(1) rotate(0deg)';
      iconDiv.style.filter = 'none';
    } else {
      clickedIcons.add(id);
      iconDiv.style.transform = 'scale(1.5) rotate(360deg)';
      iconDiv.style.filter = 'drop-shadow(0 0 20px currentColor)';
    }
  });
  
  // Hover effect
  iconDiv.addEventListener('mouseenter', () => {
    iconDiv.style.transform = 'scale(1.3)';
  });
  
  iconDiv.addEventListener('mouseleave', () => {
    if (!clickedIcons.has(id)) {
      iconDiv.style.transform = 'scale(1)';
    }
  });
  
  return iconDiv;
}

// Add CSS animations for floating elements
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-30px);
    }
  }
  
  @keyframes floatX {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(15px);
    }
    75% {
      transform: translateX(-15px);
    }
  }
  
  .floating-icon {
    transition: transform 0.3s ease, filter 0.5s ease;
  }
`;
document.head.appendChild(style);

// Resume Download Handler
function downloadResume() {
  alert('Resume download started! (In production, this would download your actual resume PDF)');
  // In a real application, you would trigger an actual download here
  // window.location.href = '/resume.pdf';
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
