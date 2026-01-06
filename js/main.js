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
    
    // Initialize hero section (must be after language system)
    if (typeof Hero !== 'undefined') {
        setTimeout(() => {
            Hero.init();
        }, 200);
    }
    
    // Initialize about section (must be after language system)
    if (typeof About !== 'undefined') {
        setTimeout(() => {
            About.init();
        }, 250);
    }
    
    // Initialize projects section (must be after language system)
    if (typeof Projects !== 'undefined') {
        setTimeout(() => {
            Projects.init();
        }, 300);
    }
    
    // Initialize education & experience section (must be after language system)
    if (typeof EducationExperience !== 'undefined') {
        setTimeout(() => {
            EducationExperience.init();
        }, 350);
    }
    
    // Initialize scroll functionality
    if (typeof ScrollManager !== 'undefined') {
        ScrollManager.init();
    }
    
    // Initialize animations (navbar and hero animations are handled by their respective init methods)
    if (typeof Animations !== 'undefined') {
        Animations.init();
    }
});

