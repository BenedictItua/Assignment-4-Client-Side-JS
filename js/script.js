// Wait for the DOM content to load before executing the script
document.addEventListener('DOMContentLoaded', function() {

    // Get the element with the ID 'studentInfo' and store it in a variable
    const studentInfo = document.getElementById('studentInfo');

    // Set the text content of the 'studentInfo' element to display student ID and name
    studentInfo.textContent = 'Student ID: 1220702, Name: Benedict Itua-Obaitua';

    // API key for Article Search API
    const apiKey = 'ptXfAJY6AfVdZD2hFhLtnDXnN1oZ3urk';
    
    // The URL for the Article Search API at nytimes.com
    const apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${apiKey}`;

    console.log('Fetching data from:', apiUrl);

    // Fetch data from the API
    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        if (data && data.response && data.response.docs && data.response.docs.length > 0) {
            const articles = data.response.docs;
            const articleResults = document.getElementById('articleResults');
            articleResults.innerHTML = '';
            articles.forEach(article => {
                if (article.headline && article.snippet) {
                    const articleElement = document.createElement('div');
                    articleElement.className = 'article';
                    articleElement.innerHTML = `<h2>${article.headline.main}</h2><p>${article.snippet}</p>`;
                    articleResults.appendChild(articleElement);
                }
            });
        } else {
            throw new Error('No articles found in the fetched data');
        }
    })
    .catch(error => {
        console.error('An error occurred:', error.message);
        alert('An error occurred while fetching articles. Please try again later.');
    });
});
