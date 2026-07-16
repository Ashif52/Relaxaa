/* ═══════════════════════════════════════════
   RELAXAA — Shop Module
   Product data, filtering, sorting, rendering
   ═══════════════════════════════════════════ */

// ─── Product Data ───
const products = [
    // Bedsheets
    {
        id: 1, name: 'Bamboo Viscose Bedsheet', category: 'bedsheets', price: 2999, image: 'bedsheets/slaapwijsheid-nl-miuVm8c557M-unsplash.jpg', badge: 'Bestseller', sizes: ['Single', 'Double', 'King'],
        desc: 'Crafted from 100% bamboo viscose with TC-400 thread count. Cloud-like softness with natural temperature regulation.'
    },
    {
        id: 2, name: 'Geometric Cotton Spread', category: 'bedsheets', price: 2499, image: 'bedsheets/nilufar-nattaq-OJ3t25nsaHw-unsplash.jpg', sizes: ['Single', 'Double', 'King'],
        desc: 'Bold geometric patterns on premium cotton. A modern statement piece for your bedroom.'
    },
    {
        id: 3, name: 'Christmas Edition Spread', category: 'bedsheets', price: 3499, image: 'bedsheets/toa-heftiba-BYsTPg84Yok-unsplash.jpg', badge: 'Limited', sizes: ['Double', 'King'],
        desc: 'Festive warmth meets Relaxaa quality. A seasonal favorite with traditional holiday patterns.'
    },
    {
        id: 4, name: 'Sage & Sand Bundle', category: 'bedsheets', price: 3999, image: 'bedsheets/simply-mersah-i4zvtUv-QEo-unsplash.jpg', badge: 'New', sizes: ['Single', 'Double', 'King'],
        desc: 'A curated bundle of sage green and sand-toned sheets. Earthy elegance in every fold.'
    },
    {
        id: 5, name: 'Floral Navy Bedsheet', category: 'bedsheets', price: 2799, image: 'bedsheets/dithira-hettiarachchi-_q2B-1r6E-M-unsplash.jpg', sizes: ['Single', 'Double', 'King'],
        desc: 'Deep navy base with delicate floral prints. Bamboo-cotton blend for ultimate comfort.'
    },
    {
        id: 6, name: 'Morning Calm Sheet Set', category: 'bedsheets', price: 3299, image: 'bedsheets/omar-roque-EPJhNqu_gas-unsplash.jpg', badge: 'Popular', sizes: ['Double', 'King'],
        desc: 'Ultra-soft bamboo viscose in warm beige. The feeling of a perfect morning, every night.'
    },

    // Camasi Shirts
    {
        id: 7, name: 'Floral Print Linen Shirt', category: 'camasi', price: 1899, image: 'shirts/annie-spratt-jXfpruvSHKk-unsplash.jpg', badge: 'New', sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        desc: 'Premium linen with hand-designed floral patterns. Breathable, stylish, effortlessly cool.'
    },
    {
        id: 8, name: 'Tropical Print Shirt', category: 'camasi', price: 1699, image: 'shirts/tuananh-blue-0VAlyu7j5wE-unsplash.jpg', sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        desc: 'Bold tropical prints on lightweight cotton-linen blend. Your go-to for effortless cool.'
    },
    {
        id: 9, name: 'Cotton Satin Classic White', category: 'camasi', price: 1599, image: 'shirts/benjamin-r-KF-q_SGqswg-unsplash.jpg', sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        desc: 'Premium cotton satin with a subtle sheen. Clean, minimal, timeless.'
    },
    {
        id: 10, name: 'Abstract Monochrome Shirt', category: 'camasi', price: 1799, image: 'shirts/waldemar-brandt-cue0DuZ8cUU-unsplash.jpg', sizes: ['S', 'M', 'L', 'XL'],
        desc: 'Geometric abstract print on designer polyester. Sharp, modern, statement-making.'
    },

    // Red Cheeks
    {
        id: 11, name: 'Baby Bamboo Blanket', category: 'redcheeks', price: 1299, image: 'assets/brand-children.jpg', badge: 'Popular', sizes: ['Baby', 'Toddler'],
        desc: 'Ultra-gentle bamboo fabric for the most delicate skin. Hypoallergenic and impossibly soft.'
    },
    {
        id: 12, name: 'Dreamland Kids Sheet Set', category: 'redcheeks', price: 1499, image: 'assets/brand-children.jpg', sizes: ['Single'],
        desc: 'Playful prints on bamboo-cotton blend. Gentle, safe, and designed to inspire sweet dreams.'
    },
];


