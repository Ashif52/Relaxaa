/* ═══════════════════════════════════════════
   RELAXAA — Cart Module
   localStorage-based cart with sidebar UI
   ═══════════════════════════════════════════ */

// ─── Cart State ───
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('relaxaa_cart')) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem('relaxaa_cart', JSON.stringify(cart));
    updateCartUI();
}


// ─── Cart Operations ───
function addToCart(product, qty = 1, size = '') {
    const cart = getCart();
    const key = `${product.id}-${size}`;
    const existing = cart.find(item => `${item.id}-${item.size}` === key);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category || '',
            size: size,
            qty: qty
        });
    }

    saveCart(cart);
    openCart();

    // Brief pulse animation on badge
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.style.animation = 'pulse 0.3s ease';
        setTimeout(() => badge.style.animation = '', 300);
    }
}

function removeFromCart(id, size) {
    let cart = getCart();
    cart = cart.filter(item => !(`${item.id}-${item.size}` === `${id}-${size}`));
    saveCart(cart);
}

function updateQty(id, size, newQty) {
    const cart = getCart();
    const item = cart.find(i => `${i.id}-${i.size}` === `${id}-${size}`);
    if (item) {
        item.qty = Math.max(1, newQty);
        saveCart(cart);
    }
}

function getCartTotal() {
    return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
}


// ─── Cart UI ───
function updateCartUI() {
    const cart = getCart();
    const count = getCartCount();
    const total = getCartTotal();

    // Update badge
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = count;
        badge.classList.toggle('visible', count > 0);
    }

    // Update cart items
    const itemsContainer = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    const totalEl = document.getElementById('cartTotal');

    if (!itemsContainer) return;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <a href="shop.html" class="btn btn-primary" style="margin-top:1rem;">Start Shopping</a>
      </div>
    `;
        if (footer) footer.style.display = 'none';
    } else {
        itemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">${item.size ? `Size: ${item.size} · ` : ''}Qty: ${item.qty}</div>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
        </div>
      </div>
    `).join('');
        if (footer) footer.style.display = 'block';
        if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
    }
}


// ─── Cart Sidebar Toggle ───
function openCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (overlay) overlay.classList.add('open');
    if (sidebar) sidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (overlay) overlay.classList.remove('open');
    if (sidebar) sidebar.classList.remove('open');
    document.body.style.overflow = '';
}


// ─── Initialize ───
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();

    // Cart toggle button
    const cartToggle = document.getElementById('cartToggle');
    if (cartToggle) cartToggle.addEventListener('click', openCart);

    // Cart close button
    const cartClose = document.getElementById('cartClose');
    if (cartClose) cartClose.addEventListener('click', closeCart);

    // Overlay click to close
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Redirect to Checkout page
    const checkoutBtn = document.querySelector('#cartFooter .btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
});
