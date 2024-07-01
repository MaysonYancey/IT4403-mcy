// bookshelf.js
$(document).ready(function() {
    const userId = '115677212204005988835'; // Your User ID
    const bookshelfId = '1001'; // Your Bookshelf ID
    const url = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${bookshelfId}/volumes`;

    console.log('Fetching bookshelf books from:', url); // Debugging line

    $.getJSON(url, function(data) {
        console.log('Bookshelf API Response:', data); // Debugging line
        displayBookshelf(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('API Request Failed:', textStatus, errorThrown); // Debugging line
    });

    function displayBookshelf(data) {
        const bookshelfContainer = $('#bookshelf-container');
        bookshelfContainer.empty();

        if (!data.items || data.items.length === 0) {
            bookshelfContainer.append('<p>No books found in this bookshelf.</p>'); // Debugging line
            return;
        }

        data.items.forEach(item => {
            const book = item.volumeInfo;
            const bookElement = `
                <div class="book-item">
                    <h3><a href="book-details.html?id=${item.id}">${book.title}</a></h3>
                    <img src="${book.imageLinks?.thumbnail}" alt="${book.title}">
                </div>
            `;
            bookshelfContainer.append(bookElement);
        });
    }
});

