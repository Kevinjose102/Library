const addBookButton = document.querySelector(".add-book")
const dialog = document.querySelector("dialog")
const submitButton = document.querySelector(".submit")
const cancelButton = document.querySelector(".cancel")
const title = document.querySelector(".title")
const author = document.querySelector(".author")
const pages = document.querySelector(".pages")
const read = document.querySelector("#read")

let inputTitle;
let inputAuthor;
let inputPages;
let inputRead;

const myLibrary = [];
let count = 0;

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

addBookButton.addEventListener("click", () => {
    dialog.showModal();
})

submitButton.addEventListener("click", (e) =>{
    e.preventDefault()

    if(title.value == "" && author.value == "" && pages.value == ""){
        console.log("wrong")
    }
    //to check if a book is already present in the library or not
    else if(myLibrary.some(book => book.title === title.value)){
        console.log("wrong")
    }
    else{
        //getting the values
        inputTitle = title.value
        inputAuthor = author.value
        inputPages = pages.value
        if(read.checked === true){
            inputRead = "true"
        }
        else{
            inputRead = "false"
        }

        const dummyBook = new Book(inputTitle, inputAuthor, inputPages, inputRead)

        myLibrary[count] = dummyBook;
        count = count + 1
        console.log(myLibrary)

        //to clear the inputs when submitted
        title.value = ""
        author.value = ""
        pages.value = ""
        dialog.close()
    }
})

cancelButton.addEventListener("click", () =>{
    //to clear the inputs when cancelled
    title.value = ""
    author.value = ""
    pages.value = ""
    dialog.close()
})
