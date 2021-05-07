const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM
import { Home } from './pages/Home.jsx'
import { MailApp } from './Apps/Mail/MailApp.jsx'
import { KeepApp } from './Apps/Keep/KeepApp.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { MailDetails } from './Apps/Mail/pages/MailDetails.jsx'
import { MailCompose } from './Apps/Mail/pages/MailCompose.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'


export class App extends React.Component {
    render() {
        return (
            // <Book></Book>
            <Router>
                <AppHeader />
                <main>
                    <UserMsg />
                    <Switch>
                        <Route component={MailDetails} path="/mail/details/:mailId" />
                        <Route component={MailCompose} path="/mail/compose" />
                        <Route component={MailApp} path="/mail/:noteId?" />
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

