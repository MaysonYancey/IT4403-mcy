$(document).ready(function() {
    const bookshelfUrl = 'https://www.googleapis.com/books/v1/users/115677212204005988835/bookshelves/1001/volumes';

    $('#bookshelf-title').click(function() {
        fetchBookshelf();
    });

    $(document).on('click', '.details-button', function() {
        const bookId = $(this).data('id');
        const book = bookshelf.find(item => item.id === bookId);
        if (book) {
            displayBookDetails(book);
        }
    });

    function fetchBookshelf() {
        $.ajax({
            url: bookshelfUrl,
            method: 'GET',
            success: function(data) {
                const books = data.items.map(item => ({
                    id: item.id,
                    title: item.volumeInfo.title,
                    authors: item.volumeInfo.authors.join(', '),
                    thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+Image',
                    description: item.volumeInfo.description,
                    publisher: item.volumeInfo.publisher,
                    publishedDate: item.volumeInfo.publishedDate,
                    isbn: item.volumeInfo.industryIdentifiers ? item.volumeInfo.industryIdentifiers[0].identifier : 'N/A'
                }));
                displayBookshelf(books);
            },
            error: function(error) {
                console.error('Error fetching bookshelf:', error);
            }
        });
    }

    function displayBookshelf(books) {
        const template = $('#bookshelf-items-template').html();
        const rendered = Mustache.render(template, { books: books });
        $('#bookshelf-container').html(rendered);
    }

    function displayBookDetails(book) {
        const template = $('#book-details-template').html();
        const rendered = Mustache.render(template, book);
        $('#bookshelf-details-container').html(rendered);
    }

    // Initially display the bookshelf
    fetchBookshelf();
});
