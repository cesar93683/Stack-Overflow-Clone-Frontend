import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

interface DeleteButtonWithModalProps {
  onDelete: () => void;
  type: string;
  loading: boolean;
  className?: string;
}

export default function DeleteButtonWithModal(
  props: DeleteButtonWithModalProps
) {
  const { onDelete, type, loading, className } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCloseDeleteModal = () => setShowDeleteModal(false);
  const onShowDeleteModal = () => setShowDeleteModal(true);

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
