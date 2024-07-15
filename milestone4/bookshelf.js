$(document).ready(function() {
    const bookshelf = [
        {
            id: '1',
            title: 'Book Title 1',
            authors: 'Author 1',
            thumbnail: 'https://via.placeholder.com/128x192?text=Book+1',
            description: 'Description for Book 1',
            publisher: 'Publisher 1',
            publishedDate: '2021',
            isbn: '1234567890'
        },
        {
            id: '2',
            title: 'Book Title 2',
            authors: 'Author 2',
            thumbnail: 'https://via.placeholder.com/128x192?text=Book+2',
            description: 'Description for Book 2',
            publisher: 'Publisher 2',
            publishedDate: '2020',
            isbn: '0987654321'
        }
    ];

    $('#bookshelf-title').click(function() {
        displayBookshelf();
    });

    $(document).on('click', '.details-button', function() {
        const bookId = $(this).data('id');
        const book = bookshelf.find(item => item.id === bookId);
        if (book) {
            displayBookDetails(book);
        }
    });

    function displayBookshelf() {
        const template = $('#bookshelf-items-template').html();
        const rendered = Mustache.render(template, { books: bookshelf });
        $('#bookshelf-container').html(rendered);
    }

    function displayBookDetails(book) {
        const template = $('#book-details-template').html();
        const rendered = Mustache.render(template, book);
        $('#bookshelf-details-container').html(rendered);
    }

    // Initially display the bookshelf
    displayBookshelf();
});
