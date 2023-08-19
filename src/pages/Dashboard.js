import { useNavigate } from "react-router-dom";
import { getUser, removeUserSession } from "../utils/common";
import { NavLink } from "react-router-dom";

function Dashboard(props) {
    const navigate = useNavigate();
    const user = getUser();

    const handleLogout = () => {
      removeUserSession();
      navigate('/login');
    }

    return(
    <div>
      <div>
      <NavLink className="btn btn-success" to="/transactions">Transactions</NavLink>
      </div>
      Welcome {user.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
    );
}

export default Dashboard;