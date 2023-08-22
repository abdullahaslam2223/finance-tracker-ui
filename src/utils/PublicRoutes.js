import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../App";

function PublicRoutes() {
    const { token } = useContext(AuthContext);
    return !token ? <Outlet /> : <Navigate to='/dashboard' />
}

export default PublicRoutes;