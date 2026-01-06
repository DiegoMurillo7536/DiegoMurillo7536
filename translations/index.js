/**
 * Translations Index
 * Combines all component translations into a single translations object
 * 
 * This file imports all individual translation modules and merges them
 * into a unified translations object that matches the expected structure.
 */

// Combine all translations
const translations = {
    es: {
        ...navbarTranslations.es,
        ...heroTranslations.es,
        ...aboutTranslations.es,
        ...projectsTranslations.es,
        ...educationExperienceTranslations.es,
        ...skillsTranslations.es,
        ...contactTranslations.es,
        ...footerTranslations.es
    },
    
    en: {
        ...navbarTranslations.en,
        ...heroTranslations.en,
        ...aboutTranslations.en,
        ...projectsTranslations.en,
        ...educationExperienceTranslations.en,
        ...skillsTranslations.en,
        ...contactTranslations.en,
        ...footerTranslations.en
    }
};

