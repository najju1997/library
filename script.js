const book_div = document.querySelector('.book');
const title_input = document.getElementById('title');
const author_input = document.getElementById('author');
const page_input = document.getElementById('page');
const status_checkbox = document.getElementById('status-checkbox');

const submit_button = document.getElementById('submit');
const addnew_button = document.getElementById('add-new');

let myLibrary = [];

function Book(title, author, page, status) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.status = status;
}

function addBookToLibrary() {
  submit_button.addEventListener('click', (e) => {
    e.preventDefault();
    const title = title_input.value;
    const author = author_input.value;
    const page = page_input.value;
    const status = status_checkbox.checked ? 'Read' : 'Unread'; // Handle the checkbox state directly
    const book = new Book(title, author, page, status);
    
    myLibrary.push(book);
    displayBook(myLibrary);
    // Clear input fields
    title_input.value = '';
    author_input.value = '';
    page_input.value = '';

    console.log(myLibrary);
  });
}

function displayBook(myLibrary) {
  let i = myLibrary.length - 1;
  const bookInfo = document.createElement('div');
  bookInfo.innerHTML = `
    <p>Name: ${myLibrary[i].title}</p>
    <p>Author: ${myLibrary[i].author}</p>
    <p>Page: ${myLibrary[i].page}</p>
    <p>Status: <span><button id="${i}" class="status">${myLibrary[i].status}</button></span></p>
    <p>Delete:<span><button id="${i}" class="delete">Delete</button></span></p>
  `;
  book_div.appendChild(bookInfo);
  updateStatus(myLibrary);
  deleteBook(myLibrary);

}

function updateStatus(myLibrary) {
  const status_buttons = document.querySelectorAll('.status');
  status_buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let buttonId = parseInt(event.target.id);
      const currentBook = myLibrary[buttonId];
      if (currentBook.status === 'Read') {
        currentBook.status = 'Unread';
      } else {
        currentBook.status = 'Read';
      }
      event.target.textContent = currentBook.status;
    });
  });
}

function deleteBook(myLibrary) {
  
  const delete_buttons = document.querySelectorAll('.delete');
  delete_buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const parentDiv = button.closest('div');
      let buttonId = parseInt(event.target.id);
      myLibrary.splice(buttonId, 1);
      book_div.removeChild(parentDiv); 
      console.log(myLibrary);
    });
  });
}

addBookToLibrary();

function openForm() {
  document.getElementById('myForm').style.display = 'flex';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
}