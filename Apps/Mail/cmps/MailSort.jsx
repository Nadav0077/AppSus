export class MailSort extends React.Component {
    state = {
        sortBy: ''
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState({ sortBy: value }, () => {
            this.props.onSetSort(this.state.sortBy);
        })
    }

    render() {
        return (
            <select id="sortBy" name="sortBy" onChange={this.handleChange}>
                <option value="subject">Subject</option>
                <option value="date">Date</option>
            </select>
        )
    }
}