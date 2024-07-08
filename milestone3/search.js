$(document).ready(function() {
    let currentPage = 1;
    let itemsPerPage = 10;
    let searchResults = [];
    const maxResultsPerRequest = 40; // Google Books API limit

    // Book search functionality
    $("#search-button").click(function() {
        var searchTerm = $("#search-term").val();
        console.log('Search term:', searchTerm);  // Debug log
        if (searchTerm) {
            searchResults = [];
            currentPage = 1;
            fetchResults(searchTerm, 0, maxResultsPerRequest, function() {
                if (searchResults.length < 50) {
                    fetchResults(searchTerm, 40, 10, function() {
                        displaySearchResults();
                        setupPagination();
                    });
                } else {
                    displaySearchResults();
                    setupPagination();
                }
            });
        }
    });

    function fetchResults(searchTerm, startIndex, maxResults, callback) {
        $.ajax({
            url: `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`,
            method: 'GET',
            success: function(data) {
                console.log('Fetched results:', data.items);  // Debug log
                searchResults = searchResults.concat(data.items || []);
                callback();
            },
            error: function(xhr, status, error) {
                console.error('Search request failed:', status, error);
                callback();
            }
        });
    }

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

    $(document).on('click', '.book-item', function() {
        var bookId = $(this).data('id');
        fetchBookDetails(bookId);
    });

    function fetchBookDetails(bookId) {
        $.ajax({
            url: `https://www.googleapis.com/books/v1/volumes/${bookId}`,
            method: 'GET',
            success: function(data) {
                displayBookDetails(data);
            },
            error: function(xhr, status, error) {
                console.error('Book details request failed:', status, error);
            }
        });
    }

    function displayBookDetails(book) {
        let detailsContainer = $("#book-details-container");
        detailsContainer.empty();
        let bookInfo = book.volumeInfo;

        let bookDetails = `
            <div class="book-info">
                <h1>${bookInfo.title}</h1>
                <p><strong>Authors:</strong> ${bookInfo.authors ? bookInfo.authors.join(', ') : 'N/A'}</p>
                <p><strong>Publisher:</strong> ${bookInfo.publisher ? bookInfo.publisher : 'N/A'}</p>
                <p><strong>Published Date:</strong> ${bookInfo.publishedDate ? bookInfo.publishedDate : 'N/A'}</p>
                <p><strong>Description:</strong> ${bookInfo.description ? bookInfo.description : 'N/A'}</p>
            </div>
        `;

        if (bookInfo.imageLinks && bookInfo.imageLinks.thumbnail) {
            bookDetails = `<div class="book-cover"><img src="${bookInfo.imageLinks.thumbnail}" alt="${bookInfo.title}"></div>` + bookDetails;
        }

        detailsContainer.append(bookDetails);
    }
});
