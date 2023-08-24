import { ProgressBar, Card } from 'react-bootstrap';

function BudgetBar({ amount, totalAmount }) {
    const percentage = (amount / totalAmount ) * 100;

    return (
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
    );
}

export default BudgetBar;