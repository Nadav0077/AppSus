import { mailService } from '../services/mail-service.js'
import { MailStatus } from './MailStatus.jsx'
import { MailFilter } from './MailFilter.jsx'
const { Link } = ReactRouterDOM


export class MailSideBar extends React.Component {
    state = {

    }
    componentDidMount() {
    }

    onSentMails = () => {
        this.props.loadMails('bySent')
    }
    render() {
        return (
            <section className="mail-side-bar">
                <Link to="/mail/compose">Compose +</Link>
                <MailFilter onSetFilter={this.props.onSetFilter} />
                <MailStatus />
                <nav className="mail-nav">
                    <ul className="clean-list">
                        <li onClick={() => {
                            this.props.setFilterBy(null)
                        }}>Inbox</li>
                        <li onClick={() => {
                            this.props.setFilterBy('byFavorites')
                        }}>Favorites</li>
                         <li onClick={() => {
                        this.props.setFilterBy('bySent')
                        }}>Sent Mails</li>
                    </ul>
                </nav>
            </section>
        )
    }
}

