// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Elements
    const mobileNav = document.getElementById('mobileNav');
    const menuToggle = document.getElementById('menuToggle');
    const closeMenuBtn = document.getElementById('closeMenu');

    // Check if mobile navigation elements exist
    if (!mobileNav || !menuToggle) {
        console.warn('Mobile navigation elements not found');
        return;
    }

    function showMobileMenu() {
        if (mobileNav) mobileNav.classList.add('active');
        if (menuToggle) menuToggle.style.display = 'none';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }

    function hideMobileMenu() {
        if (mobileNav) mobileNav.classList.remove('active');
        if (menuToggle) menuToggle.style.display = 'block';
        document.body.style.overflow = 'auto'; // Re-enable scrolling when menu is closed
    }

    // Toggle menu when clicking the hamburger icon
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileNav.classList.contains('active')) {
            hideMobileMenu();
        } else {
            showMobileMenu();
        }
    });

    // Close menu when clicking the close button
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            hideMobileMenu();
        });
    }

    // Close menu when clicking on a nav link in mobile view
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-links a');
    if (mobileLinks.length > 0) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    hideMobileMenu();
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 992) return;
        
        const isClickInside = mobileNav.contains(e.target) || 
                            (menuToggle && menuToggle.contains(e.target)) ||
                            (closeMenuBtn && closeMenuBtn.contains(e.target));
        
        if (!isClickInside && mobileNav.classList.contains('active')) {
            hideMobileMenu();
        }
    });

    // Prevent clicks inside the mobile nav from closing it
    if (mobileNav) {
        mobileNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in, .scale-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

// Initialize animations on page load
window.addEventListener('load', () => {
    animateOnScroll();
    
    // Add loaded class to body to enable transitions after page load
    document.body.classList.add('loaded');
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Newsletter subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add styles for back to top button
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: var(--secondary-color);
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-spinner"></div>
    `;
    document.body.prepend(preloader);
    
    // Add styles for preloader
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .preloader-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .preloader.hidden {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(preloaderStyle);
    
    // Hide preloader after page loads
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});
