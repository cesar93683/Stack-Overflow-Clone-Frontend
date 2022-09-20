import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, CloseButton, Form } from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import SelectSearch, {
  fuzzySearch,
  SelectedOptionValue,
} from 'react-select-search';
import 'react-select-search/style.css';
import Content from '../components/Content';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import ValidateUtils from '../utils/ValidateUtils';

export default function EditQuestionPage() {
  const { id: questionId } = useParams<{ id: string }>();
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [error, setError] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!questionId) {
      setQuestionLoading(false);
      setTagsLoading(false);
      return;
    }
    QuestionService.getTags().then(
      (data) => {
        setTagsLoading(false);
        setAllTags(data.map((tag) => tag.tag));
      },
      () => {
        setTagsLoading(false);
        setError('An error has occured');
      }
    );
    QuestionService.getQuestion(Number(questionId), token).then(
      (data) => {
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.map((tag) => tag.tag));
        setQuestionLoading(false);
      },
      () => {
        setQuestionLoading(false);
        setError('An error has occured');
      }
    );
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (tagsLoading && questionLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const onQuestionSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const contentTrimmed = content.trim();
    const validateContent = ValidateUtils.validateContent(contentTrimmed);
    if (validateContent) {
      setError(validateContent);
      return;
    }

    setSubmitLoading(true);

    QuestionService.updateQuestion(
      contentTrimmed,
      tags,
      Number(questionId),
      token
    ).then(
      (data) => {
        if (data?.code === 0) {
          navigate(`/questions/${questionId}`);
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

  const getOptionTags = () => {
    return allTags.map((tag) => ({ name: tag, value: tag }));
  };

  const onSelectTag = (tag: SelectedOptionValue | SelectedOptionValue[]) => {
    if (typeof tag === 'string') {
      setTags((value) => [...value, tag]);
      setAllTags((value) => value.filter((item) => item !== tag));
    }
  };

  const removeTag = (tag: string) => {
    setTags((value) => value.filter((item) => item !== tag));
    setAllTags((value) => [...value, tag]);
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
          disabled
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
      <Form.Group className="mb-2">
        <Form.Label className="mb-0">Tags</Form.Label>
        <Form.Text className="d-block text-muted">
          Add up to 5 tags to describe what your question is about
        </Form.Text>
        <div className="d-flex flex-row mb-1">
          {tags.map((tag) => (
            <div
              key={tag}
              className="me-1 w-fit-content border rounded p-1 d-flex flex-row"
            >
              <div className="me-1">{tag}</div>
              <CloseButton onClick={() => removeTag(tag)} />
            </div>
          ))}
        </div>
        <SelectSearch
          options={getOptionTags()}
          search
          placeholder="Tags"
          filterOptions={fuzzySearch}
          onChange={onSelectTag}
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
