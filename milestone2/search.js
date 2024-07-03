// search.js
$(document).ready(function() {
    $('#search-button').on('click', function() {
        const searchTerm = $('#search-term').val();
        const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
        
        $.getJSON(url, function(data) {
            displayResults(data);
        });
    });

    function displayResults(data) {
        const resultsContainer = $('#results-container');
        resultsContainer.empty();

        if (!data.items || data.items.length === 0) {
            resultsContainer.append('<p>No results found.</p>'); // Message for no results
            return;
        }

        const totalResults = Math.min(data.items.length, 60); // Limit to 60 results
        for (let i = 0; i < totalResults; i++) {
            const item = data.items[i];
            const book = item.volumeInfo;
            const bookElement = `
                <div class="book-item">
                    <h3><a href="book-details.html?id=${item.id}">${book.title}</a></h3>
                    <img src="${book.imageLinks?.thumbnail}" alt="${book.title}">
                </div>
            `;
            resultsContainer.append(bookElement);
        }

        // Add pagination here if needed
    }
});
