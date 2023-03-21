
// Save buttons locations
const trackRatingBtn = document.querySelector('#track_rating_btn');
const trackRatingsSave = document.querySelector('#track_ratings_save_btn');

trackRatingBtn.addEventListener('click',score);
trackRatingsSave.addEventListener('click',score);

// Find track ratings
const elements = document.querySelectorAll('[id^="rating_num_z_"]');

// Find songs duration
const duration = document.querySelector('.section_tracklisting').querySelectorAll('span.tracklist_duration');

function score() {
    // Save ratings
    const ratings = [];
    elements.forEach((element) => {
        const rating = element.textContent.trim();
        ratings.push(rating);
    });

    // Save songs duration
    const seconds = [];
    duration.forEach(span => {
        const inSecond = span.dataset.inseconds;
        seconds.push(inSecond);
    });

    // Delete non rated songs
    for (let i = 0; i < seconds.length; i++) {
        if (ratings[i] === '---') {
          seconds.splice(i, 1);
          ratings.splice(i, 1);
        }
    }

    // Sum total duration
    let totalSeconds = seconds.reduce((x, y) => {
        return Number(x) + Number(y);
    }, 0);

    // Get score
    let totalScore = 0;
    for (let i = 0; i < seconds.length; i++){
        totalScore += Number(ratings[i]) * 2 * Number(seconds[i]);
    }

    // Get score to scale of 10
    const finalScore = totalScore / totalSeconds;

    // Update button text
    trackRatingBtn.textContent = "Track ratings [" + finalScore.toFixed(2) + "]";
}
