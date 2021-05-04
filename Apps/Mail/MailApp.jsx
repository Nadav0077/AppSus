import { mailService } from './services/mail-service.js'
import { MailList } from './cmps/MailList.jsx'


export class MailApp extends React.Component {
    state = {
        mails: []
    }
    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query().then((mails) => {
            this.setState({ mails })
        })
    }
    render() {
        const { mails } = this.state

        return (
            <section>
                <MailList loadMails ={this.loadMails} mails={mails} />
                
            </section>
        )
    }
}

