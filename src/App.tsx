import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import PostPage from './pages/PostPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './utils/auth-context';

export default function BasicExample() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
