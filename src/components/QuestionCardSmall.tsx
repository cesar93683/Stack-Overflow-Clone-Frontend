import { Button, Card } from 'react-bootstrap';
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
      tags,
      createdAt,
    },
    className,
  } = props;

  const removeMarkDown = (content: string) => {
    return content
      .replaceAll(/~~~[a-zA-Z]+/g, '')
      .replaceAll('~~~', '')
      .replaceAll('```', '');
  };

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
          <Card.Text className="mb-1 line-clamp-2">
            {removeMarkDown(content)}
          </Card.Text>
          <div className="d-flex flex-row">
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
