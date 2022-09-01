import React, { useContext, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PostsService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import ValidateUtils from '../utils/ValidateUtils';

export default function NewPost() {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const onPostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleTrimmed = title.trim();
    const validatePostTitle = ValidateUtils.validatePostTitle(titleTrimmed);
    if (validatePostTitle) {
      setError(validatePostTitle);
      return;
    }

    const contentTrimmed = content.trim();
    const validatePostContent =
      ValidateUtils.validatePostContent(contentTrimmed);
    if (validatePostContent) {
      setError(validatePostContent);
      return;
    }

    setLoading(true);

    PostsService.createQuestion(titleTrimmed, contentTrimmed, token).then(
      (data) => {
        if (data?.id) {
          navigate(`/posts/${data.id}`);
        } else {
          setError('An error occured');
          setLoading(false);
        }
      },
      () => {
        setError('An error occured');
        setLoading(false);
      }
    );
  };

  return (
    <Form onSubmit={onPostSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          minLength={3}
          maxLength={50}
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={onTitleChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Content</Form.Label>
        <Form.Control
          minLength={3}
          maxLength={500}
          as="textarea"
          rows={3}
          placeholder="Enter content"
          value={content}
          onChange={onContentChange}
        />
      </Form.Group>
      {error ? (
        <Alert className="w-fit-content p-1 mb-2" variant="danger">
          {error}
        </Alert>
      ) : null}
      {loading ? <LoadingSpinner /> : <Button type="submit">New Post</Button>}
    </Form>
  );
}
