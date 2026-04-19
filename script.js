// Initialize Lucide icons (already called in HTML but good to have here if needed)
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    initSmoothScroll();
    initBookingForm();
    initScrollAnimations();
});

// Smooth Scrolling for nav links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to set service from card click
function setService(serviceName) {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }
}

// Booking Form Handling
function initBookingForm() {
    const form = document.getElementById('booking-form');
    const message = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate loading state
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Confirming...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                
                // Show success message
                message.innerText = `Thank you, ${document.getElementById('name').value}! Your booking for ${document.getElementById('service').value} is confirmed. We will contact you soon.`;
                message.style.display = 'block';
                message.style.color = '#4CAF50';
                
                // Feedback animation
                message.animate([
                    { opacity: 0, transform: 'translateY(10px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], { duration: 500 });

                form.reset();
            }, 1500);
        });
    }
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards and feature cards
    document.querySelectorAll('.service-card, .feature-card, .section-title').forEach(el => {
        el.classList.add('reveal'); // Initial state
        observer.observe(el);
    });
}

// Add CSS for reveal state dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal.animate-fade {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
