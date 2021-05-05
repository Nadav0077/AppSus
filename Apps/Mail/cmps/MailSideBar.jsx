import { mailService } from './services/mail-service.js'
import { MailStatus } from './MailStatus.jsx'
import { MailFilter } from './MailFilter.jsx'
const { Link } = ReactRouterDOM


export class MailSideBar extends React.Component {
    state = {
    }
    componentDidMount() {
    }

    render() {
        return (
            <section className="mail-side-bar">
                <Link to="/mail/compose">Compose +</Link>
                <MailFilter onSetFilter={this.props.onSetFilter}/>
                <MailStatus />
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

