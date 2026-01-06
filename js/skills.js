/**
 * Skills Section Manager
 * Handles skills section rendering and animations
 */

const Skills = {
    hasAnimated: false,
    observer: null,
    
    init() {
        this.render();
        this.setupScrollAnimation();
    },
    
    render() {
        const skills = document.getElementById('skills');
        if (!skills) return;
        
        const currentLang = LanguageManager.getCurrentLanguage();
        const translations = LanguageManager.translations[currentLang];
        const skillsData = translations?.skills || {};
        const categories = skillsData.categories || {};
        
        skills.innerHTML = `
            <div class="skills-container">
                <h2 class="skills-title" data-i18n="skills.title">
                    ${skillsData.title || 'Habilidades'}
                </h2>
                
                <div class="skills-grid">
                    ${Object.keys(categories).map(categoryKey => {
                        const category = categories[categoryKey];
                        return this.renderCategory(category, categoryKey);
                    }).join('')}
                </div>
            </div>
        `;
        
        // Reset animation state when re-rendering
        this.hasAnimated = false;
    },
    
    renderCategory(category, categoryKey) {
        const items = category.items || [];
        
        return `
            <div class="skills-category" data-category="${categoryKey}">
                <h3 class="skills-category-title">${category.title || categoryKey}</h3>
                <div class="skills-list">
                    ${items.map((skill, index) => this.renderSkill(skill, index)).join('')}
                </div>
            </div>
        `;
    },
    
    renderSkill(skill, index) {
        return `
            <span class="skill-badge" data-skill-index="${index}">
                ${skill.name}
            </span>
        `;
    },
    
    setupScrollAnimation() {
        const skills = document.getElementById('skills');
        if (!skills) return;
        
        // Check if element is already visible in viewport
        const isElementVisible = () => {
            const rect = skills.getBoundingClientRect();
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
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });
        }
        
        // Observe the skills section
        this.observer.observe(skills);
    },
    
    animateEntrance() {
        const skills = document.getElementById('skills');
        if (!skills || typeof anime === 'undefined') return;
        
        // Animate title
        const title = skills.querySelector('.skills-title');
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
        
        // Animate categories with stagger
        const categories = skills.querySelectorAll('.skills-category');
        categories.forEach((category, categoryIndex) => {
            anime({
                targets: category,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 700,
                delay: 300 + (categoryIndex * 150),
                easing: 'easeOutExpo'
            });
            
            // Animate category title
            const categoryTitle = category.querySelector('.skills-category-title');
            if (categoryTitle) {
                anime({
                    targets: categoryTitle,
                    translateX: [-20, 0],
                    opacity: [0, 1],
                    duration: 600,
                    delay: 400 + (categoryIndex * 150),
                    easing: 'easeOutExpo'
                });
            }
            
            // Animate skill badges with stagger - vertical list fade in
            const skillBadges = category.querySelectorAll('.skill-badge');
            skillBadges.forEach((badge, badgeIndex) => {
                anime({
                    targets: badge,
                    translateX: [-20, 0],
                    opacity: [0, 1],
                    duration: 500,
                    delay: 500 + (categoryIndex * 150) + (badgeIndex * 50),
                    easing: 'easeOutExpo'
                });
            });
        });
    },
    
    /**
     * Update skills content when language changes
     */
    updateOnLanguageChange() {
        this.render();
        this.hasAnimated = false;
        this.setupScrollAnimation();
    }
};

