import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EditQuestionPage from './pages/EditQuestionPage';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import NewQuestionPage from './pages/NewQuestionPage';
import QuestionPage from './pages/QuestionPage';
import SignUpPage from './pages/SignUpPage';
import TagPage from './pages/TagPage';
import TagsPage from './pages/TagsPage';
import UserPage from './pages/UserPage';
import { AuthProvider } from './utils/auth-context';

export default function BasicExample() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/questions/new" element={<NewQuestionPage />} />
            <Route path="/questions/:id" element={<QuestionPage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/questions/tagged/:id" element={<TagPage />} />
            <Route path="/questions/edit/:id" element={<EditQuestionPage />} />
            <Route path="/tags" element={<TagsPage />} />
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  );
}
