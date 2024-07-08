$(document).ready(function() {
    $('#search-button').click(function() {
        var searchTerm = $('#search-term').val();
        searchBooks(searchTerm);
    });

    function searchBooks(query) {
        $.ajax({
            url: 'https://www.googleapis.com/books/v1/volumes',
            type: 'GET',
            data: {
                q: query,
                maxResults: 50,
                startIndex: 0,
                fields: 'items(id,volumeInfo(title,authors,imageLinks/thumbnail))'
            },
            success: function(response) {
                displayResults(response.items);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    }

    function displayResults(books) {
        $('#results-container').empty();
        if (books && books.length > 0) {
            books.forEach(function(book) {
                var bookItem = $('<div class="book-item"></div>');
                var bookThumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'placeholder.jpg';
                bookItem.append('<img src="' + bookThumbnail + '" alt="Book cover">');
                bookItem.append('<h3>' + book.volumeInfo.title + '</h3>');
                bookItem.data('book-id', book.id);
                $('#results-container').append(bookItem);
            });

            // Attach click event to book items
            $('.book-item').click(function() {
                var bookId = $(this).data('book-id');
                displayBookDetails(bookId);
            });
        } else {
            $('#results-container').append('<p>No books found.</p>');
        }
    }
});
