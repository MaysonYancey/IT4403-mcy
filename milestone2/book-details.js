// book-details.js
$(document).ready(function() {
    console.log('Document is ready'); // Debugging line

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    console.log('Fetching book details from:', url); // Debugging line

    $.getJSON(url, function(data) {
        console.log('Book API Response:', data); // Debugging line
        displayBookDetails(data);
        initializeBookViewer(bookId); // Initialize the book viewer with the volume ID
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('API Request Failed:', textStatus, errorThrown); // Debugging line
    });

    function displayBookDetails(data) {
        console.log('Displaying book details'); // Debugging line
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
        console.log('Initializing book viewer with volume ID:', volumeId); // Debugging line
        google.books.load();

        function initialize() {
            var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
            viewer.load(volumeId, alertNotFound);
        }

        google.books.setOnLoadCallback(initialize);

        function alertNotFound() {
            alert("Could not embed the book!"); // Alert the user if the book cannot be embedded
        }
    }
});