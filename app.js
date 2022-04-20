/* Get the add book button */
const addBookBtn = document.querySelector('.add-book');
/* Get the close button */
const closeBtn = document.querySelector('.mdi-close-circle-outline'); 

/* Get the modal container */
const modalContainer = document.querySelector('.modal-container'); 

/* Listen for events */
addBookBtn.addEventListener("click", () => {
    modalContainer.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modalContainer.style.display = "none";
})
