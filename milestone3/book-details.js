function displayBookDetails(bookId) {
    $.ajax({
        url: 'https://www.googleapis.com/books/v1/volumes/' + bookId,
        type: 'GET',
        success: function(response) {
            $('#book-details-container').empty();
            $('#book-details-container').append('<h1>' + response.volumeInfo.title + '</h1>');
            $('#book-details-container').append('<p>By ' + response.volumeInfo.authors.join(', ') + '</p>');
            if (response.volumeInfo.imageLinks) {
                $('#book-details-container').append('<img src="' + response.volumeInfo.imageLinks.thumbnail + '" alt="Book cover">');
            }
            $('#book-details-container').append('<p>' + response.volumeInfo.description + '</p>');
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}
