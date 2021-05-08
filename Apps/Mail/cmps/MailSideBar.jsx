import { MailStatus } from './MailStatus.jsx'
import { MailFilter } from './MailFilter.jsx'
import { MailSort } from './MailSort.jsx'

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
                <div className="search-bar">
                    <MailFilter onSetFilter={this.props.onSetFilter} />
                    <MailSort onSetSort={this.props.onSetSort} />
                </div>
                <Link className="compose" to="/mail/compose">Compose +</Link>
                <MailStatus />
                <nav className="mail-nav">
                    <ul className="clean-list">
                        <li onClick={() => { this.props.setFilterBy(null) }}>Inbox</li>
                        <li onClick={() => { this.props.setFilterBy('byFavorites') }}>Favorites</li>
                        <li onClick={() => { this.props.setFilterBy('bySent') }}>Sent Mails</li>
                    </ul>
                </nav>
                <div className="compose-ball">
                    <Link to="/mail/compose"><img className="compose-icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/main/assets/_PNG%2064/pencil.png"/></Link>
                </div>
            </section>
        )
    }
}

