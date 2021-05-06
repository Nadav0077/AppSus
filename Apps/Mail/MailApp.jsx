const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM;


import { mailService } from './services/mail-service.js'
import { MailList } from './cmps/MailList.jsx'
import { MailSideBar } from './cmps/MailSideBar.jsx'


export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: null,
        sortBy: null
    }
    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.filterBy,this.state.sortBy).then((mails) => {
            this.setState({ mails })
        })
    }

    setFilterBy = (str) => {
        this.setState({filterBy: str},this.loadMails)
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
    }

    onSetSort = (sortBy) => {
        this.setState({ sortBy }, this.loadMails)
    }


    render() {
        const { mails } = this.state
        return (
            <section className="mail-layout">
                <MailSideBar onSetFilter={this.onSetFilter} setFilterBy={this.setFilterBy} onSetSort={this.onSetSort} setSortBy={this.setSortBy}/>
                <MailList loadMails={this.loadMails} mails={mails} />
            </section>
        )
    }
}

