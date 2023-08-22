import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { removeUserSession } from "../utils/common";
import { AuthContext } from "../App";

function Dashboard(props) {
    const { user, setUser, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleLogout = () => {
      removeUserSession();
      setUser(null);
      setToken(null);
      navigate('/login');
    }

    return(
    <div>
      Welcome {user.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
    );
}

export default Dashboard;