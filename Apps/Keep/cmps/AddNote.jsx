const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link, NavLink } = ReactRouterDOM
import { keepService } from '../services/keep-service.js'
import { showUserMsg } from '../../../services/event-bus-service.js'
import { func } from 'prop-types'
import { mailService } from '../../Mail/services/mail-service.js'


export class AddNote extends React.Component {

    state = {
        inputVal: null,
        type: null
    }
    componentDidMount() {
        this.setState({ type: 'NoteText' })
    }

    loadAudioFromInput = (ev) => {
        var reader = new FileReader()
        this.setState({ inputVal: reader.result })
        const func = (url) => {
            this.setState({ inputVal: url })
        }

        reader.onload = function (event) {
            var aud = new Audio()
            aud.src = event.target.result
            func(aud.src)
        }
        reader.readAsDataURL(ev.target.files[0])

    }

    audioInput = () => {
        return <form onSubmit={(ev) => {
            ev.preventDefault();
            this.onAddNote()
        }}> <input accept="audio/*" onChange={this.loadAudioFromInput} type="file" /><button className="icon">+</button></form>
    }


    DynamicInput = () => {
        if (this.props.mailId) {
            if (this.state.inputVal === null) {
                mailService.getMailById(this.props.mailId).then(mail=>{
                    this.setState({ type: 'NoteText', inputVal: `${mail.subject}: ${mail.body}` },
                    this.onAddNote)
                })
            }
        }
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
            case 'NoteAudio': return <this.audioInput />

        }
        return <form onSubmit={(ev) => {
            ev.preventDefault();
            this.onAddNote()
        }}> <input placeholder={placeHolderText} type="text" onChange={this.handleChange} /><button className="icon">+</button></form>
    }

    onAddNote = () => {
        if (!this.state.inputVal || !this.state.inputVal.length === 0) return
        var info = { txt: this.state.inputVal, style: { backgroundColor: '#C8B6FF' } }

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
            case 'NoteAudio': info = { url: this.state.inputVal, style: { backgroundColor: '#C8B6FF' } }
                break;
            // default:info = { txt: this.state.inputVal, style: { backgroundColor: '#C8B6FF' } }
        }
        keepService.addNote(this.state.type, info).then(() => {
            this.props.loadNotes()
            showUserMsg('Added Note!', 'success')
        })
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({ inputVal: value })
    }
    render() {
        return (
            <div className="add-note-container">
                <nav>
                    <button className="icon" onClick={() => { this.setState({ type: 'NoteText' }) }}>T</button>
                    <button className="icon img-btn" onClick={() => { this.setState({ type: 'NoteImg' }) }}></button>
                    <button className="icon todo-btn" onClick={() => { this.setState({ type: 'NoteTodos' }) }}></button>
                    <button className="icon video-btn" onClick={() => { this.setState({ type: 'NoteVideo' }) }}></button>
                    <button className="icon audio-btn" onClick={() => { this.setState({ type: 'NoteAudio' }) }}></button>
                </nav>

                <this.DynamicInput />
            </div>
        )
    }
}