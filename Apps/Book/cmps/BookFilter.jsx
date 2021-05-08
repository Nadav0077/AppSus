import { bookService } from "../services/book-service"
import { SearchList } from "./SearchList.jsx"

export class BookFilter extends React.Component {

    state = {
        filterBy: {
            title: '',
            maxPrice: '',
            minPrice: ''
        },
        books: []
    }

    onAddBook = (book) => {
        bookService.addBook(book)
        this.props.addBookRender()
    }

    handleChange = (ev, isFilter) => {

        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        if (isFilter) this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy)
        })

        else {
            if (ev.target.value === '') {
                this.setState({ books:[] })
                return
            }
            bookService.searchBook(ev.target.value).then(books => {
                this.setState({ books })
            })
        }
    }



    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { title, maxPrice, minPrice } = this.state.filterBy
        return (
            <div className="filter-search-container">

                {/* <section className="book-filter"> */}

                <form className="book-filter" onSubmit={this.onFilter}>
                    <div className="title-filter-container">

                        <label htmlFor="byTitle">By title</label>
                        <input type="text" id="byTitle" name="title" value={title} onChange={(ev) => this.handleChange(ev, true)} />
                    </div>

                    <div className="price-filter-container">
                        <label htmlFor="price">Min Price</label>
                        <input type="number" id="minPrice" name="minPrice" value={minPrice} onChange={(ev) => this.handleChange(ev, true)} />
                        <label htmlFor="maxPrice">Max Price</label>
                        <input type="number" id="maxPrice" name="maxPrice" value={maxPrice} onChange={(ev) => this.handleChange(ev, true)} />
                    </div>
                </form>
                {/* </section> */}
                <div className="search-container">
                    <input type="search" onKeyUp={(ev) => this.handleChange(ev, false)} placeholder="Search a book..." />
                    {this.state.books.length !== 0 && <SearchList books={this.state.books} onAddBook={this.onAddBook} />}
                </div>
            </div>
        )
    }
}