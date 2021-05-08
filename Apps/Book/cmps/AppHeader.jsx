const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
  return (<nav className="app-header">
    <h1 onClick={()=>this.props.history.push('/')}><NavLink exact to="/" >BookShop</NavLink></h1>
    <ul className="clean-list">
      <li><NavLink exact to="/" >Home</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/book">Shop</NavLink></li>
    </ul>
  </nav>)

}
export const AppHeader = withRouter(_AppHeader)