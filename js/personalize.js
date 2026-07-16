/* ═══════════════════════════════════════════
   RELAXAA — Monogram Configurator Logic
   Handles SVG rendering and cart insertion
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    const canvasMonogramText = document.getElementById('canvasMonogramText');
    const monogramInput = document.getElementById('monogramInput');
    const productCanvas = document.getElementById('productCanvas');
    const previewPrice = document.getElementById('previewPrice');
    const productButtons = document.querySelectorAll('[data-product-id]');
    const fontButtons = document.querySelectorAll('[data-font]');
    const colorButtons = document.querySelectorAll('[data-color]');
    const addToCartButton = document.getElementById('addToCartPersonalized');

    // ─── Current Selection States ───
    let currentProductId = 101;
    let currentProductName = "Bedsheet (Custom Monogram)";
    let currentPrice = 2999;
    let currentBg = "bedsheets/slaapwijsheid-nl-miuVm8c557M-unsplash.jpg";
    let currentText = "RL";
    let currentFont = "Georgia";
    let currentThreadColor = "#C9A96E";
    let currentThreadColorName = "Gold";

    // ─── Input Sync ───
    if (monogramInput) {
        monogramInput.addEventListener('input', (e) => {
            const val = e.target.value.toUpperCase();
            currentText = val;
            canvasMonogramText.textContent = val;

            // Empty placeholder support
            if (val === '') {
                canvasMonogramText.textContent = '???';
            }
        });
    }

    // ─── Canvas & Product Selector ───
    productButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            productButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Extraction
            currentProductId = parseInt(btn.getAttribute('data-product-id'));
            currentBg = btn.getAttribute('data-bg');
            currentProductName = btn.getAttribute('data-name');
            currentPrice = parseInt(btn.getAttribute('data-price'));

            const posX = btn.getAttribute('data-pos-x');
            const posY = btn.getAttribute('data-pos-y');
            const fontSize = btn.getAttribute('data-size');

            // Apply updates to the canvas layout
            productCanvas.style.backgroundImage = `url('${currentBg}')`;
            canvasMonogramText.setAttribute('x', posX);
            canvasMonogramText.setAttribute('y', posY);
            canvasMonogramText.setAttribute('font-size', fontSize);

            // Update price labeling
            if (previewPrice) {
                previewPrice.textContent = `₹${currentPrice.toLocaleString('en-IN')}`;
            }
        });
    });

    // ─── Font Face Selector ───
    fontButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            fontButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFont = btn.getAttribute('data-font');
            canvasMonogramText.setAttribute('font-family', currentFont);
        });
    });

    // ─── Thread Spool Color Selector ───
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentThreadColor = btn.getAttribute('data-color');
            currentThreadColorName = btn.getAttribute('data-color-name');
            canvasMonogramText.setAttribute('fill', currentThreadColor);
        });
    });

    // ─── Cart Integration ───
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            if (currentText.trim() === '') {
                alert('Please enter at least 1 letter to monogram.');
                return;
            }

            // Create customized options parameter string mapping to the 'size' field of addToCart
            const customDetails = `Mono: ${currentText} (${currentThreadColorName}, ${currentFont.replace(/'/g, "")})`;

            // Format pseudo-product structure matching cart expectations
            const mockProduct = {
                id: currentProductId,
                name: currentProductName,
                price: currentPrice,
                image: currentBg,
                category: 'customizer'
            };

            // Call global cart trigger in cart.js
            if (typeof addToCart === 'function') {
                addToCart(mockProduct, 1, customDetails);
            } else {
                console.error("Cart system is missing global addToCart listener.");
            }
        });
    }

});
