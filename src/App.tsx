import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EditPostPage from './pages/EditPostPage';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import NewPostPage from './pages/NewPostPage';
import PostPage from './pages/PostPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './utils/auth-context';

export default function BasicExample() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/new" element={<NewPostPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/posts/edit/:id" element={<EditPostPage />} />
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  );
}
