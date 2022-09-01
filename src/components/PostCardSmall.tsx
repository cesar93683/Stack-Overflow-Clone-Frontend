import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IQuestion from '../utils/interfaces/IQuestion';
import CustomCardSubtitle from './CustomCardSubtitle';
import VotesAndAnswers from './VotesAndAnswers';

interface PostCardSmallProps {
  post: IQuestion;
  className?: string;
}

export default function PostCardSmall(props: PostCardSmallProps) {
  const {
    post: {
      id: postId,
      title,
      content,
      votes,
      numAnswers: numPostResponses,
      user: { id: userId, username },
      createdAt,
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
        <div className="w-100">
          <Card.Body>
            <Link className="text-decoration-none" to={'/posts/' + postId}>
              {title}
            </Link>
          </Card.Body>
          <Card.Text className="mb-1">{content}</Card.Text>
          <div className="ms-auto w-fit-content">
            <CustomCardSubtitle
              userId={userId}
              createdAt={createdAt}
              username={username}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
