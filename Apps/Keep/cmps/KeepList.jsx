import { KeepPreview } from './KeepPreview.jsx'
import { keepService } from '../services/keep-service.js'

export class KeepList extends React.Component {
    state = {
        notes: []
    }
    componentDidMount() {
        this.loadNotes()
    }

    loadNotes() {
        keepService.getNotes().then(notes => {
            this.setState({ notes: notes })
        })
    }

    changePin = (note) => {
        note.isPinned = !note.isPinned
        keepService.saveNote(note)
        this.loadNotes()
    }

    render() {
        const { notes } = this.state
        if (!notes) return 'Loading'
        return <div className="notes-container">
            <h1>Pinned Notes</h1>
            <div className="pinned-container">
                {
                    notes.map(note => {
                        if (note.isPinned) return <KeepPreview changePin={this.changePin} key={note.id} note={note} />
                        return ''
                    })
                }
            </div>
            <h1>Unpinned Notes</h1>
            <div className="regular-container">
                {
                    notes.map(note => {
                        if (!note.isPinned) return <KeepPreview changePin={this.changePin} key={note.id} isPinnedList={false} note={note} />
                        return ''
                    })
                }
            </div>
        </div>
    }
}