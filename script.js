let myLibrary = [];
    
function Book(input_arr){
    this.author = input_arr[0];
    this.title = input_arr[1];
    this.num_pages = input_arr[2];
    this.been_started = input_arr[3];
    this.curr_page = input_arr[4];
}

const bookgrid = document.querySelector('.bookgrid');
const formsuit = document.querySelector('.formsuit');

function bookDisplay(book){
        let authorCurr = document.createElement("div");
        authorCurr.textContent = `Author: ${book.author}`;
        authorCurr.classList.add('author');
        bookgrid.appendChild(authorCurr);

        let titleCurr = document.createElement("div");
        titleCurr.textContent = `Title: ${book.title}`;
        titleCurr.classList.add('title');
        bookgrid.appendChild(titleCurr);

        let lengthCurr = document.createElement("div");
        lengthCurr.textContent = `Page Length: ${book.num_pages}`;
        lengthCurr.classList.add('length');
        bookgrid.appendChild(lengthCurr);

        let startedCurr = document.createElement("div");
        startedCurr.textContent = `Status: ${book.been_started}`;
        startedCurr.classList.add('started');
        bookgrid.appendChild(startedCurr);

        let pageCurr = document.createElement("div");
        pageCurr.textContent = `Current Page: ${book.curr_page}`;
        pageCurr.classList.add('pagenum');
        bookgrid.appendChild(pageCurr);
        
        myLibrary.push(book);
    }

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let formData = new FormData(form);
    form.reset();
    let constructArgs = []
    for (const pair of formData.entries()) {
        constructArgs.push(pair[1])
    }
    if(constructArgs.length === 4){
        constructArgs.push(0);
    } else{
        form.removeChild(pageNumReq1);
        form.removeChild(pageNumReq2);  
    }
    bookDisplay(new Book(constructArgs));
    formsuit.classList.remove('open');
});

const startedButt = document.querySelectorAll('.has_start');
const nostartButt = document.querySelectorAll('.no_start');

const pageNumReq1 = document.createElement("label");
pageNumReq1.setAttribute('for', "pagenum");
pageNumReq1.textContent = "Current Page Number";

const pageNumReq2 = document.createElement("input");
pageNumReq2.setAttribute('id', "pagenum");
pageNumReq2.setAttribute('type', "number");
pageNumReq2.setAttribute('name', "current_page");
pageNumReq2.setAttribute('min',0);
pageNumReq2.setAttribute('oninput', "checkPages();")
pageNumReq2.required = true;

const radiob = document.querySelector('.radio-b');

startedButt.forEach(area => area.addEventListener('click', function addpart(){
    radiob.after(pageNumReq1);
    pageNumReq1.after(pageNumReq2);
}));

nostartButt.forEach(area => area.addEventListener('click', function rempart(){
    form.removeChild(pageNumReq1);
    form.removeChild(pageNumReq2);
}));

const bookAdd = document.querySelector('.bookadd');
bookAdd.addEventListener('click', ()=> formsuit.classList.add('open'));

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', ()=> formsuit.classList.remove('open'));

window.addEventListener('keyup', function esc(e){
    if (e.keyCode == 27) formsuit.classList.remove('open');
});

window.addEventListener('click', function escape(e){
    if (e.target.classList.contains('formsuit') && e.target.classList.contains('open')) formsuit.classList.remove('open');
});

function checkPages(){
    if(parseInt(document.querySelector('#pagenum').value) > parseInt(document.querySelector('#length').value)){
        document.querySelector('#pagenum').setCustomValidity("Completed pages cannot be more than total pages.");
    } else{
        document.querySelector('#pagenum').setCustomValidity("");
    }
}