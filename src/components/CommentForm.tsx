import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
  onCancelClick: () => void;
  className?: string;
  buttonText?: string;
  defaultContent?: string;
}

export default function CommentForm(props: CommentFormProps) {
  const { onSubmit, onCancelClick, className, buttonText, defaultContent } =
    props;

  const [content, setContent] = useState(defaultContent ? defaultContent : '');
  const [error, setError] = useState('');

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content) {
      setError('Please Enter A Comment.');
      return;
    }
    setError('');
    onSubmit(content);
  };

  return (
    <Form onSubmit={onSubmitClick} className={className}>
      <Form.Control
        value={content}
        onChange={onContentChange}
        placeholder={'Enter Comment'}
      />
      {error ? (
        <Alert className="mt-1 mb-0" variant="danger">
          {error}
        </Alert>
      ) : null}
      <div className="d-flex justify-content-end mt-1">
        <Button
          type="submit"
          variant="outline-secondary"
          onClick={onCancelClick}
        >
          Cancel
        </Button>
        <Button className="ms-1" type="submit">
          {buttonText ? buttonText : 'Comment'}
        </Button>
      </div>
    </Form>
  );
}
