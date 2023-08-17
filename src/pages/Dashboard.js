import { useNavigate } from "react-router-dom";

function Dashboard(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    }

    return(
    <div>
      Welcome User!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
    );
}

export default Dashboard;