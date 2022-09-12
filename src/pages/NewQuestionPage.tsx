import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Content from '../components/Content';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import ITag from '../utils/interfaces/ITag';
import ValidateUtils from '../utils/ValidateUtils';

export default function NewQuestion() {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [tagsError, setTagsError] = useState(false);
  const [tags, setTags] = useState<ITag[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    QuestionService.getTags().then(
      (data) => {
        setTagsLoading(false);
        setTags(data);
      },
      () => {
        setTagsLoading(false);
        setTagsError(true);
      }
    );
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (tagsLoading) {
    return <LoadingSpinner />;
  }

  if (tagsError) {
    return <div>An error has occured</div>;
  }

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const onQuestionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleTrimmed = title.trim();
    const validateTitle = ValidateUtils.validateTitle(titleTrimmed);
    if (validateTitle) {
      setError(validateTitle);
      return;
    }

    const contentTrimmed = content.trim();
    const validateContent = ValidateUtils.validateContent(contentTrimmed);
    if (validateContent) {
      setError(validateContent);
      return;
    }

    setSubmitLoading(true);

    QuestionService.createQuestion(titleTrimmed, contentTrimmed, token).then(
      (data) => {
        if (data?.id) {
          navigate(`/questions/${data.id}`);
        } else {
          setError('An error occured');
          setSubmitLoading(false);
        }
      },
      () => {
        setError('An error occured');
        setSubmitLoading(false);
      }
    );
  };

  return (
    <Form onSubmit={onQuestionSubmit}>
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
          rows={8}
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
      <div className="d-flex justify-content-end">
        {submitLoading ? (
          <LoadingSpinner />
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </div>
      <Content className="mt-2" content={content} />
    </Form>
  );
}
