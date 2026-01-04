/**
 * Tailwind CSS Configuration
 * Custom colors and dark mode setup
 */

// Configure Tailwind with custom colors and dark mode
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'cod-gray': {
                    '50': '#f6f6f6',
                    '100': '#e7e7e7',
                    '200': '#d1d1d1',
                    '300': '#b0b0b0',
                    '400': '#888888',
                    '500': '#6d6d6d',
                    '600': '#5d5d5d',
                    '700': '#4f4f4f',
                    '800': '#454545',
                    '900': '#3d3d3d',
                    '950': '#0a0a0a',
                }
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
            }
        }
    }
};

