# AGENTS.md

Static portfolio site (Diego Murillo). Vanilla HTML/CSS/JS — no package.json, no build, no tests, no lint. All content is rendered client-side from JS; `index.html` only contains empty `<section id="...">` placeholders. Verify changes by opening `index.html` in a browser or serving statically (`python3 -m http.server`).

## Architecture

- Tailwind CSS + Anime.js loaded via CDN. Custom `cod-gray-*` palette and dark mode are configured in `js/tailwind-config.js` (`tailwind.config`, `darkMode: 'class'`).
- The same palette is duplicated as CSS variables in `css/variables.css`. **Keep the two in sync** when changing colors.
- Each page section is a plain global object (no modules/bundling) with an `init()` / `render()` / `updateOnLanguageChange()` convention (e.g. `js/navbar.js` → `const Navbar`). `render()` fills the empty section with a template string.
- `js/main.js` bootstraps everything inside `DOMContentLoaded` using staggered `setTimeout`s (150–450ms). Dark mode inits first, then LanguageManager, then each section.
- `js/background-3d.js` (`Background3D`) renders a fixed, mouse-reactive Three.js field of 3D shapes (spheres, polyhedra, boxes, torus, etc.) behind all content (canvas `z-index: -1`, `pointer-events: none`). Uses Three.js r128 CDN global build in `<head>`; shape colors are theme-aware and re-tint via a `MutationObserver` on `<html>`'s class. Inits right after DarkMode in `main.js`.
- `index.html` script order matters: all `translations/*.js` (before `translations/index.js`), then `language.js`, `dark-mode.js`, section JS, then `main.js`.

## i18n (es/en)

- Default language is Spanish; preference persisted in localStorage (`portfolio-language`).
- Each component has `translations/<component>.js` defining a global like `navbarTranslations`, merged into the global `translations` object by `translations/index.js`. A new component must be registered there.
- User-facing strings exist in both `es` and `en` — always add/update both. Sections read `LanguageManager.translations[currentLang]` and re-render via `updateOnLanguageChange()`.
- `js/language.js` also updates static-DOM content via `data-i18n*` attributes.

## Adding a new section

1. Empty `<section id="...">` in `index.html`.
2. `js/<name>.js` module with `init`/`render`/`updateOnLanguageChange`.
3. `translations/<name>.js` + register in `translations/index.js`.
4. Script tags in `index.html` (translations before section JS).
5. `init()` call in `js/main.js` and `updateOnLanguageChange()` call in `js/language.js`.

## Gotchas

- Project cards (`js/projects.js`) deliberately `preventDefault()` on `.project-btn` clicks — links intentionally don't navigate.
- Dark mode toggles the `.dark` class on `<html>`; persisted as `portfolio-dark-mode`.
- `images/projects/` holds project card images (only `test_project.jpg` today).
- `.gitignore` only excludes `TODO.md`.
