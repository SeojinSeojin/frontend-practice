const submitBtn = document.querySelector("#textSubmit");
submitBtn.addEventListener("click", () => {
    const searchBook = document.querySelector("#searchBook").value
    console.log(searchBook)
    $.ajax({
        method: "GET",
        url: "https://dapi.kakao.com/v3/search/book?target=title",
        data: {
            query: searchBook
        },
        headers: {
            Authorization: "KakaoAK f5c6e53a4e4edde0b36018aa9aa10f17"
        }
    }).done((books) => {
        console.log(books.documents)
        const book_search_res = document.querySelector("#book-search-res")
        while (book_search_res.hasChildNodes()) {
            book_search_res.removeChild(book_search_res.firstChild)
        }
        books.documents.forEach((book) => {
            const bs_div = document.createElement("div")
            bs_div.id = `book_${book.isbn}`
            bs_div.classList.add("book-search-res-div")
            bs_div.innerHTML = `<div class="book-title">${book.title}</div>
                    <img class="book-image" src="${book.thumbnail}">
                    <div class="book-authors">저자 : ${book.authors.join(", ")}</div>
                    <div class="book-publisher">출판사 : ${book.publisher}</div>
                    <div class="book-contents">${book.contents}</div>
                    <a class="waves-effect waves-light btn book-star-btn">즐겨찾기에 추가</a>
                    `
            book_search_res.appendChild(bs_div)
        })
        const bookStarBtns = document.querySelectorAll(".book-star-btn")
        bookStarBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const selected_book = btn.parentElement.id.slice(5)
                books.documents.forEach((book) => {
                    if (book.isbn === selected_book) {
                        paintStaredBook(book)
                        swal({
                            title: "추가 완료!",
                            text: `${book.title} - ${book.authors[0]}(이)가 즐겨찾기에 추가되었습니다!`,
                            icon: "success",
                            buttons: {
                                top: {
                                    text: "맨 위로",
                                    value: "toTop"
                                },
                                cont: "계속 둘러보기"
                            }
                        }).then((value) => {
                            if (value == "toTop") {
                                window.scrollTo(0, 0)
                            }
                        })

                    }
                })
            })
        })
    })
})
const stared_book_list_div = document.querySelector("#book-starrd-res");
let stared_book_list = []

function saveBooks() {
    localStorage.setItem("starred_books", JSON.stringify(stared_book_list));
}

function deleteStaredBook() {
    const btn = event.target;
    const div = btn.parentNode;
    stared_book_list_div.removeChild(div);
    stared_book_list = stared_book_list.filter(function(book) {
        return book.id != div.id
    })
    saveBooks()
}

function paintStaredBook(book) {
    const div = document.createElement("div");
    const delBtn = document.createElement("button");
    const a = document.createElement("a");
    const newId = stared_book_list.length + 1;
    book.id = newId
    div.id = newId
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteStaredBook);
    a.innerText = book.title;
    a.href = book.url
    div.appendChild(delBtn);
    div.appendChild(a);
    stared_book_list_div.appendChild(div);
    stared_book_list.push(book)
    saveBooks()
}

function loadStaredBooks() {
    const staredBooks = localStorage.getItem("starred_books");
    if (staredBooks !== null && staredBooks !== undefined) {
        const parsedStaredBooks = JSON.parse(staredBooks);
        console.log(parsedStaredBooks)
        parsedStaredBooks.forEach(function(sBook) {
            paintStaredBook(sBook);
        });
    }
}

function init() {
    loadStaredBooks();
}

init()