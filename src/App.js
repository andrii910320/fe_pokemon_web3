import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import Game from "./pages/game";
import StartPage from "./pages/start";
import ReRoute from "./midleware/protect-route";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  return (
    <Router>
      <Routes>
        <Route element={<ReRoute isAuthenticated={!token} route={"/game"} />}>
          <Route path="/" element={<StartPage setToken={setToken} />} />
        </Route>
        <Route element={<ReRoute isAuthenticated={!!token} route={"/"} />}>
          <Route path="/game" element={<Game />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
