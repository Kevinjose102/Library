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
let inputRead = "not-read";
let flag = 0;

let myLibrary = [];
let count = 0;

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

addBookButton.addEventListener("click", () => {
    readButtons[1].classList.add("active")
    flag = 0;
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
    else if(!isNaN(title.value)){
        error[0].textContent = "*enter a valid title"
    }
    else{
        //getting the values
        inputTitle = title.value
        inputAuthor = author.value
        inputPages = pages.value

        //inputRead is alread read from the readButon addeventlistener
        //adding the new book to the myLibrary array 
        const dummyBook = new Book(inputTitle, inputAuthor, inputPages, inputRead)
        myLibrary[count] = dummyBook;
        count = count + 1

        //creating the new book tile in the grid
        const book = document.createElement("div");
        book.classList.add("book")

        const bookTitle = document.createElement("div");
        bookTitle.textContent =  inputTitle
        bookTitle.classList.add("book-title")
        inputTitle = inputTitle.replaceAll(" ","-")
        book.classList.add(inputTitle)

        const bookAuthor = document.createElement("div")
        bookAuthor.textContent = inputAuthor

        const bookPages = document.createElement("div");
        bookPages.textContent = inputPages

        const readBtn = document.createElement("button")
        readBtn.classList.add("book-button")
        readBtn.classList.add("status-button")


        if(flag == 0){
            //change the value in myLibrary too
            myLibrary.forEach((book) => {
                if(book.title == inputTitle){
                    book.read = "not-read"
                }
            })
            readBtn.textContent = "Not Read"
            readBtn.style.backgroundColor = "rgba(219, 219, 37, 0.43)"
        }

        else{
            if(inputRead == "read"){
                readBtn.textContent = "Read"
                readBtn.style.backgroundColor = "rgba(64, 210, 64, 0.43)"
            }
            else if(inputRead == "not-read"){
                readBtn.textContent = "Not Read"
                readBtn.style.backgroundColor = "rgba(219, 219, 37, 0.43)"
            }
        }
        readBtn.addEventListener("click", () => toggleStatus(bookTitle.textContent.replaceAll(" ","-")))
        const removeButton = document.createElement("button")
        removeButton.textContent = "Remove"
        removeButton.classList.add("book-button")
        removeButton.classList.add("remove-button")
        removeButton.style.backgroundColor = "rgba(239, 27, 27, 0.33)";

        removeButton.addEventListener("click", () => removeBook(bookTitle.textContent.replaceAll(" ","-")))

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

        console.log(myLibrary)
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

function toggleStatus(inputTitle){
    const toggleButton = document.querySelector("." + inputTitle + " > .book-button")
    if(toggleButton.textContent == "Read"){
        toggleButton.textContent = "Not Read"
        toggleButton.style.backgroundColor = "rgba(219, 219, 37, 0.39)"
        let book = myLibrary.find(b => b.title === inputTitle)
        if(book){
            book.read = "not-read"
        }
    }
    else{
        toggleButton.textContent = "Read"
        toggleButton.style.backgroundColor = "rgba(64, 210, 64, 0.33)"
        let book = myLibrary.find(b => b.title === inputTitle)
        if(book){
            book.read = "read"
        }
    }
    console.log(myLibrary)
}


function removeBook(title){
    const book = document.querySelector("." + title)
    bookGrid.removeChild(book)
    count = count - 1;
    myLibrary = myLibrary.filter((book) => book.title != title.replaceAll("-"," "))
    console.log(myLibrary)
}