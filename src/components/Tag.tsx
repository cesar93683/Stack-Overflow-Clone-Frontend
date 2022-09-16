import { Button } from 'react-bootstrap';
import ITag from '../utils/interfaces/ITag';

interface TagProps {
  tags: ITag[];
  className?: string;
}

export default function Tag(props: TagProps) {
  const { tags, className } = props;

  return (
    <div className={'d-flex flex-row ' + className}>
      {tags.map((tag) => (
        <Button
          key={tag.tag}
          className="py-0 px-2 me-1"
          variant="outline-secondary"
        >
          {tag.tag}
        </Button>
      ))}
    </div>
  );
}
