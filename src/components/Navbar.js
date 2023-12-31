import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../App';

function Navbar() {
  const { token } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 shadow">
      <Link className="navbar-brand" to="/">Personal Finance Tracker</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!token && 
            <li className="nav-item">
              <NavLink className="nav-link" to="/login" activeClassName="active">Login</NavLink>
            </li>
          }
          {token &&
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" activeClassName="active">Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/transactions" activeClassName="active">Transactions</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories" activeClassName="active">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout" activeClassName="active">Logout</NavLink>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
