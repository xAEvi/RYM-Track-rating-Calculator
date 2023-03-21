// Save buttons locations
const trackRatingBtn = document.querySelector('#track_rating_btn');
const trackRatingsSave = document.querySelector('#track_ratings_save_btn');

// Find track ratings and songs
const elements = document.querySelectorAll('[id^="rating_num_z_"]');
const duration = document.querySelector('.section_tracklisting').querySelectorAll('span.tracklist_duration');

// Get final score
const calculateScore = (ratings, seconds) => {
    const totalSeconds = seconds.reduce((x, y) => Number(x) + Number(y), 0);
    let totalScore = 0;

    // Verify if there is at least one song rated
    if (ratings.length && seconds.length && ratings.length === seconds.length) {
      for (let i = 0; i < seconds.length; i++) {
        totalScore += Number(ratings[i]) * 2 * Number(seconds[i]);
      }
      return totalScore / totalSeconds;
    }
    return null;
}

function score() {
    const ratings = [];
    const seconds = [];

    // Save songs and ratings
    elements.forEach(element => ratings.push(element.textContent.trim()));
    duration.forEach(({ dataset: { inseconds } }) => seconds.push(inseconds));

    // Delete non rated songs
    for (let i = 0; i < seconds.length; i++) {
        if (ratings[i] === '---') {
          seconds.splice(i, 1);
          ratings.splice(i, 1);
          i--;
        }
    }

    // Calculate the score and update the button
    const finalScore = calculateScore(ratings, seconds);

    if (finalScore !== null) {
        trackRatingBtn.textContent = `Track ratings [${finalScore.toFixed(2)}]`;
    } else {
        trackRatingBtn.textContent = 'Track ratings';
    }
}

trackRatingBtn.addEventListener('click',score);
trackRatingsSave.addEventListener('click',score);
