$(document).ready(function() {
    let isBookshelfGridView = true;

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

    // Toggle view layout for bookshelf
    $("#toggle-bookshelf-view").click(function() {
        isBookshelfGridView = !isBookshelfGridView;
        displayBookshelf();
    });

    function displayBookshelf(books) {
        var bookshelfContainer = $("#bookshelf-container");
        bookshelfContainer.empty(); // Clear previous items
        const template = $("#bookshelf-item-template").html();
        books.forEach(function(book) {
            const rendered = Mustache.render(template, {
                id: book.id,
                thumbnail: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '',
                title: book.volumeInfo.title
            });
            bookshelfContainer.append(rendered);
        });

        if (!isBookshelfGridView) {
            bookshelfContainer.removeClass("grid-view").addClass("list-view");
            $(".book-item").css("display", "flex").css("flex-direction", "row").css("align-items", "center");
            $(".book-item img").css("width", "150px").css("margin-right", "20px");
        } else {
            bookshelfContainer.removeClass("list-view").addClass("grid-view");
            $(".book-item").css("display", "flex").css("flex-direction", "column").css("align-items", "center");
            $(".book-item img").css("width", "100%").css("margin-right", "0");
        }
    }

    $(document).on('click', '.book-item', function() {
        var bookId = $(this).data('id');
        fetchBookDetails(bookId, '#bookshelf-details-container');
        
        // Smooth scroll to the bookshelf details container
        $('html, body').animate({
            scrollTop: $('#bookshelf-details-container').offset().top
        }, 1000); // 1000 milliseconds for a smooth scroll effect
    });

    function fetchBookDetails(bookId, containerId) {
        $.ajax({
            url: 'https://www.googleapis.com/books/v1/volumes/' + bookId,
            type: 'GET',
            success: function(response) {
                $(containerId).empty();
                const template = $("#book-details-template").html();
                const rendered = Mustache.render(template, {
                    title: response.volumeInfo.title,
                    subtitle: response.volumeInfo.subtitle,
                    authors: response.volumeInfo.authors ? response.volumeInfo.authors.join(', ') : '',
                    publishedDate: response.volumeInfo.publishedDate,
                    description: response.volumeInfo.description,
                    thumbnail: response.volumeInfo.imageLinks ? response.volumeInfo.imageLinks.thumbnail : ''
                });
                $(containerId).append(rendered);
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    }
});
