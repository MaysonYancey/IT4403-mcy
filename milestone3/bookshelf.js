$(document).ready(function() {
    // Fetch and display books from bookshelf
    $.ajax({
        url: `https://www.googleapis.com/books/v1/users/115677212204005988835/bookshelves/1001/volumes`, // Correct URL syntax
        method: 'GET',
        success: function(data) {
            console.log('Bookshelf data:', data.items);  // Debug log
            displayBookshelf(data.items);
        },
        error: function(xhr, status, error) {
            console.error('Bookshelf request failed:', status, error);
        }
    });

    function displayBookshelf(books) {
        var bookshelfContainer = $("#bookshelf-container");
        bookshelfContainer.empty();
        books.forEach(function(book) {
            var bookItem = $('<div class="book-item" data-id="' + book.id + '"></div>');
            bookItem.append('<h3>' + book.volumeInfo.title + '</h3>');  // Use volumeInfo for title
            if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
                bookItem.append('<img src="' + book.volumeInfo.imageLinks.thumbnail + '" alt="' + book.volumeInfo.title + '">');
            }
            bookshelfContainer.append(bookItem);
        });
    }
});
