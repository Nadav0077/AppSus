const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM
import { Home } from './pages/Home.jsx'
import { MailApp } from './Apps/Mail/MailApp.jsx'
import { KeepApp } from './Apps/Keep/KeepApp.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'


export class App extends React.Component {
    render() {
        return (
            // <Book></Book>
            <Router>
                <AppHeader/>
                <main>
                    <Switch>
                        <Route component={MailApp} path="/mail" />
                        <Route component={KeepApp} path="/note" />
                        <Route component={Home} path="/" />
                    </Switch>
                </main>
                <footer>coffeerights</footer>
            </Router>
            )
    }
}

