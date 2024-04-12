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
    const apiUrl = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json';

// Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            // Extract the movie reviews from the API response
            const reviews = data.results;

            // Iterate through each movie review and display it on the page
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.textContent = review.display_title + ' - ' + review.summary_short;
                document.body.appendChild(reviewElement);
            });
        })
        .catch(error => {
             // Handle any errors that occur during the fetch request
            console.error('Error fetching data:', error);
        });
});
