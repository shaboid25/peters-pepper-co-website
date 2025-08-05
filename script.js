// Peter's Pepper Co - Main JavaScript File

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Contact Form Handler
    initContactForm();
    
    // Smooth Scrolling for Internal Links
    initSmoothScrolling();
    
    // Heat Level Animations
    initHeatLevelAnimations();
    
    // Newsletter Signup
    initNewsletterSignup();
    
    // Page-specific functionality
    initPageSpecificFeatures();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    // Create mobile menu button if it doesn't exist
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        // Create hamburger menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Insert before nav links
        nav.insertBefore(mobileMenuBtn, navLinks);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        // Close mobile menu when clicking on links
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                mobileMenuBtn.innerHTML = '☰';
            });
        });
    }
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Basic validation
            if (validateContactForm(formObject)) {
                // Simulate form submission
                showFormSuccess();
                contactForm.reset();
            }
        });
        
        // Real-time validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(field);
            });
        });
    }
}

// Form Validation
function validateContactForm(data) {
    let isValid = true;
    
    // Check required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        const emailInput = document.getElementById('email');
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

// Individual Field Validation
function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required`);
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

// Email Validation Helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Field Error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
}

// Clear Field Error
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
}

// Show Form Success Message
function showFormSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <h4>🌶️ Message Sent Successfully!</h4>
        <p>Thank you for contacting Peter's Pepper Co! We'll get back to you within 24 hours.</p>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successDiv, form);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Heat Level Animations
function initHeatLevelAnimations() {
    const heatMeters = document.querySelectorAll('.heat-meter');
    
    heatMeters.forEach(meter => {
        const dots = meter.querySelectorAll('.heat-dot');
        const activeDots = meter.querySelectorAll('.heat-dot.active');
        
        // Animate heat dots on page load
        setTimeout(() => {
            activeDots.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.animation = 'heatPulse 0.5s ease-in-out';
                }, index * 100);
            });
        }, 500);
        
        // Add hover effect
        meter.addEventListener('mouseenter', function() {
            activeDots.forEach(dot => {
                dot.style.transform = 'scale(1.1)';
            });
        });
        
        meter.addEventListener('mouseleave', function() {
            activeDots.forEach(dot => {
                dot.style.transform = 'scale(1)';
            });
        });
    });
}

// Newsletter Signup Handler
function initNewsletterSignup() {
    const newsletterCheckbox = document.getElementById('newsletter');
    
    if (newsletterCheckbox) {
        newsletterCheckbox.addEventListener('change', function() {
            if (this.checked) {
                showNewsletterThankYou();
            }
        });
    }
}

// Show Newsletter Thank You
function showNewsletterThankYou() {
    const checkbox = document.getElementById('newsletter');
    const label = checkbox.closest('.checkbox-group');
    
    // Create thank you message
    const thankYou = document.createElement('div');
    thankYou.className = 'newsletter-thanks';
    thankYou.innerHTML = '🌶️ Thanks for subscribing!';
    
    label.appendChild(thankYou);
    
    // Remove after 3 seconds
    setTimeout(() => {
        thankYou.remove();
    }, 3000);
}

// Page-specific Features
function initPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'products.html':
            initProductsPage();
            break;
        case 'about.html':
            initAboutPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
    }
}

// Home Page Specific
function initHomePage() {
    // Add entrance animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
}

// Products Page Specific
function initProductsPage() {
    const productCards = document.querySelectorAll('.product-card');
    
    // Add hover effects to product cards
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Animate cards on scroll
    observeProductCards();
}

// About Page Specific
function initAboutPage() {
    const valueItems = document.querySelectorAll('.value-item');
    
    // Animate value items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });
    
    valueItems.forEach(item => {
        observer.observe(item);
    });
}

// Contact Page Specific
function initContactPage() {
    // Add focus effects to form inputs
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('focused');
            }
        });
    });
}

// Observe Product Cards for Animation
function observeProductCards() {
    const cards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Utility Functions
function debounce(func, wait) {
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

// Add CSS animations via JavaScript
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heatPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .hero-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card, .product-card, .value-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .field-error {
            color: #e74c3c;
            font-size: 0.85em;
            margin-top: 5px;
        }
        
        .form-success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        
        .newsletter-thanks {
            color: #28a745;
            font-size: 0.9em;
            margin-top: 5px;
            font-weight: bold;
        }
        
        .mobile-menu-btn {
            display: none;
            background: none;
            border: 2px solid #ff6b35;
            color: #ff6b35;
            font-size: 1.5em;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .mobile-menu-btn:hover {
            background: #ff6b35;
            color: white;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            
            .nav-links.mobile-open {
                display: flex;
            }
            
            .nav-links li {
                margin: 0;
                border-bottom: 1px solid #eee;
            }
            
            .nav-links a {
                padding: 15px 20px;
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations styles
addAnimationStyles();

console.log('🌶️ Peter\'s Pepper Co website loaded successfully!');
