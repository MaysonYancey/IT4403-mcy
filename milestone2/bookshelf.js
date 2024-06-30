$(document).ready(function() {
    const bookshelfId = 'YOUR_BOOKSHELF_ID';
    const url = `https://www.googleapis.com/books/v1/users/YOUR_USER_ID/bookshelves/${bookshelfId}/volumes`;

    $.getJSON(url, function(data) {
        displayBookshelf(data);
    });

    function displayBookshelf(data) {
        const bookshelfContainer = $('#bookshelf-container');
        bookshelfContainer.empty();

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
