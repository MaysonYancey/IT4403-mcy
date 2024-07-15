$(document).ready(function() {
    let currentPage = 0;
    const resultsPerPage = 10;

    $('#search-button').click(function() {
        const searchTerm = $('#search-term').val();
        if (searchTerm) {
            searchBooks(searchTerm, currentPage);
        }
    });

    $('#prev-page-button').click(function() {
        if (currentPage > 0) {
            currentPage--;
            const searchTerm = $('#search-term').val();
            searchBooks(searchTerm, currentPage);
        }
    });

    $('#next-page-button').click(function() {
        currentPage++;
        const searchTerm = $('#search-term').val();
        searchBooks(searchTerm, currentPage);
    });

    function searchBooks(query, page) {
        $.ajax({
            url: `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${page * resultsPerPage}&maxResults=${resultsPerPage}`,
            method: 'GET',
            success: function(data) {
                const results = data.items.map(item => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                    thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Image',
                    description: item.volumeInfo.description || 'No description available',
                    publisher: item.volumeInfo.publisher || 'Unknown Publisher',
                    publishedDate: item.volumeInfo.publishedDate || 'Unknown Date',
                    isbn: item.volumeInfo.industryIdentifiers ? item.volumeInfo.industryIdentifiers[0].identifier : 'N/A'
                }));
                displaySearchResults(results);
            },
            error: function(error) {
                console.error('Error fetching search results:', error);
            }
        });
    }

    function displaySearchResults(results) {
        const template = $('#search-results-template').html();
        const rendered = Mustache.render(template, { results: results });
        $('#results-container').html(rendered);
    }

    function displayBookDetails(book) {
        const template = $('#book-details-template').html();
        const rendered = Mustache.render(template, book);
        $('#book-details-container').html(rendered);
    }

    // Event delegation for dynamically added book items
    $(document).on('click', '.book-item', function() {
        const bookId = $(this).data('id');
        const book = searchResults.find(item => item.id === bookId);
        if (book) {
            displayBookDetails(book);
        }
    });
});
