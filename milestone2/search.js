// search.js
$(document).ready(function() {
    $('#search-button').on('click', function() {
        const searchTerm = $('#search-term').val();
        fetchAllResults(searchTerm);
    });

    function fetchAllResults(searchTerm) {
        const maxResults = 60;
        const batchSize = 40;
        let allItems = [];
        
        function fetchBatch(startIndex) {
            const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${batchSize}`;
            console.log('Fetching batch:', url); // Debugging line

            $.getJSON(url, function(data) {
                console.log('API Response:', data); // Debugging line
                if (data.items) {
                    allItems = allItems.concat(data.items);
                }
                if (startIndex + batchSize < maxResults && data.items && data.items.length === batchSize) {
                    fetchBatch(startIndex + batchSize);
                } else {
                    displayResults(allItems);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error('API Request Failed:', textStatus, errorThrown); // Debugging line
            });
        }

        fetchBatch(0);
    }

    function displayResults(items) {
        const resultsContainer = $('#results-container');
        resultsContainer.empty();

        if (!items || items.length === 0) {
            resultsContainer.append('<p>No results found.</p>'); // Message for no results
            return;
        }

        const totalResults = Math.min(items.length, 60); // Limit to 60 results
        for (let i = 0; i < totalResults; i++) {
            const item = items[i];
            const book = item.volumeInfo;
            const bookElement = `
                <div class="book-item">
                    <h3><a href="book-details.html?id=${item.id}">${book.title}</a></h3>
                    <img src="${book.imageLinks?.thumbnail}" alt="${book.title}">
                </div>
            `;
            resultsContainer.append(bookElement);
        }
    }
});

