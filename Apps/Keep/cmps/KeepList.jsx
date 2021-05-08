import { KeepPreview } from './KeepPreview.jsx'
import { keepService } from '../services/keep-service.js'
import { showUserMsg } from '../../../services/event-bus-service.js'

export class KeepList extends React.Component {
    state = {
        notes: this.props.notes
    }
    componentDidMount() {
        // this.props.loadNotes()
        // this.setState({ notes: this.props.notes })
    }


    changePin = (note) => {
        note.isPinned = !note.isPinned
        keepService.saveNote(note)
        this.props.loadNotes()
    }

    onDeleteNote = (note) => {
        keepService.delNote(note)
        this.props.loadNotes()
        showUserMsg('Note Deleted!', 'error')
    }

    render() {
        const { notes } = this.props
        if (!notes) return 'Loading'
        return <div className="notes-container">
            <h1>Pinned Notes</h1>
            <div className="pinned-container">
                {
                    notes.map(note => {
                        if (note.isPinned) return <KeepPreview onDeleteNote={this.onDeleteNote} changePin={this.changePin} key={note.id} note={note} />
                        return ''
                    })
                }
            </div>
            <h1>Unpinned Notes</h1>
            <div className="regular-container">
                {
                    notes.map(note => {
                        if (!note.isPinned) return <KeepPreview onDeleteNote={this.onDeleteNote} changePin={this.changePin} key={note.id} isPinnedList={false} note={note} />
                        return ''
                    })
                }
            </div>
        </div>
    }
}