const { Link } = ReactRouterDOM
export function BookPreview({ book }) {
    console.log('test')
    var currencyCode = '';
    switch (book.listPrice.currencyCode) {
        case 'EUR': currencyCode = '€'
            break;
        case 'ILS': currencyCode = '₪'
            break;
        case 'USD': currencyCode = '$'
            break;
    }
    // console.log(book.id)
    return <Link to={`/book/${book.id}/seeReviews`}>
        <article className="book-preview">
            <h2>{(book.title.length > 20) ? book.title.substring(0, 20) + '...' : book.title}</h2>
            <p className="author">{(book.authors.length > 1) ? book.authors[0] + '...' : book.authors}</p>
            <img src={book.thumbnail} alt="" />
            <h1>Price: {book.listPrice.amount} {currencyCode}{book.listPrice.isOnSale && <span className="sale">SALE!</span>}</h1>
        </article></Link>
}