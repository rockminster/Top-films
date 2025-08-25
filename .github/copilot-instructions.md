# Top Films Website

Top Films is a static HTML website showcasing curated films from the 1970s-2010s with an interactive sortable table, movie poster integration via TMDb API, and automated content updates. The site is hosted on GitHub Pages and features a dark-themed responsive design.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Quick Start - Local Development
- Set up local development environment:
  - `cd docs`
  - `python3 -m http.server 8000` - starts development server instantly
  - Open http://localhost:8000 to view the site
  - NEVER CANCEL: Server runs indefinitely until manually stopped

### Dependencies and Installation  
- Install Node.js dependencies (only needed for GitHub Actions scripts):
  - `npm install` - takes ~1 second, installs node-fetch@^2.7.0
  - No build process required - this is a static HTML site
- GitHub Actions scripts require TMDB_API_KEY secret (set in repository settings)

### Testing the Application
- **CRITICAL**: Always test the complete user experience after making changes:
  - Load the homepage and verify the film table displays correctly
  - Test table sorting by clicking decade, genre, and title column headers  
  - Click the "🎲 Pick a Random Film" button multiple times to verify randomization
  - Verify movie poster images load (some may be blocked in development due to CORS)
  - Click several JustWatch links to ensure they open correctly
  - Test responsive design by resizing the browser window

### GitHub Actions and Automation
- Poster path updates run monthly via `.github/workflows/update-poster-paths.yml`
- NEVER CANCEL: GitHub Actions may take 5-10 minutes to complete depending on TMDb API response times
- Manual trigger: Go to Actions tab → "Update Poster Paths" → "Run workflow"
- Scripts validate TMDB_API_KEY and update `docs/posterPaths.js` automatically

## Validation Scenarios

**MANDATORY**: Execute these scenarios after any code changes:

### Basic Functionality Test
1. Start local server: `cd docs && python3 -m http.server 8000`
2. Navigate to http://localhost:8000
3. Verify table loads with film data organized by decade
4. Test sorting: click "Genre ▲▼" header, verify films group by genre alphabetically
5. Test random picker: click "🎲 Pick a Random Film" button 3+ times, verify different films appear
6. Test external links: click any "JustWatch" link, verify it opens JustWatch search

### Content Integrity Test  
1. Verify film table contains entries from 1970s, 1980s, 1990s, 2000s, and 2010s
2. Confirm each film has: decade, genre, title, thumbnail, and watch link
3. Check that poster images load (placeholder images are acceptable in development)
4. Validate that clicking column headers changes sort order with visual feedback

### GitHub Actions Test (if making workflow changes)
1. Run: `node .github/scripts/testTmdbApi.js` (expects: "ERROR: TMDB_API_KEY environment variable is not set!")
2. Run: `node .github/scripts/updatePosterPaths.js` (expects same error message)
3. Verify error handling works correctly for missing API key

## File Structure and Key Locations

### Primary Application Files
- `docs/index.html` - Main application (45KB) - contains all HTML, CSS, and JavaScript
- `docs/posterPaths.js` - TMDb poster path mappings (8KB) - updated monthly by automation
- `docs/pop_culture_films_responsive.html` - Legacy file (0 bytes) - can be ignored

### GitHub Actions and Automation
- `.github/workflows/update-poster-paths.yml` - Monthly automated poster updates
- `.github/scripts/updatePosterPaths.js` - Main update script for poster paths
- `.github/scripts/testTmdbApi.js` - API validation script  
- `.github/scripts/samplePosterPaths.js` - Sample data for testing

### Configuration Files
- `package.json` - Node.js dependencies (only node-fetch for CI scripts)
- `package-lock.json` - Dependency lock file
- `.gitignore` - Git ignore patterns
- `README.md` - Basic project description

## Common Development Tasks

### Making Content Changes
- Edit film data directly in `docs/index.html` in the `tableRows` array (starts ~line 100)
- Update styling by modifying the `<style>` section in `docs/index.html`
- Test changes locally before committing: `cd docs && python3 -m http.server 8000`

### Adding New Films
1. Add film entry to `tableRows` array in `docs/index.html` following existing format:
   `["Decade", "Genre", "Title", '<a href="JustWatch_URL" target="_blank">JustWatch</a>']`
2. Test locally to verify new entry appears and sorts correctly
3. Poster will be automatically added during next monthly update (or manual workflow trigger)

### Debugging Issues
- Check browser console for JavaScript errors when testing locally
- Verify all TMDb poster URLs follow format: `https://image.tmdb.org/t/p/w92{posterPath}`
- Confirm JustWatch URLs follow format: `https://www.justwatch.com/uk/search?q={encodedTitle}`
- Test GitHub Actions locally using: `node .github/scripts/updatePosterPaths.js` (will fail without API key)

### Deployment Process
- No build step required - commit changes directly to trigger GitHub Pages deployment
- GitHub Pages serves content from `docs/` directory automatically
- Changes appear live within 1-2 minutes of pushing to main branch
- Monitor GitHub Actions for monthly poster updates

## Timing Expectations and Warnings

- **Local server startup**: Instant
- **npm install**: ~1 second  
- **Manual testing**: 2-3 minutes for complete validation scenarios
- **GitHub Pages deployment**: 1-2 minutes after commit
- **GitHub Actions poster updates**: 5-10 minutes (NEVER CANCEL - wait for completion)
- **TMDb API responses**: Variable, depends on external service

## Important Notes

### What Works
- Static HTML site loads and functions correctly
- All interactive features (sorting, random picker) work as intended
- Movie poster integration via TMDb API functions properly
- GitHub Actions workflow successfully updates poster paths monthly
- Responsive design works across different screen sizes

### What to Avoid
- Do not try to "build" this project - it's static HTML that runs directly
- Do not cancel long-running GitHub Actions - poster updates take time
- Do not modify `docs/posterPaths.js` manually - it's auto-generated monthly
- Do not expect all poster images to load in development due to CORS restrictions

### External Dependencies
- TMDb API for movie poster images (requires TMDB_API_KEY secret)
- JustWatch for streaming service links (external links)
- GitHub Pages for hosting (automatic)
- No runtime JavaScript dependencies - vanilla JS only