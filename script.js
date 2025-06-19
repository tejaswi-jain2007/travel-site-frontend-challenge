// Loader logic
window.addEventListener("load", () => {
    let percent = 0;
    const percentageText = document.getElementById("percentage");
    const interval = setInterval(() => {
        percent += Math.floor(Math.random() * 5) + 1;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
        }
        if (percentageText) {
            percentageText.textContent = percent + "%";
        }
    }, 100);

    setTimeout(() => {
        const loaderWrapper = document.getElementById("loader-wrapper");
        if (loaderWrapper) {
            loaderWrapper.classList.add("hidden");
        }
    }, 4000); // Hide loader after 4 seconds
});


document.addEventListener('DOMContentLoaded', function() {
    // Parallax Effect
    function parallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-bg, .parallax-bg-2');
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }

    // Scroll Popup Animation
    function scrollPopupAnimation() {
        const popupElements = document.querySelectorAll('.scroll-popup');
        
        popupElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // Floating Image on Hover
    function setupFloatingImages() {
    const hoverWords = document.querySelectorAll('.hover-word');
    const floatingImage = document.getElementById('floatingImage');
    const floatingImg = document.getElementById('floatingImg');
    const imageCounter = document.getElementById('imageCounter');

    hoverWords.forEach(word => {
        const images = JSON.parse(word.getAttribute('data-images'));
        let currentIndex = 0;
        let interval;

        word.addEventListener('mouseenter', function (e) {
            if (!images || images.length === 0) return;

            floatingImage.classList.add('show');
            floatingImg.src = images[currentIndex];
            imageCounter.textContent = `${currentIndex + 1}/${images.length}`;
            updateFloatingImagePosition(e);

            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                floatingImg.src = images[currentIndex];
                imageCounter.textContent = `${currentIndex + 1}/${images.length}`;
            }, 1000);
        });

        word.addEventListener('mousemove', updateFloatingImagePosition);

        word.addEventListener('mouseleave', function () {
            floatingImage.classList.remove('show');
            clearInterval(interval);
        });
    });

    function updateFloatingImagePosition(e) {
        const x = e.clientX + 20;
        const y = e.clientY - 100;
        floatingImage.style.left = x + 'px';
        floatingImage.style.top = y + 'px';
    }
}


    // Ripple Effect
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }

    // Carousel Functionality
    function setupCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto-play carousel
        setInterval(nextSlide, 5000);
    }

    // Smooth Scrolling for Navigation
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Navbar Background on Scroll
    function setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Initialize all functions
    setupFloatingImages();
    setupCarousel();
    setupSmoothScrolling();
    setupNavbarScroll();
    
    // Add ripple effect to all ripple buttons
    const rippleButtons = document.querySelectorAll('.ripple-btn');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        parallaxEffect();
        scrollPopupAnimation();
    });
    
    // Initial call for scroll animations
    scrollPopupAnimation();
});

// Additional animations for enhanced user experience
function addLoadingAnimation() {
    const hero = document.querySelector('.hero-content');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
        hero.style.transition = 'all 1s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 500);
}

// Call loading animation when page loads
window.addEventListener('load', addLoadingAnimation);

// Add intersection observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all scroll popup elements
document.querySelectorAll('.scroll-popup').forEach(el => {
    observer.observe(el);
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

// Toggle on click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
}

// Ripple effect on Start Your Journey button
$(document).ready(function () {
    try {
        $('.ripple-button-container').ripples({
            resolution: 256,
            dropRadius: 15,
            perturbance: 0.04,
            interactive: true
        });
    } catch (e) {
        console.warn("Ripples not supported:", e);
    }
});
