import { keepService } from './services/keep-service.js'
import { AddNote } from './cmps/AddNote.jsx'
import { KeepList } from './cmps/KeepList.jsx'
import { SearchNote } from './cmps/SearchNote.jsx'

export class KeepApp extends React.Component {
    state = {
        filterBy: '',
        searchBy: '',
        notes: []
    }

    componentDidMount() {
        this.loadNotes()
    }

    onRenderPage = (filterBy = '', searchBy = '') => {
        this.setState({ filterBy, searchBy })
    }

    setFilter = (filterBy, searchBy) => {
        this.setState({ filterBy: filterBy, searchBy: searchBy }, () => {
            this.loadNotes()

        })

    }

    loadNotes = () => {
        keepService.query(this.state.filterBy, this.state.searchBy).then(notes => {
            this.setState({ notes })
        })
    }



    render() {
        const { filterBy, searchBy } = this.state
        // if (this.state.notes.length === 0) return 'loading..'
        return <section className="keep-app-container">
            <AddNote loadNotes={this.loadNotes} mailId={this.props.match.params.mailId} />
            <SearchNote setFilter={this.setFilter} />
            <KeepList notes={this.state.notes} loadNotes={this.loadNotes} notesToShow={{ filterBy, searchBy }} />
        </section>
    }
}