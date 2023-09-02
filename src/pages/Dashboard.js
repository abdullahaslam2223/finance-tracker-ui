import { useContext } from "react";
import { AuthContext } from "../App";
import ExpenseChart from "../components/ExpenseChart";

function Dashboard(props) {
    return(
        <>
            {/* <h3 className="text-center mt-3">Welcome { user.name } on Dashboard</h3> */}
            <ExpenseChart />
        </>
    );
}

export default Dashboard;