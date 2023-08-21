import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import PublicRoutes from "./utils/PublicRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import Transactions from "./pages/Transactions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from "./utils/common";

export const headers = {
  'Authorization': 'Bearer ' + getToken()
}

function App() {
  return (
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
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route element={<PrivateRoutes />}>
                <Route path="/transactions" element={<Transactions />} />
              </Route>
            </Routes>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
