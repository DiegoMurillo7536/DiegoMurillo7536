/**
 * Projects Section Manager
 * Handles projects section rendering and animations
 */

const Projects = {
    hasAnimated: false,
    observer: null,
    
    init() {
        this.render();
        this.setupScrollAnimation();
        
        // Also check on window load (in case page loads with projects already visible)
        window.addEventListener('load', () => {
            if (!this.hasAnimated) {
                const projects = document.getElementById('projects');
                if (projects) {
                    const rect = projects.getBoundingClientRect();
                    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                    
                    // If projects section is visible or partially visible
                    if (rect.top < windowHeight && rect.bottom > 0) {
                        setTimeout(() => {
                            if (!this.hasAnimated) {
                                this.animateEntrance();
                                this.hasAnimated = true;
                            }
                        }, 100);
                    }
                }
            }
        });
    },
    
    render() {
        const projects = document.getElementById('projects');
        if (!projects) return;
        
        const currentLang = LanguageManager.getCurrentLanguage();
        const translations = LanguageManager.translations[currentLang];
        const projectsData = translations?.projects || {};
        const projectsList = projectsData.items || [];
        
        projects.innerHTML = `
            <div class="projects-container">
                <h2 class="projects-title" data-i18n="projects.title">
                    ${projectsData.title || 'Proyectos Personales'}
                </h2>
                
                <div class="projects-grid">
                    ${projectsList.map((project, index) => this.renderProjectCard(project, index, projectsData)).join('')}
                </div>
            </div>
        `;
        
        // Reset animation state when re-rendering
        this.hasAnimated = false;
    },
    
    renderProjectCard(project, index, projectsData) {
        const technologies = project.technologies || [];
        const technologiesHtml = technologies.map(tech => 
            `<span class="project-tech-tag">${tech}</span>`
        ).join('');
        
        const buttonsHtml = `
            ${project.github ? `
                <a href="${project.github}" 
                   class="btn btn-secondary project-btn" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="${projectsData.viewCode}">
                    ${projectsData.viewCode || 'Ver Código'}
                </a>
            ` : ''}
            ${project.demo ? `
                <a href="${project.demo}" 
                   class="btn btn-primary project-btn" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="${projectsData.viewDemo}">
                    ${projectsData.viewDemo || 'Ver Demo'}
                </a>
            ` : ''}
        `;
        
        const imageHtml = project.image ? `
            <div class="project-image-wrapper">
                <img src="${project.image}" 
                     alt="${project.title || 'Proyecto'}" 
                     class="project-image"
                     loading="lazy">
            </div>
        ` : '';
        
        return `
            <article class="project-card" data-index="${index}">
                <div class="project-card-content">
                    ${imageHtml}
                    <h3 class="project-title">${project.title || 'Proyecto'}</h3>
                    <p class="project-description">${project.description || ''}</p>
                    
                    <div class="project-technologies">
                        <span class="project-technologies-label">${projectsData.technologies || 'Tecnologías'}:</span>
                        <div class="project-tech-tags">
                            ${technologiesHtml}
                        </div>
                    </div>
                    
                    ${buttonsHtml ? `
                        <div class="project-buttons">
                            ${buttonsHtml}
                        </div>
                    ` : ''}
                </div>
            </article>
        `;
    },
    
    setupScrollAnimation() {
        const projects = document.getElementById('projects');
        if (!projects) return;
        
        // Check if element is already visible in viewport
        const isElementVisible = () => {
            const rect = projects.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;
            
            // Check if any part of the element is visible in the viewport
            // More lenient check - if top is above viewport but bottom is visible, or vice versa
            return (
                (rect.top >= 0 && rect.top < windowHeight) ||
                (rect.bottom > 0 && rect.bottom <= windowHeight) ||
                (rect.top < 0 && rect.bottom > windowHeight)
            ) && (
                rect.left < windowWidth &&
                rect.right > 0
            );
        };
        
        // Check visibility after a short delay to ensure DOM is ready
        const checkAndAnimate = () => {
            if (isElementVisible() && !this.hasAnimated) {
                this.animateEntrance();
                this.hasAnimated = true;
                return true;
            }
            return false;
        };
        
        // Try immediately
        if (checkAndAnimate()) {
            return;
        }
        
        // Try again after a short delay (in case DOM isn't fully ready)
        setTimeout(() => {
            if (checkAndAnimate()) {
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
                    threshold: 0.1,
                    rootMargin: '50px 0px -50px 0px'
                });
            }
            
            // Observe the projects section
            this.observer.observe(projects);
        }, 200);
    },
    
    animateEntrance() {
        const projects = document.getElementById('projects');
        if (!projects) return;
        
        // Fallback: if anime.js is not available, just show elements
        if (typeof anime === 'undefined') {
            const title = projects.querySelector('.projects-title');
            const cards = projects.querySelectorAll('.project-card');
            
            if (title) {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }
            
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
            
            return;
        }
        
        // Animate title
        const title = projects.querySelector('.projects-title');
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
        
        // Animate project cards with stagger effect
        const cards = projects.querySelectorAll('.project-card');
        if (cards.length > 0) {
            anime({
                targets: cards,
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(100, {start: 300}),
                easing: 'easeOutExpo'
            });
        }
    },
    
    /**
     * Update projects content when language changes
     */
    updateOnLanguageChange() {
        // Re-render projects to update translations
        this.render();
        // Reset animation state
        this.hasAnimated = false;
        // Re-setup scroll animation
        this.setupScrollAnimation();
    }
};

