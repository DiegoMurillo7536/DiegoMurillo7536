/**
 * Contact Section Manager
 * Handles contact section rendering and animations
 */

const Contact = {
    hasAnimated: false,
    observer: null,
    
    // Professional contact information - user should replace these with their own
    professionalEmail: 'trabajo.dams@gmail.com',
    githubUrl: 'https://github.com/DiegoMurillo7536',
    linkedinUrl: 'https://www.linkedin.com/in/diego-alexander-murillo-su%C3%A1rez-9a8b42234/',
    
    init() {
        this.render();
        this.setupScrollAnimation();
    },
    
    render() {
        const contact = document.getElementById('contact');
        if (!contact) return;
        
        const currentLang = LanguageManager.getCurrentLanguage();
        const translations = LanguageManager.translations[currentLang];
        const contactData = translations?.contact || {};
        
        contact.innerHTML = `
            <div class="contact-container">
                <h2 class="contact-title" data-i18n="contact.title">
                    ${contactData.title || 'Contacto'}
                </h2>
                
                <p class="contact-subtitle" data-i18n="contact.subtitle">
                    ${contactData.subtitle || '¿Tienes un proyecto en mente? ¡Hablemos!'}
                </p>
                
                <div class="contact-content">
                    <div class="contact-links">
                        <!-- Email Link -->
                        <a href="mailto:${this.professionalEmail}" 
                           class="contact-link contact-email-link"
                           aria-label="Enviar correo electrónico">
                            <svg class="contact-icon" 
                                 xmlns="http://www.w3.org/2000/svg" 
                                 viewBox="0 0 24 24" 
                                 fill="none" 
                                 stroke="currentColor" 
                                 stroke-width="2" 
                                 stroke-linecap="round" 
                                 stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span class="contact-link-text">${this.professionalEmail}</span>
                        </a>
                        
                        <!-- GitHub Link -->
                        <a href="${this.githubUrl}" 
                           class="contact-link contact-github-link"
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="Visitar perfil de GitHub">
                            <svg class="contact-icon" 
                                 xmlns="http://www.w3.org/2000/svg" 
                                 viewBox="0 0 24 24" 
                                 fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span class="contact-link-text">GitHub</span>
                        </a>
                        
                        <!-- LinkedIn Link -->
                        <a href="${this.linkedinUrl}" 
                           class="contact-link contact-linkedin-link"
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="Visitar perfil de LinkedIn">
                            <svg class="contact-icon" 
                                 xmlns="http://www.w3.org/2000/svg" 
                                 viewBox="0 0 24 24" 
                                 fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            <span class="contact-link-text">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Reset animation state when re-rendering
        this.hasAnimated = false;
    },
    
    setupScrollAnimation() {
        const contact = document.getElementById('contact');
        if (!contact) return;
        
        // Check if element is already visible in viewport
        const isElementVisible = () => {
            const rect = contact.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            return (
                rect.top < windowHeight &&
                rect.bottom >= 0 &&
                rect.left < windowWidth &&
                rect.right >= 0
            );
        };
        
        // If element is already visible, animate immediately
        if (isElementVisible() && !this.hasAnimated) {
            setTimeout(() => {
                this.animateEntrance();
                this.hasAnimated = true;
            }, 100);
            return;
        }
        
        // Use Intersection Observer for scroll-triggered animations
        if (!('IntersectionObserver' in globalThis)) {
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
        
        // Observe the contact section
        this.observer.observe(contact);
    },
    
    animateEntrance() {
        const contact = document.getElementById('contact');
        if (!contact || typeof anime === 'undefined') return;
        
        // Animate title
        const title = contact.querySelector('.contact-title');
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
        
        // Animate subtitle
        const subtitle = contact.querySelector('.contact-subtitle');
        if (subtitle) {
            anime({
                targets: subtitle,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
                delay: 300,
                easing: 'easeOutExpo'
            });
        }
        
        // Animate contact links with stagger
        const contactLinks = contact.querySelectorAll('.contact-link');
        contactLinks.forEach((link, index) => {
            anime({
                targets: link,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 800,
                delay: 500 + (index * 150),
                easing: 'easeOutExpo'
            });
        });
    },
    
    /**
     * Update contact content when language changes
     */
    updateOnLanguageChange() {
        this.render();
        this.hasAnimated = false;
        this.setupScrollAnimation();
    }
};

