// Sample poster paths for testing - these are actual TMDB poster paths
// This file demonstrates how the thumbnails should work when the API returns valid data
const samplePosterPaths = {
  "The Matrix (1999)": "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  "The Godfather (1972)": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", 
  "Pulp Fiction (1994)": "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  "The Shawshank Redemption (1994)": "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  "Jaws (1975)": "/lxM6kqilAdpdhqUl2biYp5frUxE.jpg",
  "Star Wars (1977)": "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  "Back to the Future (1985)": "/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
  "E.T. the Extra-Terrestrial (1982)": "/5Jgcq1uOKdKcfFgVlyWD2CVrQNH.jpg",
  "Ghostbusters (1984)": "/3FS2V1dGJWqxjwKdhn2sLchFYLb.jpg",
  "The Terminator (1984)": "/qvktm0BHcnmDpul4Hz01GIazWPr.jpg"
};

// Test function to validate poster URL generation  
function testPosterUrls() {
  console.log('Testing poster URL generation:');
  Object.entries(samplePosterPaths).forEach(([title, path]) => {
    const fullUrl = `https://image.tmdb.org/t/p/w92${path}`;
    console.log(`${title}: ${fullUrl}`);
  });
}

// Export for use in updatePosterPaths.js testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = samplePosterPaths;
}