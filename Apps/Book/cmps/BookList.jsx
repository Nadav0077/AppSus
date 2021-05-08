
import { BookPreview } from './BookPreview.jsx'

export class BookList extends React.Component {




    render() {

        return <section className="book-list">
            {this.props.books.map(book => (

                <BookPreview book={book} key={book.id} />
            )
            )

            }
        </section>

    }
}