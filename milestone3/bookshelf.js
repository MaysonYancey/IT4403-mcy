 $(document).ready(function() {
        // Fetch and display books from bookshelf
        $.ajax({
            url: 'https://www.googleapis.com/books/v1/users/${115677212204005988835}/bookshelves/${1001}/volumes`', // Update with actual URL
            method: 'GET',
            success: function(data) {
                displayBookshelf(data.items);
            }
        });
    
        function displayBookshelf(books) {
            var bookshelfContainer = $("#bookshelf-container");
            bookshelfContainer.empty();
            books.forEach(function(book) {
                var bookItem = $('<div class="book-item" data-id="' + book.id + '"></div>');
                bookItem.append('<h3>' + book.title + '</h3>');
                if (book.image) {
                    bookItem.append('<img src="' + book.image + '" alt="' + book.title + '">');
                }
                bookshelfContainer.append(bookItem);
            });
        }
    });
    