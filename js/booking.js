// ============================================================
//  4Eva Kleen — Booking Script
//  Fixes: price summary IDs, step validation, EmailJS submit
// ============================================================

// ── EmailJS Config ──────────────────────────────────────────
// Replace these three values with your own EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_mwsi3nd';
const EMAILJS_TEMPLATE_ID = 'template_3p3iq0d';
const EMAILJS_PUBLIC_KEY = 'MGYEgOwy8VSjCkIyX';
// ────────────────────────────────────────────────────────────



// ── Service-card toggle ──────────────────────────────────────
document.querySelectorAll('.service-card').forEach(card => {
    const checkbox = card.querySelector('.service-checkbox');
    const detailsId = card.getAttribute('data-service') + '-details';
    const details = document.getElementById(detailsId);

    card.addEventListener('click', function (e) {
        const tag = e.target.tagName;
        if (e.target !== checkbox && e.target.type !== 'checkbox' &&
            tag !== 'INPUT' && tag !== 'SELECT' && tag !== 'TEXTAREA' && tag !== 'LABEL') {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
        }
    });

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            card.classList.add('selected');
            details.classList.add('show');
        } else {
            card.classList.remove('selected');
            details.classList.remove('show');
        }
        updatePriceSummary();
    });
});


// ── Price Calculation ────────────────────────────────────────
function updatePriceSummary() {
    let total = 0;
    let items = [];

    // --- Carpet Steam Cleaning ---
    if (document.getElementById('carpet-check').checked) {
        const regularRooms = parseInt(document.getElementById('carpet-regular-rooms').value) || 0;
        const xlRooms = parseInt(document.getElementById('carpet-xl-rooms').value) || 0;
        let carpetPrice = (regularRooms * 45) + (xlRooms * 60);

        // Apply $90 minimum call-out only when something is selected
        if (regularRooms > 0 || xlRooms > 0) {
            carpetPrice = Math.max(90, carpetPrice);
            const desc = [];
            if (regularRooms > 0) desc.push(`${regularRooms} regular`);
            if (xlRooms > 0) desc.push(`${xlRooms} XL`);
            items.push({ name: `Carpet Cleaning (${desc.join(' + ')} room${regularRooms + xlRooms > 1 ? 's' : ''})`, price: carpetPrice });
            total += carpetPrice;
        }

        if (document.getElementById('carpet-staircase').checked) {
            total += 60;
            items.push({ name: 'Carpet – Staircase', price: 60 });
        }
        if (document.getElementById('carpet-urine').checked) {
            total += 50;
            items.push({ name: 'Carpet – Urine Treatment', price: 50 });
        }
        if (document.getElementById('carpet-stain').checked) {
            total += 35;
            items.push({ name: 'Carpet – Stain Removal', price: 35 });
        }
    }

    // --- Rug Steam Cleaning ---
    if (document.getElementById('rug-check').checked) {
        const smallRugs = parseInt(document.getElementById('rug-small').value) || 0;
        const mediumRugs = parseInt(document.getElementById('rug-medium').value) || 0;
        const largeRugs = parseInt(document.getElementById('rug-large').value) || 0;

        if (smallRugs > 0) {
            const p = smallRugs * 30;
            total += p;
            items.push({ name: `Rug Cleaning – Small (×${smallRugs})`, price: p });
        }
        if (mediumRugs > 0) {
            const p = mediumRugs * 45;
            total += p;
            items.push({ name: `Rug Cleaning – Medium (×${mediumRugs})`, price: p });
        }
        if (largeRugs > 0) {
            const p = largeRugs * 60;
            total += p;
            items.push({ name: `Rug Cleaning – Large (×${largeRugs})`, price: p });
        }
        if (document.getElementById('rug-urine').checked) {
            total += 50;
            items.push({ name: 'Rug – Urine Treatment', price: 50 });
        }
        if (document.getElementById('rug-stain').checked) {
            total += 35;
            items.push({ name: 'Rug – Stain Removal', price: 35 });
        }
    }

    // --- Upholstery Cleaning ---
    if (document.getElementById('upholstery-check').checked) {
        const upholsteryMap = {
            'qty-armchair': { label: 'Arm Chair', price: 80 },
            'qty-sofa2': { label: '2-Seater Sofa', price: 160 },
            'qty-sofa3': { label: '3-Seater Sofa', price: 180 },
            'qty-sofa4': { label: '4-Seater Sofa', price: 200 },
            'qty-sofa5': { label: '5-Seater Sofa', price: 220 },
            'qty-sofa6': { label: '6-Seater Sofa', price: 240 },
        };
        Object.entries(upholsteryMap).forEach(([id, meta]) => {
            const qty = parseInt(document.getElementById(id).value) || 0;
            if (qty > 0) {
                const p = qty * meta.price;
                total += p;
                items.push({ name: `${meta.label} (×${qty})`, price: p });
            }
        });
    }

    // --- Mattress Steam Cleaning ---
    if (document.getElementById('mattress-check').checked) {
        const single = parseInt(document.getElementById('mattress-single').value) || 0;
        const dbl = parseInt(document.getElementById('mattress-double').value) || 0;
        if (single > 0) {
            const p = single * 60;
            total += p;
            items.push({ name: `Mattress – Single (×${single})`, price: p });
        }
        if (dbl > 0) {
            const p = dbl * 80;
            total += p;
            items.push({ name: `Mattress – Double (×${dbl})`, price: p });
        }
    }

    // --- Tile & Grout ---
    if (document.getElementById('tile-check').checked) {
        const sqm = parseFloat(document.getElementById('tile-sqm').value) || 0;
        if (sqm > 0) {
            const p = sqm * 5;
            total += p;
            items.push({ name: `Tile & Grout (${sqm} sqm)`, price: p });
        }
    }

    // --- Window Cleaning ---
    if (document.getElementById('window-check').checked) {
        const val = document.getElementById('window-size').value;
        if (val) {
            const p = parseInt(val);
            const text = document.getElementById('window-size').selectedOptions[0].text;
            total += p;
            items.push({ name: `Window Cleaning – ${text.split(' - ')[0]}`, price: p });
        }
    }

    // --- General Cleaning ---
    if (document.getElementById('general-check').checked) {
        const hours = parseFloat(document.getElementById('general-hours').value) || 0;
        if (hours > 0) {
            const p = hours * 58;
            total += p;
            items.push({ name: `General Cleaning (${hours} hr${hours !== 1 ? 's' : ''})`, price: p });
        }
    }

    // --- End of Lease ---
    if (document.getElementById('lease-check').checked) {
        items.push({ name: 'End of Lease Cleaning', price: 'Quote Required' });
    }

    // ── Render summary ──
    const summaryDiv = document.getElementById('summary-items');
    const totalRow = document.querySelector('.summary-total');

    if (items.length > 0) {
        summaryDiv.innerHTML = items.map(item => `
            <div class="summary-item">
                <span>${item.name}</span>
                <span>${typeof item.price === 'number' ? '$' + item.price.toFixed(2).replace(/\.00$/, '') : item.price}</span>
            </div>`).join('');

        if (total > 0) {
            totalRow.style.display = 'flex';
            document.getElementById('total-price').textContent = '$' + total.toFixed(2).replace(/\.00$/, '');
        } else {
            totalRow.style.display = 'none';
        }
    } else {
        summaryDiv.innerHTML = '<p class="text-muted">Select services to see pricing</p>';
        totalRow.style.display = 'none';
    }
}

