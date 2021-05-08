const { NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {
  return (<nav className="app-header">
    <h1 onClick={()=>props.history.push('/')}><NavLink exact to="/" >AppSus</NavLink></h1>
    <ul className="clean-list main-nav">
      <li onClick={()=>{props.onToggleMenu()}}><NavLink exact to="/" >Home</NavLink></li>
      <li onClick={()=>{props.onToggleMenu()}}><NavLink to="/mail">Mail</NavLink></li>
      <li onClick={()=>{props.onToggleMenu()}}><NavLink to="/note">Notes</NavLink></li>
      <li onClick={()=>{props.onToggleMenu()}}><NavLink to="/book">Books</NavLink></li>
    </ul>
    <div class="btn-menu" onClick={props.onToggleMenu}>☰</div>
  </nav>)

}
export const AppHeader = withRouter(_AppHeader)