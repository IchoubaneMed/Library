/* Get the add book button */
const addBookBtn = document.querySelector('.add-book');
/* Get the close button */
const closeBtn = document.querySelector('.mdi-close-circle-outline'); 

/* Get the modal container */
const modalContainer = document.querySelector('.modal-container'); 

/* Get the modal form */
const modalForm = document.querySelector(".modal-form");

/* Get the table body */
const bodyTable = document.querySelector(".body-table");

// Get the log classes
const totalBooks = document.querySelector('.total-books');
const totalPages = document.querySelector('.total-pages');
const readBooks = document.querySelector('.read-books');
const unreadBooks = document.querySelector('.unread-books');

/* Listen for events */
addBookBtn.addEventListener("click", () => {
    modalContainer.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
});

modalForm.addEventListener('submit', addBookToLibrary);

document.addEventListener('DOMContentLoaded', displayBooks);


// Book Array

function displayBooks() {

    let books = getBooks();

    libLog(books);

    books.forEach((book, index) => {addBookToList(book, index)});

}

// Book object to be instanciate

function Book(title, author, pages, published, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.published = published;
    this.status = status;
}


function addBookToLibrary(event) {

    event.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#book-author').value;
    const pages = document.querySelector('#number-of-pages').value;
    const published = document.querySelector('#publishing-date').value;
    const status = document.querySelector('#book-status').value;
    

    const newBook = new Book(title, author, pages, published, status)

    addBooks(newBook);

    modalContainer.style.display = "none";

    clearFields();

    location.reload();
}

// Display infos inside the log 

function libLog(books) {
    let totalBooksConter = books.length;
    let totalPagesCounter = 0;
    let readBooksConter = 0;
    let unreadBooksCounter = 0;

    for (let i = 0; i < books.length; i += 1) {
        totalPagesCounter += parseInt(books[i].pages);
        if (books[i].status === "readit") {
            readBooksConter += 1;
        } else {
            unreadBooksCounter += 1;
        }
    }

    totalBooks.innerHTML = `${totalBooksConter}`;
    totalPages.innerHTML = `${totalPagesCounter}`;
    readBooks.innerHTML = `${readBooksConter}`;
    unreadBooks.innerHTML = `${unreadBooksCounter}`;

}

// Display books inside the table


function addBookToList(book, index){   

    const tbody = document.querySelector('.body-table');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.published}</td>
        <td class="status hover">${book.status}</td>
        <td><span class="mdi mdi-application-edit-outline hover"></span></td>
        <td><span class="mdi mdi-delete hover"></span></td>
    `;
    tbody.appendChild(row);


} 

// Handle storage

function getBooks() {
    let books = [];
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

function addBooks(book) {
    const books = getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
}

function removeBooks(id) {
    const books = getBooks();
    books.splice(id, 1);
    localStorage.setItem('books', JSON.stringify(books));
}

// Clear Fields

function clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#number-of-pages').value = '';
    document.querySelector('#publishing-date').value = '';
}


// Remove items from table

bodyTable.addEventListener("click", e =>{
    if(e.target.classList.contains("mdi-delete")) {
        removeBooks(parseInt(e.target.parentElement.parentElement.firstElementChild.textContent) - 1);
        location.reload();
    }
});


// Change the status

bodyTable.addEventListener("click", e => {
    if (e.target.classList.contains("status")) {
        toggleStatus(parseInt(e.target.parentElement.firstElementChild.textContent) - 1);
    }
});

// function that toogle the status

function toggleStatus(id){
    const books = getBooks();
    if (books[id].status === "readit") {
        books[id].status = "unreadit";
    } else {
        books[id].status = "readit";
    }
    localStorage.setItem('books', JSON.stringify(books));
    location.reload();
}

