/* ═══════════════════════════════════════════
   RELAXAA — Payment Module
   Manages payment selections, input masking, and secure mock confirmations
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    const tabCard = document.getElementById('tabCard');
    const tabUPI = document.getElementById('tabUPI');
    const cardPanel = document.getElementById('cardPanel');
    const upiPanel = document.getElementById('upiPanel');

    const paymentSubtotal = document.getElementById('paymentSubtotal');
    const paymentShipping = document.getElementById('paymentShipping');
    const paymentTotal = document.getElementById('paymentTotal');
    const paymentAddressDisplay = document.getElementById('paymentAddressDisplay');

    const btnPlaceOrder = document.getElementById('btnPlaceOrder');
    const processingOverlay = document.getElementById('processingOverlay');
    const paymentSection = document.getElementById('paymentSection');
    const successCard = document.getElementById('successCard');

    const successOrderId = document.getElementById('successOrderId');
    const successDelivery = document.getElementById('successDelivery');
    const successTotal = document.getElementById('successTotal');

    let activePaymentType = 'card'; // 'card' or 'upi'

    // ─── Fetch Pending Order Metadata ───
    function getPendingOrder() {
        try {
            return JSON.parse(localStorage.getItem('relaxaa_pending_order')) || null;
        } catch {
            return null;
        }
    }

    const pendingOrder = getPendingOrder();

    if (!pendingOrder) {
        alert("No order details found. Returning to checkout.");
        window.location.href = "checkout.html";
        return;
    }

    // ─── Populate Summary Fields ───
    paymentSubtotal.textContent = `₹${pendingOrder.pricing.subtotal.toLocaleString('en-IN')}`;
    paymentShipping.textContent = pendingOrder.pricing.shipping === 0 ? "Free" : `₹${pendingOrder.pricing.shipping.toLocaleString('en-IN')}`;
    paymentTotal.textContent = `₹${pendingOrder.pricing.total.toLocaleString('en-IN')}`;

    // Address displays
    const customer = pendingOrder.customer;
    paymentAddressDisplay.innerHTML = `
        <strong>${customer.firstName} ${customer.lastName}</strong><br>
        ${customer.street}<br>
        ${customer.city}, ${customer.zipCode}<br>
        Mobile: ${customer.mobile}<br>
        Email: ${customer.email}
    `;

    // ─── Tab Switching ───
    if (tabCard && tabUPI) {
        tabCard.addEventListener('click', () => {
            activePaymentType = 'card';
            tabCard.classList.add('active');
            tabUPI.classList.remove('active');
            cardPanel.classList.add('active');
            upiPanel.classList.remove('active');
        });

        tabUPI.addEventListener('click', () => {
            activePaymentType = 'upi';
            tabUPI.classList.add('active');
            tabCard.classList.remove('active');
            upiPanel.classList.add('active');
            cardPanel.classList.remove('active');
        });
    }

    // ─── Cards Form Input Formatting ───
    const inputCardNumber = document.getElementById('cardNumber');
    const inputCardExpiry = document.getElementById('cardExpiry');
    const inputCardCVV = document.getElementById('cardCVV');

    if (inputCardNumber) {
        inputCardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Numbers only
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) formatted += ' ';
                formatted += value[i];
            }
            e.target.value = formatted;
        });
    }

    if (inputCardExpiry) {
        inputCardExpiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Numbers only
            let formatted = '';
            if (value.length > 2) {
                formatted = value.substring(0, 2) + '/' + value.substring(2, 4);
            } else {
                formatted = value;
            }
            e.target.value = formatted;
        });
    }

    if (inputCardCVV) {
        inputCardCVV.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, ''); // Numbers only
        });
    }

    // ─── Authorize payment action ───
    if (btnPlaceOrder) {
        btnPlaceOrder.addEventListener('click', () => {
            // If card form, reports browser validations
            if (activePaymentType === 'card') {
                if (!cardPanel.checkValidity()) {
                    cardPanel.reportValidity();
                    return;
                }
            }

            // Launch security scanning overlay
            processingOverlay.classList.add('active');

            setTimeout(() => {
                // Clear active processing
                processingOverlay.classList.remove('active');

                // Clear main payment layout, reveal success card
                paymentSection.style.display = 'none';
                successCard.style.display = 'block';

                // Display final invoice receipts
                const randomIdNum = Math.floor(10000000 + Math.random() * 90000000);
                successOrderId.textContent = `RLX-${randomIdNum}-B`;
                successDelivery.textContent = pendingOrder.pricing.shipping === 249 ? "Express (1-2 Business Days)" : "Standard (3-5 Business Days)";
                successTotal.textContent = `₹${pendingOrder.pricing.total.toLocaleString('en-IN')}`;

                // Flush local cart memory
                localStorage.removeItem('relaxaa_cart');
                localStorage.removeItem('relaxaa_pending_order');

                // Dispatch event or fire functions to recalculate header counts
                if (window.updateCartUI) {
                    window.updateCartUI(); // Reset cart sidebar HTML
                }
                const cartBadge = document.getElementById('cartBadge');
                if (cartBadge) {
                    cartBadge.textContent = '0';
                    cartBadge.style.display = 'none';
                }

            }, 2500); // 2.5s payment validation delay
        });
    }

});
