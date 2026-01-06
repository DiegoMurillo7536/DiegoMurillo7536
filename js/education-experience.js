/**
 * Education & Experience Section Manager
 * Handles timeline rendering and animations for education and experience
 */

const EducationExperience = {
    hasAnimated: false,
    observer: null,
    
    init() {
        this.render();
        this.setupScrollAnimation();
    },
    
    render() {
        const section = document.getElementById('education-experience');
        if (!section) return;
        
        const currentLang = LanguageManager.getCurrentLanguage();
        const translations = LanguageManager.translations[currentLang];
        const educationData = translations?.education || {};
        const experienceData = translations?.experience || {};
        
        // Get education and experience items from translations
        const educationItems = educationData.items || [];
        const experienceItems = experienceData.items || [];
        
        section.innerHTML = `
            <div class="education-experience-container">
                <!-- Title -->
                <h2 class="education-experience-title" data-i18n="educationExperience.title">
                    ${translations?.educationExperience?.title || 'Educación y Experiencia'}
                </h2>
                
                <div class="timeline-wrapper">
                    <!-- Education Section -->
                    ${educationItems.length > 0 ? `
                        <div class="timeline-section">
                            <h3 class="timeline-section-title" data-i18n="education.title">
                                ${educationData.title || 'Educación'}
                            </h3>
                            <div class="timeline">
                                ${educationItems.map((item, index) => this.renderTimelineItem(item, index, 'education')).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Experience Section -->
                    ${experienceItems.length > 0 ? `
                        <div class="timeline-section">
                            <h3 class="timeline-section-title" data-i18n="experience.title">
                                ${experienceData.title || 'Experiencia'}
                            </h3>
                            <div class="timeline">
                                ${experienceItems.map((item, index) => this.renderTimelineItem(item, index, 'experience')).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Reset animation state when re-rendering
        this.hasAnimated = false;
    },
    
    renderTimelineItem(item, index, type) {
        return `
            <div class="timeline-item" data-timeline-index="${index}">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-card">
                        <div class="timeline-header">
                            <h4 class="timeline-item-title">${item.title || ''}</h4>
                            ${item.institution || item.company ? `
                                <p class="timeline-item-institution">${item.institution || item.company || ''}</p>
                            ` : ''}
                            ${item.dates ? `
                                <p class="timeline-item-dates">${item.dates}</p>
                            ` : ''}
                        </div>
                        ${item.description ? `
                            <p class="timeline-item-description">${item.description}</p>
                        ` : ''}
                        ${item.achievements && item.achievements.length > 0 ? `
                            <ul class="timeline-item-achievements">
                                ${item.achievements.map(achievement => `
                                    <li>${achievement}</li>
                                `).join('')}
                            </ul>
                        ` : ''}
                        ${item.responsibilities && item.responsibilities.length > 0 ? `
                            <ul class="timeline-item-responsibilities">
                                ${item.responsibilities.map(responsibility => `
                                    <li>${responsibility}</li>
                                `).join('')}
                            </ul>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    },
    
    setupScrollAnimation() {
        const section = document.getElementById('education-experience');
        if (!section) return;
        
        // Check if element is already visible in viewport
        const isElementVisible = () => {
            const rect = section.getBoundingClientRect();
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
        
        // Observe the section
        this.observer.observe(section);
    },
    
    animateEntrance() {
        const section = document.getElementById('education-experience');
        if (!section || typeof anime === 'undefined') return;
        
        // Animate title
        const title = section.querySelector('.education-experience-title');
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
        
        // Animate section titles
        const sectionTitles = section.querySelectorAll('.timeline-section-title');
        sectionTitles.forEach((sectionTitle, index) => {
            anime({
                targets: sectionTitle,
                translateY: [-20, 0],
                opacity: [0, 1],
                duration: 700,
                delay: 300 + (index * 100),
                easing: 'easeOutExpo'
            });
        });
        
        // Animate timeline items with stagger effect
        // Group items by section (education vs experience)
        const educationSection = section.querySelector('.timeline-section:first-of-type');
        const experienceSection = section.querySelector('.timeline-section:last-of-type');
        
        const animateSectionItems = (sectionElement, baseDelay) => {
            if (!sectionElement) return;
            const timelineItems = sectionElement.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                anime({
                    targets: item,
                    translateX: [-30, 0],
                    opacity: [0, 1],
                    duration: 800,
                    delay: baseDelay + (index * 150),
                    easing: 'easeOutExpo'
                });
                
                // Animate marker
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    anime({
                        targets: marker,
                        scale: [0, 1],
                        opacity: [0, 1],
                        duration: 600,
                        delay: baseDelay + 100 + (index * 150),
                        easing: 'easeOutBack'
                    });
                }
            });
        };
        
        // Animate education items first, then experience items
        animateSectionItems(educationSection, 500);
        animateSectionItems(experienceSection, 500);
    },
    
    /**
     * Update content when language changes
     */
    updateOnLanguageChange() {
        this.render();
        this.hasAnimated = false;
        this.setupScrollAnimation();
    }
};

