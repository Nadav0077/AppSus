import { keepService } from '../services/keep-service.js'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link, NavLink } = ReactRouterDOM

export class AddNote extends React.Component {

    componentDidMount() {

    }

    state = {
        inputVal: null,
        type: 'NoteTxt'
    }

    addTextInput = () => {
        console.log('test')
        return <form onSubmit={(ev) => {
            ev.preventDefault();
            this.onAddTextNote()
        }}> <input type="text" onInput={this.handleChange} /><button>+</button></form>
    }

    onAddTextNote = () => {
        var info = ''
        // console.log(this.state.inputVal.split(','))

        switch (this.state.type) {
            case 'NoteText': info = { txt: this.state.inputVal, style: { backgroundColor: '#C8B6FF' } }
                break;
            case 'NoteImg': info = { url: this.state.inputVal, title: 'My image', style: { backgroundColor: '#C8B6FF' } }
                break;
            case 'NoteTodos': {
                const todos = this.state.inputVal.split(',').map(todo => { return { txt: todo, doneAt: null } })
                info = { label: 'New Todo', todos, style: { backgroundColor: '#C8B6FF' } }
            }
                break;

        }
        keepService.addNote(this.state.type, info).then(() => {
            this.props.onRenderPage()
        })
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({ inputVal: value })
    }
    render() {
        console.log(this.props)
        return (
            <div className="add-note-container">
                <nav>
                    <NavLink to={`/note/addTextNote`}><span onClick={() => { this.setState({ type: 'NoteText' }) }}>Add Text</span></NavLink>
                    <NavLink to={`/note/addImgNote`}><span onClick={() => { this.setState({ type: 'NoteImg' }) }}>Add Img</span></NavLink>
                    <NavLink to={`/note/addTodoNote`}><span onClick={() => { this.setState({ type: 'NoteTodos' }) }}>Add Todo</span></NavLink>
                </nav>

                <Switch>
                    <Route component={this.addTextInput} path={`/note/addTextNote`} />
                    <Route component={this.addTextInput} path={`/note/addImgNote`} />
                    <Route component={this.addTextInput} path={`/note/addTodoNote`} />
                </Switch>
            </div>
        )
    }
}