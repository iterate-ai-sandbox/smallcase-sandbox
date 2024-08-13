import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Wishlist from "./components/Wishlist";
import AllWeather from "./components/AllWeather";
import { useEffect, useState } from "react";
import mixpanel from "mixpanel-browser";
import Collections from "./components/discover-tabs/Collections";
import Smallcases from "./components/discover-tabs/Smallcases";

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

  if (!isUserLoggedIn && location.pathname !== "/") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/discover"
            element={
              isUserLoggedIn ? <Navigate to="/discover/explore" /> : <Landing />
            }
          />
          <Route path="/discover/explore" element={<Collections />} />
          <Route path="/discover/smallcases" element={<Smallcases />} />
          <Route path="/watchlist" element={<Wishlist />} />
          <Route path="/all-weather-investing" element={<AllWeather />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
