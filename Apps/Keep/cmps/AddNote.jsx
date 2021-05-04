import { keepService } from '../services/keep-service.js'

export class AddNote extends React.Component {

    componentDidMount() {
        
    }

    state = {
       
    }

    onAddNote = () => {

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
            <div className="add-note-container">
                
            </div>
        )
    }
}