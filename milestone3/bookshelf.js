$(document).ready(function() {
    const userId = '115677212204005988835'; 
    const bookshelfId = '1001'; 
    const url = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${bookshelfId}/volumes`;

    $.getJSON(url, function(data) {
        displayBookshelf(data);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('API Request Failed:', textStatus, errorThrown); // debug
    });

    function displayBookshelf(data) {
        const bookshelfContainer = $('#bookshelf-container');
        bookshelfContainer.empty();

        if (!data.items || data.items.length === 0) {
            bookshelfContainer.append('<p>No books found in this bookshelf.</p>'); // debug
            return;
        }

        data.items.forEach(item => {
            const book = item.volumeInfo;
            const bookElement = `
                <div class="book-item">
                    <a href="book-details.html?id=${item.id}">
                        <img src="${book.imageLinks?.thumbnail}" alt="${book.title}">
                        <h3>${book.title}</h3>
                    </a>
                </div>
            `;
            bookshelfContainer.append(bookElement);
        });
    }
});

