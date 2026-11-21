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
- `showcase.css` — I adjust the slideshow layout, controls, and reduced-motion styles here.
- `script.js` — I keep my case study text alongside the code for filtering projects, opening dialogs, and playing the slideshow.
- `assets/` — I keep two sizes of each hero photo here, along with my project screenshots, network diagram, favicon, and the PDF I used for the ResQConnect images.
- `PROJECT_REVIEW.md` — I keep notes on my coursework and the reports I reference.

## How I publish my site

I publish `index.html`, both stylesheets, `script.js`, and the JPEG, PNG, and SVG files in `assets/`. I keep the folder structure the same so the links work after deployment. I can leave out the source PDF and my review notes because my site doesn’t load them.

## Projects I feature

I feature ResQConnect, Relational Library Tracker, this portfolio, and Casal Campus Network. I keep my other coursework in [my project notes](PROJECT_REVIEW.md).

In my ResQConnect case study, I use three app screenshots to show how someone requests flood assistance, checks local weather, and views active requests on the rescuer dashboard.
