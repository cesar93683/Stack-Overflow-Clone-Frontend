import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';

export default function EditPost() {
  const { token } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    PostsService.getPost(Number(id), null).then(
      (data) => {
        setContent(data.content);
        setTitle(data.title);
        setLoading(false);
      },
      () => {
        setError('Error getting post');
        setLoading(false);
      }
    );
  }, []);

  const onSubmitPostUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!content) {
      setError('Please enter some content');
      return;
    }

    setLoading(true);

    PostsService.updatePost(content, Number(id), token).then(
      (data) => {
        if (data?.code === 0) {
          navigate(`/posts/${id}`);
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

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <Form onSubmit={onSubmitPostUpdate}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control disabled type="text" value={title} />
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Button type="submit">Update Post</Button>
      )}
    </Form>
  );
}
