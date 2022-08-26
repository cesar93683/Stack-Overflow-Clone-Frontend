import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import AuthService from '../service/AuthService';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (email.length > 50) {
      setError('Email must be no more than 50 characters');
      return;
    }
    if (!username) {
      setError('Please enter your username');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (username.length > 20) {
      setError('Username must be no more than 20 characters');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    if (password.length < 6) {
      setError('Passowrd must be at least 6 characters');
      return;
    }
    if (password.length > 40) {
      setError('Username must be no more than 40 characters');
      return;
    }

    AuthService.signup(email, username, password).then(
      (data) => {
        const code = data?.code;
        if (code === 0) {
          navigate('/');
        } else if (data?.code === 101) {
          setError('Username already taken');
        } else if (data?.code === 100) {
          setError('Email already taken');
        } else {
          setError('An error occured');
        }
      },
      (error) => {
        setError('An error occured');
      }
    );
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPassswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Row className="justify-content-md-center">
      <Col xl={6} lg={8}>
        <Form onSubmit={onSignUpSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onEmailChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={onUsernameChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={onPassswordChange}
            />
          </Form.Group>
          {error ? (
            <Alert className="mt-1 mb-0" variant="danger">
              {error}
            </Alert>
          ) : null}
          <Button className="mt-1" variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