// Listen on every relevant input
document.querySelectorAll('select, input[type="number"], input[type="checkbox"]')
    .forEach(el => el.addEventListener('change', updatePriceSummary));
document.querySelectorAll('input[type="number"]')
    .forEach(el => el.addEventListener('input', updatePriceSummary));


// ── Step Validation ──────────────────────────────────────────
function showError(msg) {
    // Remove any existing error
    const old = document.getElementById('booking-error');
    if (old) old.remove();

    const err = document.createElement('div');
    err.id = 'booking-error';
    err.style.cssText = `
        background: #fff0f0;
        border-left: 3px solid #e53e3e;
        padding: 0.85rem 1.25rem;
        border-radius: 8px;
        font-size: 0.9rem;
        color: #c53030;
        margin-top: 1rem;
        animation: fadeIn 0.3s ease;
    `;
    err.innerHTML = `<i class="fas fa-exclamation-circle" style="margin-right:.5rem"></i>${msg}`;
    return err;
}

function clearError() {
    const old = document.getElementById('booking-error');
    if (old) old.remove();
}

function nextStep(stepNumber) {
    clearError();

    const current = stepNumber - 1;

    // ── Validate leaving step 1: at least 1 service selected ──
    if (current === 1) {
        const anySelected = [...document.querySelectorAll('.service-checkbox')].some(cb => cb.checked);
        if (!anySelected) {
            const step1 = document.getElementById('step1');
            const btn = step1.querySelector('button');
            btn.parentNode.insertBefore(showError('Please select at least one service before continuing.'), btn);
            return;
        }
    }

    // ── Validate leaving step 2: property details ──
    if (current === 2) {
        const propertyType = document.getElementById('property-type').value;
        const bedrooms = document.getElementById('bedrooms').value;
        const bathrooms = document.getElementById('bathrooms').value;

        if (!propertyType || !bedrooms || !bathrooms) {
            const step2 = document.getElementById('step2');
            const btns = step2.querySelector('.d-flex');
            btns.parentNode.insertBefore(showError('Please fill in all property details before continuing.'), btns);
            return;
        }
    }

    // ── Validate leaving step 3: address ──
    if (current === 3) {
        const street = document.getElementById('street-address').value.trim();
        const suburb = document.getElementById('suburb').value.trim();
        const postcode = document.getElementById('postcode').value.trim();

        if (!street || !suburb || !postcode) {
            const step3 = document.getElementById('step3');
            const btns = step3.querySelector('.d-flex');
            btns.parentNode.insertBefore(showError('Please fill in your full address before continuing.'), btns);
            return;
        }
    }

    // ── Validate leaving step 4: date & time ──
    if (current === 4) {
        const date = document.getElementById('preferred-date').value;
        const time = document.getElementById('preferred-time').value;

        if (!date || !time) {
            const step4 = document.getElementById('step4');
            const btns = step4.querySelector('.d-flex');
            btns.parentNode.insertBefore(showError('Please select a preferred date and time before continuing.'), btns);
            return;
        }
        if (time === 'custom' && !document.getElementById('custom-time').value.trim()) {
            const step4 = document.getElementById('step4');
            const btns = step4.querySelector('.d-flex');
            btns.parentNode.insertBefore(showError('Please specify your custom time window.'), btns);
            return;
        }
    }

    // ── Transition ──
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + stepNumber).classList.add('active');

    const bookingSection = document.getElementById('booking');
    const offsetPosition = bookingSection.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

