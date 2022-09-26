import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import 'react-select-search/style.css';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionForm from '../components/QuestionForm';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import ValidateUtils from '../utils/ValidateUtils';

export default function EditQuestionPage() {
  const { id: questionId } = useParams<{ id: string }>();
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [error, setError] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
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
        setTags(data.tags);
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

  if (tagsLoading || questionLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <QuestionForm
      onSubmit={onSubmit}
      allTags={allTags}
      setTags={setTags}
      setAllTags={setAllTags}
      title={title}
      content={content}
      onContentChange={onContentChange}
      tags={tags}
      error={error}
      submitLoading={submitLoading}
    />
  );
}
