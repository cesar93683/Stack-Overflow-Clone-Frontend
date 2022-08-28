import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IPost from '../utils/interfaces/IPost';
import CustomCardSubtitle from './CustomCardSubtitle';
import VotesAndAnswers from './VotesAndAnswers';

interface PostCardProps {
  post: IPost;
  onDelete?: (() => void) | null;
  className?: string;
}

export default function PostCardSmall(props: PostCardProps) {
  const {
    post: {
      id: postId,
      title,
      content,
      votes,
      numPostResponses,
      user: { id: postUserId, username },
      createdAt,
      updatedAt,
    },
    className,
  } = props;

  return (
    <Card className={className}>
      <Card.Body className="d-flex flex-md-row flex-column">
        <VotesAndAnswers
          className="me-2 flex-shrink-0"
          votes={votes}
          numPostResponses={numPostResponses}
        />
        <div className="">
          <CustomCardSubtitle
            userId={postUserId}
            createdAt={createdAt}
            updatedAt={updatedAt}
            username={username}
          />
          <Card.Title>
            <Link className="text-body" to={'/posts/' + postId}>
              {title}
            </Link>
          </Card.Title>
          <Card.Text>{content}</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}
