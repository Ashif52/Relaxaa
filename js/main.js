/* ═══════════════════════════════════════════
   RELAXAA — Main JavaScript
   Navigation, scroll reveals, global utilities
   ═══════════════════════════════════════════ */

// ─── Global Products Data Database for Search Autocomplete ───
window.productsDb = [
  {
    id: 1, name: 'Bamboo Viscose Bedsheet', category: 'bedsheets', price: 2999, image: 'bedsheets/slaapwijsheid-nl-miuVm8c557M-unsplash.jpg', badge: 'Bestseller',
    desc: 'Crafted from 100% bamboo viscose with TC-400 thread count. Cloud-like softness with natural temperature regulation.'
  },
  {
    id: 2, name: 'Geometric Cotton Spread', category: 'bedsheets', price: 2499, image: 'bedsheets/nilufar-nattaq-OJ3t25nsaHw-unsplash.jpg',
    desc: 'Bold geometric patterns on premium cotton. A modern statement piece for your bedroom.'
  },
  {
    id: 3, name: 'Christmas Edition Spread', category: 'bedsheets', price: 3499, image: 'bedsheets/toa-heftiba-BYsTPg84Yok-unsplash.jpg', badge: 'Limited',
    desc: 'Festive warmth meets Relaxaa quality. A seasonal favorite with traditional holiday patterns.'
  },
  {
    id: 4, name: 'Sage & Sand Bundle', category: 'bedsheets', price: 3999, image: 'bedsheets/simply-mersah-i4zvtUv-QEo-unsplash.jpg', badge: 'New',
    desc: 'A curated bundle of sage green and sand-toned sheets. Earthy elegance in every fold.'
  },
  {
    id: 5, name: 'Floral Navy Bedsheet', category: 'bedsheets', price: 2799, image: 'bedsheets/dithira-hettiarachchi-_q2B-1r6E-M-unsplash.jpg',
    desc: 'Deep navy base with delicate floral prints. Bamboo-cotton blend for ultimate comfort.'
  },
  {
    id: 6, name: 'Morning Calm Sheet Set', category: 'bedsheets', price: 3299, image: 'bedsheets/omar-roque-EPJhNqu_gas-unsplash.jpg', badge: 'Popular',
    desc: 'Ultra-soft bamboo viscose in warm beige. The feeling of a perfect morning, every night.'
  },
  {
    id: 7, name: 'Floral Print Linen Shirt', category: 'camasi', price: 1899, image: 'shirts/annie-spratt-jXfpruvSHKk-unsplash.jpg', badge: 'New',
    desc: 'Premium linen with hand-designed floral patterns. Breathable, stylish, effortlessly cool.'
  },
  {
    id: 8, name: 'Tropical Print Shirt', category: 'camasi', price: 1699, image: 'shirts/tuananh-blue-0VAlyu7j5wE-unsplash.jpg',
    desc: 'Bold tropical prints on lightweight cotton-linen blend. Your go-to for effortless cool.'
  },
  {
    id: 9, name: 'Cotton Satin Classic White', category: 'camasi', price: 1599, image: 'shirts/benjamin-r-KF-q_SGqswg-unsplash.jpg',
    desc: 'Premium cotton satin with a subtle sheen. Clean, minimal, timeless.'
  },
  {
    id: 10, name: 'Abstract Monochrome Shirt', category: 'camasi', price: 1799, image: 'shirts/waldemar-brandt-cue0DuZ8cUU-unsplash.jpg',
    desc: 'Geometric abstract print on designer polyester. Sharp, modern, statement-making.'
  },
  {
    id: 11, name: 'Baby Bamboo Blanket', category: 'redcheeks', price: 1299, image: 'assets/brand-children.jpg', badge: 'Popular',
    desc: 'Ultra-gentle bamboo fabric for the most delicate skin. Hypoallergenic and impossibly soft.'
  },
  {
    id: 12, name: 'Dreamland Kids Sheet Set', category: 'redcheeks', price: 1499, image: 'assets/brand-children.jpg',
    desc: 'Playful prints on bamboo-cotton blend. Gentle, safe, and designed to inspire sweet dreams.'
  }
];

