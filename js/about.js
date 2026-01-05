/**
 * About Section Manager
 * Handles about section rendering and animations
 */

const About = {
    hasAnimated: false,
    observer: null,
    
    init() {
        this.render();
        this.setupScrollAnimation();
    },
    
    render() {
        const about = document.getElementById('about');
        if (!about) return;
        
        const currentLang = LanguageManager.getCurrentLanguage();
        const translations = LanguageManager.translations[currentLang];
        const aboutData = translations?.about || {};
        
        about.innerHTML = `
            <div class="about-container">
                <div class="about-content">
                    <!-- Title -->
                    <h2 class="about-title" data-i18n="about.title">
                        ${aboutData.title || 'Sobre Mí'}
                    </h2>
                    
                    <!-- Personal Description -->
                    <h2 class="hero-title about-description-personal" data-i18n="about.personalDescription">
                        ${aboutData.personalDescription || 'Descripción personal...'}
                    </h2>
                    
                    <!-- Professional Description -->
                    <div class="about-description-wrapper">
                        <p class="about-description about-description-professional" data-i18n="about.professionalDescription">
                            ${aboutData.professionalDescription || 'Descripción profesional...'}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // Reset animation state when re-rendering
        this.hasAnimated = false;
    },
    
    setupScrollAnimation() {
        const about = document.getElementById('about');
        if (!about) return;
        
        // Check if element is already visible in viewport
        const isElementVisible = () => {
            const rect = about.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            // Check if any part of the element is visible in the viewport
            return (
                rect.top < windowHeight &&
                rect.bottom >= 0 &&
                rect.left < windowWidth &&
                rect.right >= 0
            );
        };
        
        // If element is already visible, animate immediately
        if (isElementVisible() && !this.hasAnimated) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                this.animateEntrance();
                this.hasAnimated = true;
            }, 100);
            return;
        }
        
        // Use Intersection Observer for scroll-triggered animations
        if (!('IntersectionObserver' in globalThis)) {
            // Fallback for browsers without IntersectionObserver
            this.animateEntrance();
            return;
        }
        
        // Create observer if it doesn't exist
        if (!this.observer) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.hasAnimated) {
                        this.animateEntrance();
                        this.hasAnimated = true;
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            });
        }
        
        // Observe the about section
        this.observer.observe(about);
    },
    
    animateEntrance() {
        const about = document.getElementById('about');
        if (!about || typeof anime === 'undefined') return;
        
        // Animate title
        const title = about.querySelector('.about-title');
        if (title) {
            anime({
                targets: title,
                translateY: [-30, 0],
                opacity: [0, 1],
                duration: 800,
                delay: 100,
                easing: 'easeOutExpo'
            });
        }
        
        // Animate personal description
        const personalDesc = about.querySelector('.about-description-personal');
        if (personalDesc) {
            anime({
                targets: personalDesc,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: 300,
                easing: 'easeOutExpo'
            });
        }
        
        // Animate professional description
        const professionalDesc = about.querySelector('.about-description-professional');
        if (professionalDesc) {
            anime({
                targets: professionalDesc,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: 500,
                easing: 'easeOutExpo'
            });
        }
    },
    
    /**
     * Update about content when language changes
     */
    updateOnLanguageChange() {
        // Re-render about to update translations
        this.render();
        // Reset animation state
        this.hasAnimated = false;
        // Re-setup scroll animation
        this.setupScrollAnimation();
    }
};

