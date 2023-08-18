import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from '../utils/common';
import { API_BASE_URL } from '../config';

function Login() {
    const navigate = useNavigate();
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const postData = {
      email: email.value,
      password: password.value
    }

    const handleLogin = () => {
      setError(null);
      setLoading(true);
      axios.post(API_BASE_URL + 'login', postData).then(response => {
        const res = response.data;
        setLoading(false);
        setUserSession(res.data.token, res.data.user);
        navigate('/dashboard');
      }).catch(error => {
        setLoading(false);
        // setError(error?.message || "Something went wrong. Please try again later.");
        setError("Invalid Cradentials");
      });
    }

    return (
        <div>
          Login<br /><br />
          <div>
            Email<br />
            <input type="text" {...email} autoComplete="new-password" />
          </div>
          <div style={{ marginTop: 10 }}>
            Password<br />
            <input type="password" {...password} autoComplete="new-password" />
          </div>
          {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
          <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
        </div>
      );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }

export default Login;