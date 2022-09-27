import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import 'react-select-search/style.css';
import AnswerForm from '../components/AnswerForm';
import LoadingSpinner from '../components/LoadingSpinner';
import AnswerService from '../service/AnswerService';
import { AuthContext } from '../utils/auth-context';
import ValidateUtils from '../utils/ValidateUtils';

export default function AnswerEditPage() {
  const { id: answerId } = useParams<{ id: string }>();
  const { token } = useContext(AuthContext);

  const [content, setContent] = useState('');

  const [submitLoading, setSubmitLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!answerId) {
      setAnswerLoading(false);
      return;
    }
    AnswerService.getAnswer(Number(answerId)).then(
      (data) => {
        setContent(data.content);
        setAnswerLoading(false);
      },
      () => {
        setAnswerLoading(false);
        setError('An error has occured');
      }
    );
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (answerLoading) {
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

    AnswerService.updateAnswer(contentTrimmed, Number(answerId), token).then(
      (data) => {
        setSubmitLoading(true);
        if (data?.code === 0) {
          navigate(`/questions/${answerId}`);
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
    <AnswerForm
      onSubmit={onSubmit}
      content={content}
      onContentChange={onContentChange}
      error={error}
      submitLoading={submitLoading}
    />
  );
}
