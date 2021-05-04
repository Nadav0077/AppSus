import { keepService } from '../services/keep-service.js'

export class KeepPreview extends React.Component {

    state = {
        note: null
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

    DynamicCmp = (props) => {
        switch (props.note.type) {
            case 'NoteTodos':
                return <this.NoteTodos {...props} />
            // <this.NoteTodos {...props} />
            case 'NoteImg':
                return <this.NoteImg {...props} />
            // <this.NoteImg {...props} />
            case 'NoteText':
                return <this.NoteText {...props} />
            // <this.NoteText {...props} />
            default:
                return <h1>nana</h1>
        }
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

        console.log(this.props.note)
        return <article className="keep-preview">
            <this.DynamicCmp note={this.props.note} />
        </article>
    }
}