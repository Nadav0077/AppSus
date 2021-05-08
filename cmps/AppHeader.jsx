const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
  return (<nav className="app-header">
    <h1 onClick={()=>this.props.history.push('/')}><NavLink exact to="/" >AppSus</NavLink></h1>
    <ul className="clean-list">
      <li><NavLink exact to="/" >Home</NavLink></li>
      <li><NavLink to="/mail">Mail</NavLink></li>
      <li><NavLink to="/note">Notes</NavLink></li>
      <li><NavLink to="/book">Books</NavLink></li>
    </ul>
  </nav>)

}
export const AppHeader = withRouter(_AppHeader)