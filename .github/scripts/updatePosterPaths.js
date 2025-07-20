// updatePosterPaths.js
// This script updates docs/posterPaths.js with the latest TMDb poster paths for each film title.
// Requires TMDB_API_KEY in environment variables.

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const titles = [
  "The Thing (1982)",
  "City of God (2002)",
  // Add all other film titles here
];

const outputPath = path.join(__dirname, '../../docs/posterPaths.js');
const apiKey = process.env.TMDB_API_KEY;

async function getPosterPath(title) {
  const yearMatch = title.match(/\((\d{4})\)$/);
  const year = yearMatch ? yearMatch[1] : '';
  const query = encodeURIComponent(title.replace(/ \(\d{4}\)$/, ''));
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&year=${year}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results[0] && data.results[0].poster_path) {
    return data.results[0].poster_path;
  }
  return null;
}

(async () => {
  const posterPaths = {};
  for (const title of titles) {
    const posterPath = await getPosterPath(title);
    posterPaths[title] = posterPath;
    console.log(`${title}: ${posterPath}`);
  }
  const jsContent = `// Film poster path references for Top-films\n// Format: { \"Film Title (Year)\": \"/posterPath.jpg\" }\nexport const posterPaths = ${JSON.stringify(posterPaths, null, 2)};\n`;
  fs.writeFileSync(outputPath, jsContent);
})();
