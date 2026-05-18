# House of the Rising Sun - Website

## Deployment Instructions for GitHub Pages

### Step 1: Upload to GitHub
1. Create a new repository on GitHub (e.g., `risingsun`)
2. Upload ALL files from this folder to the repository:
   - `index.html` (main website file)
   - `.nojekyll` (prevents Jekyll processing)
   - `_config.yml` (GitHub Pages config)

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/(root)** folder
5. Click **Save**
6. Wait 2-5 minutes for deployment
7. Your site will be at: `https://yourusername.github.io/risingsun/`

### Step 3: Verify
- Open your GitHub Pages URL in a browser
- If you see a blank page, check browser console (F12) for errors
- Common issues:
  - **404**: File not found → Make sure `index.html` is in the root
  - **CORS errors**: External images blocked → This is normal, images will load from Unsplash CDN
  - **Mixed content**: HTTPS/HTTP mismatch → All external links use HTTPS

### Files in this package:
- `index.html` - Main website (80KB)
- `.nojekyll` - Prevents Jekyll from interfering
- `_config.yml` - GitHub Pages configuration
- `README.md` - This file

### Need Help?
If the site doesn't load:
1. Check that `index.html` is in the repository root (not in a subfolder)
2. Make sure GitHub Pages is enabled in Settings
3. Wait 5 minutes after enabling - GitHub Pages takes time to deploy
4. Try accessing with `https://` not `http://`
5. Clear browser cache and try again

### Updating the Site
To update, simply replace `index.html` in your repository with a new version and commit. Changes will deploy automatically within 2-5 minutes.
