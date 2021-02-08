import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { StyleProvider } from "./providers/StyleProvider"
import "./App.css";
import AppHeader from "./components/AppHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="App">
      <ToastContainer position="bottom-right" hideProgressBar />
      <UserProfileProvider>
        <StyleProvider>
          <Router>
            <AppHeader />
            <ApplicationViews />
          </Router>
        </StyleProvider>
      </UserProfileProvider>
    </div>
  );
}

export default App;