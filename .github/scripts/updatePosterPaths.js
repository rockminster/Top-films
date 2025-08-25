// updatePosterPaths.js
// This script updates docs/posterPaths.js with the latest TMDb poster paths for each film title.
// Requires either TMDB_API_KEY (v3) or TMDB_BEARER_TOKEN (v4) in environment variables.

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const titles = [
  "28 Days Later (2002)",
  "A Nightmare on Elm Street (1984)",
  "A Star is Born (2018)",
  "Ace Ventura: Pet Detective (1994)",
  "All the President's Men (1976)",
  "American Gangster (2007)",
  "Amélie (2001)",
  "Anchorman (2004)",
  "Animal House (1978)",
  "Annie Hall (1977)",
  "Armageddon (1998)",
  "Avatar (2009)",
  "Avengers: Endgame (2019)",
  "Back to the Future (1985)",
  "Beauty and the Beast (1991)",
  "Beauty and the Beast (2017)",
  "Black Panther (2018)",
  "Blade Runner (1982)",
  "Blazing Saddles (1974)",
  "Blue Velvet (1986)",
  "Booksmart (2019)",
  "Borat (2006)",
  "Bridesmaids (2011)",
  "Cabaret (1972)",
  "Candyman (1992)",
  "Chicago (2002)",
  "Children of Men (2006)",
  "City of God (2002)",
  "Close Encounters of the Third Kind (1977)",
  "Clueless (1995)",
  "Coming to America (1988)",
  "Crocodile Dundee (1986)",
  "Days of Heaven (1978)",
  "Deadpool (2016)",
  "Dirty Dancing (1987)",
  "Dog Day Afternoon (1975)",
  "Dumb and Dumber (1994)",
  "E.T. the Extra-Terrestrial (1982)",
  "Earthquake (1974)",
  "Event Horizon (1997)",
  "Ex Machina (2015)",
  "Fame (1980)",
  "Ferris Bueller's Day Off (1986)",
  "Finding Nemo (2003)",
  "Flashdance (1983)",
  "Forrest Gump (1994)",
  "Frozen (2013)",
  "Frozen II (2019)",
  "Get Out (2017)",
  "Ghostbusters (1984)",
  "Gone Girl (2014)",
  "Goodfellas (1990)",
  "Grease (1978)",
  "Grease 2 (1982)",
  "Groundhog Day (1993)",
  "Hair (1979)",
  "Halloween (1978)",
  "Harry Potter and the Philosopher's Stone (2001)",
  "Heat (1995)",
  "Hellraiser (1987)",
  "Her (2013)",
  "Inception (2010)",
  "Independence Day (1996)",
  "Indiana Jones and the Last Crusade (1989)",
  "Interstellar (2014)",
  "It (2017)",
  "It Follows (2014)",
  "Jaws (1975)",
  "Jurassic Park (1993)",
  "La La Land (2016)",
  "Lady Bird (2017)",
  "Logan's Run (1976)",
  "Love Actually (2003)",
  "Mad Max: Fury Road (2015)",
  "Mean Streets (1973)",
  "Memento (2000)",
  "Men in Black (1997)",
  "Minority Report (2002)",
  "Monty Python and the Holy Grail (1975)",
  "Moonlight (2016)",
  "Moulin Rouge! (2001)",
  "My Life as a Dog (1985)",
  "Napoleon Dynamite (2004)",
  "Nightcrawler (2014)",
  "No Country for Old Men (2007)",
  "Notting Hill (1999)",
  "Once (2007)",
  "Once Upon a Time in America (1984)",
  "Paddington 2 (2017)",
  "Pan's Labyrinth (2006)",
  "Paranormal Activity (2007)",
  "Pirates of the Caribbean: Dead Man's Chest (2006)",
  "Planes, Trains & Automobiles (1987)",
  "Poltergeist (1982)",
  "Prisoners (2013)",
  "Pulp Fiction (1994)",
  "Purple Rain (1984)",
  "Raging Bull (1980)",
  "Romeo + Juliet (1996)",
  "Saturday Night Fever (1977)",
  "Saw (2004)",
  "Scarface (1983)",
  "Scream (1996)",
  "Serpico (1973)",
  "Shaun of the Dead (2004)",
  "Solaris (1972)",
  "Star Wars (1977)",
  "Star Wars: The Force Awakens (2015)",
  "Starship Troopers (1997)",
  "Superbad (2007)",
  "Taxi Driver (1976)",
  "The Babadook (2014)",
  "The Big Lebowski (1998)",
  "The Blair Witch Project (1999)",
  "The Bodyguard (1992)",
  "The Conjuring (2013)",
  "The Da Vinci Code (2006)",
  "The Departed (2006)",
  "The Descent (2005)",
  "The Empire Strikes Back (1980)",
  "The Exorcist (1973)",
  "The Fifth Element (1997)",
  "The Godfather (1972)",
  "The Grand Budapest Hotel (2014)",
  "The Greatest Showman (2017)",
  "The Lion King (2019)",
  "The Little Mermaid (1989)",
  "The Lives of Others (2006)",
  "The Lord of the Rings: The Fellowship of the Ring (2001)",
  "The Man Who Fell to Earth (1976)",
  "The Matrix (1999)",
  "The Nice Guys (2016)",
  "The Passion of the Christ (2004)",
  "The Phantom Menace (1999)",
  "The Ring (2002)",
  "The Shawshank Redemption (1994)",
  "The Shining (1980)",
  "The Silence of the Lambs (1991)",
  "The Sixth Sense (1999)",
  "The Social Network (2010)",
  "The Terminator (1984)",
  "The Texas Chain Saw Massacre (1974)",
  "The Thing (1982)",
  "The Towering Inferno (1974)",
  "The Truman Show (1998)",
  "The Untouchables (1987)",
  "The Wicker Man (1973)",
  "The Wolf of Wall Street (2013)",
  "This Is Spinal Tap (1984)",
  "Three Men and a Baby (1987)",
  "Titanic (1997)",
  "Tommy (1975)",
  "Toy Story (1995)",
  "Twister (1996)",
  "Walk the Line (2005)",
  "Who Framed Roger Rabbit (1988)",
  "Young Frankenstein (1974)"
];

