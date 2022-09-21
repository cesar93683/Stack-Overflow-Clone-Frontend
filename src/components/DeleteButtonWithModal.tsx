import { useContext, useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import AnswerService from '../service/AnswerService';
import CommentService from '../service/CommentService';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';
import LoadingSpinner from './LoadingSpinner';

interface DeleteButtonWithModalProps {
  onDeleteSuccess: () => void;
  type: string;
  commentId?: number;
  questionId?: number;
  answerId?: number;
  className?: string;
}

export default function DeleteButtonWithModal(
  props: DeleteButtonWithModalProps
) {
  const { onDeleteSuccess, type, className, commentId, questionId, answerId } =
    props;
  const { token } = useContext(AuthContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onCloseDeleteModal = () => setShowDeleteModal(false);
  const onShowDeleteModal = () => setShowDeleteModal(true);

  const onDelete = () => {
    setLoading(true);
    setHasError(false);

    let response = null;

    if (commentId) {
      response = CommentService.deleteComment(commentId, token);
    } else if (questionId) {
      response = QuestionService.deleteQuestion(questionId, token);
    } else if (answerId) {
      response = AnswerService.deleteAnswer(answerId, token);
    }

    if (response) {
      response.then(
        (data) => {
          setLoading(false);
          if (data?.code === 0) {
            onDeleteSuccess();
          } else {
            setHasError(true);
          }
        },
        () => {
          setLoading(false);
          setHasError(true);
        }
      );
    } else {
      setLoading(false);
      setHasError(true);
    }
  };

  return (
    <>
      <Button
        className={className}
        variant="danger"
        onClick={onShowDeleteModal}
        size="sm"
      >
        Delete
      </Button>
      <Modal show={showDeleteModal} onHide={onCloseDeleteModal}>
        <Modal.Header>
          <Modal.Title>
            {`Are you sure you want to delete this ${type}?`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          {hasError ? (
            <Alert className="w-fit-content p-1" variant="danger">
              An error occured
            </Alert>
          ) : null}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Button variant="secondary" onClick={onCloseDeleteModal}>
                No
              </Button>
              <Button variant="danger" onClick={onDelete}>
                Yes
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
