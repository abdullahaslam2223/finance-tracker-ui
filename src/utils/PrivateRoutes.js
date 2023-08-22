import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../App";

function PrivateRoutes() {
    const { token } = useContext(AuthContext);
    return token ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoutes;