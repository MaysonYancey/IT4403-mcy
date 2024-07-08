$(document).ready(function() {
    let currentPage = 1;
    let itemsPerPage = 10;
    let searchResults = [];

    // Book search functionality
    $("#search-button").click(function() {
        var searchTerm = $("#search-term").val();
        console.log('Search term:', searchTerm);  // Debug log
        if (searchTerm) {
            $.ajax({
                url: 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm,
                method: 'GET',
                success: function(data) {
                    console.log('Search results:', data.items);  // Debug log
                    searchResults = data.items || [];
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
        console.log('Displaying results:', paginatedResults);  // Debug log

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
        console.log('Total pages:', totalPages);  // Debug log

        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                let pageLink = $('<span class="page-link">' + i + '</span>');
                pageLink.data('page', i);
                if (i === currentPage) {
                    pageLink.addClass('active');
                }
                paginationContainer.append(pageLink);
            }
        } else {
            paginationContainer.append('<span class="page-link active">1</span>');
        }
    }

    $(document).on('click', '.page-link', function() {
        currentPage = $(this).data('page');
        console.log('Navigating to page:', currentPage);  // Debug log
        displaySearchResults();
        setupPagination();
    });
});
