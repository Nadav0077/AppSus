import { keepService } from '../services/keep-service.js'
const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link, NavLink } = ReactRouterDOM

export class AddNote extends React.Component {
    
    state = {
        inputVal: null,
        type: null
    }
    componentDidMount() {
        console.log(this.props)
        this.setState({type:'NoteText'})
    }


    DynamicInput = () => {
        var placeHolderText = ''
        switch (this.state.type) {
            case 'NoteText': placeHolderText = 'Enter text'
                break;
            case 'NoteImg': placeHolderText = 'Enter image url'
                break;
            case 'NoteTodos': placeHolderText = 'Enter notes saperated by ,'
                break;
            case 'NoteVideo': placeHolderText = 'Enter video url'
                break;
        }
        return <form onSubmit={(ev) => {
            ev.preventDefault();
            this.onAddTextNote()
        }}> <input placeholder={placeHolderText} type="text" onInput={this.handleChange} /><button className="icon">+</button></form>
    }

    onAddTextNote = () => {
        if(!this.state.inputVal||!this.state.inputVal.length===0) return
        debugger
        var info = { txt: this.state.inputVal, style: { backgroundColor: '#C8B6FF' } }
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
            case 'NoteVideo': info = { url: this.state.inputVal, style: { backgroundColor: '#C8B6FF' } }
                break;
            // default:info = { txt: this.state.inputVal, style: { backgroundColor: '#C8B6FF' } }
        }
        keepService.addNote(this.state.type, info).then(() => {
            console.log(this.state.type)
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
                    <button className="icon" onClick={() => { this.setState({ type: 'NoteText' }) }}>T</button>
                    <button className="icon img-btn" onClick={() => { this.setState({ type: 'NoteImg' }) }}></button>
                    <button className="icon todo-btn" onClick={() => { this.setState({ type: 'NoteTodos' }) }}></button>
                    <button className="icon video-btn" onClick={() => { this.setState({ type: 'NoteVideo' }) }}></button>
                </nav>

                <this.DynamicInput />
            </div>
        )
    }
}