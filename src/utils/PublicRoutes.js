import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./common";

function PublicRoutes() {
    return !getToken() ? <Outlet /> : <Navigate to='/dashboard' />
}

export default PublicRoutes;