import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IPost from '../utils/interfaces/IPost';
import CustomCardSubtitle from './CustomCardSubtitle';
import VotesAndAnswers from './VotesAndAnswers';

interface PostCardSmallProps {
  post: IPost;
  className?: string;
}

export default function PostCardSmall(props: PostCardSmallProps) {
  const {
    post: {
      id: postId,
      title,
      content,
      votes,
      numPostResponses,
      user: { id: userId, username },
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
        <div>
          <Card.Title>
            <Link className="text-body" to={'/posts/' + postId}>
              {title}
            </Link>
          </Card.Title>
          <Card.Text className="mb-1">{content}</Card.Text>
          <div className="d-flex flex-row-reverse">
            <CustomCardSubtitle
              userId={userId}
              createdAt={createdAt}
              updatedAt={updatedAt}
              username={username}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
