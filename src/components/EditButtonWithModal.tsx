import { useContext, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import PostsService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import ValidateUtils from '../utils/ValidateUtils';
import LoadingSpinner from './LoadingSpinner';

interface EditButtonWithModalProps {
  onUpdateSuccess: (content: string) => void;
  postId: number;
  content: string;
  className?: string;
}

export default function EditButtonWithModal(props: EditButtonWithModalProps) {
  const { onUpdateSuccess, postId, content: initialContent, className } = props;
  const { token } = useContext(AuthContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState(initialContent);

  const onCloseEditModal = () => setShowEditModal(false);
  const onShowEditModal = () => setShowEditModal(true);

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onUpdate = () => {
    const contentTrimmed = content.trim();
    const validatePostContent =
      ValidateUtils.validatePostContent(contentTrimmed);
    if (validatePostContent) {
      setError(validatePostContent);
      return;
    }

    setLoading(true);
    setError('');
    PostsService.updatePost(contentTrimmed, postId, token).then(
      (data) => {
        setLoading(false);
        setShowEditModal(false);
        if (data?.code === 0) {
          onUpdateSuccess(contentTrimmed);
        } else {
          setError('An error occured');
        }
      },
      () => {
        setLoading(false);
        setShowEditModal(false);
        setError('An error occured');
      }
    );
  };

  return (
    <>
      <Button
        className={className}
        variant="outline-primary"
        onClick={onShowEditModal}
        size="sm"
      >
        EDIT
      </Button>
      <Modal show={showEditModal} onHide={onCloseEditModal}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Control
                minLength={3}
                maxLength={500}
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={content}
                onChange={onContentChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {error ? (
            <Alert className="w-fit-content p-1" variant="danger">
              {error}
            </Alert>
          ) : null}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Button variant="secondary" onClick={onCloseEditModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onUpdate}>
                Update
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
