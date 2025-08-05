// Peter's Pepper Co - Racing Theme JavaScript

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initInteractiveElements();
    initPerformanceCounters();
    initMobileMenu();
    
    // Add racing sound effects (optional)
    initSoundEffects();
    
    console.log('🏁 Peter\'s Pepper Co Racing Engine Started! 🌶️');
});

// Navigation Functions
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 107, 53, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active nav link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu Functions
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        // Create mobile menu overlay
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu-overlay';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-content">
                <a href="index.html" class="mobile-nav-link">🏠 Pit Stop</a>
                <a href="about.html" class="mobile-nav-link">🏁 Our Track Record</a>
                <a href="products.html" class="mobile-nav-link">🔥 Fuel Options</a>
                <a href="contact.html" class="mobile-nav-link">📞 Crew Chief</a>
                <button class="mobile-order-btn">
                    <span class="btn-flames">🔥</span>
                    ORDER NOW
                    <span class="btn-speed">💨</span>
                </button>
            </div>
        `;
        document.body.appendChild(mobileMenu);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            const menuLines = this.querySelectorAll('.menu-line');
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger lines
            if (mobileMenu.classList.contains('active')) {
                menuLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                menuLines[1].style.opacity = '0';
                menuLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                const menuLines = mobileMenuBtn.querySelectorAll('.menu-line');
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on links
        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const menuLines = mobileMenuBtn.querySelectorAll('.menu-line');
                menuLines[0].style.transform = 'none';
                menuLines[1].style.opacity = '1';
                menuLines[2].style.transform = 'none';
            });
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for hero background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const speedLines = document.querySelector('.speed-lines');
        const floatingFlames = document.querySelector('.floating-flames');
        
        if (speedLines) {
            speedLines.style.transform = `translateX(${scrolled * 0.5}px)`;
        }
        
        if (floatingFlames) {
            floatingFlames.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for fuel cards
                if (entry.target.classList.contains('fuel-card')) {
                    setTimeout(() => {
                        animateFuelCard(entry.target);
                    }, 200);
                }
                
                // Special handling for performance stats
                if (entry.target.classList.contains('performance-stats')) {
                    animateCounters(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.fuel-card, .heritage-content, .performance-stats, .trophy-case').forEach(el => {
        observer.observe(el);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Turbo button effects
    const turboButtons = document.querySelectorAll('.turbo-btn, .primary-action, .cta-primary');
    turboButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const flames = this.querySelector('.btn-flames');
            const speed = this.querySelector('.btn-speed');
            
            if (flames) flames.style.animation = 'bounce 0.5s ease';
            if (speed) speed.style.animation = 'bounce 0.5s ease 0.1s';
            
            // Add engine rev sound effect (optional)
            playSound('rev');
        });
        
        btn.addEventListener('click', function() {
            // Button click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Add turbo sound effect (optional)
            playSound('turbo');
        });
    });
    
    // Fuel card hover effects
    const fuelCards = document.querySelectorAll('.fuel-card');
    fuelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const octaneRating = this.querySelector('.octane-rating');
            const fuelIcon = this.querySelector('.fuel-icon');
            const gaugeFill = this.querySelector('.gauge-fill');
            
            if (octaneRating) {
                octaneRating.style.transform = 'scale(1.1) rotate(360deg)';
                octaneRating.style.transition = 'all 0.5s ease';
            }
            
            if (fuelIcon) {
                fuelIcon.style.transform = 'scale(1.2)';
                fuelIcon.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 53, 0.5))';
            }
            
            if (gaugeFill) {
                gaugeFill.style.transform = 'scaleX(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const octaneRating = this.querySelector('.octane-rating');
            const fuelIcon = this.querySelector('.fuel-icon');
            const gaugeFill = this.querySelector('.gauge-fill');
            
            if (octaneRating) {
                octaneRating.style.transform = '';
            }
            
            if (fuelIcon) {
                fuelIcon.style.transform = '';
                fuelIcon.style.filter = '';
            }
            
            if (gaugeFill) {
                gaugeFill.style.transform = '';
            }
        });
    });
    
    // Fuel buttons
    const fuelButtons = document.querySelectorAll('.fuel-btn');
    fuelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.fuel-card');
            const fuelName = card.querySelector('.fuel-name').textContent;
            
            // Show fuel selection animation
            showFuelSelection(fuelName);
        });
    });
    
    // Speedometer interaction
    const speedometer = document.querySelector('.speedometer');
    if (speedometer) {
        speedometer.addEventListener('click', function() {
            const needle = this.querySelector('.needle');
            if (needle) {
                needle.style.animation = 'none';
                setTimeout(() => {
                    needle.style.animation = 'needleMove 3s ease-in-out infinite alternate';
                }, 100);
            }
        });
    }
}

// Performance Counter Animation
function initPerformanceCounters() {
    // This will be triggered by scroll observer
}

function animateCounters(statsContainer) {
    const statNumbers = statsContainer.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const finalValue = statNumber.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = numericValue / 50; // 50 steps
            const suffix = finalValue.replace(/\d/g, '');
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    statNumber.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    statNumber.textContent = Math.floor(currentValue) + suffix;
                }
            }, 40); // Update every 40ms
        }
    });
}

// Fuel Card Animation
function animateFuelCard(card) {
    const gaugeFill = card.querySelector('.gauge-fill');
    if (gaugeFill) {
        const targetWidth = gaugeFill.style.width;
        gaugeFill.style.width = '0%';
        
        setTimeout(() => {
            gaugeFill.style.transition = 'width 1.5s ease-out';
            gaugeFill.style.width = targetWidth;
        }, 300);
    }
}

// Fuel Selection Animation
function showFuelSelection(fuelName) {
    // Create selection popup
    const popup = document.createElement('div');
    popup.className = 'fuel-selection-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">⛽</div>
            <h3>Fuel Selected!</h3>
            <p>${fuelName} added to your cart</p>
            <div class="popup-flames">🔥💨🔥</div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Show popup
    setTimeout(() => {
        popup.classList.add('show');
    }, 100);
    
    // Remove popup after 3 seconds
    setTimeout(() => {
        popup.classList.add('hide');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }, 3000);
}

// Animation Initialization
function initAnimations() {
    // Add CSS for dynamic animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .mobile-menu-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            text-align: center;
        }
        
        .mobile-nav-link {
            color: #ccc;
            text-decoration: none;
            font-size: 1.2rem;
            font-weight: 600;
            padding: 1rem;
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        
        .mobile-nav-link:hover {
            color: #ff6b35;
            background: rgba(255, 107, 53, 0.1);
        }
        
        .mobile-order-btn {
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 30px;
            font-family: 'Orbitron', monospace;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 1rem;
        }
        
        .fuel-selection-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
            border: 2px solid #ff6b35;
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        
        .fuel-selection-popup.show {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .fuel-selection-popup.hide {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        
        .popup-content h3 {
            color: #ff6b35;
            font-family: 'Orbitron', monospace;
            margin: 1rem 0;
        }
        
        .popup-content p {
            color: #ccc;
            margin-bottom: 1rem;
        }
        
        .popup-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .popup-flames {
            font-size: 1.5rem;
            animation: bounce 1s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Sound Effects (Optional - requires audio files)
function initSoundEffects() {
    // You can add audio files and uncomment this section
    /*
    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    window.sounds = {
        rev: 'sounds/engine-rev.mp3',
        turbo: 'sounds/turbo.mp3',
        click: 'sounds/click.mp3'
    };
    */
}

function playSound(soundName) {
    // Uncomment if you add sound files
    /*
    if (window.sounds && window.sounds[soundName]) {
        const audio = new Audio(window.sounds[soundName]);
        audio.volume = 0.3;
        audio.play().catch(e => console.log('Sound play failed:', e));
    }
    */
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

// Racing Easter Eggs
document.addEventListener('keydown', function(e) {
    // Konami Code for special racing animation
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    window.konamiProgress = window.konamiProgress || 0;
    
    if (e.code === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            triggerRacingMode();
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
});

function triggerRacingMode() {
    // Secret racing mode animation
    document.body.style.animation = 'racingMode 5s ease';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes racingMode {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg) saturate(2); }
            50% { filter: hue-rotate(180deg) saturate(3); }
            75% { filter: hue-rotate(270deg) saturate(2); }
            100% { filter: hue-rotate(360deg) saturate(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Show racing message
    const message = document.createElement('div');
    message.textContent = '🏁 RACING MODE ACTIVATED! 🏁';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff6b35, #ff8c42);
        color: white;
        padding: 20px 40px;
        border-radius: 50px;
        font-family: 'Orbitron', monospace;
        font-weight: 900;
        font-size: 1.5rem;
        z-index: 10000;
        box-shadow: 0 0 50px rgba(255, 107, 53, 0.8);
        animation: pulse 2s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
        style.remove();
        document.body.style.animation = '';
    }, 5000);
}

// Initialize everything when DOM is ready
console.log('🌶️ Racing JavaScript Engine Ready to Start! 🏁');
