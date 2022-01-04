import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarVisibilityContext from "../../store/sidebarVisibilityContext";
import { UserContext } from "../../store/userContext";
import Button from "../button/button";

function Header() {
  const [,, toggleSidebarVisibility] = useContext(SidebarVisibilityContext);
  const { user, setUser } = useContext(UserContext);

  const logoutHandler = () => {
    setUser(null);
  }
  
  const location = useLocation();

  return (
    <>
      <header className="site-header" id="site-header">
        <div className="container">

          <Button onClick={toggleSidebarVisibility} className="btn--clear hamburger hamburger--light site-header__toggle-sidebar">
            <span></span>
            <span></span>
            <span></span>
          </Button>

          <Link to="/" className="site-header__logo">
            <img className="site-header__logo-image" alt="Open library logo" src="https://i.ibb.co/7g0zZ94/open-library-logo.png" />
          </Link>

          <div className='site-header__user-info'>
            {!user &&
              <>
                <Link to={{pathname: '/login', state: { prevPath: location.pathname }}}  className="button button-hollow site-header__signin">Log In</Link>
                <Link to="/signup" className="button button-hollow site-header__signin">Sign Up</Link>
              </>
            }
            { user &&
              <>
              <span> Hi, {user.user.username} </span>
              <button className="button-hollow site-header__signin" onClick={ logoutHandler } >Log out</button>
              </>
            }
            </div>
        </div>
      </header>
    </>
  )
}

export default Header;