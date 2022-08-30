import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import ValidateUtils from '../utils/ValidateUtils';

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

    const contentTrimmed = content.trim();
    const validatePostContent =
      ValidateUtils.validatePostContent(contentTrimmed);
    if (validatePostContent) {
      setError(validatePostContent);
      return;
    }

    setLoading(true);

    PostsService.updatePost(contentTrimmed, Number(id), token).then(
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
