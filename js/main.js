/**
 * Main JavaScript file
 * Initializes the portfolio application
 */

// Wait for DOM to be fully loaded and translations to be available
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    console.log('Portfolio initialized');
    
    // Initialize dark mode first (doesn't depend on translations)
    if (typeof DarkMode !== 'undefined') {
        DarkMode.init();
    }
    
    // Initialize language system (must be after translations are loaded)
    if (typeof LanguageManager !== 'undefined' && typeof translations !== 'undefined') {
        LanguageManager.init();
    } else {
        // Retry after a short delay if translations aren't loaded yet
        setTimeout(() => {
            if (typeof LanguageManager !== 'undefined' && typeof translations !== 'undefined') {
                LanguageManager.init();
            }
        }, 100);
    }
    
    // Initialize navbar (must be after language system)
    if (typeof Navbar !== 'undefined') {
        // Wait a bit to ensure translations are loaded
        setTimeout(() => {
            Navbar.init();
        }, 150);
    }
    
    // Initialize scroll functionality
    if (typeof ScrollManager !== 'undefined') {
        ScrollManager.init();
    }
    
    // Initialize animations (navbar animation is handled by Navbar.init)
    if (typeof Animations !== 'undefined') {
        Animations.init();
    }
});

