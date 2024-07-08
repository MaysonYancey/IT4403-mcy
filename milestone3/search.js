$(document).ready(function() {
    // Book search functionality
    $("#search-button").click(function() {
        var searchTerm = $("#search-term").val();
        if (searchTerm) {
            $.ajax({
                url: 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm,
                method: 'GET',
                success: function(data) {
                    var resultsContainer = $("#results-container");
                    resultsContainer.empty();
                    data.items.forEach(function(book) {
                        var bookItem = $('<div class="book-item" data-id="' + book.id + '"></div>');
                        bookItem.append('<h3>' + book.volumeInfo.title + '</h3>');
                        if (book.volumeInfo.imageLinks) {
                            bookItem.append('<img src="' + book.volumeInfo.imageLinks.thumbnail + '" alt="' + book.volumeInfo.title + '">');
                        }
                        resultsContainer.append(bookItem);
                    });
                }
            });
        }
    });
});
