import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
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

export default function NewQuestion() {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [tagsError, setTagsError] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    QuestionService.getTags().then(
      (data) => {
        setTagsLoading(false);
        setAllTags(data.map((tag) => tag.tag));
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

  const getOptionTags = () => {
    return allTags.map((tag) => ({ name: tag, value: tag }));
  };

  const onSelectTags = (
    selectedValue: SelectedOptionValue | SelectedOptionValue[]
  ) => {
    if (typeof selectedValue === 'string') {
      setTags((value) => [...value, selectedValue]);
      setAllTags((value) => value.filter((item) => item !== selectedValue));
    }
  };

  const removeTag = (i: number) => {
    const tag = tags[i];
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
      <Form.Group className="mb-2">
        <Form.Label className="mb-0">Tags</Form.Label>
        <Form.Text className="d-block text-muted">
          Add up to 5 tags to describe what your question is about
        </Form.Text>
        <div>
          {tags.map((tag, i) => (
            <Alert
              key={i}
              variant="danger"
              onClose={() => removeTag(i)}
              dismissible
            >
              {tag}
            </Alert>
          ))}
        </div>
        <SelectSearch
          options={getOptionTags()}
          search
          placeholder="Tags"
          filterOptions={fuzzySearch}
          onChange={onSelectTags}
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
