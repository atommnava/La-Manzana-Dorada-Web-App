// Datos de los libros (en lugar de una base de datos)
const books = [
    {
        id: 1,
        title: "El Principito",
        author: "Antoine de Saint-Exupéry",
        price: 12.99,
        genre: "Ficción"
    },
    {
        id: 2,
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        price: 15.50,
        genre: "Realismo mágico"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        price: 10.75,
        genre: "Distopía"
    },
    {
        id: 4,
        title: "Orgullo y prejuicio",
        author: "Jane Austen",
        price: 9.99,
        genre: "Romance"
    },
    {
        id: 5,
        title: "El Hobbit",
        author: "J.R.R. Tolkien",
        price: 14.25,
        genre: "Fantasía"
    },
    {
        id: 6,
        title: "Crónica de una muerte anunciada",
        author: "Gabriel García Márquez",
        price: 11.30,
        genre: "Novela"
    }
];

// Carrito de compras
let cart = [];

// Elementos del DOM
const bookListElement = document.getElementById('book-list');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const viewCartButton = document.getElementById('view-cart');
const cartModal = document.getElementById('cart-modal');
const cartItemsElement = document.getElementById('cart-items');
const closeCartButton = document.getElementById('close-cart');
const checkoutButton = document.getElementById('checkout');

// Mostrar libros en la página
function displayBooks() {
    bookListElement.innerHTML = '';

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card';

        bookElement.innerHTML = `
            <div class="book-image">📖</div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.genre}</p>
                <p class="price">$${book.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${book.id}">Añadir al carrito</button>
            </div>
        `;

        bookListElement.appendChild(bookElement);
    });

    // Agregar event listeners a los botones
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Añadir libro al carrito
function addToCart(event) {
    const bookId = parseInt(event.target.getAttribute('data-id'));
    const book = books.find(b => b.id === bookId);

    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            quantity: 1
        });
    }

    updateCart();
}

// Actualizar el carrito
function updateCart() {
    // Actualizar contador y total
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCountElement.textContent = totalItems;
    cartTotalElement.textContent = totalPrice.toFixed(2);

    // Actualizar items del carrito en el modal
    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Tu carrito está vacío</p>';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('