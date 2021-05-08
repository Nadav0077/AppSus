const { Link } = ReactRouterDOM
import { mailService } from '../services/mail-service.js'
import { showUserMsg } from '../../../services/event-bus-service.js'
export class MailDetails extends React.Component {
    state = {
        mail: null
    }
    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const id = this.props.match.params.mailId
        mailService.getMailById(id).then(mail => {
            if (!mail) return this.props.history.push('/')
            this.setState({ mail })
        })
    }

    onDeleteMail = () => {
        const id = this.props.match.params.mailId;
        mailService.deleteMail(id)
        showUserMsg('Mail deleted successfully', 'error')
    }
    render() {
        const { mail } = this.state;
        if (!mail) return <h1>Loading...</h1>
        return (

            <section className="mail-full">
                <h1>{mail.subject}</h1>
                <div className="upper">
                    <h6>{mail.user} <small>{mail.user}@gmail.com</small></h6>
                    <h6>{Intl.DateTimeFormat('IL-il').format(mail.sentAt)}</h6>
                </div>
                <div>
                    <div className="content">
                        {mail.type !== 'NoteImg' && mail.type !== 'NoteVideo' && mail.type !== 'NoteAudio' && <p>{mail.body}</p>}
                        {mail.type === 'NoteImg' && <img className="noteImg" src={mail.body} />}
                        {mail.type === 'NoteAudio' && <audio controls>
                            <source src={mail.body} type="audio/ogg" />
                            <source src={mail.body} type="audio/mpeg" />
                    Your browser does not support the audio element.
      </audio>}
                        {mail.type === 'NoteVideo' && <iframe height="400px" width="100%" frameBorder="0" allowFullScreen
                            src={mailService.createEmbededLink(mail.body)}></iframe>}
                    </div>
                </div>
                <div className="actions">
                    <Link to="/mail" ><img src="https://raw.githubusercontent.com/Nadav0077/AppSus/8a72a79202b41cf765811a21fe5a4a28ce1d4577/assets/_PNG 64/back-button.png" /></Link>
                    <Link to={`/note/${mail.id}`}><img className="note-icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/8a72a79202b41cf765811a21fe5a4a28ce1d4577/assets/_SVG/basic_sheet_txt .svg" ></img></Link>
                    <Link to={`/mail/compose/${mail.id}`}><img className="reply-icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/9a35bf2add52a4088fe0eb535d75ee6715864ce2/assets/_SVG/back-reply-svgrepo-com.svg" /></Link>
                    <Link to="/mail" onClick={() => {this.onDeleteMail()}}><img src="https://raw.githubusercontent.com/Nadav0077/AppSus/8a72a79202b41cf765811a21fe5a4a28ce1d4577/assets/_PNG 64/basic_trashcan.png" /></Link>
                </div>
            </section>
        )
    }
}
