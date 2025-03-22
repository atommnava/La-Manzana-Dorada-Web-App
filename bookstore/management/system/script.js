document.addEventListener("DOMContentLoaded", () => {
    fetchBooks();
});

/*
function fetchBooks() {
    fetch("http://localhost:3000/api/books")  // Llamamos al backend
        .then(response => response.json())
        .then(books => {
            displayBooks(books);
        })
        .catch(error => console.error("Error al obtener los libros:", error));
}
*/
fetch("https://tu-backend-render.com/api/books") // Usa la URL del backend
    .then(response => response.json())
    .then(books => {
        displayBooks(books);
    });


function displayBooks(books) {
    const catalog = document.getElementById("book-catalog");
    catalog.innerHTML = ""; // Limpiamos el contenedor antes de agregar libros

    books.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book-card");

        bookElement.innerHTML = `
            <img src="${book.cover_image}" alt="${book.title}" class="book-cover">
            <h5>${book.title}</h5>
            <p>${book.author}</p>
            <!--
            <p><strong>Género:</strong> ${book.genre}</p>
            <p><strong>Precio:</strong> $${book.price}</p>
            -->
            <!-- <button class="buy-button">Comprar</button> -->
        `;

        catalog.appendChild(bookElement);
    });
}
