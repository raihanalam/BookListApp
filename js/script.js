let form = document.getElementById('bookForm');
let bookList = document.querySelector('#book_list');

//Book Class
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class
class UI{

    static addBookList(book) {
        let list = document.querySelector('#book_list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`;

        list.appendChild(row);
    }
    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    //Showing all type of alert
    static showAlert(meassage,className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(meassage));

        let container = document.querySelector('.container');
        let form = document.querySelector('#bookForm');

        container.insertBefore(div,form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },4000);
    }

    //Deleting book from list
    static deleteFromBook(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            StoreBook.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert("Book Deleted.","success");
        }
    }
}
//Storage Class
class StoreBook{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        let books = StoreBook.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks(){
        let books = StoreBook.getBooks();

        books.forEach(book =>{
            UI.addBookList(book);
        })
    }

    static removeBook(isbn){
        let books = StoreBook.getBooks();

        books.forEach((book,index) =>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//All Event Here
form.addEventListener('submit',addNewBook);
bookList.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',StoreBook.displayBooks)

//Adding book in list
function addNewBook(e){
    let title = document.querySelector('#title').value,
    author =  document.querySelector('#author').value,
    isbn =  document.querySelector('#isbn').value;


    if(title === '' || author === ''  || isbn === ''){
        UI.showAlert("Empty field doesn't alllowed!","error");
        
        e.preventDefault();
    }
    else{
        let book1 = new Book(title,author,isbn);
    
        UI.addBookList(book1);
        UI.clearFields()
        UI.showAlert("Succesfully aded.","success");
        StoreBook.addBook(book1);

        e.preventDefault();
    }
}
//Deleting book from list
function removeBook(e){

    UI.deleteFromBook(e.target);
    e.preventDefault();
}