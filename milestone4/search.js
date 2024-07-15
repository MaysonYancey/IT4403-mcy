$(document).ready(function() {
    let currentPage = 1;
    let itemsPerPage = 10;
    let totalResults = 0;
    let searchResults = [];

    $('#search-button').click(function() {
        performSearch();
    });

    $('#prev-page-button').click(function() {
        if (currentPage > 1) {
            currentPage--;
            displayResults();
        }
    });

    $('#next-page-button').click(function() {
        if (currentPage * itemsPerPage < totalResults) {
            currentPage++;
            displayResults();
        }
    });

    $('#grid-view-button').click(function() {
        $('#results-container').removeClass('list-view').addClass('grid-view');
    });

    $('#list-view-button').click(function() {
        $('#results-container').removeClass('grid-view').addClass('list-view');
    });

    $(document).on('click', '.details-button', function() {
        const bookId = $(this).data('id');
        const book = searchResults.find(result => result.id === bookId);
        if (book) {
            displayBookDetails(book);
        }
    });

    function performSearch() {
        const searchTerm = $('#search-term').val();
        if (searchTerm) {
            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;

            $.get(apiUrl, function(data) {
                if (data.items) {
                    searchResults = data.items.map(item => ({
                        id: item.id,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                        thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Image',
                        description: item.volumeInfo.description || 'No description available',
                        publisher: item.volumeInfo.publisher || 'Unknown Publisher',
                        publishedDate: item.volumeInfo.publishedDate || 'Unknown Date',
                        isbn: item.volumeInfo.industryIdentifiers ? item.volumeInfo.industryIdentifiers[0].identifier : 'N/A'
                    }));
                    totalResults = searchResults.length;
                    currentPage = 1;
                    displayResults();
                } else {
                    $('#results-container').html('<p>No results found.</p>');
                }
            });
        }
    }

    function displayResults() {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedResults = searchResults.slice(startIndex, endIndex);

        const template = $('#search-results-template').html();
        const rendered = Mustache.render(template, { results: paginatedResults });
        $('#results-container').html(rendered);
    }

    function displayBookDetails(book) {
        const template = $('#book-details-template').html();
        const rendered = Mustache.render(template, book);
        $('#book-details-container').html(rendered);
    }
});
