/**
 * Dark Mode Manager
 * Handles dark mode toggle and persistence
 */

const DarkMode = {
    isDark: false,
    
    init() {
        // Check for saved preference or system preference
        const savedMode = localStorage.getItem('portfolio-dark-mode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode !== null) {
            this.isDark = savedMode === 'true';
        } else {
            this.isDark = systemPrefersDark;
        }
        
        this.applyDarkMode();
        this.setupToggle();
    },
    
    setupToggle() {
        const toggle = document.getElementById('dark-mode-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggle());
        }
    },
    
    toggle() {
        this.isDark = !this.isDark;
        this.applyDarkMode();
        localStorage.setItem('portfolio-dark-mode', this.isDark.toString());
    },
    
    applyDarkMode() {
        const html = document.documentElement;
        const icon = document.getElementById('dark-mode-icon');
        
        if (this.isDark) {
            html.classList.add('dark');
            if (icon) icon.textContent = '☀️'; // Sun icon for dark mode
        } else {
            html.classList.remove('dark');
            if (icon) icon.textContent = '🌙'; // Moon icon for light mode
        }
    }
};

