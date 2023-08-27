import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/style.css';

function DateFilter({ filters, handleStartDateChange, handleEndDateChange }) {

  return (
    <div className="date-filter-container">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="startDate" className="date-filter-label">Start Date&nbsp;&nbsp;</label>
            <DatePicker
              id="startDate"
              selected={filters.startDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control date-filter-input"
              placeholderText="Select start date"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="endDate" className="date-filter-label">End Date&nbsp;</label>
            <DatePicker
              id="endDate"
              selected={filters.endDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control date-filter-input"
              placeholderText="Select end date"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateFilter;
