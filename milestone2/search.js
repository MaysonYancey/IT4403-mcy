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
            console.log('Fetching batch:', url); // debug

            $.getJSON(url, function(data) {
                console.log('API Response:', data); // debug
                if (data.items) {
                    allItems = allItems.concat(data.items);
                }
                if (startIndex + batchSize < maxResults && data.items && data.items.length === batchSize) {
                    fetchBatch(startIndex + batchSize);
                } else {
                    displayResults(allItems);
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error('API Request Failed:', textStatus, errorThrown); // debug
            });
        }

        fetchBatch(0);
    }

    function displayResults(items) {
        const resultsContainer = $('#results-container');
        resultsContainer.empty();

        if (!items || items.length === 0) {
            resultsContainer.append('<p>No results found.</p>'); // no results
            return;
        }

        const totalResults = Math.min(items.length, 60); // limit to 60 results
        for (let i = 0; i < totalResults; i++) {
            const item = items[i];
            const book = item.volumeInfo;
            const bookElement = `
                <div class="book-item">
                    <a href="book-details.html?id=${item.id}">
                        <img src="${book.imageLinks?.thumbnail}" alt="${book.title}">
                        <h3>${book.title}</h3>
                    </a>
                </div>
            `;
            resultsContainer.append(bookElement);
        }
    }
});

