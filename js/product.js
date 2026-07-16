/* ═══════════════════════════════════════════
   RELAXAA — Product Detail Module
   Product page rendering, gallery, size/qty
   ═══════════════════════════════════════════ */

// ─── Product Database (shared with shop.js) ───
const productDB = [
    {
        id: 1, name: 'Bamboo Viscose Bedsheet', category: 'Bedsheets', price: 2999,
        images: ['bedsheets/slaapwijsheid-nl-miuVm8c557M-unsplash.jpg', 'bedsheets/kamalia-khaddar-uC8-q_nVsaE-unsplash.jpg', 'bedsheets/nilufar-nattaq-OJ3t25nsaHw-unsplash.jpg'],
        sizes: ['Single', 'Double', 'King'], badge: 'Bestseller',
        desc: 'Crafted from 100% bamboo viscose with a TC-400 thread count, this bedsheet offers cloud-like softness and natural temperature regulation. Hypoallergenic, moisture-wicking, and utterly luxurious.',
        longDesc: 'Our premium bedsheets are woven from the finest bamboo viscose, providing unmatched softness and breathability. The TC-400 thread count ensures durability while maintaining a silky-smooth touch against your skin. Naturally temperature-regulating, these sheets keep you cool in summer and warm in winter.'
    },
    {
        id: 2, name: 'Geometric Cotton Spread', category: 'Bedsheets', price: 2499,
        images: ['bedsheets/nilufar-nattaq-OJ3t25nsaHw-unsplash.jpg', 'bedsheets/dithira-hettiarachchi-_q2B-1r6E-M-unsplash.jpg', 'bedsheets/simply-mersah-i4zvtUv-QEo-unsplash.jpg'],
        sizes: ['Single', 'Double', 'King'],
        desc: 'Bold geometric patterns on premium cotton. A modern statement piece for your bedroom.',
        longDesc: 'Designed for the contemporary home, this geometric bedspread features bold ikat-inspired patterns woven on premium cotton. With a soft hand-feel and vibrant print retention, it transforms any bedroom into a design-forward sanctuary.'
    },
    {
        id: 3, name: 'Christmas Edition Spread', category: 'Bedsheets', price: 3499,
        images: ['bedsheets/toa-heftiba-BYsTPg84Yok-unsplash.jpg', 'bedsheets/slaapwijsheid-nl-miuVm8c557M-unsplash.jpg'],
        sizes: ['Double', 'King'], badge: 'Limited',
        desc: 'Festive warmth meets Relaxaa quality. A seasonal favorite with traditional holiday patterns.',
        longDesc: 'Celebrate the holidays wrapped in Relaxaa warmth. This limited-edition Christmas spread features traditional Scandinavian-inspired patterns in rich reds and golds, woven on our signature premium cotton with TC-400 thread count.'
    },
    {
        id: 4, name: 'Sage & Sand Bundle', category: 'Bedsheets', price: 3999,
        images: ['bedsheets/simply-mersah-i4zvtUv-QEo-unsplash.jpg', 'bedsheets/omar-roque-EPJhNqu_gas-unsplash.jpg', 'bedsheets/kamalia-khaddar-uC8-q_nVsaE-unsplash.jpg'],
        sizes: ['Single', 'Double', 'King'], badge: 'New',
        desc: 'A curated bundle of sage green and sand-toned sheets. Earthy elegance in every fold.',
        longDesc: 'This curated bundle brings the serenity of nature indoors. Three perfectly coordinated sheets in sage green, warm sand, and soft taupe — all crafted from our bamboo-cotton blend for an earthy, spa-like bedroom experience.'
    },
    {
        id: 5, name: 'Floral Navy Bedsheet', category: 'Bedsheets', price: 2799,
        images: ['bedsheets/dithira-hettiarachchi-_q2B-1r6E-M-unsplash.jpg', 'bedsheets/nilufar-nattaq-OJ3t25nsaHw-unsplash.jpg'],
        sizes: ['Single', 'Double', 'King'],
        desc: 'Deep navy base with delicate floral prints. Bamboo-cotton blend for ultimate comfort.',
        longDesc: 'A deep navy base adorned with delicate hand-drawn botanicals. Our bamboo-cotton blend delivers a lustrous drape and silky softness that improves with every wash.'
    },
    {
        id: 6, name: 'Morning Calm Sheet Set', category: 'Bedsheets', price: 3299,
        images: ['bedsheets/omar-roque-EPJhNqu_gas-unsplash.jpg', 'bedsheets/simply-mersah-i4zvtUv-QEo-unsplash.jpg', 'bedsheets/slaapwijsheid-nl-miuVm8c557M-unsplash.jpg'],
        sizes: ['Double', 'King'], badge: 'Popular',
        desc: 'Ultra-soft bamboo viscose in warm beige. The feeling of a perfect morning, every night.',
        longDesc: 'Named after the quiet magic of early mornings, this sheet set wraps you in warm beige bamboo viscose so soft it redefines comfort. Complete set includes fitted sheet, flat sheet, and two pillowcases.'
    },
    {
        id: 7, name: 'Floral Print Linen Shirt', category: 'Camasi', price: 1899,
        images: ['shirts/annie-spratt-jXfpruvSHKk-unsplash.jpg', 'shirts/benjamin-r-KF-q_SGqswg-unsplash.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'New',
        desc: 'Premium linen with hand-designed floral patterns. Breathable, stylish, effortlessly cool.',
        longDesc: 'This Camasi original features intricate cherry blossom prints on premium European linen. The relaxed fit and natural breathability make it perfect for warm days when you want to look sharp without trying too hard.'
    },
    {
        id: 8, name: 'Tropical Print Shirt', category: 'Camasi', price: 1699,
        images: ['shirts/tuananh-blue-0VAlyu7j5wE-unsplash.jpg', 'shirts/craig-whitehead-lbekri_riMg-unsplash.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        desc: 'Bold tropical prints on lightweight cotton-linen blend. Your go-to for effortless cool.',
        longDesc: 'Make a statement with bold palm and hibiscus prints on a lightweight cotton-linen blend. The Camasi Tropical is designed for the man who doesn\'t follow trends — he sets them.'
    },
    {
        id: 9, name: 'Cotton Satin Classic White', category: 'Camasi', price: 1599,
        images: ['shirts/benjamin-r-KF-q_SGqswg-unsplash.jpg', 'shirts/waldemar-brandt-Db4d6MRIXJc-unsplash.jpg'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        desc: 'Premium cotton satin with a subtle sheen. Clean, minimal, timeless.',
        longDesc: 'The foundation of every well-dressed man\'s wardrobe. Our cotton satin white shirt features a subtle luster, precision stitching, and a fit that moves with you. From boardroom to bistro.'
    },
    {
        id: 10, name: 'Abstract Monochrome Shirt', category: 'Camasi', price: 1799,
        images: ['shirts/waldemar-brandt-cue0DuZ8cUU-unsplash.jpg', 'shirts/waldemar-brandt-NPPNHZK1U0s-unsplash.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        desc: 'Geometric abstract print on designer polyester. Sharp, modern, statement-making.',
        longDesc: 'Bold geometric abstractions on premium designer polyester. The Camasi Abstract is for the man who sees clothing as expression — sharp lines, modern patterns, and a confident silhouette.'
    },
    {
        id: 11, name: 'Baby Bamboo Blanket', category: 'Red Cheeks', price: 1299,
        images: ['assets/brand-children.jpg', 'assets/lifestyle-window.jpg'],
        sizes: ['Baby', 'Toddler'], badge: 'Popular',
        desc: 'Ultra-gentle bamboo fabric for the most delicate skin. Hypoallergenic and impossibly soft.',
        longDesc: 'Because the softest fabric should touch the softest skin. Our Red Cheeks baby blanket is woven from 100% bamboo viscose — naturally antibacterial, hypoallergenic, and so gentle it feels like a warm hug.'
    },
    {
        id: 12, name: 'Dreamland Kids Sheet Set', category: 'Red Cheeks', price: 1499,
        images: ['assets/brand-children.jpg', 'assets/lifestyle-window.jpg'],
        sizes: ['Single'],
        desc: 'Playful prints on bamboo-cotton blend. Gentle, safe, and designed to inspire sweet dreams.',
        longDesc: 'The only homework tonight? Dream big. Our Dreamland sheet set features playful prints on bamboo-cotton blend fabric that\'s certified safe for children. Machine washable and incredibly durable.'
    },
];


// ─── Initialize Product Page ───
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id')) || 1;
    const product = productDB.find(p => p.id === productId) || productDB[0];

    // Update page title
    document.title = `${product.name} — Relaxaa`;

    // Update breadcrumb
    const breadcrumb = document.getElementById('productBreadcrumb');
    if (breadcrumb) breadcrumb.textContent = product.name;

    // Category
    const categoryEl = document.getElementById('productCategory');
    if (categoryEl) categoryEl.textContent = product.category;

    // Name
    const nameEl = document.getElementById('productName');
    if (nameEl) nameEl.textContent = product.name;

    // Price
    const priceEl = document.getElementById('productPrice');
    if (priceEl) priceEl.textContent = `₹${product.price.toLocaleString('en-IN')}`;

    // Description
    const descEl = document.getElementById('productDesc');
    if (descEl) descEl.textContent = product.desc;

    // Long description tab
    const tabDescText = document.getElementById('tabDescText');
    if (tabDescText) tabDescText.textContent = product.longDesc;

    // Main image
    const mainImg = document.getElementById('mainImg');
    if (mainImg) {
        mainImg.src = product.images[0];
        mainImg.alt = product.name;
    }

    // Thumbnails
    const thumbs = document.getElementById('thumbs');
    if (thumbs) {
        thumbs.innerHTML = product.images.map((img, i) => `
      <img src="${img}" alt="${product.name} view ${i + 1}" class="${i === 0 ? 'active' : ''}" data-index="${i}">
    `).join('');

        thumbs.querySelectorAll('img').forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImg.src = thumb.src;
                thumbs.querySelectorAll('img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    }

    // Sizes
    const sizeOptions = document.getElementById('sizeOptions');
    const sizeSection = document.getElementById('sizeSection');
    let selectedSize = product.sizes[0];

    if (sizeOptions && product.sizes) {
        sizeOptions.innerHTML = product.sizes.map((s, i) => `
      <button class="size-option ${i === 0 ? 'selected' : ''}" data-size="${s}">${s}</button>
    `).join('');

        sizeOptions.querySelectorAll('.size-option').forEach(btn => {
            btn.addEventListener('click', () => {
                sizeOptions.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSize = btn.dataset.size;
            });
        });
    }

    // Quantity
    let qty = 1;
    const qtyValue = document.getElementById('qtyValue');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');

    if (qtyMinus) qtyMinus.addEventListener('click', () => {
        if (qty > 1) { qty--; qtyValue.textContent = qty; }
    });
    if (qtyPlus) qtyPlus.addEventListener('click', () => {
        if (qty < 10) { qty++; qtyValue.textContent = qty; }
    });

    // Add to Cart
    const addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                category: product.category
            }, qty, selectedSize);
        });
    }

    // Related Products
    const relatedRow = document.getElementById('relatedRow');
    if (relatedRow) {
        const related = productDB
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);

        // If not enough in same category, fill from other categories
        if (related.length < 4) {
            const others = productDB.filter(p => p.id !== product.id && !related.includes(p)).slice(0, 4 - related.length);
            related.push(...others);
        }

        related.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.width = '260px';
            card.innerHTML = `
        <div class="product-card-image">
          <img src="${p.images[0]}" alt="${p.name}">
          ${p.badge ? `<span class="product-card-badge">${p.badge}</span>` : ''}
        </div>
        <div class="product-card-info">
          <div class="product-card-category">${p.category}</div>
          <div class="product-card-name">${p.name}</div>
          <div class="product-card-price">₹${p.price.toLocaleString('en-IN')}</div>
        </div>
      `;
            card.addEventListener('click', () => {
                window.location.href = `product.html?id=${p.id}`;
            });
            relatedRow.appendChild(card);
        });
    }
});