document.addEventListener('DOMContentLoaded', () => {

  // ─── Setup Search Overlay dynamically ───
  // ─── Setup Inline Search directly in Navbar ───
  function setupSearch() {
    const navInner = document.querySelector('.nav-inner');
    const navbar = document.getElementById('navbar');
    if (!navInner || !navbar) return;

    // Inject inline search input field
    const searchBar = document.createElement('div');
    searchBar.id = 'searchBarInline';
    searchBar.className = 'search-bar-inline';
    searchBar.innerHTML = `
      <svg class="search-input-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--charcoal-light); margin-right:4px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      <input type="text" id="searchInputInline" placeholder="Search Relaxaa..." autocomplete="off">
      <button class="search-inline-close" id="searchInlineClose" aria-label="Cancel search">Cancel</button>
    `;
    navInner.appendChild(searchBar);

    // Inject results dropdown panel
    const dropdown = document.createElement('div');
    dropdown.id = 'searchDropdownInline';
    dropdown.className = 'search-dropdown-inline';
    navbar.appendChild(dropdown);

    const searchToggle = document.getElementById('searchToggle');
    const searchClose = document.getElementById('searchInlineClose');
    const searchInput = document.getElementById('searchInputInline');

    // Popular tags to show when search is empty
    const suggestionsHTML = `
      <div class="search-suggestions-container" style="max-width:600px; margin:0 auto; padding-top:1rem;">
        <h4 style="font-family:var(--font-heading); font-size:1.1rem; margin-bottom:1rem; color:var(--charcoal); font-weight:400;">Quick Links</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.5rem;">
          <a href="shop.html?category=Bedsheets" class="suggestion-chip" style="padding:0.4rem 1rem; border-radius:100px; background:rgba(0,0,0,0.04); font-size:0.875rem; text-decoration:none; color:var(--charcoal); transition:all 0.2s;">Organic Bedsheets</a>
          <a href="shop.html?category=Camasi" class="suggestion-chip" style="padding:0.4rem 1rem; border-radius:100px; background:rgba(0,0,0,0.04); font-size:0.875rem; text-decoration:none; color:var(--charcoal); transition:all 0.2s;">Camasi Shirts</a>
          <a href="personalize.html" class="suggestion-chip" style="padding:0.4rem 1rem; border-radius:100px; background:rgba(0,0,0,0.04); font-size:0.875rem; text-decoration:none; color:var(--charcoal); transition:all 0.2s;">Monogram Studio</a>
          <a href="science.html" class="suggestion-chip" style="padding:0.4rem 1rem; border-radius:100px; background:rgba(0,0,0,0.04); font-size:0.875rem; text-decoration:none; color:var(--charcoal); transition:all 0.2s;">Thread Tech Lab</a>
        </div>
      </div>
    `;

    if (searchToggle) {
      searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navbar.classList.toggle('search-active');
        if (navbar.classList.contains('search-active')) {
          dropdown.innerHTML = suggestionsHTML;
          dropdown.classList.add('open');
          setTimeout(() => searchInput.focus(), 100);
        } else {
          closeSearch();
        }
      });
    }

    function closeSearch() {
      navbar.classList.remove('search-active');
      searchInput.value = '';
      dropdown.innerHTML = '';
      dropdown.classList.remove('open');
    }

    if (searchClose) {
      searchClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeSearch();
      });
    }

    // Close on click outside search areas
    document.addEventListener('click', (e) => {
      if (!searchBar.contains(e.target) && !dropdown.contains(e.target) && e.target !== searchToggle) {
        closeSearch();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbar.classList.contains('search-active')) {
        closeSearch();
      }
    });

    // Autocomplete results
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        dropdown.innerHTML = suggestionsHTML;
        return;
      }

      const matches = window.productsDb.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );

      dropdown.classList.add('open');

      if (matches.length === 0) {
        dropdown.innerHTML = `
          <div class="search-suggestions-container" style="max-width:600px; margin:0 auto; padding-top:1rem; text-align:center; color:var(--charcoal-light); font-size:0.875rem;">
            No products found matching "${searchInput.value}"
          </div>
        `;
        return;
      }

      dropdown.innerHTML = `
        <div style="max-width:600px; margin:0 auto; display:flex; flex-direction:column; gap:0.5rem; padding-top:0.5rem;">
          ${matches.map(p => `
            <a href="product.html?id=${p.id}" class="search-result-item" style="display:flex;align-items:center;gap:var(--space-md);padding:var(--space-sm);border-bottom:1px solid rgba(0,0,0,0.05);color:inherit;text-decoration:none;border-radius:var(--radius-sm);background:transparent;transition:background 0.2s;">
              <img src="${p.image}" alt="${p.name}" class="search-result-img" style="width:44px;height:44px;object-fit:cover;border-radius:var(--radius-sm);border:1px solid rgba(0,0,0,0.05);">
              <div class="search-result-info" style="flex:1;">
                <div class="search-result-name" style="font-size:0.875rem;font-weight:500;color:var(--charcoal);">${p.name}</div>
                <div class="search-result-price" style="font-size:0.75rem;color:var(--lavender);font-weight:600;margin-top:2px;">₹${p.price.toLocaleString('en-IN')}</div>
              </div>
            </a>
          `).join('')}
        </div>
      `;
    });

    // Enter redirects to shop
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  setupSearch();


  // ─── Navbar scroll effect ───
  const navbar = document.getElementById('navbar');
  if (navbar && !navbar.classList.contains('scrolled')) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }


  // ─── Mobile hamburger menu ───
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    // Dynamically inject the premium glass card layout
    mobileMenu.innerHTML = `
      <div class="mobile-menu-card">
        <div class="mobile-menu-header">
          <img src="assets/logo-full.jpg" alt="Relaxaa" style="height:38px; width:38px; border-radius:50%; object-fit:cover;">
        </div>
        <div class="mobile-menu-links">
          <a href="home.html" class="mobile-menu-item">
            <span class="icon">🏠</span>
            <span class="label">Home</span>
          </a>
          <a href="shop.html" class="mobile-menu-item">
            <span class="icon">🧵</span>
            <span class="label">Products</span>
          </a>
          <a href="science.html" class="mobile-menu-item">
            <span class="icon">🔬</span>
            <span class="label">Thread Lab</span>
          </a>
          <a href="story.html" class="mobile-menu-item">
            <span class="icon">📖</span>
            <span class="label">Our Story</span>
          </a>
          <a href="personalize.html" class="mobile-menu-item">
            <span class="icon">🪡</span>
            <span class="label">Monogram Studio</span>
          </a>
          <a href="contact.html" class="mobile-menu-item">
            <span class="icon">📞</span>
            <span class="label">Contact</span>
          </a>
        </div>
        <div class="mobile-menu-search" id="mobileMenuSearchBtn">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--charcoal-light);">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search products..." readonly>
        </div>
      </div>
    `;

    // Toggle menu visibility
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on overlay background click
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on menu item selection
    mobileMenu.querySelectorAll('.mobile-menu-item').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Wire search block to navbar search toggle
    const mobileSearchBtn = document.getElementById('mobileMenuSearchBtn');
    if (mobileSearchBtn) {
      mobileSearchBtn.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        
        // Open search toggle in navbar
        const searchToggle = document.getElementById('searchToggle');
        if (searchToggle) {
          // If search is not already active, trigger click
          const navbar = document.getElementById('navbar');
          if (navbar && !navbar.classList.contains('search-active')) {
            searchToggle.click();
          }
        }
      });
    }
  }


  // ─── Scroll-reveal animations via IntersectionObserver ───
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }


  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ─── Tab switching ───
  const tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const tabContent = document.getElementById(`tab-${tabId}`);
        if (tabContent) tabContent.classList.add('active');
      });
    });
  }


  // ─── Parallax-lite for hero ───
  const hero = document.querySelector('.hero-video-bg video, .hero img');
  if (hero) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scroll = window.scrollY;
          if (scroll < window.innerHeight) {
            hero.style.transform = `translate3d(0, ${scroll * 0.25}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  // ─── Smooth Page Transitions ───
  // Fade-in on page load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  // Fade-out before navigating to another page
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');

    // Skip: external links, anchors, javascript:, new tabs, mailto, tel, whatsapp
    if (!href ||
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('https://wa.me') ||
        link.target === '_blank' ||
        e.ctrlKey || e.metaKey || e.shiftKey) {
      return;
    }

    // Only handle local page links (.html or relative)
    if (href.startsWith('http') && !href.includes(window.location.host)) return;

    e.preventDefault();

    document.body.style.transition = 'opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    document.body.style.opacity = '0';

    setTimeout(() => {
      window.location.href = href;
    }, 350);
  });

  // Handle browser back/forward — ensure page fades in
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      document.body.style.transition = 'opacity 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      document.body.style.opacity = '1';
    }
  });


  // ─── Scroll Progress Bar ───
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }
  initScrollProgress();


  // ─── Custom Interactive Cursor (Desktop Only) ───
  function initCustomCursor() {
    // Detect hover/pointer device
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';

    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    // LERP (Linear Interpolation) for smooth ring lag-trail
    function updateRing() {
      const delay = 0.15; // smoothness factor
      ringX += (mouseX - ringX) * delay;
      ringY += (mouseY - ringY) * delay;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(updateRing);
    }
    requestAnimationFrame(updateRing);

    // Hover Morph Effects on Interactive Elements
    const interactiveSelectors = 'a, button, .product-card, .collection-card, .suggestion-chip, .qty-btn, .size-option, input, textarea, select';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.add('custom-cursor-hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.remove('custom-cursor-hovering');
      }
    });
  }
  initCustomCursor();


  // ─── Momentum Smooth Scroll (Lenis-style Custom Script) ───
  function initMomentumScroll() {
    // Only apply to desktop hover devices to keep mobile native touch pristine
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    // Check if smooth scroll is already managed or if we are on personalize/checkout which might have specific scroll containers
    if (window.location.pathname.includes('checkout') || window.location.pathname.includes('payment')) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isScrolling = false;
    const speed = 0.085; // interpolation weight (lower = smoother/longer slide)

    // Synchronize target with actual window scroll position if scrolled natively (e.g. scrollbar drag)
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    }, { passive: true });

    window.addEventListener('wheel', (e) => {
      // Allow default behavior if search dropdown is open and hovered to scroll results
      const searchDropdown = document.getElementById('searchDropdownInline');
      if (searchDropdown && searchDropdown.classList.contains('open') && searchDropdown.contains(e.target)) {
        return;
      }
      
      const cartSidebar = document.getElementById('cartSidebar');
      if (cartSidebar && cartSidebar.classList.contains('open') && cartSidebar.contains(e.target)) {
        return;
      }

      e.preventDefault();

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY += e.deltaY * 0.85; // slightly scale down wheel increment for precision
      targetY = Math.max(0, Math.min(targetY, maxScroll));

      if (!isScrolling) {
        isScrolling = true;
        document.documentElement.classList.add('lenis', 'lenis-smooth');
        requestAnimationFrame(scrollLoop);
      }
    }, { passive: false });

    function scrollLoop() {
      const diff = targetY - currentY;
      if (Math.abs(diff) > 0.4) {
        currentY += diff * speed;
        window.scrollTo(0, currentY);
        requestAnimationFrame(scrollLoop);
      } else {
        currentY = targetY;
        window.scrollTo(0, currentY);
        isScrolling = false;
        document.documentElement.classList.remove('lenis', 'lenis-smooth');
      }
    }
  }
  // Initialize smooth scroll delay to allow page height computations
  setTimeout(initMomentumScroll, 100);


  // ─── 3D Card Tilt & Glare effect ───
  function initCardTilt() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cards = document.querySelectorAll('.product-card, .collection-card');

    cards.forEach(card => {
      // Dynamically add glare overlay
      if (!card.querySelector('.card-glare')) {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x coordinate inside the card
        const y = e.clientY - rect.top;  // y coordinate inside the card

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation degrees (max +/- 10 degrees)
        const rotateX = ((centerY - y) / centerY) * 8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Set glare coordinates as CSS properties
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        card.style.setProperty('--glare-x', `${glareX}%`);
        card.style.setProperty('--glare-y', `${glareY}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }
  initCardTilt();


  // ─── Magnetic Hover Buttons ───
  function initMagneticButtons() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const magneticElements = document.querySelectorAll('.btn, .whatsapp-float, .nav-action-btn, .hamburger');

    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Distance from center of element to mouse
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Pull maximum of 12px towards cursor
        const pullFactor = 0.35;
        const moveX = deltaX * pullFactor;
        const moveY = deltaY * pullFactor;

        el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        if (el.classList.contains('whatsapp-float')) {
          el.style.transition = 'none';
        } else {
          el.style.transition = 'transform 0.1s ease-out';
        }
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
      });
    });
  }
  initMagneticButtons();


  // ─── Animated Stat Counters ───
  function initCounters() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const originalText = el.textContent.trim();
          const targetNum = parseInt(originalText.replace(/[^0-9]/g, ''), 10);
          
          if (isNaN(targetNum)) return;

          const isPercentage = originalText.includes('%');
          const isPlus = originalText.includes('+');
          const isTC = originalText.includes('TC-');

          let currentNum = 0;
          const duration = 1500; // 1.5 seconds animation
          const stepTime = Math.max(Math.floor(duration / targetNum), 15);
          
          const counterInterval = setInterval(() => {
            currentNum += Math.ceil(targetNum / 50); // Increment dynamically
            if (currentNum >= targetNum) {
              currentNum = targetNum;
              clearInterval(counterInterval);
            }

            // Reconstruct text style
            if (isTC) {
              el.textContent = `TC-${currentNum}`;
            } else if (isPercentage) {
              el.textContent = `${currentNum}%`;
            } else if (isPlus) {
              el.textContent = `${currentNum}+`;
            } else {
              el.textContent = currentNum;
            }
          }, stepTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    stats.forEach(stat => observer.observe(stat));
  }
  initCounters();


  // ─── Image Comparison Slider (Science Page) ───
  function initImageSliders() {
    const sliders = document.querySelectorAll('.image-slider-container');
    if (sliders.length === 0) return;

    sliders.forEach(slider => {
      const handle = slider.querySelector('.image-slider-handle');
      const activeImage = slider.querySelector('.image-slider-after');
      let isDragging = false;

      function move(x) {
        const rect = slider.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;
        position = Math.max(0, Math.min(100, position));

        handle.style.left = position + '%';
        activeImage.style.width = position + '%';
      }

      // Drag events
      slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        move(e.clientX);
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        move(e.clientX);
      });

      // Touch events (Mobile)
      slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        move(e.touches[0].clientX);
      });

      window.addEventListener('touchend', () => {
        isDragging = false;
      });

      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        move(e.touches[0].clientX);
      });
    });
  }
  initImageSliders();

});

