import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return(
        <div>
            <h1>Welcome to Home Page!</h1>
            Go ahead and <Button onClick={() => navigate('/login')}>Login</Button>
        </div>
    );
}

export default Home;