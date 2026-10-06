# mdahoma400.github.io

Static portfolio site. Plain HTML, CSS and a little JS. No build step, no backend.

```
index.html              page content
css/base.css            colors, reset, typography, buttons, numbered headings
css/layout.css          header, mobile menu, side rails, page width, footer
css/components.css      hero, about, tabs, featured projects, contact
js/main.js              theme toggle, header hide/show, mobile menu, tabs, scroll reveal
assets/logo3.png        favicon
assets/photo.svg        About photo placeholder (replace with your photo)
assets/resume.pdf       linked from the "Resume" button
assets/projects/        project images
```

## Edit

- Content: `index.html`.
- Colors: `:root` (dark) and `:root[data-theme="light"]` (light) in `css/base.css`.
- Project images: put a file in `assets/projects/` and change the `src` of the matching `<img>` in `index.html`.

## Preview

Open `index.html` in a browser, or run `python -m http.server` in this folder.

Deployed with GitHub Pages from `main`: https://mdahoma400.github.io
