import { keepService } from '../services/keep-service.js'
import { showUserMsg } from '../../../services/event-bus-service.js'
const { Link } = ReactRouterDOM

export class KeepPreview extends React.Component {

    state = {
        note: null,
        isEdit: false,
        inputVal: ''

    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        this.setState({ note: this.props.note })
    }

    NoteTodos = (props) => {
        return <div className="todos-list">
            {
                props.note.info.todos.map((todo, idx) => {
                    return <div key={idx} className="todo-container" onClick={() => {
                        todo.doneAt = (todo.doneAt) ? null : Date.now()
                        keepService.saveNote(props.note)
                        this.loadNote()
                    }}>
                        <p className={`todo ${todo.doneAt && 'todo-done'}`}>{todo.txt}</p>
                        {todo.doneAt && <span>{Intl.DateTimeFormat('IL-il').format(todo.doneAt)}</span>}
                    </div>
                })
            }
        </div>

    }

    NoteAudio = (props) => {
        return <audio controls>
            <source src={props.note.info.url} type="audio/ogg" />
            <source src={props.note.info.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
      </audio>
    }

    NoteImg = (props) => {
        return <img className="img-note" src={props.note.info.url} alt={props.note.info.title} />
    }

    NoteText = (props) => {
        return <p>{props.note.info.txt} </p>
    }

    NoteVideo = (props) => {

        return <iframe height="400px" width="100%" frameBorder="0" allowFullScreen
            src={keepService.createEmbededLink(props.note.info.url)}></iframe>
    }

    DynamicCmp = (props) => {
        switch (props.note.type) {
            case 'NoteTodos':
                return <this.NoteTodos {...props} />
            case 'NoteImg':
                return <this.NoteImg {...props} />
            case 'NoteText':
                return <this.NoteText {...props} />
            case 'NoteVideo':
                return <this.NoteVideo {...props} />
            case 'NoteAudio':
                return <this.NoteAudio {...props} />
            default:
                return <h1>nana</h1>
        }
    }

    NotePanel = () => {
        if (!this.state.isEdit)
            return <div className="note-panel">
                <input name="backgroundColor" type="color" onChange={this.handleColorChange} />
                <button className="icon edit-btn" onClick={() => { this.setState({ isEdit: true }) }}></button>
                <button className="icon pin-btn" onClick={() => { this.props.changePin(this.state.note) }}></button>
                <button className="icon delete-note-btn" onClick={() => { this.props.onDeleteNote(this.state.note) }}></button>
                <Link to={`/mail/${this.state.note.id}`}><div className="icon send-btn"></div></Link>
            </div>


        var placeHolderText = ''
        const { info } = this.state.note
        switch (this.state.note.type) {
            case 'NoteText': placeHolderText = info.txt
                break;
            case 'NoteImg':
            case 'NoteVideo': placeHolderText = info.url
                break;
            case 'NoteTodos': placeHolderText = info.todos.map(todo => { return todo.txt }).join(',')
                break;

        }

        return <form>
            <form onSubmit={(ev) => {
                ev.preventDefault();
                this.onEditNote()
            }}>
                <button onClick={() => { this.setState({ isEdit: false }) }} className="icon">{'<'}</button>
                <input placeholder={placeHolderText} name="editNote"
                    type="text" onInput={this.handleTextChange} /><button className="icon">+</button></form>
        </form>
    }

    onEditNote = () => {
        var note = this.state.note
        const { inputVal } = this.state
        switch (this.state.note.type) {
            case 'NoteText': note.info.txt = inputVal
                break;
            case 'NoteImg':
            case 'NoteVideo': note.info.url = inputVal
                break;
            case 'NoteTodos': {
                note.info.todos = this.state.inputVal.split(',').map(todo => { return { txt: todo, doneAt: null } })

            }
                break;

        }
        keepService.saveNote(note)
        this.setState({ note, isEdit: false })

    }

    handleTextChange = ({ target }) => {
        showUserMsg('Note Updated!', 'success')
        this.setState({ inputVal: target.value })
    }


    handleColorChange = ({ target }) => {
        const field = target.name
        const value = target.value
        var { note } = this.state
        note.info.style.backgroundColor = value;
        keepService.saveNote(note)
        this.setState({ note })
    }
    render() {
        if (!this.state.note) return 'loading...'
        return <article className="keep-preview" style={{ backgroundColor: this.props.note.info.style.backgroundColor }}>
            <this.DynamicCmp note={this.props.note} />
            <this.NotePanel />

        </article>
    }
}