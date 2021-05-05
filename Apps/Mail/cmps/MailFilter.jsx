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
        console.log(this.state)
        const { txt, isRead } = this.state.filterBy
        return (
            <form className="mail-filter" onSubmit={this.onFilter}>
                <label htmlFor="byText">By Text</label>
                <input type="text" id="byText" name="txt" value={txt} onChange={this.handleChange} />
                <label htmlFor="isRead">Read/Unread</label>
                <select className="" id="isRead" name="isRead" onChange={this.handleChange}>
                        <option value="all">All</option>
                        <option value="readed">Readed</option>
                        <option value="unreaded">Unreaded</option>
                    </select>
            </form>
        )
    }
}