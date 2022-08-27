import { useContext, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';
import { AuthContext } from '../utils/auth-context';

export default function LogInPage() {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onLogInSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    AuthService.login(username, password).then(
      (data) => {
        if (data?.token) {
          auth.login(data.userId, data.token);
          navigate('/');
        } else if (data?.code === 102) {
          setError('Invalid username/password');
        } else {
          setError('An error occured');
        }
      },
      () => {
        setError('An error occured');
      }
    );
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
        <Form onSubmit={onLogInSubmit}>
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
            Log In
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
