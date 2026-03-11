# Lucid — Home Selling System (Static App)

Lucid is a single-page interactive experience for planning and running a modern, owner-led home sale.  
This project is implemented as a static HTML/CSS/JS app, currently contained in `lucid.html`.

## Project structure

- `index.html` — tiny entry file that redirects `/` to `lucid.html` so that platforms like Vercel can serve the app at the root URL.
- `lucid.html` — the full Lucid experience (markup, styles, and scripts all in one file).
- `lucid-logo.png` — nav logo asset. **Add this file** to the project root (same folder as `lucid.html`) for the header logo to display; the site references it at `lucid-logo.png`.

You can open `lucid.html` directly in a browser, or use the `index.html` entry point when deploying.

## Running locally

The simplest option is to open `lucid.html` in your browser:

1. Double–click `lucid.html` in Finder, or  
2. From this folder, run a simple static server (optional but closer to production):

```bash
python3 -m http.server 4173
```

Then visit:

- `http://localhost:4173/lucid.html` (direct) or  
- `http://localhost:4173/` (which will hit `index.html` and redirect to `lucid.html`).

## Git & GitHub setup

This folder is designed to be its own small git repository, containing only the Lucid project files.

To initialize and commit (from this `Lucid` directory):

```bash
git init
git add .
git commit -m "Initial Lucid static site"
```

Then create a new GitHub repository (for example, `lucid-home-selling`) and connect it:

```bash
git remote add origin git@github.com:<your-username>/<repo-name>.git
git push -u origin main
```

You can use HTTPS instead of SSH if you prefer.

## Deploying to Vercel

Once the code is on GitHub:

1. In the Vercel dashboard, click **New Project** and **Import** the GitHub repo that contains this folder.
2. When prompted for settings, use:
   - **Framework preset**: **Other** / **No Framework** (plain HTML).
   - **Root directory**: the repository root (where `index.html` and `lucid.html` live).
   - **Build command**: leave **empty** (no build step needed).
   - **Output directory**: `.` (the root folder).
3. Create the project and wait for the first deployment to finish.

Vercel will serve:

- `/` → `index.html` → immediate redirect to `lucid.html`
- `/lucid.html` → the full Lucid page

## Next steps (optional)

- **Refactor assets**: Split the inline `<style>` and `<script>` from `lucid.html` into `styles.css` and `script.js` for easier maintenance.
- **Form handling & backend**: If/when the onboarding or waitlist needs persistence, add a small backend (Vercel Functions or an external service) and wire up `fetch` calls.
- **Analytics**: Add lightweight analytics (e.g. Plausible, PostHog) to understand how people move through the experience.

