const { Link } = ReactRouterDOM
export class MailCompose extends React.Component {
    state = {
        mail: {
            subject: '',
            body: ''
        }
    }
    componentDidMount() {
    }
    // handleChange = (ev) => {
    //     const field = ev.target.name
    //     const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
    //     this.setState({ review: { ...this.state.review, [field]: value } })
    // }

    render() {
        return (
            <div className="add-mail">
                <h1>New Email</h1>
                <form className="mail-form">
                    <input placeHolder="Subject" type="text" name="subject" />
                    <textarea placeHolder="Content" name="body" cols="30" rows="10"></textarea>
                </form>
                <Link to="/mail" >Back</Link>
                
            </div>
        )
    }
}
