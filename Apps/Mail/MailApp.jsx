const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM;


import { mailService } from './services/mail-service.js'
import { MailList } from './cmps/MailList.jsx'
import { MailSideBar } from './cmps/MailSideBar.jsx'


export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: null
    }
    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        
        mailService.query(this.state.filterBy).then((mails) => {
            console.log(mails)
            this.setState({ mails })
            
        })
    }
    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
    }
    render() {
        const { mails } = this.state
        return (
            <section className="mail-layout">
                <MailSideBar onSetFilter={this.onSetFilter}/>
                <MailList loadMails ={this.loadMails} mails={mails} />
            </section>
        )
    }
}

