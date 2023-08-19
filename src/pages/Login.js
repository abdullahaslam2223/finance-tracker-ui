import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUserSession } from '../utils/common';
import { API_BASE_URL } from '../config';
import { toast } from 'react-toastify';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function Login() {
    const navigate = useNavigate();
    const email = useFormInput('');
    const password = useFormInput('');
    const [loading, setLoading] = useState(false);
    const postData = {
      email: email.value,
      password: password.value
    }

    const handleLogin = (e) => {
      e.preventDefault();
      setLoading(true);
      axios.post(API_BASE_URL + 'login', postData).then(response => {
        const res = response.data;
        setLoading(false);
        setUserSession(res.data.token, res.data.user);
        toast.success("Logged in successfully!");
        navigate('/dashboard');
      }).catch(error => {
        const res = error.response.data;
        setLoading(false);
        console.log(res);
        toast.error(res.data.error || "Something went wrong. Please try again later.");
      });
    }

    return (
      <>
        <h1 className='text-center mt-5'>Finance Tracker</h1>
        <Container className="d-flex justify-content-center mt-5 bg-light w-25 shadow" style={{padding: "100px 0"}}>
          <Form className='w-75' onSubmit={handleLogin}>
            <Form.Group className='mb-3' controlId='loginEmail'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                required
                {...email}
                autoComplete="new-password"
                placeholder='Enter Email'
              />
              {/* <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                {...password}
                autoComplete="new-password"
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="success" type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </Form>
        </Container>
      </>
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