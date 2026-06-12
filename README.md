# Dharshan N – Cyber Security Themed Portfolio

A modern, responsive, premium‑style personal portfolio website with a futuristic cyber‑security aesthetic. The site features:

- **Dark mode** with neon blue/green accents
- **Matrix rain** animated background (canvas)
- **Glassmorphism** cards and buttons
- Smooth scroll, lazy‑loaded images, and subtle micro‑animations
- Sections: Hero, About, Skills, Projects, Services, Contact, Footer
- SEO‑optimized meta tags, Open Graph, Twitter Cards, JSON‑LD schema
- Ready for **GitHub Pages** deployment

## Folder Structure
```
portfolio/
│   index.html
│   README.md
│   robots.txt
│   sitemap.xml
│
├───css
│       style.css
│
├───js
│       script.js
│
└───assets
    ├───images   # place hero background, project screenshots, profile pic, etc.
    └───icons    # favicons, social icons
```

## Development & Testing
1. Open `index.html` in a browser (or use a simple server like `npx -y serve ./` for live reload).  
2. Verify responsive layout, animations, and matrix background.
3. Update **project cards**, **skill cards**, and **contact form** with your real data.
4. Replace placeholder images in `assets/images/` with actual screenshots.

## Deployment to GitHub Pages
1. Create a new repository (e.g., `username/portfolio`).
2. Push the contents of the `portfolio` folder to the `main` branch.
3. In the repository settings, enable **GitHub Pages** – source: `main` branch / root.
4. After a few minutes, the site will be live at `https://username.github.io/portfolio/`.

## Customisation
- **Color palette** – edit CSS variables `--neon-blue` and `--neon-green` in `css/style.css`.
- **Matrix rain speed** – adjust the interval in `js/script.js` (currently 33 ms).
- **Form handling** – replace the placeholder Formspree ID in `script.js` with your own or use a server‑side endpoint.

---
*Built with HTML5, CSS3, JavaScript (ES6), Bootstrap 5, and jQuery.*
