// Service card toggle functionality



document.querySelectorAll('.service-card').forEach(card => {
    const checkbox = card.querySelector('.service-checkbox');
    const detailsId = card.getAttribute('data-service') + '-details';
    const details = document.getElementById(detailsId);

    card.addEventListener('click', function (e) {
        if (e.target !== checkbox && e.target.type !== 'checkbox' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT' && e.target.tagName !== 'TEXTAREA') {
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

// Price calculation
function updatePriceSummary() {
    let total = 0;
    let items = [];

    // Carpet cleaning
    if (document.getElementById('carpet-check').checked) {
        const rooms = document.getElementById('carpet-rooms').value;
        if (rooms) {
            const prices = [45, 90, 135, 180, 225, 270, 315, 360];
            const price = Math.max(90, prices[rooms - 1] || 0);
            total += price;
            items.push({ name: `Carpet Cleaning (${rooms} rooms)`, price: price });
        }

        if (document.getElementById('carpet-urine').checked) {
            total += 50;
            items.push({ name: 'Urine Treatment', price: 50 });
        }
        if (document.getElementById('carpet-stain').checked) {
            total += 35;
            items.push({ name: 'Stain Removal', price: 35 });
        }
    }

    // Rug cleaning
    if (document.getElementById('rug-check').checked) {
        const size = document.getElementById('rug-size').value;
        if (size) {
            total += parseInt(size);
            items.push({ name: 'Rug Cleaning', price: parseInt(size) });
        }
    }

    // Upholstery
    if (document.getElementById('upholstery-check').checked) {
        const upholsteryItems = ['armchair', 'sofa2', 'sofa3', 'sofa4', 'sofa5', 'sofa6'];
        upholsteryItems.forEach(item => {
            const checkbox = document.getElementById(item);
            if (checkbox && checkbox.checked) {
                const price = parseInt(checkbox.value);
                total += price;
                items.push({ name: checkbox.nextElementSibling.textContent.split('-')[0].trim(), price: price });
            }
        });
    }

    // Mattress
    if (document.getElementById('mattress-check').checked) {
        const size = document.getElementById('mattress-size').value;
        if (size) {
            total += parseInt(size);
            items.push({ name: 'Mattress Cleaning', price: parseInt(size) });
        }
    }

    // Tile & Grout
    if (document.getElementById('tile-check').checked) {
        const sqm = document.getElementById('tile-sqm').value;
        if (sqm) {
            const price = parseInt(sqm) * 5;
            total += price;
            items.push({ name: `Tile & Grout (${sqm} sqm)`, price: price });
        }
    }

    // Window cleaning
    if (document.getElementById('window-check').checked) {
        const size = document.getElementById('window-size').value;
        if (size) {
            total += parseInt(size);
            items.push({ name: 'Window Cleaning', price: parseInt(size) });
        }
    }

    // General cleaning
    if (document.getElementById('general-check').checked) {
        const hours = document.getElementById('general-hours').value;
        if (hours) {
            const price = parseInt(hours) * 58;
            total += price;
            items.push({ name: `General Cleaning (${hours} hours)`, price: price });
        }
    }

    // End of lease
    if (document.getElementById('lease-check').checked) {
        items.push({ name: 'End of Lease Cleaning', price: 'Quote Required' });
    }

    // Update summary display
    const summaryDiv = document.getElementById('summary-items');
    if (items.length > 0) {
        let html = '';
        items.forEach(item => {
            html += `<div class="summary-item">
                        <span>${item.name}</span>
                        <span>${typeof item.price === 'number' ? '$' + item.price : item.price}</span>
                    </div>`;
        });
        summaryDiv.innerHTML = html;

        if (total > 0) {
            document.querySelector('.summary-total').style.display = 'flex';
            document.getElementById('total-price').textContent = '$' + total;
        } else {
            document.querySelector('.summary-total').style.display = 'none';
        }
    } else {
        summaryDiv.innerHTML = '<p class="text-muted">Select services to see pricing</p>';
        document.querySelector('.summary-total').style.display = 'none';
    }
}

// Add event listeners for all price-affecting inputs
document.querySelectorAll('select, input[type="number"], input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', updatePriceSummary);
});

// Step navigation
function nextStep(stepNumber) {
    // Hide all sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    document.getElementById('step' + stepNumber).classList.add('active');

    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    const offset = 100; // Small offset from top
    const elementPosition = bookingSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function prevStep(stepNumber) {
    nextStep(stepNumber);
}

// Form submission
function submitBooking() {
    // Validate required fields
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name || !email || !phone) {
        alert('Please fill in all required contact details.');
        return;
    }

    // Get preferred time value (custom or selected)
    const timeSelect = document.getElementById('preferred-time').value;
    let preferredTime = timeSelect;
    if (timeSelect === 'custom') {
        const customTime = document.getElementById('custom-time').value;
        preferredTime = customTime || 'Custom time to be specified';
    }

    // Collect booking data
    const bookingData = {
        services: [],
        propertyType: document.getElementById('property-type').value,
        bedrooms: document.getElementById('bedrooms').value,
        bathrooms: document.getElementById('bathrooms').value,
        address: {
            street: document.getElementById('street-address').value,
            suburb: document.getElementById('suburb').value,
            postcode: document.getElementById('postcode').value
        },
        preferredDate: document.getElementById('preferred-date').value,
        preferredTime: preferredTime,
        contact: {
            name: name,
            email: email,
            phone: phone
        },
        specialNotes: document.getElementById('special-notes').value
    };

    // Hide form sections
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show confirmation
    const confirmation = document.getElementById('confirmation');
    confirmation.classList.add('show');

    // Build summary
    const summaryDiv = document.getElementById('booking-summary');
    let summaryHTML = '<div class="text-start">';
    summaryHTML += `<p><strong>Name:</strong> ${bookingData.contact.name}</p>`;
    summaryHTML += `<p><strong>Email:</strong> ${bookingData.contact.email}</p>`;
    summaryHTML += `<p><strong>Phone:</strong> ${bookingData.contact.phone}</p>`;
    summaryHTML += `<p><strong>Address:</strong> ${bookingData.address.street}, ${bookingData.address.suburb}</p>`;
    summaryHTML += `<p><strong>Preferred Date:</strong> ${bookingData.preferredDate}</p>`;
    summaryHTML += `<p><strong>Preferred Time:</strong> ${bookingData.preferredTime}</p>`;
    summaryHTML += `<p><strong>Estimated Total:</strong> ${document.getElementById('total-price').textContent}</p>`;
    summaryHTML += '</div>';
    summaryDiv.innerHTML = summaryHTML;

    // Scroll to confirmation
    window.scrollTo({ top: 300, behavior: 'smooth' });

    // In a real application, you would send this data to your server
    console.log('Booking submitted:', bookingData);
}







// Scroll to booking section
function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Toggle custom time input
function toggleCustomTime() {
    const timeSelect = document.getElementById('preferred-time');
    const customTimeGroup = document.getElementById('custom-time-group');

    if (timeSelect.value === 'custom') {
        customTimeGroup.style.display = 'block';
    } else {
        customTimeGroup.style.display = 'none';
    }
}

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('preferred-date').setAttribute('min', today);
