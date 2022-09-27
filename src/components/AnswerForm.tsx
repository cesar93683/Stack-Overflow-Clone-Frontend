import React from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import Content from './Content';
import LoadingSpinner from './LoadingSpinner';

interface AddAnswerFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  content: string;
  onContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error: string;
  submitLoading: boolean;
  className?: string;
}

export default function AddAnswerForm(props: AddAnswerFormProps) {
  const {
    onSubmit,
    content,
    onContentChange,
    error,
    submitLoading,
    className,
  } = props;

  return (
    <div>
      <Form onSubmit={onSubmit} className={className}>
        <Form.Control
          minLength={3}
          maxLength={10000}
          as="textarea"
          rows={8}
          value={content}
          onChange={onContentChange}
        />
        {error ? (
          <Alert
            className="ms-auto mt-1 mb-0 p-1 w-fit-content"
            variant="danger"
          >
            {error}
          </Alert>
        ) : null}
        <div className="d-flex justify-content-end mt-1">
          {submitLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Button type="submit">Submit</Button>
            </>
          )}
        </div>
      </Form>
      <Content content={content} />
    </div>
  );
}
