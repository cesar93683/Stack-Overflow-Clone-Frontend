import { CloseButton } from 'react-bootstrap';

interface TagProps {
  tag: string;
  onClose: () => void;
  className?: string;
}

export default function Tag(props: TagProps) {
  const { tag, onClose, className } = props;

  return (
    <div
      className={
        'w-fit-content border rounded p-1 d-flex flex-row ' + className
      }
    >
      <div className="me-1">{tag}</div>
      <CloseButton onClick={onClose} />
    </div>
  );
}
