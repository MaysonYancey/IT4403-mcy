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

        data.items.forEach((item, index) => {
            if (index >= 60) return;

            const book = item.volumeInfo;
            const bookElement = `
                <div class="book-item">
                    <h3><a href="book-details.html?id=${item.id}">${book.title}</a></h3>
                    <img src="${book.imageLinks?.thumbnail}" alt="${book.title}">
                </div>
            `;
            resultsContainer.append(bookElement);
        });

        // Add pagination here if needed
    }
});
