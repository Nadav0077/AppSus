const { Link } = ReactRouterDOM
import { mailService } from '../services/mail-service.js'

export class MailCompose extends React.Component {
    state = {
        mail: {
            subject: '',
            body: ''
        }
    }
    componentDidMount() {
    }
    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ mail: { ...this.state.mail, [field]: value } })
    }

    onSendMail(){
        const {subject,body} = this.state.mail
        mailService.addMail(subject,body);
    }

    render() {
        return (
            <div className="add-mail">
                <h1>New Email</h1>
                <form className="mail-form">
                    <input placeholder="Subject" type="text" name="subject" onChange={this.handleChange}/>
                    <textarea onChange={this.handleChange} placeholder="Content" name="body" cols="30" rows="10"></textarea>
                </form>
                <div className="actions">
                    <Link to="/mail" ><img src="../../../assets/_PNG 64/back-button.png"/></Link>
                    <Link to="/mail" onClick={() =>{
                        this.onSendMail()
                    }}><img src="../../../assets/_PNG 64/basic_paperplane.png"></img> </Link>
                </div>

            </div>
        )
    }
}
