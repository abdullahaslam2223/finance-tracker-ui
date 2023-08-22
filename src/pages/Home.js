import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return(
        <div>
            <h1 className="text-center">Welcome to Home Page!</h1>
        </div>
    );
}

export default Home;