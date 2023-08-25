import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState, useContext, useEffect } from 'react';
import { API_BASE_URL } from '../utils/config';
import axios from 'axios';
import { getTokenHeader } from '../utils/common';
import { AuthContext } from '../App';
import Loader from './Loader';


const ExpenseChart = () => {
    const { token } = useContext(AuthContext);
    const headers = getTokenHeader(token);
    // console.log(headers);
    const [dailyExpenses, setDailyExpenses] = useState(null);
    const [loading, setLoading] = useState(false);

    
    const getChartTransactions = () => {
        setLoading(true);
        axios.get(API_BASE_URL + 'chart-transactions', { headers: headers }).then(response => {
            const res = response.data;
            setLoading(false);
            setDailyExpenses(res.data);
        }).catch(error => {
            setLoading(false);
            // Handle error
        })
    }

    useEffect(() => {
        getChartTransactions();
    }, []);

    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Daily Expenses',
        },
        xAxis: {
            categories: dailyExpenses?.map((expense) => expense.date),
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
            data: dailyExpenses?.map((transaction) => transaction.expense),
            },
        ],
    };

    console.log(dailyExpenses);

    return (
      <div className='container shadow'>
        { loading ? (
            <Loader />
        ) : (
                dailyExpenses && <HighchartsReact highcharts={Highcharts} options={options} />
            )
        }
      </div>
    );
};

export default ExpenseChart;