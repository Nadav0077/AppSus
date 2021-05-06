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
        mailService.query(this.state.filterBy).then((mails) => {
            if(!this.sortBy) this.setState({ mails })
            else if(this.sortBy === 'date') {
                const sortedByDate = mailService.sortByDate(mails)
                this.setState({ mails: sortedByDate})
            } else if(this.sortBy === 'subject'){
                const sortedBySubject = mailService.sortBySubject(mails)
                this.setState({ mails: sortedBySubject})
            }
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

