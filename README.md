# Keturah's Little Corner of the Internet

A small romantic and playful React + Vite website built to run entirely on the frontend and deploy cleanly to GitHub Pages.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the local URL shown by Vite in your browser.

## Edit the personal content

All editable messages live in [src/data/siteContent.js](/C:/Users/BirdTrek/myBaby/src/data/siteContent.js).

That file is where you should:

- Replace placeholder notes in the `openWhenMessages` array
- Add real reasons in `loveReasons`
- Change the emotional closing in `finalMessage`
- Add future photo references when you want to include images later

## Deploy to GitHub Pages with GitHub Actions

This repository already includes [deploy.yml](/C:/Users/BirdTrek/myBaby/.github/workflows/deploy.yml).

To use it:

1. Push the project to a GitHub repository.
2. In GitHub, open `Settings` → `Pages`.
3. Set the source to `GitHub Actions`.
4. Push to the `main` branch or run the workflow manually.

The Vite base path is configured automatically in [vite.config.js](/C:/Users/BirdTrek/myBaby/vite.config.js) using the repository name during the GitHub Actions build.

## Optional manual deploy

If you prefer the `gh-pages` package instead of Actions:

```bash
npm run build
npm run deploy
```

That assumes the repository is already connected to GitHub and Pages is set up for the published branch.
