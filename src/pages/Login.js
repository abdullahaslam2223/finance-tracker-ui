import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from '../utils/common';
import { API_BASE_URL } from '../config';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

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

    const handleLogin = (e) => {
      e.preventDefault();
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
      <Container className="d-flex justify-content-center mt-5">
        <Form className='w-50'>
          <Form.Group className='mb-3' controlId='loginEmail'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' {...email} autoComplete="new-password" placeholder='Enter Email' />
            <Form.Text className='text-muted'>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...password} autoComplete="new-password" placeholder="Password" />
          </Form.Group>

          {error && <><small className='text-danger'>{error}</small><br /></>}<br />
          <Button variant="success" type="submit" onClick={handleLogin} disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </Form>
      </Container>
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