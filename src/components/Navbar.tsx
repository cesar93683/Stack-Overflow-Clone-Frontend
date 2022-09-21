import { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/auth-context';

export default function NavBar() {
  const { userId, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Nav className="me-auto">
          <Link className="text-decoration-none text-dark me-2" to="/">
            Questions
          </Link>
          <Link className="text-decoration-none text-dark" to="/tags">
            Tags
          </Link>
        </Nav>
        <Nav>
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
        </Nav>
      </Container>
    </Navbar>
  );
}
