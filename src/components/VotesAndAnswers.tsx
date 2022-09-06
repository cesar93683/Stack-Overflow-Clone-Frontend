import { Alert } from 'react-bootstrap';

interface VotesAndAnswersProps {
  votes: number;
  numAnswers: number;
  answered: number;
  className?: string;
}

export default function VotesAndAnswers({
  votes,
  numAnswers,
  answered,
  className,
}: VotesAndAnswersProps) {
  const numAnswersText = numAnswers + ' answer' + (numAnswers === 1 ? '' : 's');
  return (
    <div className={'d-flex flex-md-column flex-row ' + className}>
      <div className={'me-2 me-md-0'}>
        {votes + ' vote' + (votes === 1 ? '' : 's')}
      </div>
      {answered ? (
        <div>{numAnswersText}</div>
      ) : (
        <Alert variant="success p-1">{numAnswersText}</Alert>
      )}
    </div>
  );
}
