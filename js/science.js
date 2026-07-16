/* ═══════════════════════════════════════════
   RELAXAA — Thread & Tech Lab Logic
   Magnification magnifier & heat simulator
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Magnification Zoom Simulator ───
    const zoomSlider = document.getElementById('zoomSlider');
    const microView = document.getElementById('microView');
    const scopeCoords = document.getElementById('scopeCoords');
    const scopeMag = document.getElementById('scopeMag');
    const zoomTitle = document.getElementById('zoomTitle');
    const zoomDesc = document.getElementById('zoomDesc');

    if (zoomSlider && microView) {
        // Track mouse movement inside scope to shift focal offset (feels like a true magnifier!)
        const scopeWrapper = microView.parentElement;
        scopeWrapper.addEventListener('mousemove', (e) => {
            const rect = scopeWrapper.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            // Limit coordinate display
            scopeCoords.textContent = `MAG_LENS: X[${Math.round(x)}µm] Y[${Math.round(y)}µm]`;

            // Shift background position scale focus slightly based on mouse
            const zoomVal = zoomSlider.value;
            const originX = (x * 0.5) + 25; // damp shift
            const originY = (y * 0.5) + 25;
            microView.style.transformOrigin = `${originX}% ${originY}%`;
        });

        scopeWrapper.addEventListener('mouseleave', () => {
            scopeCoords.textContent = 'MAG_LENS: SCAN_ACTIVE';
            microView.style.transformOrigin = 'center center';
        });

        // Zoom updates
        zoomSlider.addEventListener('input', (e) => {
            const zoomVal = parseInt(e.target.value);
            scopeMag.textContent = `ZOOM: ${zoomVal}.0X`;

            // Scale factor transition (map 1-500 to scale 1-12)
            const scale = 1 + (zoomVal / 500) * 11;
            microView.style.transform = `scale(${scale})`;

            // Info Box content morph based on zoom depth
            if (zoomVal < 80) {
                zoomTitle.textContent = '1x Standard Surface';
                zoomTitle.style.color = 'var(--lavender)';
                zoomDesc.textContent = 'You are viewing the outer linen weaves. The organic fiber arrangement produces standard high-end sheen and soft exterior texturing.';
            } else if (zoomVal >= 80 && zoomVal < 250) {
                zoomTitle.textContent = '120x Microscale Loop';
                zoomTitle.style.color = 'var(--gold)';
                zoomDesc.textContent = 'Magnifying the yarn twist structure. Double-stranded locking patterns provide the fabric with durability while retaining light elasticity.';
            } else if (zoomVal >= 250 && zoomVal < 420) {
                zoomTitle.textContent = '350x Capillary Threads';
                zoomTitle.style.color = 'var(--bamboo-green)';
                zoomDesc.textContent = 'Pores within the organic filaments start separating. These natural canals draw wetness away under capillary action, accelerating evaporation.';
            } else {
                zoomTitle.textContent = '500x Cellular Ventilation';
                zoomTitle.style.color = 'var(--black)';
                zoomDesc.textContent = 'Deep micro-cellular structure. Highly ventilated pocket spaces release thermal energy immediately, creating the signature cooling effect.';
            }
        });
    }


    // ─── Thermodynamics Simulator ───
    const tempSlider = document.getElementById('tempSlider');
    const tempIndicator = document.getElementById('tempIndicator');
    const cottonHeat = document.getElementById('cottonHeat');
    const bambooHeat = document.getElementById('bambooHeat');
    const cottonTemp = document.getElementById('cottonTemp');
    const bambooTemp = document.getElementById('bambooTemp');

    if (tempSlider && tempIndicator) {
        tempSlider.addEventListener('input', (e) => {
            const tempVal = parseInt(e.target.value);
            tempIndicator.textContent = `Room: ${tempVal}°C`;

            // Calculate heating factors
            // Cotton traps much more heat as ambient rises
            const cottonSens = (tempVal * 1.05 + 10.6).toFixed(1);
            // Bamboo keeps temperature lower and diffuses heat
            const bambooSens = (tempVal * 0.95 + 10.4).toFixed(1);

            cottonTemp.textContent = `SENS: ${cottonSens}°C`;
            bambooTemp.textContent = `SENS: ${bambooSens}°C`;

            // Adjust heat map color stops dynamically based on temp
            // Map 15-35 to a range of color intensities
            const cottonAlpha = (tempVal - 15) / 20; // 0 to 1
            const bambooAlpha = (tempVal - 15) / 20;

            // Cotton transitions to deep red/yellow hot zone
            cottonHeat.style.background = `radial-gradient(circle, 
                rgba(255, 44, 0, ${0.4 + cottonAlpha * 0.6}) 10%, 
                rgba(212, 95, 0, ${0.3 + cottonAlpha * 0.5}) 45%, 
                rgba(24, 12, 0, 0.9) 90%)`;

            // Bamboo remains ventilated cool green/cyan/blue
            bambooHeat.style.background = `radial-gradient(circle, 
                rgba(0, 210, 255, ${0.2 + bambooAlpha * 0.3}) 5%, 
                rgba(0, 119, 74, ${0.3 + bambooAlpha * 0.4}) 35%, 
                rgba(5, 22, 12, 0.95) 85%)`;
        });
    }

});
