import { mailService } from './services/mail-service.js'


export class MailSideBar extends React.Component {
    state = {
    }
    componentDidMount() {
    }

    render() {
        return (

            <section className="mail-side-bar">
                <h1>{mailService.getPrecentOfRead()}%</h1>
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