function prevStep(stepNumber) {
    clearError();
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    document.getElementById('step' + stepNumber).classList.add('active');

    const offsetPosition = document.getElementById('booking').getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}


// ── Build a detailed service list string for the email ───────
function buildServiceSummaryText() {
    const lines = [];

    if (document.getElementById('carpet-check').checked) {
        const reg = parseInt(document.getElementById('carpet-regular-rooms').value) || 0;
        const xl = parseInt(document.getElementById('carpet-xl-rooms').value) || 0;
        if (reg > 0) lines.push(`  • Carpet – ${reg} Regular Room(s) @ $45/room`);
        if (xl > 0) lines.push(`  • Carpet – ${xl} XL Room(s) @ $60/room`);
        if (document.getElementById('carpet-staircase').checked) lines.push('  • Carpet – Staircase ($60)');
        if (document.getElementById('carpet-urine').checked) lines.push('  • Carpet – Urine Treatment ($50)');
        if (document.getElementById('carpet-stain').checked) lines.push('  • Carpet – Extensive Stain Removal ($35)');
    }

    if (document.getElementById('rug-check').checked) {
        const s = parseInt(document.getElementById('rug-small').value) || 0;
        const m = parseInt(document.getElementById('rug-medium').value) || 0;
        const l = parseInt(document.getElementById('rug-large').value) || 0;
        if (s > 0) lines.push(`  • Rug – ${s} Small @ $30/rug`);
        if (m > 0) lines.push(`  • Rug – ${m} Medium @ $45/rug`);
        if (l > 0) lines.push(`  • Rug – ${l} Large @ $60/rug`);
        if (document.getElementById('rug-urine').checked) lines.push('  • Rug – Urine Treatment ($50)');
        if (document.getElementById('rug-stain').checked) lines.push('  • Rug – Stain Removal ($35)');
    }

    if (document.getElementById('upholstery-check').checked) {
        const map = {
            'qty-armchair': 'Arm Chair ($80)',
            'qty-sofa2': '2-Seater Sofa ($160)',
            'qty-sofa3': '3-Seater Sofa ($180)',
            'qty-sofa4': '4-Seater Sofa ($200)',
            'qty-sofa5': '5-Seater Sofa ($220)',
            'qty-sofa6': '6-Seater Sofa ($240)',
        };
        Object.entries(map).forEach(([id, label]) => {
            const qty = parseInt(document.getElementById(id).value) || 0;
            if (qty > 0) lines.push(`  • Upholstery – ${qty}× ${label}`);
        });
    }

    if (document.getElementById('mattress-check').checked) {
        const s = parseInt(document.getElementById('mattress-single').value) || 0;
        const d = parseInt(document.getElementById('mattress-double').value) || 0;
        if (s > 0) lines.push(`  • Mattress – ${s} Single @ $60/each`);
        if (d > 0) lines.push(`  • Mattress – ${d} Double @ $80/each`);
    }

    if (document.getElementById('tile-check').checked) {
        const sqm = document.getElementById('tile-sqm').value;
        if (sqm) lines.push(`  • Tile & Grout – ${sqm} sqm @ $5/sqm`);
    }

    if (document.getElementById('window-check').checked) {
        const sel = document.getElementById('window-size').selectedOptions[0];
        if (sel && sel.value) lines.push(`  • Window Cleaning – ${sel.text}`);
    }

    if (document.getElementById('general-check').checked) {
        const hrs = document.getElementById('general-hours').value;
        if (hrs) lines.push(`  • General Cleaning – ${hrs} hour(s) @ $58/hr`);
    }

    if (document.getElementById('lease-check').checked) {
        lines.push('  • End of Lease Cleaning – Quote Required');
    }

    return lines.join('\n') || '  None selected';
}




