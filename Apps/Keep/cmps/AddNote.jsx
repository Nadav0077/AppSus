import { keepService } from '../services/keep-service.js'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link, NavLink } = ReactRouterDOM

export class AddNote extends React.Component {

    componentDidMount() {

    }

    state = {
        inputVal:null
    }

    addTextInput = () => {
        return <form onSubmit={(ev) => {
            ev.preventDefault();
            this.onAddTextNote(ev)
        }}> <input type="text" onInput={this.handleChange} /><button>+</button></form>
    }

    onAddTextNote = () => {
        console.log(this.state.inputVal)
        keepService.addNote('NoteText',{txt:this.state.inputVal,style:{backgroundColor:'#C8B6FF'}}).then(()=>{
            this.props.onRenderPage()
        })
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({inputVal:value})
    }
    render() {
        console.log(this.props)
        return (
            <div className="add-note-container">
                <nav>
                    <NavLink to={`/note/addTextNote`}>Add Text</NavLink>
                    <NavLink to={`/note/addImgNote`}>Add Img</NavLink>
                    <NavLink to={`/note/addTodoNote`}>Add Todo</NavLink>
                </nav>

                <Switch>
                    <Route component={this.addTextInput} path={`/note/addTextNote`} />
                    <Route component={this.addImgInput} path={`/note/addImgNote`} />
                    <Route component={this.addTodoInput} path={`/note/addTodoNote`} />
                </Switch>
            </div>
        )
    }
}