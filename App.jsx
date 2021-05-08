const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM
import { Home } from './pages/Home.jsx'
import { MailApp } from './Apps/Mail/MailApp.jsx'
import { KeepApp } from './Apps/Keep/KeepApp.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { MailDetails } from './Apps/Mail/pages/MailDetails.jsx'
import { MailCompose } from './Apps/Mail/pages/MailCompose.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Book } from './Apps/Book/Book.jsx'
// import { BookList } from './Apps/Book/cmps/BookList.jsx'
// import { BookFilter } from './Apps/Book/cmps/BookFilter.jsx'
import { BookDetails } from './Apps/Book/BookDetails.jsx'



export class App extends React.Component {

    onToggleMenu = () => {
        document.body.classList.toggle('menu-open');
    }
    render() {
        return (
            // <Book></Book>
            <Router>
                <div class="main-screen" onClick={this.onToggleMenu}></div>
                <AppHeader onToggleMenu={this.onToggleMenu}/>
                <main>
                    <UserMsg />
                    <Switch>
                        <Route component={MailDetails} path="/mail/details/:mailId" />
                        <Route component={MailCompose} path="/mail/compose/:mailId" />
                        <Route component={MailCompose} path="/mail/compose" />
                        <Route component={BookDetails} path="/book/:bookId" />
                        <Route component={MailApp} path="/mail/:noteId?" />
                        <Route component={Book} path="/book" />
                        <Route component={MailApp} path="/mail" />
                        <Route component={KeepApp} path="/note/:mailId?" />
                        <Route component={Home} path="/" />
                    </Switch>
                </main>
                <footer>coffeerights</footer>
            </Router>
        )
    }
}

