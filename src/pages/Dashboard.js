import { useContext } from "react";
import { AuthContext } from "../App";

function Dashboard(props) {
    const { user } = useContext(AuthContext);

    return <h3 className="text-center mt-3">Welcome { user.name } on Dashboard</h3>;
}

export default Dashboard;