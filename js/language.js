/**
 * Language Manager
 * Handles language switching between Spanish and English
 */

const LanguageManager = {
    currentLanguage: 'es',
    translations: null,
    
    init() {
        // Wait for translations to be loaded
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded yet');
            return;
        }
        
        this.translations = translations;
        
        // Load saved language preference or default to Spanish
        const savedLanguage = localStorage.getItem('portfolio-language') || 'es';
        this.setLanguage(savedLanguage);
        this.setupLanguageButtons();
    },
    
    setupLanguageButtons() {
        // Add event listeners to language buttons
        const esButton = document.getElementById('lang-es');
        const enButton = document.getElementById('lang-en');
        
        if (esButton) {
            esButton.addEventListener('click', () => this.setLanguage('es'));
        }
        
        if (enButton) {
            enButton.addEventListener('click', () => this.setLanguage('en'));
        }
    },
    
    setLanguage(lang) {
        if (!this.translations || !this.translations[lang]) {
            console.error(`Language ${lang} not found in translations`);
            return;
        }
        
        this.currentLanguage = lang;
        localStorage.setItem('portfolio-language', lang);
        
        // Update HTML lang attribute for SEO and accessibility
        document.documentElement.lang = lang;
        
        // Update translations
        this.updateContent(this.translations[lang]);
        
        // Update navbar if it exists (this will also update buttons)
        if (typeof Navbar !== 'undefined') {
            Navbar.updateOnLanguageChange();
        }
        
        // Update hero if it exists
        if (typeof Hero !== 'undefined') {
            Hero.updateOnLanguageChange();
        }
        
        // Update about if it exists
        if (typeof About !== 'undefined') {
            About.updateOnLanguageChange();
        }
        
        // Update projects if it exists
        if (typeof Projects !== 'undefined') {
            Projects.updateOnLanguageChange();
        }
        
        // Update active button state (after navbar is updated)
        // Use setTimeout to ensure DOM is ready
        setTimeout(() => {
            this.updateLanguageButtons(lang);
        }, 10);
    },
    
    /**
     * Get translation by path (e.g., "hero.greeting" -> translations.hero.greeting)
     */
    getTranslation(path, translations = null) {
        if (!translations) {
            translations = this.translations[this.currentLanguage];
        }
        
        if (!translations) return '';
        
        const keys = path.split('.');
        let value = translations;
        
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`Translation path not found: ${path}`);
                return '';
            }
        }
        
        return typeof value === 'string' ? value : '';
    },
    
    /**
     * Update all translatable elements in the DOM
     */
    updateContent(translations) {
        if (!translations) return;
        
        // Update elements with data-i18n attribute (text content)
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const path = element.getAttribute('data-i18n');
            const translation = this.getTranslation(path, translations);
            
            if (translation) {
                // Check if element is input, textarea, or has specific attribute
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // For inputs, check if it's placeholder or value
                    if (element.hasAttribute('data-i18n-placeholder')) {
                        element.placeholder = translation;
                    } else {
                        element.value = translation;
                    }
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const path = element.getAttribute('data-i18n-placeholder');
            const translation = this.getTranslation(path, translations);
            
            if (translation && (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA')) {
                element.placeholder = translation;
            }
        });
        
        // Update elements with data-i18n-title attribute (for title attribute)
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const path = element.getAttribute('data-i18n-title');
            const translation = this.getTranslation(path, translations);
            
            if (translation) {
                element.title = translation;
            }
        });
        
        // Update elements with data-i18n-aria-label attribute
        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            const path = element.getAttribute('data-i18n-aria-label');
            const translation = this.getTranslation(path, translations);
            
            if (translation) {
                element.setAttribute('aria-label', translation);
            }
        });
    },
    
    updateLanguageButtons(activeLang) {
        const esButton = document.getElementById('lang-es');
        const enButton = document.getElementById('lang-en');
        
        // Update active state using CSS class
        if (esButton && enButton) {
            if (activeLang === 'es') {
                esButton.classList.add('lang-btn-active');
                enButton.classList.remove('lang-btn-active');
            } else {
                enButton.classList.add('lang-btn-active');
                esButton.classList.remove('lang-btn-active');
            }
        }
    },
    
    getCurrentLanguage() {
        return this.currentLanguage;
    },
    
    /**
     * Get translation for current language (helper method)
     */
    t(path) {
        return this.getTranslation(path);
    }
};

