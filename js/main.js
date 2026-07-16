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
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
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


  // ─── Preloader / page transition ───
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
