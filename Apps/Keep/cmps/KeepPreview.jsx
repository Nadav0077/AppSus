import { keepService } from '../services/keep-service.js'

export class KeepPreview extends React.Component {

    state = {
        note: null,

    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        this.setState({ note: this.props.note })
    }

    NoteTodos = (props) => {
        console.log(props)
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

    NoteImg = (props) => {
        return <img className="img-note" src={props.note.info.url} alt={props.note.info.title} />
    }

    NoteText = (props) => {
        return <p>{props.note.info.txt} </p>
    }

    NoteVideo = (props) => {
        return <iframe height="400px" width="100%" frameBorder="0" allowFullScreen src={props.note.info.url}></iframe>
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
            default:
                return <h1>nana</h1>
        }
    }



    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        var { note } = this.state
        switch(field){
            case 'backgroundColor': note.info.style.backgroundColor=value;
            break;
        }
        keepService.saveNote(note)
        this.setState({
            // review: {
            //     ...prevState.review,
            //     [field]: value
            // }
            note
        })
    }
    render() {

        console.log(this.props.note)
        return <article className="keep-preview" style={{ backgroundColor: this.props.note.info.style.backgroundColor }}>
            <this.DynamicCmp note={this.props.note} />
            <div className="note-pannel">
                <input name="backgroundColor" type="color" onChange={this.handleChange} />
            </div>
        </article>
    }
}