// book-details.js
$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    $.getJSON(url, function(data) {
        displayBookDetails(data);
        initializeBookViewer(data.id);
    });

    function displayBookDetails(data) {
        const book = data.volumeInfo;
        const bookDetailsContainer = $('#book-details-container');

        const bookDetails = `
            <h1>${book.title}</h1>
            <img src="${book.imageLinks?.thumbnail}" alt="${book.title}">
            <p><strong>Authors:</strong> ${book.authors.join(', ')}</p>
            <p><strong>Publisher:</strong> ${book.publisher}</p>
            <p><strong>Published Date:</strong> ${book.publishedDate}</p>
            <p><strong>Description:</strong> ${book.description}</p>
            <p><strong>Price:</strong> ${book.saleInfo?.listPrice?.amount || 'Not available'}</p>
        `;
        bookDetailsContainer.append(bookDetails);
    }

    function initializeBookViewer(volumeId) {
        console.log('Initializing book viewer with volume ID:', volumeId);
        google.books.load();

        function initialize() {
            var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
            viewer.load(volumeId, alertNotFound);
        }

        google.books.setOnLoadCallback(initialize);

        function alertNotFound() {
            console.error("Could not embed the book!"); // Debugging line
        }
    }
});
