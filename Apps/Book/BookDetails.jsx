const { Route, Link, NavLink, Switch } = ReactRouterDOM
import { LongTxt } from '../cmps/LongTxt.jsx'
import { bookService } from '../services/book-service.js'
import { AddReview } from '../cmps/AddReview.jsx'

// export function BookDetails({ book, goBack, onDeleteBook }) {
export class BookDetails extends React.Component {
    state = {
        isLongTxtShown: false,
        book: null,
        // reviews: null
    }


    componentDidMount() {
        this.loadBook()

    }

    DetailsAddReview = () => {
        return <AddReview bookId={this.state.book.id} loadReviews={this.loadReviews} />
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    // loadReviews() {
    //     bookService.getReviews(this.state.book.id).then(reviews => {
    //         this.setState({ reviews: reviews })
    //     })
    // }

    loadBook() {
        const id = this.props.match.params.bookId
        bookService.getBookById(id).then(book => {
            if (!book) return this.props.history.push('/')
            this.setState({ book: book }, () => { /*this.loadReviews*/ })

        })
    }

    onDeleteBook = () => {
        bookService.deleteBook(this.state.book.id)
            .then(() => {
                this.props.history.push('/book')
            })
    }

    onChangeDesc = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    onDeleteReview = (idx) => {
        bookService.deleteReview(idx, this.state.book.id).then(() => {
            this.props.history.push(`/book/${this.state.book.id}/seeReviews`)
        })

    }


    SeeReviews = () => {
        var star = "\u2B50"
        var reviews = this.state.book.reviews
        console.log(this.state.book)
        if (!reviews) return <h1>There are no reviews for this book!</h1>
        return <div className="review-list">
            {reviews.map((review, idx) => {
                return <article key={idx}>
                    <h3 ><span className="del-review" onClick={() => { this.onDeleteReview(idx) }}>❌</span>{review.fullName}</h3>
                    <h4>Readed At: {review.readAt}</h4>
                    <h4>{star.repeat(review.stars)}</h4>
                    <p>{review.txt}</p>
                    <hr />
                </article>
            })}
        </div>
    }


    render() {
        var { book } = this.state
        if (!book) return 'Loading...'
        var readingType = ''
        var currencyCode = '';
        var priceColor = ''
        var bookTime
        if (new Date().getFullYear() - book.publishedDate > 10) bookTime = 'Vertan Book'
        else if (new Date().getFullYear() - book.publishedDate < 1) bookTime = 'New Book'
        if (book.pageCount > 500) readingType = 'Long reading'
        else if (book.pageCount < 100) readingType = 'Light reading'
        else readingType = 'Decent reading'
        switch (book.listPrice.currencyCode) {
            case 'EUR': currencyCode = '€'
                break;
            case 'ILS': currencyCode = '₪'
                break;
            case 'USD': currencyCode = '$'
                break;
        }

        if (book.listPrice.amount > 150) priceColor = 'red-text'
        else if (book.listPrice.amount < 20) priceColor = 'green-text'
        return (
            <div className="book-details">
                <button className="back" onClick={() => this.props.history.push('/book')} ><img src="../assets/img/back.png" /></button>
                <img src={book.thumbnail} alt="" className="book-img" />
                <div className="details-container">
                    <h1>{book.title}</h1>
                    <p className="author">{book.authors}</p>
                    {bookTime && <h3>{bookTime}</h3>}
                    <h3>Price:<span className={priceColor}> {book.listPrice.amount} {currencyCode} </span> {book.listPrice.isOnSale && <span className="sale">SALE!</span>}</h3>
                    <h4>{readingType}</h4>

                    <LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} onChangeDesc={this.onChangeDesc} />

                    <button className="delete-book" onClick={() => this.onDeleteBook(book.id)}><img src="../assets/img/garbage.png" /></button>

                </div>
                <div className="book-review">
                    <nav>
                        <NavLink to={`/book/${book.id}/addReview`}>Add Review</NavLink>
                        <NavLink to={`/book/${book.id}/seeReviews`}>See Reviews</NavLink>
                    </nav>

                    <Switch>
                        <Route component={this.DetailsAddReview} path={`/book/${book.id}/addReview`} />
                        <Route component={this.SeeReviews} path={`/book/${book.id}/seeReviews`} />
                    </Switch>
                </div>
            </div>
        )
    }
}