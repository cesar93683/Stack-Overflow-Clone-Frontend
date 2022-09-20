import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-select-search/style.css';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionForm from '../components/QuestionForm';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import ValidateUtils from '../utils/ValidateUtils';

export default function NewQuestionPage() {
  const { token } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [tagsError, setTagsError] = useState(false);
  const [formError, setFormError] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);
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
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleTrimmed = title.trim();
    const validateTitle = ValidateUtils.validateTitle(titleTrimmed);
    if (validateTitle) {
      setFormError(validateTitle);
      return;
    }

    const contentTrimmed = content.trim();
    const validateContent = ValidateUtils.validateContent(contentTrimmed);
    if (validateContent) {
      setFormError(validateContent);
      return;
    }

    setSubmitLoading(true);

    QuestionService.createQuestion(
      titleTrimmed,
      contentTrimmed,
      tags,
      token
    ).then(
      (data) => {
        if (data?.id) {
          navigate(`/questions/${data.id}`);
        } else {
          setFormError('An error occured');
          setSubmitLoading(false);
        }
      },
      () => {
        setFormError('An error occured');
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
      onTitleChange={onTitleChange}
      content={content}
      onContentChange={onContentChange}
      tags={tags}
      error={formError}
      submitLoading={submitLoading}
    />
  );
}
