import { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/auth-context';

export default function NavBar() {
  const { userId, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Link to="/" className="me-auto text-decoration-none">
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>
        {userId ? (
          <>
            <Link to="/questions/new">
              <Button variant="primary" className="me-1">
                New Question
              </Button>
            </Link>
            <Button variant="secondary" onClick={logout}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="primary" className="me-1">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline-primary">Sign Up</Button>
            </Link>
          </>
        )}
      </Container>
    </Navbar>
  );
}
