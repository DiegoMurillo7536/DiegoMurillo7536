/**
 * Animations Manager
 * Handles all animations using Anime.js
 */

const Animations = {
    init() {
        // Initialize animations after DOM is loaded
        // Navbar and Hero animations are now handled by their respective init() methods
        this.setupScrollAnimations();
    },
    
    setupScrollAnimations() {
        // Setup animations for elements on scroll
        // This will use Intersection Observer for better performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all sections and animated elements
        document.querySelectorAll('section, .animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    },
    
    animateOnScroll(element) {
        if (typeof anime !== 'undefined') {
            anime({
                targets: element,
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            });
        }
    },
    
    animateProjects() {
        // Stagger animation for project cards
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.project-card',
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
        }
    },
    
    animateSkills() {
        // Animate skill bars or counters
        if (typeof anime !== 'undefined') {
            anime({
                targets: '.skill-bar',
                width: ['0%', (el) => el.dataset.percent + '%'],
                duration: 1500,
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
        }
    }
};

