CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    price DECIMAL(10,2),
    stock INT DEFAULT 0,
    cover_image VARCHAR(255) -- URL de la imagen del libro
);
