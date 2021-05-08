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
                    <Link to="/mail/compose"><img className="compose-icon" src="https://raw.githubusercontent.com/Nadav0077/AppSus/8a72a79202b41cf765811a21fe5a4a28ce1d4577/assets/_PNG 64/pencil.png"/></Link>
                </div>
            </section>
        )
    }
}

