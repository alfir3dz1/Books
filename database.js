let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('books.db');

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS books (title TEXT, author TEXT, isbn TEXT PRIMARY KEY, genre TEXT, availability TEXT)");
});

function addBookToDatabase(title, author, isbn, genre, availability) {
    db.run("INSERT INTO books (title, author, isbn, genre, availability) VALUES (?, ?, ?, ?, ?)", [title, author, isbn, genre, availability], function (err) {
        if (err) {
            console.error('Error adding book to database:', err.message);
        } else {
            console.log('Book added to database with isbn:', isbn);
        }
    });
}

function getAllBooksFromDatabase(callback) {
    db.all("SELECT * FROM books", function (err, rows) {
        if (err) {
            console.error('Error getting books from database:', err.message);
        } else {
            callback(rows);
        }
    });
}

function updateBookInDatabase(isbn, title, author, genre, availability) {
    db.run("UPDATE books SET title = ?, author = ?, genre = ?, availability = ? WHERE isbn = ?", [title, author, genre, availability, isbn], function (err) {
        if (err) {
            console.error('Error updating book in database:', err.message);
        } else {
            console.log('Book updated in database with isbn:', isbn);
        }
    });
}

function deleteBookFromDatabase(isbn) {
    db.run("DELETE FROM books WHERE isbn = ?", isbn, function (err) {
        if (err) {
            console.error('Error deleting book from database:', err.message);
        } else {
            console.log('Book deleted from database with isbn:', isbn);
        }
    });
}

module.exports = {
    addBookToDatabase,
    getAllBooksFromDatabase,
    updateBookInDatabase,
    deleteBookFromDatabase
};
