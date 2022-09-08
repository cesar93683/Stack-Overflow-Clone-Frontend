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
      answered,
      user: { id: userId, username, reputation },
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
          answered={answered}
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
          <div className="d-flex justify-content-end">
            <CustomCardSubtitle
              action="asked"
              userId={userId}
              createdAt={createdAt}
              username={username}
              reputation={reputation}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
