export class MailSort extends React.Component {
    state = {
        sortBy: {
            subject: '',
            date: '',
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        this.setState({ sortBy: { ...this.state.sortBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy);
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        console.log(this.props)
        return (
            <select id="sortBy" name="sortBy" onChange={this.handleChange}>
                <option value="all">Subject</option>
                <option value="readed">Date</option>
            </select>
        )
    }
}