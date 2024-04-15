// Wait for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', function() {

     // Get the element with the ID 'studentInfo' and store it in a variable
    const studentInfo = document.getElementById('studentInfo');

     // Set the text content of the 'studentInfo' element to display student ID and name
    studentInfo.textContent = 'Student ID: 1220702, Name: Benedict Itua-Obaitua';

//https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=5UFyxcvHtcjpza5uHQpurVsrVdAC3Up9

//Getting the API key and pasting it below…
    const apiKey = '5UFyxcvHtcjpza5uHQpurVsrVdAC3Up9';
    
    // The URL for the Movie Review API at nytimes.com
    const apiUrl = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=godfather&api-key=' + apiKey;

    console.log('Fetching data from:', apiUrl);

// Fetch data from the API
fetch(apiUrl)
    .then(response => {
        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }
        // Parse response to JSON
        return response.json();
    })
    .then(data => {
        // Check if data and results exist
        if (data && data.results && data.results.length > 0) {
            const reviews = data.results;
            const movieReviews = document.getElementById('movieReviews');

            // Clear existing content in movieReviews container
            movieReviews.innerHTML = '';

            // Loop through each review and create a div element
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review';
                // Populate div with review title and summary
                reviewElement.innerHTML = `<h2>${review.display_title}</h2><p>${review.summary_short}</p>`;
                // Append review div to movieReviews container
                movieReviews.appendChild(reviewElement);
            });
        } else {
            throw new Error('No reviews found in the fetched data');
        }
    })
    .catch(error => {
        // Handle any errors that occurred during fetching or processing
        console.error('An error occurred:', error.message);
        alert('An error occurred while fetching movie reviews. Please try again later.');
    });
});
