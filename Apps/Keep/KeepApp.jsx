import { keepService } from './services/keep-service.js'
import { AddNote } from './cmps/AddNote.jsx'
import { KeepList } from './cmps/KeepList.jsx'

export class KeepApp extends React.Component {

    componentDidMount() {
        console.log('test')
    }


    render() {

        return <section className="keep-app-container">
            
            <KeepList/>
        </section>
    }
}