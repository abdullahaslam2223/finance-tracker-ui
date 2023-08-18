import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./common";

function PrivateRoutes() {
    return getToken() ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes;