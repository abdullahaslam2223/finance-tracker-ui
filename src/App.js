import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import PublicRoutes from "./utils/PublicRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken, getUser } from "./utils/common";

export const AuthContext = createContext();

export const headers = {
  'Authorization': 'Bearer ' + getToken()
}

function App() {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      <BrowserRouter>
        <div>
          <ToastContainer />
            {/* <div className="header"> */}
            <div>
              <Navbar />
              {/* <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/">Home</NavLink>
              <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/login">Login</NavLink><small>(Access without token only)</small>
              <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small> */}
            </div>
            <div className="content">
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route index element={<Home />} />
                <Route element={<PublicRoutes />}>
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                  <Route path="/logout" element={<Logout />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                  <Route path="/transactions" element={<Transactions />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                  <Route path="/categories" element={<Categories />} />
                </Route>
              </Routes>
            </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
