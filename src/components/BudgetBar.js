import { useEffect, useState, useContext } from 'react';
import { ProgressBar, Card } from 'react-bootstrap';
import { AuthContext } from '../App';
import { getTokenHeader } from '../utils/common';
import axios from 'axios';
import { API_BASE_URL } from '../utils/config';
import { toast } from 'react-toastify';
import Loader from './Loader';

function BudgetBar() {
  const { token } = useContext(AuthContext);
  const headers = getTokenHeader(token);
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBudget();
  }, []);

  const getBudget = () => {
    setLoading(true);
    axios.get(API_BASE_URL + 'budget', { headers }).then(Response => {
      setLoading(false);
      const res = Response.data;
      setAmount(res.data.amount);
      setTotalAmount(res.data.total_amount);
    }).catch(error => {
      setLoading(false);
      toast.error('something went wrong in fetching budget!');
    });
  }


  const percentage = (amount / totalAmount ) * 100;

  return (
      loading ? (
        <Loader />
      ) : (
        // (amount && totalAmount) &&
        <Card className="amount-card">
        <Card.Body>
          <Card.Title className="text-center">Budget</Card.Title>
          <h4 className="text-center">Total Amount - Rs: {totalAmount}</h4>
          <ProgressBar
            now={percentage}
          //   label={`${percentage.toFixed(2)}%`}
            label={"Rs: " + amount}
            variant={percentage >= 75 ? 'success' : percentage >= 50 ? 'info' : percentage >= 25 ? 'warning' : 'danger'}
          />
        </Card.Body>
      </Card>
      )
  );
}

export default BudgetBar;