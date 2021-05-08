import { bookService } from '../services/book-service.js'

export class AddReview extends React.Component {

    componentDidMount() {
        console.log('test', this.props.bookId)
    }

    state = {
        review: {
            fullName: '',
            readedAt: '',
            ranking: '',
            txt: ''
        }
    }

    onAddReview = () => {
        const { fullName, readedAt, ranking, txt } = this.state.review
        console.log(this.state.review)
        bookService.addReview(this.props.bookId, txt, ranking, fullName, readedAt)
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({
            review: {
                ...prevState.review,
                [field]: value
            }
        }))
    }
    render() {
        console.log(this.props)
        return (
            <div className="add-review-container">
                <form className="add-review-container" onSubmit={(ev)=>{
                    ev.preventDefault();
                    this.onAddReview()
                    }}>
                    <div className="name-review-container">

                        <label htmlFor="fullName">Name:</label>
                        <input className="book-input" type="text" id="fullName" name="fullName" onChange={this.handleChange} />
                    </div>

                    <div className="date-review-container">

                        <label htmlFor="readedAt">Date:</label>
                        <input className="book-input" placeholder="dd-mm-yyyy" type="date" id="readedAt" name="readedAt" onChange={this.handleChange} />
                    </div>

                    <div className="ranking-review-container">

                        <label htmlFor="ranking">Ranking:</label>
                        <input  className="book-input" min="1" max="5" type="number" id="ranking" name="ranking" onChange={this.handleChange} />
                    </div>
                    <div className="txt-review-container">
                        <label htmlFor="txt">Free Text:</label>
                        <input className="book-input" type="textarea" id="txt" name="txt" onChange={this.handleChange} />
                    </div>


                    <button>Add Review</button>
                </form>
            </div>
        )
    }
}