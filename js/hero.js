/**
 * Hero Section Manager
 * Handles hero section rendering and animations
 */

const Hero = {
    init() {
        this.render();
        // Wait a bit for DOM to be ready before animating
        setTimeout(() => {
            this.animateEntrance();
        }, 200);
    },
    
    render() {
        const hero = document.getElementById('hero');
        if (!hero) return;
        
        const currentLang = LanguageManager.getCurrentLanguage();
        const translations = LanguageManager.translations[currentLang];
        const heroData = translations?.hero || {};
        
        hero.innerHTML = `
            <div class="hero-container">
                <div class="hero-content">
                    <!-- Greeting -->
                    <p class="hero-greeting" data-i18n="hero.greeting">
                        ${heroData.greeting || 'Hola, soy'}
                    </p>
                    
                    <!-- Name -->
                    <h1 class="hero-name" data-i18n="hero.name">
                        ${heroData.name || 'Diego Alexander Murillo Suárez'}
                    </h1>
                    
                    <!-- Title -->
                    <h2 class="hero-title" data-i18n="hero.title">
                        ${heroData.title || 'Desarrollador Backend'}
                    </h2>
                    
                    <!-- Description -->
                    <p class="hero-description" data-i18n="hero.description">
                        ${heroData.description || 'Apasionado por crear soluciones robustas y escalables'}
                    </p>
                    
                    <!-- CTA Buttons -->
                    <div class="hero-cta">
                        <a href="#projects" class="btn btn-primary" data-i18n="hero.ctaProjects">
                            ${heroData.ctaProjects || 'Ver Proyectos'}
                        </a>
                        <a href="#contact" class="btn btn-secondary" data-i18n="hero.ctaContact">
                            ${heroData.ctaContact || 'Contactar'}
                        </a>
                    </div>
                </div>
                
                <!-- Optional: Decorative elements or background -->
                <div class="hero-decoration"></div>
            </div>
        `;
    },
    
    animateEntrance() {
        const hero = document.getElementById('hero');
        if (!hero || typeof anime === 'undefined') return;
        
        // Animate greeting
        const greeting = hero.querySelector('.hero-greeting');
        if (greeting) {
            anime({
                targets: greeting,
                translateY: [-20, 0],
                opacity: [0, 1],
                duration: 800,
                delay: 100,
                easing: 'easeOutExpo'
            });
        }
        
        // Animate name with typing effect or fade in
        const name = hero.querySelector('.hero-name');
        if (name) {
            anime({
                targets: name,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: 300,
                easing: 'easeOutExpo'
            });
        }
        
        // Animate title
        const title = hero.querySelector('.hero-title');
        if (title) {
            anime({
                targets: title,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: 500,
                easing: 'easeOutExpo'
            });
        }
        
        // Animate description
        const description = hero.querySelector('.hero-description');
        if (description) {
            anime({
                targets: description,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 1000,
                delay: 700,
                easing: 'easeOutExpo'
            });
        }
        
        // Animate CTA buttons with stagger
        const buttons = hero.querySelectorAll('.btn');
        const ctaContainer = hero.querySelector('.hero-cta');
        
        // First animate the container
        if (ctaContainer) {
            anime({
                targets: ctaContainer,
                opacity: [0, 1],
                duration: 400,
                delay: 900,
                easing: 'easeOutExpo'
            });
        }
        
        // Then animate individual buttons
        if (buttons.length > 0) {
            anime({
                targets: buttons,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(100, {start: 900}),
                easing: 'easeOutExpo'
            });
        }
    },
    
    /**
     * Update hero content when language changes
     */
    updateOnLanguageChange() {
        // Re-render hero to update translations
        this.render();
        // Re-animate after a short delay
        setTimeout(() => {
            this.animateEntrance();
        }, 100);
    }
};

