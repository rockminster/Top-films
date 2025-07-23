// Test script to validate TMDB API key and endpoint
const fetch = require('node-fetch');

const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
  console.error('ERROR: TMDB_API_KEY environment variable is not set!');
  process.exit(1);
}

async function testApiKey() {
  try {
    console.log('Testing TMDB API key...');
    console.log(`API Key starts with: ${apiKey.substring(0, 8)}...`);
    
    // Test with a simple configuration endpoint first
    const configUrl = `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`;
    console.log('Testing configuration endpoint...');
    
    const configRes = await fetch(configUrl);
    
    if (!configRes.ok) {
      console.error(`Configuration test failed: ${configRes.status} ${configRes.statusText}`);
      return false;
    }
    
    const configData = await configRes.json();
    
    if (configData.success === false) {
      console.error(`API Error: ${configData.status_message}`);
      return false;
    }
    
    console.log('✓ Configuration endpoint works');
    console.log(`Base URL: ${configData.images.base_url}`);
    
    // Test with a well-known movie
    const testTitle = 'The Matrix';
    const testYear = '1999';
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(testTitle)}&year=${testYear}`;
    
    console.log(`\nTesting search with "${testTitle} (${testYear})"...`);
    const searchRes = await fetch(searchUrl);
    
    if (!searchRes.ok) {
      console.error(`Search test failed: ${searchRes.status} ${searchRes.statusText}`);
      return false;
    }
    
    const searchData = await searchRes.json();
    
    if (searchData.success === false) {
      console.error(`Search API Error: ${searchData.status_message}`);
      return false;
    }
    
    if (searchData.results && searchData.results.length > 0) {
      const movie = searchData.results[0];
      console.log('✓ Search endpoint works');
      console.log(`Found: ${movie.title} (${movie.release_date.substring(0, 4)})`);
      console.log(`Poster path: ${movie.poster_path}`);
      
      if (movie.poster_path) {
        const fullPosterUrl = `${configData.images.base_url}w92${movie.poster_path}`;
        console.log(`Full poster URL: ${fullPosterUrl}`);
      }
      
      return true;
    } else {
      console.error('No results found for test movie');
      return false;
    }
    
  } catch (error) {
    console.error(`Error testing API: ${error.message}`);
    return false;
  }
}

testApiKey().then(success => {
  if (success) {
    console.log('\n✓ TMDB API key is working correctly!');
    process.exit(0);
  } else {
    console.log('\n✗ TMDB API key test failed!');
    process.exit(1);
  }
});