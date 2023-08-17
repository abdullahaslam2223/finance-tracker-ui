import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div>
          <div className="header">
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
          </div>
          <div className="content">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
