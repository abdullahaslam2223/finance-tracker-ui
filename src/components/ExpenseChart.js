import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState, useContext, useEffect } from 'react';
import { API_BASE_URL } from '../utils/config';
import axios from 'axios';
import { getTokenHeader } from '../utils/common';
import { AuthContext } from '../App';
import Loader from './Loader';
import DateFilter from './DateFilter';
import moment from 'moment';


const ExpenseChart = () => {
    const { token } = useContext(AuthContext);
    const headers = getTokenHeader(token);
    const [dailyExpenses, setDailyExpenses] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        startDate: moment().startOf('month').toDate(),
        endDate: moment().toDate()
    });

    const handleStartDateChange = (date) => {
        setFilters({ ...filters, startDate: date });
    };
    
    const handleEndDateChange = (date) => {
        setFilters({ ...filters, endDate: date });
    };

    const formattedStartDate = moment(filters.startDate).format('YYYY-MM-DD');
    const formattedEndDate = moment(filters.endDate).format('YYYY-MM-DD');
    const queryParams = `start_date=${formattedStartDate}&end_date=${formattedEndDate}`;

    const url = `${API_BASE_URL}chart-transactions?${queryParams}`;
    
    const getChartTransactions = () => {
        setLoading(true);
        axios.get(url, { headers }).then(response => {
            const res = response.data;
            setLoading(false);
            setDailyExpenses(res.data);
        }).catch(error => {
            setLoading(false);
        })
    }

    useEffect(() => {
        getChartTransactions();
    }, [filters]);

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

    return (
    <>
        <div className='mb-5'>
            <DateFilter filters={filters} handleStartDateChange={handleStartDateChange} handleEndDateChange={handleEndDateChange} />
        </div>
    
        <div className='container shadow'>
            { loading ? (
                <Loader />
            ) : (
                    dailyExpenses && <HighchartsReact highcharts={Highcharts} options={options} />
                )
            }
        </div>
    </>
    );
};

export default ExpenseChart;