import React, { useContext, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import IComment from '../utils/interfaces/IComment';
import ValidateUtils from '../utils/ValidateUtils';
import LoadingSpinner from './LoadingSpinner';

interface CommentFormProps {
  postId: number;
  setShowCommentForm: (showCommentForm: boolean) => void;
  onSubmit: (comment: IComment) => void;
  onCancelClick: () => void;
  className?: string;
}

export default function CommentForm(props: CommentFormProps) {
  const { postId, setShowCommentForm, onSubmit, onCancelClick, className } =
    props;
  const { token } = useContext(AuthContext);

  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    PostsService.createComment(comment, postId, token).then(
      (data) => {
        setShowCommentForm(false);
        setLoading(false);
        if (data) {
          onSubmit(data);
        } else {
          setError('An error occured');
        }
      },
      () => {
        setShowCommentForm(false);
        setLoading(false);
        setError('An error occured');
      }
    );
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
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Button variant="outline-secondary" onClick={onCancelClick}>
              Cancel
            </Button>
            <Button className="ms-1" type="submit">
              Comment
            </Button>
          </>
        )}
      </div>
    </Form>
  );
}
