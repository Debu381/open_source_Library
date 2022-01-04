import { useContext } from "react";
import SidebarVisibilityContext from "../../store/sidebarVisibilityContext";
import { Link } from "react-router-dom";
import { UserContext } from "../../store/userContext";

function Sidebar() {
  const [sidebarVisibility,, toggleSidebarVisibility] = useContext(SidebarVisibilityContext);
  const { user } = useContext(UserContext);

  return (
    <>
      <div id="sidebar" className={`sidebar ${sidebarVisibility ? 'active' : ''}`}>
        <button onClick={toggleSidebarVisibility} className="btn--clear hamburger hamburger--light hamburger--cross sidebar__toggle-sidebar">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav>
          <ul>
            <li> <Link onClick={toggleSidebarVisibility} to="/" >Home</Link> </li>
            <li> <Link onClick={toggleSidebarVisibility} to="/list">List</Link> </li>
            {user && 
              <li> <Link onClick={toggleSidebarVisibility} to="/create">Create A Book</Link> </li>
            }
          </ul>
        </nav>

      </div>
    </>
  )
}

export default Sidebar;