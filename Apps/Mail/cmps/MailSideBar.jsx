import { mailService } from './services/mail-service.js'
import { MailStatus } from './MailStatus.jsx'


export class MailSideBar extends React.Component {
    state = {
    }
    componentDidMount() {
    }

    render() {
        return (

            <section className="mail-side-bar">
                <MailStatus></MailStatus>
                <button>Compose +</button>
                <nav className="mail-nav">
                    <ul className="clean-list">
                        <li>Inbox</li>
                        <hr/>
                        <li>Sent Mails</li>
                        <hr/>
                    </ul>
                </nav>
            </section>
        )
    }
}

