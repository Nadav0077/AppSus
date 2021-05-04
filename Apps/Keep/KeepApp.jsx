import { keepService } from './services/keep-service.js'
import { AddNote } from './cmps/AddNote.jsx'
import { KeepList } from './cmps/KeepList.jsx'

export class KeepApp extends React.Component {
    state={
        blabla:null
    }

    componentDidMount() {
    }

    onRenderPage=()=>{
        this.setState({blabla:'bla'})
    }

    render() {

        return <section className="keep-app-container">
            <AddNote onRenderPage={this.onRenderPage}/>
            <KeepList/>
        </section>
    }
}