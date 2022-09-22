import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
        <Link
          key={tag.tag}
          to={'/questions/tagged/' + encodeURIComponent(tag.tag)}
        >
          <Button className="py-0 px-2 me-1" variant="outline-secondary">
            {tag.tag}
          </Button>
        </Link>
      ))}
    </div>
  );
}
