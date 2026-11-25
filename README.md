# My portfolio — Loryen Art Dela Cruz

I use this site to share my software projects and freelance web development rates. I can run it as a static site without a build step, database, or package installation.

## How I preview my site

For a quick preview, I open `index.html` in my browser. I can also use Live Server in VS Code or start a local server from my portfolio folder:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

With the Python server running, I open http://localhost:5500.

## Where I make changes

- `index.html` — I edit my bio, project cards, rates, contact links, and page metadata here.
- `styles.css` — I use this file for my color palette, type sizes, section layouts, and project dialogs.
- `showcase.css` — I adjust my hero typography, spacing, and soft background here.
- `index.html` also contains the full case studies. They expand inline without JavaScript.
- `script.js` - I keep my filters, enhanced case-study dialogs, scroll fades, currency switch, and estimate email behavior here.
- `assets/` — The screenshots, network diagram, and favicon displayed on the site.
- `docs/` — My coursework notes and the source PDF for the ResQConnect screenshots.

## How I publish my site

I publish `index.html`, both stylesheets, `script.js`, and the `assets/` folder. The `docs/` folder is for reference only.

## Projects I feature

I feature ResQConnect, Relational Library Tracker, this portfolio, and Casal Campus Network. I keep my other coursework in [my project notes](docs/PROJECT_REVIEW.md).

In my ResQConnect case study, I use three app screenshots to show how someone requests flood assistance, checks local weather, and views active requests on the rescuer dashboard.
