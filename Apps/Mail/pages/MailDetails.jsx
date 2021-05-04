const { Link } = ReactRouterDOM
import { mailService } from '../services/mail-service.js'

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

    onDeleteMail = () =>{
        const id = this.props.match.params.mailId;
        mailService.deleteMail(id)
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
                        <p>{mail.body}</p>
                    </div>
                </div>
                <div className="actions">
                     <Link to="/mail" >Back</Link>
                     <Link to="/mail" onClick={() =>{
                         this.onDeleteMail()
                     }}
                      >Delete</Link>
                </div>

            </section>
        )
    }
}

