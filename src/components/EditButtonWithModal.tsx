import { useContext, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AnswerService from '../service/AnswerService';
import { AuthContext } from '../utils/auth-context';
import ValidateUtils from '../utils/ValidateUtils';
import LoadingSpinner from './LoadingSpinner';

interface EditButtonWithModalProps {
  onUpdateSuccess: (content: string) => void;
  questionId?: number;
  answerId?: number;
  content: string;
  className?: string;
}

export default function EditButtonWithModal(props: EditButtonWithModalProps) {
  const {
    onUpdateSuccess,
    questionId,
    answerId,
    content: initialContent,
    className,
  } = props;
  const { token } = useContext(AuthContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState(initialContent);
  const navigate = useNavigate();

  const onCloseEditModal = () => setShowEditModal(false);
  const onEditClick = () => {
    if (questionId) {
      navigate('/questions/edit/' + questionId);
    } else {
      setShowEditModal(true);
    }
  };

  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onUpdate = () => {
    const contentTrimmed = content.trim();
    const validateContent = ValidateUtils.validateContent(contentTrimmed);
    if (validateContent) {
      setError(validateContent);
      return;
    }

    if (answerId) {
      setLoading(true);
      setError('');
      AnswerService.updateAnswer(contentTrimmed, answerId, token).then(
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
    }
  };

  return (
    <>
      <Button
        className={className}
        variant="outline-primary"
        onClick={onEditClick}
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
                maxLength={10000}
                as="textarea"
                rows={8}
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
