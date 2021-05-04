import { mailService } from './services/mail-service.js'
export class MailStatus extends React.Component {
    state = {
    }
    componentDidMount() {
    }
    

    render() {
        const precent = mailService.getPrecentOfRead()
        return (
            <div className="mail-status">
                <h1>{precent}%</h1>
                <div className="bar-container">
                    <div className="bar-proccess" style={{width: `${precent}%`}}></div>
                </div>
            </div>
        )
    }
}