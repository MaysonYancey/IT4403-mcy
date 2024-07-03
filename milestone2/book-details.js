$(document).ready(function() {

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    $.getJSON(url, function(data) {
        displayBookDetails(data);
        initializeBookViewer(bookId); 
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('API Request Failed:', textStatus, errorThrown); //debug
    });

    function displayBookDetails(data) {
        const book = data.volumeInfo;
        const bookDetailsContainer = $('#book-details-container');

        const bookDetails = `
             <div class="book-cover">
                <img src="${book.imageLinks?.thumbnail}" alt="${book.title}">
            </div>
            <div class="book-info">
                <h1>${book.title}</h1>
                <p><strong>Authors:</strong> ${book.authors.join(', ')}</p>
                <p><strong>Publisher:</strong> ${book.publisher}</p>
                <p><strong>Published Date:</strong> ${book.publishedDate}</p>
                <p><strong>Description:</strong> ${book.description}</p>
            </div>
        `;
        bookDetailsContainer.append(bookDetails);
    }

    function initializeBookViewer(volumeId) {
        google.books.load();

        function initialize() {
            var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
            viewer.load(volumeId, alertNotFound);
        }

        google.books.setOnLoadCallback(initialize);

        function alertNotFound() {
            alert("Could not embed the book!"); // error message
        }
    }
});