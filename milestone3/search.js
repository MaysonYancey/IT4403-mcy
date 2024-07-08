$(document).ready(function() {
    let currentPage = 1;
    let itemsPerPage = 10;
    let searchResults = [];

    // Book search functionality
    $("#search-button").click(function() {
        var searchTerm = $("#search-term").val();
        if (searchTerm) {
            $.ajax({
                url: 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm,
                method: 'GET',
                success: function(data) {
                    searchResults = data.items;
                    currentPage = 1;
                    displaySearchResults();
                    setupPagination();
                },
                error: function(xhr, status, error) {
                    console.error('Search request failed:', status, error);
                }
            });
        }
    });

    function displaySearchResults() {
        let resultsContainer = $("#results-container");
        resultsContainer.empty();
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        let paginatedResults = searchResults.slice(startIndex, endIndex);

        paginatedResults.forEach(function(book) {
            var bookItem = $('<div class="book-item" data-id="' + book.id + '"></div>');
            bookItem.append('<h3>' + book.volumeInfo.title + '</h3>');
            if (book.volumeInfo.imageLinks) {
                bookItem.append('<img src="' + book.volumeInfo.imageLinks.thumbnail + '" alt="' + book.volumeInfo.title + '">');
            }
            resultsContainer.append(bookItem);
        });
    }

    function setupPagination() {
        let paginationContainer = $("#pagination-container");
        paginationContainer.empty();
        let totalPages = Math.ceil(searchResults.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            let pageLink = $('<span class="page-link">' + i + '</span>');
            pageLink.data('page', i);
            if (i === currentPage) {
                pageLink.addClass('active');
            }
            paginationContainer.append(pageLink);
        }
    }

    $(document).on('click', '.page-link', function() {
        currentPage = $(this).data('page');
        displaySearchResults();
        setupPagination();
    });
});
