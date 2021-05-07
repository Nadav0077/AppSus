const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM;


import { mailService } from './services/mail-service.js'
import { keepService } from './../Keep/services/keep-service.js'
import { MailList } from './cmps/MailList.jsx'
import { MailSideBar } from './cmps/MailSideBar.jsx'


export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: null,
        sortBy: null,
        // noteId: this.match.params.noteId
    }
    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.filterBy, this.state.sortBy).then((mails) => {
            this.setState({ mails })
        })
    }

    setFilterBy = (str) => {
        this.setState({ filterBy: str }, this.loadMails)
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
    }

    onSetSort = (sortBy) => {
        this.setState({ sortBy }, this.loadMails)
    }

    addNoteAsMail() {
        const id = this.props.match.params.noteId
        keepService.getNoteById(id).then(note => {
            switch (note.type) {
                case 'NoteText': mailService.addMail('Note', note.info.txt, note.type)
                    break
                case 'NoteTodos': mailService.addMail('Note', note.info.todos.map(todo => todo.txt).join(', '), note.type)
                    break
                case 'NoteImg': mailService.addMail('Note', note.info.url, note.type)
                    break
                case 'NoteVideo': mailService.addMail('Note', note.info.url, note.type)
                    break
                case 'NoteAudio': mailService.addMail('Note', note.info.url, note.type)
                    break
            }
        })
        this.props.history.push('/mail')
    }


    render() {
        if (this.props.match.params.noteId) {
            this.addNoteAsMail()
        }
        const { mails } = this.state
        return (
            <section className="mail-layout">
                <MailSideBar onSetFilter={this.onSetFilter} setFilterBy={this.setFilterBy} onSetSort={this.onSetSort} setSortBy={this.setSortBy} />
                <MailList loadMails={this.loadMails} mails={mails} />
            </section>
        )
    }
}

