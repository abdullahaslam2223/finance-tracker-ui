import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { removeUserSession } from "../utils/common";

function Logout() {
    const navigate = useNavigate();
    const { setToken, setUser } = useContext(AuthContext);
    removeUserSession();
    setUser(null);
    setToken(null);
    navigate('/login');
}

export default Logout;