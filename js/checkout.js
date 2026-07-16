/* ═══════════════════════════════════════════
   RELAXAA — Checkout Module
   Manages shipping selectors and totals calculations
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    const checkoutSummaryList = document.getElementById('checkoutSummaryList');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutShipping = document.getElementById('checkoutShipping');
    const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');
    const checkoutForm = document.getElementById('checkoutForm');
    const btnProceed = document.getElementById('btnProceedToPayment');

    // Shipping selectors
    const shipStandardBox = document.getElementById('shipStandardBox');
    const shipExpressBox = document.getElementById('shipExpressBox');
    const shippingStandard = document.getElementById('shippingStandard');
    const shippingExpress = document.getElementById('shippingExpress');
    const shippingStandardCost = document.getElementById('shippingStandardCost');

    let subtotal = 0;
    let shippingFee = 99;

    // ─── Fetch Cart ───
    function getCartData() {
        try {
            return JSON.parse(localStorage.getItem('relaxaa_cart')) || [];
        } catch {
            return [];
        }
    }

    const cart = getCartData();

    // ─── Direct empty cart users away ───
    if (cart.length === 0) {
        alert("Your cart is empty. Redirecting you to the shop.");
        window.location.href = "shop.html";
        return;
    }

    // ─── Calculate Initial Subtotal ───
    subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    checkoutSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    // Free Standard Shipping Threshold checked (Free over ₹3,000)
    const isFreeShipping = subtotal > 3000;
    if (isFreeShipping) {
        shippingStandardCost.textContent = "Free";
        if (shippingStandard.checked) {
            shippingFee = 0;
        }
    } else {
        shippingStandardCost.textContent = "₹99";
    }

    // ─── Render Items List ───
    if (checkoutSummaryList) {
        checkoutSummaryList.innerHTML = cart.map(item => `
            <div class="summary-item-row">
                <img src="${item.image}" alt="${item.name}" class="summary-img">
                <div>
                    <h5 class="summary-name">${item.name}</h5>
                    <p class="summary-meta">${item.size ? `${item.size} · ` : ''}Qty: ${item.qty}</p>
                </div>
                <span class="summary-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
            </div>
        `).join('');
    }

    // ─── Shipping Selections ───
    function updateTotals() {
        const total = subtotal + shippingFee;
        checkoutShipping.textContent = shippingFee === 0 ? "Free" : `₹${shippingFee.toLocaleString('en-IN')}`;
        checkoutGrandTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
    }

    if (shipStandardBox && shipExpressBox) {
        shipStandardBox.addEventListener('click', () => {
            shippingStandard.checked = true;
            shipStandardBox.classList.add('active');
            shipExpressBox.classList.remove('active');
            shippingFee = isFreeShipping ? 0 : 99;
            updateTotals();
        });

        shipExpressBox.addEventListener('click', () => {
            shippingExpress.checked = true;
            shipExpressBox.classList.add('active');
            shipStandardBox.classList.remove('active');
            shippingFee = 249;
            updateTotals();
        });
    }

    // Initialize display
    updateTotals();

    // ─── Redirection Validations ───
    if (btnProceed && checkoutForm) {
        btnProceed.addEventListener('click', (e) => {
            // Check form validation
            if (!checkoutForm.checkValidity()) {
                checkoutForm.reportValidity();
                return;
            }

            // Save order metadata (form details and final pricing summary)
            const pendingOrder = {
                customer: {
                    email: document.getElementById('checkoutEmail').value,
                    mobile: document.getElementById('checkoutMobile').value,
                    firstName: document.getElementById('checkoutFirstName').value,
                    lastName: document.getElementById('checkoutLastName').value,
                    street: document.getElementById('checkoutStreet').value,
                    city: document.getElementById('checkoutCity').value,
                    zipCode: document.getElementById('checkoutZip').value,
                },
                pricing: {
                    subtotal: subtotal,
                    shipping: shippingFee,
                    total: subtotal + shippingFee
                }
            };

            localStorage.setItem('relaxaa_pending_order', JSON.stringify(pendingOrder));

            // Redirect
            window.location.href = "payment.html";
        });
    }

});
