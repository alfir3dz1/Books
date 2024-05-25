let users = [
    { username: "admin", password: "admin", role: "admin" },
    { username: "user", password: "user", role: "user" }
];


let books = [];


function isAuthenticated() {
    return sessionStorage.getItem("authenticated") === "true";
}


function showRegistrationForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registrationForm").style.display = "block";
}


function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        sessionStorage.setItem("authenticated", "true");
        sessionStorage.setItem("role", user.role);
        alert("Login successful!");
        displayBookManagement();
    } else {
        alert("Invalid username or password.");
    }
}


function register() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (!newUsername || !newPassword) {
        alert("Please fill in all fields.");
        return;
    }

   
    const userExists = users.some(u => u.username === newUsername);
    if (userExists) {
        alert("Username already exists. Please choose a different one.");
        return;
    }

    
    users.push({ username: newUsername, password: newPassword, role: "user" });
    alert("Registration successful! You can now login with your new credentials.");
    document.getElementById('newUsername').value = "";
    document.getElementById('newPassword').value = "";

    
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registrationForm").style.display = "none";
}


function logout() {
    sessionStorage.removeItem("authenticated");
    sessionStorage.removeItem("role");
    document.getElementById("authenticationForms").style.display = "block";
    document.getElementById("bookManagement").style.display = "none";
}


function displayBookManagement() {
    document.getElementById("authenticationForms").style.display = "none";
    document.getElementById("bookManagement").style.display = "block";
}


function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const genre = document.getElementById('genre').value;
    const availability = document.getElementById('availability').value;

    if (title && author && isbn && genre) {
        books.push({ title, author, isbn, genre, availability });
        displayBooks();
        clearInputs();
    } else {
        alert("Please fill in all fields.");
    }
}


function deleteBook(index) {
    if (confirm("Are you sure you want to delete this book?")) {
        books.splice(index, 1);
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const filteredBooks = books.filter(book => {
            return book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
        });
        displayBooks(filteredBooks);
        document.getElementById('search').value = ''; // Clear search input field
    }
}


function updateBook() {
    const index = document.getElementById('updateIndex').value;
    const title = document.getElementById('updateTitle').value;
    const author = document.getElementById('updateAuthor').value;
    const isbn = document.getElementById('updateIsbn').value;
    const genre = document.getElementById('updateGenre').value;
    const availability = document.getElementById('updateAvailability').value;

    if (title && author && isbn && genre) {
        if (confirm("Are you sure you want to update this book?")) {
            books[index] = { title, author, isbn, genre, availability };
            displayBooks();
            closeModal('updateModal');
        }
    } else {
        alert("Please fill in all fields.");
    }
}


function displayBooks(filteredBooks = books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    filteredBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn}, Genre: ${book.genre}, Availability: ${book.availability})`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteBook(index);
        li.appendChild(deleteButton);
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => openUpdateModal(index);
        li.appendChild(updateButton);
        bookList.appendChild(li);
    });
}


function clearInputs() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('availability').value = 'available';
}


function openUpdateModal(index) {
    const book = books[index];
    document.getElementById('updateTitle').value = book.title;
    document.getElementById('updateAuthor').value = book.author;
    document.getElementById('updateIsbn').value = book.isbn;
    document.getElementById('updateGenre').value = book.genre;
    document.getElementById('updateAvailability').value = book.availability;
    document.getElementById('updateIndex').value = index;
    document.getElementById('updateModal').style.display = 'block';
}


function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}


function searchBooks() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
    });
    displayBooks(filteredBooks);
}


function sortBooks() {
    books.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    displayBooks();
}


function goBackToLogin() {
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}


window.onload = function() {
    if (!isAuthenticated()) {
        
        document.getElementById("loginForm").style.display = "block";
    } else {
        
        displayBookManagement();
    }
};
