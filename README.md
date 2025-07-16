# Zhuohang Jiang's Homepage 🌐

This repository contains the source code for **Zhuohang Jiang's** personal academic website, hosted via GitHub Pages at [zhuohangjiang.com](https://zhuohangjiang.com/). The site presents research interests, publications, projects and a downloadable CV.

## Features

- Static HTML layout styled with custom CSS.
- Smooth animations using [WOW.js](https://wowjs.uk/), [Magic CSS](https://www.minimamente.com/project/magic/) and [Hover.css](https://ianlunn.github.io/Hover/).
- Expandable sections for news and publications with vanilla JavaScript.
- Dedicated project pages (`mipnerf/`, `mipnerf360/`) built with Bootstrap, jQuery and CodeMirror.
- PDF CV available in `data/`.

## Tech Stack

- **HTML/CSS/JavaScript** – main website structure and interactivity.
- **Bootstrap 3** and **jQuery** – used in project pages.
- **Animation libraries** – Animate.css, Magic CSS, WOW.js, Hover.css.
- **GitHub Pages** – deployment with custom domain (`CNAME`).

## Directory Structure

```
.
├── index.html              # main homepage
├── stylesheet.css          # site-wide styles
├── hover.css               # hover effects
├── WOW.js                  # WOW.js script
├── CNAME                   # custom domain mapping
├── data/                   # CV and related files
├── images/                 # profile and logo images
├── magic/                  # Magic CSS source and build files
├── mipnerf/                # mip-NeRF project page (Bootstrap)
├── mipnerf360/             # mip-NeRF 360 project page
└── README.md               # this file
```

## Local Development

1. Clone the repository.
2. Start a simple HTTP server from the project root:
   ```bash
   python3 -m http.server
   ```
3. Open `http://localhost:8000` in your browser.

## Deployment

Push changes to the `master` branch (or your GitHub Pages branch). GitHub Pages will automatically serve the site. To use a custom domain, edit the `CNAME` file with your domain name.

## License

This repository includes third‑party libraries such as Magic CSS, which are licensed under MIT. Refer to each subdirectory for more details.

## Author

**Zhuohang Jiang** – [zhuohangjiang.com](https://zhuohangjiang.com/)

