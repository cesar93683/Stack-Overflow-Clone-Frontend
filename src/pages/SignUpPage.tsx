import { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';
import ValidateUtils from '../utils/ValidateUtils';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailTrimmed = email.trim();
    const emailValidate = ValidateUtils.validateEmail(emailTrimmed);
    if (emailValidate) {
      setError(emailValidate);
      return;
    }

    const usernameTrimmed = username.trim();
    const usernameValidate = ValidateUtils.validateUsername(usernameTrimmed);
    if (usernameValidate) {
      setError(usernameValidate);
      return;
    }

    const passwordValidate = ValidateUtils.validatePassword(password);
    if (passwordValidate) {
      setError(passwordValidate);
      return;
    }

    AuthService.signup(emailTrimmed, usernameTrimmed, password).then(
      (data) => {
        const code = data?.code;
        if (code === 0) {
          navigate('/');
        } else if (code === 101) {
          setError('Username already taken');
        } else if (code === 100) {
          setError('Email already taken');
        } else {
          setError('An error occured');
        }
      },
      () => {
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
              minLength={3}
              maxLength={320}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={onEmailChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              minLength={3}
              maxLength={20}
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={onUsernameChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              minLength={6}
              maxLength={40}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={onPassswordChange}
            />
          </Form.Group>
          {error ? (
            <Alert className="w-fit-content p-1 mt-1 mb-0" variant="danger">
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
