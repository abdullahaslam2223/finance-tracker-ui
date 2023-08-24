import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const dailyExpenses = [
    { date: '2023-08-01', amount: 100 },
    { date: '2023-08-02', amount: 75 },
    { date: '2023-08-03', amount: 1000 },
    { date: '2023-08-04', amount: 500 },
    { date: '2023-08-05', amount: 10 },
    { date: '2023-08-08', amount: 20 },
    { date: '2023-08-01', amount: 100 },
    { date: '2023-08-02', amount: 75 },
    { date: '2023-08-03', amount: 1000 },
    { date: '2023-08-04', amount: 500 },
    { date: '2023-08-05', amount: 10 },
    { date: '2023-08-08', amount: 20 },
    { date: '2023-08-01', amount: 100 },
    { date: '2023-08-02', amount: 75 },
    { date: '2023-08-03', amount: 1000 },
    { date: '2023-08-04', amount: 500 },
    { date: '2023-08-05', amount: 10 },
    { date: '2023-08-08', amount: 20 },
    { date: '2023-08-01', amount: 100 },
    { date: '2023-08-02', amount: 75 },
    { date: '2023-08-03', amount: 1000 },
    { date: '2023-08-04', amount: 500 },
    { date: '2023-08-05', amount: 10 },
    { date: '2023-08-08', amount: 20 },
    { date: '2023-08-01', amount: 100 },
    { date: '2023-08-02', amount: 75 },
    { date: '2023-08-03', amount: 1000 },
    { date: '2023-08-04', amount: 500 }
];

const options = {
    chart: {
        type: 'column',
    },
    title: {
        text: 'Daily Expenses',
    },
    xAxis: {
        categories: dailyExpenses.map((expense) => expense.date),
        title: {
        text: 'Date',
        },
    },
    yAxis: {
        title: {
        text: 'Amount',
        },
    },
    series: [
        {
        name: 'Expense',
        data: dailyExpenses.map((expense) => expense.amount),
        },
    ],
};


const ExpenseChart = () => {
    return (
      <div className='container shadow'>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
};

export default ExpenseChart;