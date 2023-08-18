import { useNavigate } from "react-router-dom";
import { getUser, removeUserSession } from "../utils/common";

function Dashboard(props) {
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
      removeUserSession();
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