import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IQuestion from '../utils/interfaces/IQuestion';
import CustomCardSubtitle from './CustomCardSubtitle';
import VotesAndAnswers from './VotesAndAnswers';

interface QuestionCardSmallProps {
  question: IQuestion;
  className?: string;
}

export default function QuestionCardSmall(props: QuestionCardSmallProps) {
  const {
    question: {
      id: questionId,
      title,
      content,
      votes,
      numAnswers,
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
          numAnswers={numAnswers}
        />
        <div className="w-100">
          <Card.Title>
            <Link
              className="text-decoration-none"
              to={'/questions/' + questionId}
            >
              {title}
            </Link>
          </Card.Title>
          <Card.Text className="mb-1">{content}</Card.Text>
          <div className="ms-auto w-fit-content">
            <CustomCardSubtitle
              action="asked"
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
