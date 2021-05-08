import { storageService } from './storage-service.js'

export class SearchNote extends React.Component {
    state = {
        filterBy: '',
        searchBy: ''
    }
    componentDidMount() {
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        console.log(field, value)
        this.setState({ [field]: value }, () => {
            this.props.setFilter(this.state.filterBy, this.state.searchBy)
            console.log('filterd')
        })
    }


    render() {
        return <div className="search-container">
            <input placeholder="Search note..." type="text" name="searchBy" id="" onChange={this.handleChange} />
            <select name="filterBy" onChange={this.handleChange}>
                <option value="All">All</option>
                <option value="NoteText">Text</option>
                <option value="NoteImg">Image</option>
                <option value="NoteVideo">Video</option>
                <option value="NoteAudio">Audio</option>
                <option value="NoteTodos">Todos</option>
            </select>
        </div>
    }
}