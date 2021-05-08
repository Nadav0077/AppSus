import { bookService } from '../services/book-service.js'
import { eventBusService } from "../services/event-bus-service.js"
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from './BookDetails.jsx'

export class Book extends React.Component {

    state = {
        books: null,
        filterBy: null,
    }
    componentDidMount() {
        this.loadBooks()

    }



    addBookRender = () => {
        this.loadBooks()
    }

    loadBooks() {
        console.log('this.state.filterBy', this)
        bookService.query(this.state.filterBy).then(books => {
            this.setState({ books })

        })

    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }


    render() {
        const { books, selectedBook, filterBy } = this.state
        console.log(books)
        if (!books) return 'Loading..'
        console.log(selectedBook)
        return (
            <section className="home-page">
                <BookFilter filterBy={filterBy} onSetFilter={this.onSetFilter} addBookRender={this.addBookRender} />
                <BookList books={books} />
            </section>
        )
    }
}