const outputPath = path.join(__dirname, '../../docs/posterPaths.js');
const apiKey = process.env.TMDB_API_KEY;
const bearerToken = process.env.TMDB_BEARER_TOKEN;

// Validate credentials
if (!apiKey && !bearerToken) {
  console.error('ERROR: Neither TMDB_API_KEY nor TMDB_BEARER_TOKEN is set in environment variables.');
  console.error('Please provide one of these credentials to access TMDb API.');
  process.exit(1);
}

// Load existing poster paths to preserve good data
function loadExistingPosterPaths() {
  try {
    if (fs.existsSync(outputPath)) {
      const content = fs.readFileSync(outputPath, 'utf8');
      const match = content.match(/window\.posterPaths\s*=\s*({[\s\S]*});/);
      if (match) {
        return JSON.parse(match[1]);
      }
    }
  } catch (error) {
    console.log(`Could not load existing poster paths: ${error.message}`);
  }
  return {};
}

async function getPosterPath(title) {
  try {
    const yearMatch = title.match(/\((\d{4})\)$/);
    const year = yearMatch ? yearMatch[1] : '';
    const query = encodeURIComponent(title.replace(/ \(\d{4}\)$/, ''));
    
    let url, headers;
    
    if (bearerToken) {
      // Use v4 Bearer token authentication
      url = `https://api.themoviedb.org/3/search/movie?query=${query}&year=${year}`;
      headers = {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      };
    } else {
      // Use v3 API key authentication
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&year=${year}`;
      headers = {};
    }
    
    console.log(`Fetching: ${title} (${year})...`);
    const res = await fetch(url, { headers });
    
    if (!res.ok) {
      console.error(`HTTP Error ${res.status} for ${title}: ${res.statusText}`);
      return null;
    }
    
    const data = await res.json();
    
    if (data.success === false) {
      console.error(`API Error for ${title}: ${data.status_message}`);
      return null;
    }
    
    if (data.results && data.results.length > 0 && data.results[0].poster_path) {
      console.log(`✓ Found poster for ${title}: ${data.results[0].poster_path}`);
      return data.results[0].poster_path;
    } else {
      console.log(`✗ No poster found for ${title}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching ${title}: ${error.message}`);
    return null;
  }
}

(async () => {
  console.log(`Starting poster path update for ${titles.length} films...`);
  console.log(`Using ${bearerToken ? 'Bearer token (v4)' : 'API key (v3)'} authentication`);
  
  // Load existing poster paths
  const existingPosterPaths = loadExistingPosterPaths();
  console.log(`Loaded ${Object.keys(existingPosterPaths).length} existing poster paths`);
  
  const posterPaths = { ...existingPosterPaths }; // Start with existing data
  let successCount = 0;
  let failureCount = 0;
  let skippedCount = 0;
  let apiCallCount = 0;
  
  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    console.log(`[${i + 1}/${titles.length}] Processing: ${title}`);
    
    // Skip if we already have a valid poster path
    if (posterPaths[title] && posterPaths[title] !== null) {
      console.log(`  → Skipping (already have poster path: ${posterPaths[title]})`);
      skippedCount++;
      continue;
    }
    
    apiCallCount++;
    const posterPath = await getPosterPath(title);
    posterPaths[title] = posterPath;
    
    if (posterPath) {
      successCount++;
    } else {
      failureCount++;
    }
    
    // Add a small delay to be respectful to the API
    if (i < titles.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 250));
    }
  }
  
  console.log(`\nSummary:`);
  console.log(`  API calls made: ${apiCallCount}`);
  console.log(`  New posters found: ${successCount}`);
  console.log(`  Failed to find: ${failureCount}`);
  console.log(`  Skipped (already had): ${skippedCount}`);
  console.log(`  Total entries: ${Object.keys(posterPaths).length}`);
  
  // Only proceed if we have at least some successful results
  const validPosterCount = Object.values(posterPaths).filter(path => path !== null).length;
  console.log(`  Valid poster paths: ${validPosterCount}`);
  
  if (validPosterCount === 0 && apiCallCount > 0) {
    console.error('\n❌ No valid poster paths found! This suggests an API issue.');
    console.error('Not updating the file to avoid losing existing data.');
    process.exit(1);
  }
  
  const jsContent = `// Film poster path references for Top-films\n// Format: { \"Film Title (Year)\": \"/posterPath.jpg\" }\n// Note: Currently showing sample data - requires valid TMDB API key to populate all entries\nwindow.posterPaths = ${JSON.stringify(posterPaths, null, 2)};\n`;
  
  try {
    fs.writeFileSync(outputPath, jsContent);
    console.log(`✓ Successfully wrote posterPaths.js with ${Object.keys(posterPaths).length} entries`);
  } catch (error) {
    console.error(`✗ Error writing file: ${error.message}`);
    process.exit(1);
  }
})().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
