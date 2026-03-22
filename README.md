# Abhishek Kumar — Portfolio

React + Tailwind CSS portfolio.

## Setup

```bash
npm install
npm start       # dev server at localhost:3000
npm run build   # production build → /build folder
```

## Deploy to Netlify

1. Run `npm run build`
2. Drag the `/build` folder onto drop.netlify.com
   OR connect this repo to Netlify for auto-deploy on push

## After deploy — add Formspree

1. Go to formspree.io → sign up → New Form
2. Copy your form ID (e.g. `xpwzabcd`)
3. In `src/App.jsx`, find `YOUR_FORM_ID` and replace it
4. Rebuild and redeploy

## Photo

Your photo lives at `src/assets/abhishek.png` — imported once, used in Hero + About.
To update: replace the file, same filename.
