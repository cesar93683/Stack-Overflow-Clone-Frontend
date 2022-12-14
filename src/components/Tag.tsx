import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface TagProps {
  tags: string[];
  className?: string;
}

export default function Tag(props: TagProps) {
  const { tags, className } = props;

  return (
    <div className={'d-flex flex-row ' + className}>
      {tags.map((tag) => (
        <Link key={tag} to={'/questions/tagged/' + encodeURIComponent(tag)}>
          <Button className="py-0 px-2 me-1" variant="outline-secondary">
            {tag}
          </Button>
        </Link>
      ))}
    </div>
  );
}
