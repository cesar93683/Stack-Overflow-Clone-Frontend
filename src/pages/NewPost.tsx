import React, { useContext, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';

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
  const onPostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setError('Please enter a title');
      return;
    }

    if (!content) {
      setError('Please enter some content');
      return;
    }

    setLoading(true);

    PostsService.createPost(title, content, null, token).then(
      (data) => {
        if (data?.code === 0 && data?.postId) {
          navigate(`/posts/${data.postId}`);
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
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={onTitleChange}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter content"
          value={content}
          onChange={onContentChange}
        />
      </Form.Group>
      {error ? (
        <Alert className="mb-2" variant="danger">
          {error}
        </Alert>
      ) : null}
      {loading ? <LoadingSpinner /> : <Button type="submit">New Post</Button>}
    </Form>
  );
}
