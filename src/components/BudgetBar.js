import { useContext } from 'react';
import { ProgressBar, Card } from 'react-bootstrap';
import { AuthContext } from '../App';
import { getTokenHeader } from '../utils/common';

function BudgetBar({ state }) {
  const { token } = useContext(AuthContext);
  // const headers = getTokenHeader(token);
  // const [amount, setAmount] = useState(0);
  // const [totalAmount, setTotalAmount] = useState(0);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getBudget();
  // }, []);


  const percentage = (state.amount / state.total_amount ) * 100;

  return (
        // (amount && totalAmount) &&
        <Card className="amount-card">
          <Card.Body>
            <Card.Title className="text-center">Budget</Card.Title>
            <h4 className="text-center">Total Amount - Rs: {state.total_amount}</h4>
            <ProgressBar
              now={percentage}
            //   label={`${percentage.toFixed(2)}%`}
              label={"Rs: " + state.amount}
              variant={percentage >= 75 ? 'success' : percentage >= 50 ? 'info' : percentage >= 25 ? 'warning' : 'danger'}
            />
          </Card.Body>
        </Card>
  );
}

export default BudgetBar;