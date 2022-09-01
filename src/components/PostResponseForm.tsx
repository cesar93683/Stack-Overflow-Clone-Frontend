import React, { useContext, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import PostsService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import IQuestion from '../utils/interfaces/IQuestion';
import ValidateUtils from '../utils/ValidateUtils';
import LoadingSpinner from './LoadingSpinner';

interface PostResponseFormProps {
  postId: number;
  onAddPostResponseSuccess: (post: IQuestion) => void;
  className?: string;
}

export default function PostResponseForm(props: PostResponseFormProps) {
  const { postId, onAddPostResponseSuccess, className } = props;
  const { token } = useContext(AuthContext);

  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const contentTrimmed = content.trim();
    const contentValidate = ValidateUtils.validatePostContent(contentTrimmed);
    if (contentValidate) {
      setError(contentValidate);
      return;
    }
    setError('');

    setLoading(true);
    PostsService.createPostResponse(content, postId, token).then(
      (data) => {
        setLoading(false);
        if (data) {
          onAddPostResponseSuccess(data);
        } else {
          setError('An error occured');
        }
      },
      () => {
        setLoading(false);
        setError('An error occured');
      }
    );
  };

  return (
    <Form onSubmit={onSubmitClick} className={className}>
      <Form.Control
        value={content}
        onChange={onContentChange}
        placeholder={'Enter Response'}
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
            <Button type="submit">Submit</Button>
          </>
        )}
      </div>
    </Form>
  );
}
