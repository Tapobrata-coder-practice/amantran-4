// ========================================
// AMANTRAN GUEST HOUSE - INTERACTIVE FEATURES
// Modern JavaScript with Smooth Animations
// ========================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ========================================
// NAVBAR FUNCTIONALITY
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========================================
// BOOKING FORM WITH WHATSAPP INTEGRATION
// ========================================
const bookingForm = document.getElementById('bookingForm');
const checkInInput = document.getElementById('checkIn');
const checkOutInput = document.getElementById('checkOut');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
checkInInput.setAttribute('min', today);
checkOutInput.setAttribute('min', today);

// Update checkout min date when checkin changes
checkInInput.addEventListener('change', function() {
    const checkInDate = new Date(this.value);
    checkInDate.setDate(checkInDate.getDate() + 1);
    const minCheckOut = checkInDate.toISOString().split('T')[0];
    checkOutInput.setAttribute('min', minCheckOut);
    
    // Reset checkout if it's before new minimum
    if (checkOutInput.value && checkOutInput.value < minCheckOut) {
        checkOutInput.value = '';
    }
});

// Form submission handler
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('guestName').value,
        phone: document.getElementById('guestPhone').value,
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        roomType: document.getElementById('roomType').value,
        guests: document.getElementById('guests').value,
        specialRequests: document.getElementById('specialRequests').value
    };
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.checkIn || !formData.checkOut || !formData.roomType || !formData.guests) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculate number of nights
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    // Format dates for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-IN', options);
    };
    
    // Create WhatsApp message
    let message = `🏨 *NEW BOOKING REQUEST - AMANTRAN GUEST HOUSE*\n\n`;
    message += `👤 *Guest Details*\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n\n`;
    message += `📅 *Booking Details*\n`;
    message += `Check-in: ${formatDate(formData.checkIn)}\n`;
    message += `Check-out: ${formatDate(formData.checkOut)}\n`;
    message += `Duration: ${nights} night${nights > 1 ? 's' : ''}\n`;
    message += `Room Type: ${formData.roomType}\n`;
    message += `Guests: ${formData.guests}\n`;
    
    if (formData.specialRequests) {
        message += `\n💬 *Special Requests*\n`;
        message += `${formData.specialRequests}\n`;
    }
    
    message += `\n✨ Thank you for choosing Amantran Guest House!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp business number (replace XXXXXXXXXX with actual number)
    const whatsappNumber = '91XXXXXXXXXX';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Optional: Show success message
    showSuccessMessage();
    
    // Optional: Reset form after submission
    setTimeout(() => {
        bookingForm.reset();
    }, 1000);
});

// Success message animation
function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #D4871E 0%, #B57117 100%);
        color: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(212, 135, 30, 0.4);
        z-index: 10000;
        text-align: center;
        animation: fadeInScale 0.3s ease-out;
    `;
    
    successDiv.innerHTML = `
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 1rem;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin-bottom: 0.5rem;">Booking Request Sent!</h3>
        <p style="margin: 0; opacity: 0.9;">Opening WhatsApp to confirm your reservation...</p>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'fadeOutScale 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 2000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes fadeOutScale {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// BACK TO TOP BUTTON
// ========================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll('.feature-card, .about-img-main, .about-img-secondary, .contact-card, .info-card');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ========================================
// FORM VALIDATION ENHANCEMENTS
// ========================================
const formInputs = document.querySelectorAll('.booking-form input, .booking-form select, .booking-form textarea');

formInputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Real-time validation
    input.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = 'var(--primary)';
        } else {
            this.style.borderColor = 'var(--glass-border)';
        }
    });
});

// Phone number formatting
const phoneInput = document.getElementById('guestPhone');
phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0 && !value.startsWith('91')) {
        if (value.length === 10) {
            value = '91' + value;
        }
    }
    
    if (value.length > 12) {
        value = value.slice(0, 12);
    }
    
    if (value.startsWith('91')) {
        e.target.value = '+' + value;
    } else {
        e.target.value = value;
    }
});

// ========================================
// LAZY LOADING IMAGES
// ========================================
const images = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
} else {
    // Fallback for browsers that don't support IntersectionObserver
    images.forEach(img => {
        img.src = img.src;
    });
}

// ========================================
// PARALLAX EFFECT (SUBTLE)
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when visible
const statNumbers = document.querySelectorAll('.stat-inline h3');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            entry.target.textContent = '0';
            animateCounter(entry.target, number);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    highlightNavigation();
}, 10));

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
// Keyboard navigation for hamburger menu
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// Focus trap for mobile menu
const focusableElements = navMenu.querySelectorAll('a, button');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
    
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.focus();
    }
});

// ========================================
// LOADING STATE
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-fade-in-delayed, .animate-fade-in-delayed-2');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================
console.log('%c🏨 Welcome to Amantran Guest House', 'color: #D4871E; font-size: 24px; font-weight: bold; font-family: "Cormorant Garamond", serif;');
console.log('%cExperience Divine Hospitality in Tarapith', 'color: #B8B8B8; font-size: 14px; font-family: "Montserrat", sans-serif;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #D4871E;');
console.log('%cWebsite designed and developed with ❤️', 'color: #B8B8B8; font-size: 12px;');

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
