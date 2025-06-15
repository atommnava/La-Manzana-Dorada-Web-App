// Datos de los libros
const books = [
    {
        id: 1,
        title: "1984",
        author: "George Orwell",
        price: 299.50,
        image: "1984.png"
    },
    {
        id: 2,
        title: "Cien Años de Soledad",
        author: "Gabriel García Márquez",
        price: 199.00,
        image: "cien_anios.png"
    },
    {
        id: 3,
        title: "El Principito",
        author: "Antoine de Saint-Exupéry",
        price: 129.00,
        image: "principito.png"
    },
    {
        id: 4,
        title: "Orgullo y Prejuicio",
        author: "Jane Austen",
        price: 199.00,
        image: "placeholder.png" // Cambiar por imagen real
    },
    {
        id: 5,
        title: "Don Quijote de la Mancha",
        author: "Miguel de Cervantes",
        price: 99.00,
        image: "placeholder.png" // Cambiar por imagen real
    },
    {
        id: 6,
        title: "Crónica de una Muerte Anunciada",
        author: "Gabriel García Márquez",
        price: 129.00,
        image: "placeholder.png" // Cambiar por imagen real
    }
];

// Función para mostrar los libros
function displayBooks() {
    const catalogElement = document.getElementById('book-catalog');

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';

        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book-cover">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <p class="book-price">$${book.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${book.id}">Añadir al carrito</button>
            </div>
        `;

        catalogElement.appendChild(bookElement);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            const book = books.find(b => b.id === bookId);
            alert(`"${book.title}" añadido al carrito`);
            // Aquí podrías añadir lógica para el carrito
        });
    });
}

// Inicializar la página cuando se cargue
window.addEventListener('DOMContentLoaded', displayBooks);