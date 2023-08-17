import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        navigate('/dashboard');
      }
    return (
        <div>
          Login<br /><br />
          <div>
            Username<br />
            <input type="text" {...username} autoComplete="new-password" />
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