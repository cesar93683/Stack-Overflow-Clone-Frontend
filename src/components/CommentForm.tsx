import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import ValidateUtils from '../utils/ValidateUtils';
import LoadingSpinner from './LoadingSpinner';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
  onCancelClick: () => void;
  loading: boolean;
  className?: string;
}

export default function CommentForm(props: CommentFormProps) {
  const { onSubmit, onCancelClick, loading, className } = props;

  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const onSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const commentTrimmed = comment.trim();
    const commentValidate = ValidateUtils.validateComment(commentTrimmed);
    if (commentValidate) {
      setError(commentValidate);
      return;
    }
    setError('');
    onSubmit(commentTrimmed);
  };

  return (
    <Form onSubmit={onSubmitClick} className={className}>
      <Form.Control
        value={comment}
        onChange={onContentChange}
        placeholder={'Enter Comment'}
      />
      {error ? (
        <Alert className="ms-auto mt-1 mb-0 p-1 w-fit-content" variant="danger">
          {error}
        </Alert>
      ) : null}
      <div className="d-flex justify-content-end mt-1">
        <Button variant="outline-secondary" onClick={onCancelClick}>
          Cancel
        </Button>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Button className="ms-1" type="submit">
            Comment
          </Button>
        )}
      </div>
    </Form>
  );
}
