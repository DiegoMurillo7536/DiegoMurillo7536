/**
 * Navbar Manager
 * Handles navbar functionality, mobile menu, and active section indicator
 */

const Navbar = {
    isMobileMenuOpen: false,
    clickOutsideHandler: null,
    
    init() {
        this.render();
        this.setupMobileMenu();
        this.setupScrollEffect();
        this.setupActiveSection();
        // Wait a bit for DOM to be ready before animating
        setTimeout(() => {
            this.animateEntrance();
        }, 100);
    },
    
    render() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        const currentLang = LanguageManager.getCurrentLanguage();
        const translations = LanguageManager.translations[currentLang];
        
        navbar.innerHTML = `
            <div class="navbar-container">
                <!-- Logo/Brand -->
                <div class="navbar-brand">
                    <a href="#hero" class="text-xl font-bold text-cod-gray-900 dark:text-cod-gray-50 transition-colors duration-200">
                        Diego Murillo
                    </a>
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="navbar-nav-desktop" aria-label="Main navigation">
                    <ul class="navbar-links">
                        <li>
                            <a href="#about" 
                               class="navbar-link" 
                               data-i18n="nav.about"
                               data-section="about">
                                ${translations?.nav?.about || 'Sobre Mí'}
                            </a>
                        </li>
                        <li>
                            <a href="#projects" 
                               class="navbar-link" 
                               data-i18n="nav.projects"
                               data-section="projects">
                                ${translations?.nav?.projects || 'Proyectos'}
                            </a>
                        </li>
                        <li>
                            <a href="#education-experience" 
                               class="navbar-link" 
                               data-i18n="nav.education"
                               data-section="education-experience">
                                ${translations?.nav?.education || 'Educación'}
                            </a>
                        </li>
                        <li>
                            <a href="#skills" 
                               class="navbar-link" 
                               data-i18n="nav.skills"
                               data-section="skills">
                                ${translations?.nav?.skills || 'Habilidades'}
                            </a>
                        </li>
                        <li>
                            <a href="#contact" 
                               class="navbar-link" 
                               data-i18n="nav.contact"
                               data-section="contact">
                                ${translations?.nav?.contact || 'Contacto'}
                            </a>
                        </li>
                    </ul>
                </nav>
                
                <!-- Controls (Language + Dark Mode) -->
                <div class="navbar-controls">
                    <!-- Language Buttons -->
                    <div class="language-switcher">
                        <button 
                            id="lang-es" 
                            class="lang-btn ${currentLang === 'es' ? 'lang-btn-active' : ''}"
                            aria-label="Cambiar a Español"
                        >
                            ES
                        </button>
                        <button 
                            id="lang-en" 
                            class="lang-btn ${currentLang === 'en' ? 'lang-btn-active' : ''}"
                            aria-label="Switch to English"
                        >
                            EN
                        </button>
                    </div>
                    
                    <!-- Dark Mode Toggle -->
                    <button 
                        id="dark-mode-toggle" 
                        class="dark-mode-btn"
                        aria-label="Toggle dark mode"
                    >
                        <span id="dark-mode-icon">🌙</span>
                    </button>
                    
                    <!-- Mobile Menu Toggle -->
                    <button 
                        id="mobile-menu-toggle" 
                        class="mobile-menu-btn"
                        aria-label="Toggle mobile menu"
                        aria-expanded="false"
                    >
                        <span class="mobile-menu-icon">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </span>
                    </button>
                </div>
            </div>
            
            <!-- Mobile Navigation Menu -->
            <nav class="navbar-nav-mobile" id="mobile-menu" aria-label="Mobile navigation">
                <ul class="mobile-links">
                    <li>
                        <a href="#about" 
                           class="mobile-link" 
                           data-i18n="nav.about"
                           data-section="about">
                            ${translations?.nav?.about || 'Sobre Mí'}
                        </a>
                    </li>
                    <li>
                        <a href="#projects" 
                           class="mobile-link" 
                           data-i18n="nav.projects"
                           data-section="projects">
                            ${translations?.nav?.projects || 'Proyectos'}
                        </a>
                    </li>
                    <li>
                        <a href="#education-experience" 
                           class="mobile-link" 
                           data-i18n="nav.education"
                           data-section="education-experience">
                            ${translations?.nav?.education || 'Educación'}
                        </a>
                    </li>
                    <li>
                        <a href="#skills" 
                           class="mobile-link" 
                           data-i18n="nav.skills"
                           data-section="skills">
                            ${translations?.nav?.skills || 'Habilidades'}
                        </a>
                    </li>
                    <li>
                        <a href="#contact" 
                           class="mobile-link" 
                           data-i18n="nav.contact"
                           data-section="contact">
                            ${translations?.nav?.contact || 'Contacto'}
                        </a>
                    </li>
                </ul>
            </nav>
        `;
        
        // Re-setup language buttons after render
        if (typeof LanguageManager !== 'undefined') {
            LanguageManager.setupLanguageButtons();
            // Ensure buttons are updated with correct active state
            setTimeout(() => {
                LanguageManager.updateLanguageButtons(currentLang);
            }, 0);
        }
        
        // Re-setup dark mode toggle after render
        if (typeof DarkMode !== 'undefined') {
            DarkMode.setupToggle();
        }
    },
    
    setupMobileMenu() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const menu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        
        if (!toggle || !menu) {
            console.warn('Mobile menu elements not found');
            return;
        }
        
        // Remove old click outside handler if it exists
        if (this.clickOutsideHandler) {
            document.removeEventListener('click', this.clickOutsideHandler);
            this.clickOutsideHandler = null;
        }
        
        // Add click event to toggle button (use once to avoid duplicates, but we'll manage it manually)
        toggle.onclick = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.toggleMobileMenu();
        };
        
        // Close menu when clicking on a link
        mobileLinks.forEach(link => {
            link.onclick = () => {
                this.closeMobileMenu();
            };
        });
        
        // Close menu when clicking outside
        this.clickOutsideHandler = (e) => {
            if (this.isMobileMenuOpen && 
                !menu.contains(e.target) && 
                !toggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        };
        
        // Use a small delay to ensure the handler is set up correctly
        setTimeout(() => {
            document.addEventListener('click', this.clickOutsideHandler);
        }, 0);
    },
    
    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        const menu = document.getElementById('mobile-menu');
        const toggle = document.getElementById('mobile-menu-toggle');
        const icon = toggle?.querySelector('.mobile-menu-icon');
        
        if (!menu || !toggle) {
            console.warn('Mobile menu elements not found');
            return;
        }
        
        if (this.isMobileMenuOpen) {
            menu.classList.add('mobile-menu-open');
            toggle.setAttribute('aria-expanded', 'true');
            if (icon) {
                icon.classList.add('hamburger-open');
            }
            document.body.style.overflow = 'hidden';
        } else {
            menu.classList.remove('mobile-menu-open');
            toggle.setAttribute('aria-expanded', 'false');
            if (icon) {
                icon.classList.remove('hamburger-open');
            }
            document.body.style.overflow = '';
        }
    },
    
    closeMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.toggleMobileMenu();
        }
    },
    
    setupScrollEffect() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add shadow and background when scrolled
            if (currentScroll > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
            
            // Hide/show navbar on scroll (optional - can be removed if not desired)
            // Uncomment if you want navbar to hide on scroll down and show on scroll up
            // if (currentScroll > lastScroll && currentScroll > 100) {
            //     navbar.classList.add('navbar-hidden');
            // } else {
            //     navbar.classList.remove('navbar-hidden');
            // }
            
            lastScroll = currentScroll;
        });
    },
    
    setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-link, .mobile-link');
        
        const updateActiveLink = () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const scrollPosition = window.pageYOffset + 150; // Offset for better UX
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        };
        
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Initial check
    },
    
    animateEntrance() {
        const navbar = document.getElementById('navbar');
        if (!navbar || typeof anime === 'undefined') return;
        
        anime({
            targets: navbar,
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });
        
        // Animate navbar links with stagger
        const links = navbar.querySelectorAll('.navbar-link');
        if (links.length > 0) {
            anime({
                targets: links,
                translateY: [-20, 0],
                opacity: [0, 1],
                duration: 600,
                delay: anime.stagger(50, {start: 200}),
                easing: 'easeOutExpo'
            });
        }
    },
    
    /**
     * Update navbar content when language changes
     */
    updateOnLanguageChange() {
        // Re-render navbar to update translations
        this.render();
        this.setupMobileMenu();
    }
};