// ── Form Submission with EmailJS ─────────────────────────────
function submitBooking() {
    clearError();

    const name = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !email || !phone) {
        const step5 = document.getElementById('step5');
        const btns = step5.querySelector('.d-flex');
        btns.parentNode.insertBefore(showError('Please fill in all contact details before submitting.'), btns);
        return;
    }

    // Resolve time
    const timeSelect = document.getElementById('preferred-time').value;
    let preferredTime = timeSelect;
    if (timeSelect === 'custom') {
        preferredTime = document.getElementById('custom-time').value.trim() || 'Custom time to be confirmed';
    }
    const timeLabels = {
        morning: 'Morning (8am – 12pm)',
        afternoon: 'Afternoon (12pm – 5pm)',
        flexible: 'Flexible',
    };
    preferredTime = timeLabels[preferredTime] || preferredTime;

    const serviceText = buildServiceSummaryText();
    const estimatedTotal = document.getElementById('total-price').textContent || 'See quote';

    const propertyType = document.getElementById('property-type').value || '–';
    const bedrooms = document.getElementById('bedrooms').value || '–';
    const bathrooms = document.getElementById('bathrooms').value || '–';
    const street = document.getElementById('street-address').value.trim() || '–';
    const suburb = document.getElementById('suburb').value.trim() || '–';
    const postcode = document.getElementById('postcode').value.trim() || '–';
    const prefDate = document.getElementById('preferred-date').value || '–';
    const notes = document.getElementById('special-notes').value.trim() || 'None';

    // ── EmailJS template parameters ──────────────────────────
    // Make sure your EmailJS template uses these variable names:
    //   {{client_name}}, {{client_email}}, {{client_phone}},
    //   {{property_type}}, 
    //   {{address}}, {{preferred_date}}, {{preferred_time}},
    //   {{services}}, {{estimated_total}}, {{special_notes}}

    const templateParams = {
        client_name: name,
        client_email: email,
        client_phone: phone,
        property_type: propertyType,
        address: `${street}, ${suburb} ${postcode}`,
        preferred_date: prefDate,
        preferred_time: preferredTime,
        services: serviceText,
        estimated_total: estimatedTotal,
        special_notes: notes,
    };




    // Disable button to prevent double-send
    const confirmBtn = document.querySelector('#step5 .btn.button-2');
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Sending…';

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        .then(() => {
            showConfirmation(name, email, phone, street, suburb, prefDate, preferredTime, estimatedTotal);
        })
        .catch(err => {
            console.error('EmailJS error:', err);
            confirmBtn.disabled = false;
            confirmBtn.textContent = 'Confirm Booking Request';
            const step5 = document.getElementById('step5');
            const btns = step5.querySelector('.d-flex');
            btns.parentNode.insertBefore(
                showError('There was a problem sending your request. Please try again or call us directly.'),
                btns
            );
        });
}

function showConfirmation(name, email, phone, street, suburb, prefDate, preferredTime, estimatedTotal) {
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));

    const confirmation = document.getElementById('confirmation');
    confirmation.classList.add('show');

    document.getElementById('booking-summary').innerHTML = `
        <div class="text-start">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${street}, ${suburb}</p>
            <p><strong>Preferred Date:</strong> ${prefDate || '–'}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime}</p>
            <p><strong>Estimated Total:</strong> ${estimatedTotal}</p>
        </div>`;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ── Misc ─────────────────────────────────────────────────────
function toggleCustomTime() {
    const val = document.getElementById('preferred-time').value;
    const group = document.getElementById('custom-time-group');
    group.style.display = val === 'custom' ? 'block' : 'none';
}

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('preferred-date').setAttribute('min', today);