// ─── State ───
let currentCategory = 'all';
let currentSort = 'featured';


// ─── Rendering ───
function renderProducts(filteredProducts) {
    const grid = document.getElementById('productGrid');
    const countEl = document.getElementById('productCount');
    if (!grid) return;

    grid.innerHTML = '';

    filteredProducts.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${i * 0.08}s`;
        card.style.animation = `fadeInUp 0.5s var(--ease-smooth) ${i * 0.08}s both`;
        card.innerHTML = `
      <div class="product-card-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-card-badge">${p.badge}</span>` : ''}
        <div class="product-card-actions">
          <button class="product-card-action-btn" onclick="event.stopPropagation(); addToCart({id:${p.id},name:'${p.name.replace(/'/g, "\\'")}',price:${p.price},image:'${p.image}',category:'${p.category}'})" title="Add to Cart">🛒</button>
          <button class="product-card-action-btn" onclick="event.stopPropagation(); openQuickView(${p.id})" title="Quick View">👁</button>
        </div>
      </div>
      <div class="product-card-info">
        <div class="product-card-category">${getCategoryLabel(p.category)}</div>
        <div class="product-card-name">${p.name}</div>
        <div class="product-card-price">₹${p.price.toLocaleString('en-IN')}</div>
      </div>
    `;
        card.addEventListener('click', () => {
            window.location.href = `product.html?id=${p.id}`;
        });
        grid.appendChild(card);
    });

    if (countEl) {
        countEl.textContent = `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`;
    }
}

function getCategoryLabel(cat) {
    const labels = { bedsheets: 'Bedsheets', camasi: 'Camasi', redcheeks: 'Red Cheeks' };
    return labels[cat] || cat;
}


// ─── Filtering & Sorting ───
function filterAndSort() {
    let filtered = [...products];

    // Category filter
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Search query filter
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
        const query = searchParam.trim().toLowerCase();
        if (query) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.desc.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );

            const pageHeaderH1 = document.querySelector('.page-header h1');
            if (pageHeaderH1) {
                pageHeaderH1.textContent = `Search Results: "${searchParam}"`;
            }
        }
    }

    // Sort
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        default: // featured — keep original order
            break;
    }

    renderProducts(filtered);
}


// ─── Quick View Modal ───
function openQuickView(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const modal = document.getElementById('quickViewModal');
    const modalImage = document.querySelector('#quickViewModal .modal-image img');
    const modalContent = document.getElementById('modalContent');

    if (modalImage) {
        modalImage.src = product.image;
        modalImage.alt = product.name;
    }

    if (modalContent) {
        modalContent.innerHTML = `
      <p class="text-caption" style="color:var(--lavender);margin-bottom:0.5rem;">${getCategoryLabel(product.category)}</p>
      <h3 style="margin-bottom:0.5rem;">${product.name}</h3>
      <div class="product-price-tag" style="margin-bottom:1rem;">₹${product.price.toLocaleString('en-IN')}</div>
      <p style="color:var(--charcoal-light);margin-bottom:1.5rem;line-height:1.8;">${product.desc}</p>
      <div style="display:flex;gap:0.75rem;">
        <button class="btn btn-primary" onclick="addToCart({id:${product.id},name:'${product.name.replace(/'/g, "\\'")}',price:${product.price},image:'${product.image}',category:'${product.category}'}); closeQuickView();">Add to Cart</button>
        <a href="product.html?id=${product.id}" class="btn btn-secondary">View Details</a>
      </div>
    `;
    }

    if (modal) modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
}


// ─── Initialize ───
document.addEventListener('DOMContentLoaded', () => {
    // Check URL params for initial category
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get('category');
    if (urlCategory && ['bedsheets', 'camasi', 'redcheeks'].includes(urlCategory)) {
        currentCategory = urlCategory;
    }

    // Set active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === currentCategory);
    });

    // Filter button clicks
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            filterAndSort();
        });
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            currentSort = sortSelect.value;
            filterAndSort();
        });
    }

    // Modal close
    const modalClose = document.getElementById('modalClose');
    if (modalClose) modalClose.addEventListener('click', closeQuickView);

    const modalOverlay = document.getElementById('quickViewModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeQuickView();
        });
    }

    // Initial render
    filterAndSort();
});


// Export products for use by product.js
window.allProducts = products;
