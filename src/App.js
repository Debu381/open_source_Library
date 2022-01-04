import Backdrop from "./components/backdrop/backdrop";
import FooterPrimary from "./components/footerPrimary/footerPrimary";
import FooterSecondary from "./components/footerSecondary/footerSecondary";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./pages/home";
import { SidebarVisibilityContextProvider } from "./store/sidebarVisibilityContext";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Detail from "./pages/detail";
import List from "./pages/list";
import Create from "./pages/create";
import UserContextProvider from "./store/userContext";
import Login from "./pages/login";
import Signup from "./pages/signup";


function App() {
  return (
    <div className="page">
      <UserContextProvider>
      <Router>
        <SidebarVisibilityContextProvider>
          <Header />
          <Backdrop />
          <Sidebar />
        </SidebarVisibilityContextProvider>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/book/:id" exact component={ Detail } />
          <Route path="/book/:id/edit" exact component={ Create } />
          <Route path="/list" component={ List } />
          <Route path="/create" component={ Create } />
          <Route path="/login" component={ Login } />
          <Route path="/signup" component={ Signup } />
        </Switch>
      </Router>
      <FooterPrimary />
      <FooterSecondary />
      </UserContextProvider>
    </div>
  );
}


export default App;
