import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Discover from "./components/Discover";
import Wishlist from "./components/Wishlist";
import AllWeather from "./components/AllWeather";
import { useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";

mixpanel.init("d7178ce399d605886cd9fa51223d07fe");

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.getItem("phoneNumber") &&
      localStorage.getItem("phoneNumber")?.length === 10
    ) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={isUserLoggedIn ? <Navigate to="/home" /> : <Landing />}
          />
          <Route
            path="/home"
            element={isUserLoggedIn ? <Home /> : <Landing />}
          />
          <Route
            path="/discover"
            element={
              isUserLoggedIn ? <Navigate to="/discover/explore" /> : <Landing />
            }
          />
          <Route
            path="/discover/*"
            element={isUserLoggedIn ? <Discover /> : <Landing />}
          />
          <Route
            path="/watchlist"
            element={isUserLoggedIn ? <Wishlist /> : <Landing />}
          />
          <Route path="/all-weather-investing" element={<AllWeather />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
