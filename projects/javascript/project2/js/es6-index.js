class Book{
  constructor(title,author,isbn) 
  {
  this.title=title;
  this.author=author;
  this.isbn=isbn;  
  }

  

}


class Storage{
  //storing to local storage
  static getBooks(){
    let books;
    if(localStorage.getItem('books')===null){
       books=[];
    }
    else{
      books=JSON.parse(localStorage.getItem('books'));
    }

    return books;

  }
  
  static DisplayBooks(){
    const books =Storage.getBooks();
    books.forEach(function(book) {
      const ui= new UI;
      // add to ui
      ui.addBookToList(book);
    });

  }

  static storeBooks(book){
    const books= Storage.getBooks();
    
    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));

  }

  static removeBook(isbn){
    const books = Storage.getBooks();

    books.forEach(function (book,index) {
      if(book.isbn===isbn);
      {
        books.splice(index,1);
      }});

    localStorage.setItem('books', JSON.stringify(books));

  }
}

class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');
    //  create tr elemnt
    const row = document.createElement('tr');
    // insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td ><button class="btn btn-outline-danger btn-sm" id="deleteitem"> &times;</button></td>`;
    list.appendChild(row);

  };

  clearfields(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";

  };

  showErrorAlert(message){
    const div = document.createElement('div');
    //add class
    div.className = `alert alert-danger`;
    //add text
    div.appendChild(document.createTextNode(message))
    //get parent element
    const parentEl = document.getElementById('mainparent');
    //get the next element i.e form
    const form = document.getElementById('mainform');
    //insert in ui
    parentEl.insertBefore(div, form);

    // timeout after 3 secs
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);

  };

  showSuccessAlert(message){

    const div = document.createElement('div');
    div.className = `alert alert-success`;
    div.appendChild(document.createTextNode(message));
    // get the parentElement
    const parentEl = document.getElementById('mainparent');
    //get the next element i.e form
    const form = document.getElementById('mainform');
    //insert in dom
    parentEl.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000);
  };

  DeleteBook(target){
    if (target.id === 'deleteitem') {
      target.parentElement.parentElement.remove();
      // show alert
      const ui = new UI();
      ui.showSuccessAlert('book removed');
      
      // remove from local storage
      Storage.removeBook(target.parentElement.previousElementSibling.textContent);
    }
  }

}



//dom load event

document.addEventListener('DOMContentLoaded',Storage.DisplayBooks);
// event listner for add book

document.getElementById('submit').addEventListener('click',

  function () {
    // get form values
    const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value;

      
    // instancing book
    const book = new Book(title, author, isbn);
 
    // instancing ui 

    const ui = new UI();



    if (title === '' || author === '' || isbn === '') {
      //error alert
      ui.showErrorAlert('please fill in all the feilds', 'error');

    } else {


      // Add book to list

      ui.addBookToList(book);

      // add to local storage
     
      Storage.storeBooks(book);

      // clear fields
      ui.clearfields();

      //success
      ui.showSuccessAlert('Values inserted ....!');

    }

  });

// delete books evnt listner
document.getElementById('book-list').addEventListener('click', function (e) {

  // instancing ui 
  const ui = new UI();
  // delete book
  ui.DeleteBook(e.target);
  // show alert msg
  
  
});
