const addBookButton = document.querySelector(".add-book")
const dialog = document.querySelector("dialog")
const bookGrid = document.querySelector(".books")

const submitButton = document.querySelector(".submit")
const cancelButton = document.querySelector(".cancel")

const title = document.querySelector(".title")
const author = document.querySelector(".author")
const pages = document.querySelector(".pages")
const readButtons = document.querySelectorAll(".toggle-button")

const error = document.querySelectorAll(".error")

let inputTitle;
let inputAuthor;
let inputPages;
let inputRead;
let flag = 0;

const myLibrary = [];
let count = 0;

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

addBookButton.addEventListener("click", () => {
    readButtons[1].classList.add("active")
    dialog.showModal();
})

readButtons.forEach(button => {
    button.addEventListener("click", () => {
        readButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active")
        inputRead = button.id
        flag = 1;
    })
})

submitButton.addEventListener("click", (e) =>{
    e.preventDefault()

    //all inputs are not filled
    //TODO COULD BE WRITTEN IN A BETTER MANNER MAYBE
    if(title.value == "" ||  author.value == "" || pages.value == ""){
        if(title.value == ""){
            error[0].textContent = "*this is a required field"
        }
        else{
            error[0].textContent = ""
        }

        if(author.value == ""){
            error[1].textContent = "*this is a required field"
        }
        else{
            error[1].textContent = ""
        }

        if(pages.value == ""){
            error[2].textContent = "*this is a required field"
        }
        else{
            error[2].textContent = ""
        }
    }
    //to check if a book is already present in the library or not
    else if(myLibrary.some(book => book.title === title.value)){
        error[0].textContent = "*this book already exists"
        error[1].textContent = ""
        error[2].textContent = ""
    }
    else{
        //getting the values
        inputTitle = title.value
        inputAuthor = author.value
        inputPages = pages.value
        //inputRead is alread read from the readButon addeventlistener at the bottom

        //adding the new book to the myLibrary array 
        const dummyBook = new Book(inputTitle, inputAuthor, inputPages, inputRead)
        myLibrary[count] = dummyBook;
        count = count + 1
        console.log(myLibrary)

        //creating the new book tile in the grid
        const book = document.createElement("div");
        book.classList.add("book")

        const bookTitle = document.createElement("div");
        bookTitle.textContent = inputTitle

        const bookAuthor = document.createElement("div")
        bookAuthor.textContent = inputAuthor

        const bookPages = document.createElement("div");
        bookPages.textContent = inputPages

        const readBtn = document.createElement("button")
        readBtn.classList.add("book-button")
        if(flag == 0){
            readBtn.textContent = "Not Read"
        }
        else{
            if(inputRead == "read"){
                readBtn.textContent = "Read"
            }
            else if(inputRead == "not-read"){
                readBtn.textContent = "Not Read"
            }
        }

        const removeButton = document.createElement("button")
        removeButton.textContent = "Remove"
        removeButton.classList.add("book-button")
        //putting the new book tile on the BOOKGRID
        bookGrid.appendChild(book)

        book.appendChild(bookTitle)
        book.appendChild(bookAuthor)
        book.appendChild(bookPages)
        book.appendChild(readBtn)
        book.appendChild(removeButton)

        //to clear the inputs when submitted
        title.value = ""
        author.value = ""
        pages.value = ""
        error.forEach(inputError => {
            inputError.textContent = ""
        })
        readButtons.forEach(btn => btn.classList.remove("active"));
        dialog.close()
    }
})

cancelButton.addEventListener("click", () =>{
    //to clear the inputs when cancelled
    title.value = ""
    author.value = ""
    pages.value = ""
    error.forEach(inputError => {
        inputError.textContent = ""
    })
    readButtons.forEach(btn => btn.classList.remove("active"));
    dialog.close()
})

