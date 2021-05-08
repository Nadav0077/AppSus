export class MailFilter extends React.Component {
    state = {
        filterBy: {
            txt: '',
            isRead: 'all',
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value =  ev.target.value
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            this.props.onSetFilter(this.state.filterBy);
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { txt } = this.state.filterBy
        return (
            <form className="mail-filter">
                <input placeholder="search mail 🔎" type="text" id="byText" name="txt" value={txt} onChange={this.handleChange} />
                <select id="isRead" name="isRead" onChange={this.handleChange}>
                        <option value="all">All</option>
                        <option value="readed">Readed</option>
                        <option value="unreaded">Unreaded</option>
                    </select>
            </form>
        )
    }
}