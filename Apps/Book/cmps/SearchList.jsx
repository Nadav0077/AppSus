import { bookService } from "../services/book-service"

export function SearchList(props) {

    console.log(props, 'test')
    return <ul className="search-list">
        {props.books.map(book => {
            return <li key={book.id} className="search-res">
                <span>{book.title}</span> <span className="add-book-btn" onClick={() => props.onAddBook(book)}>+</span>
            </li>
        })}
    </ul>
}

