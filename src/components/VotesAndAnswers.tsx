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
    <div
      className={
        'd-flex flex-md-column flex-row align-items-md-end align-items-center ' +
        className
      }
    >
      <div className={'me-2 me-md-0'}>
        {votes + ' vote' + (votes === 1 ? '' : 's')}
      </div>
      {answered ? (
        <Alert variant="success px-1 py-0 m-0">{numAnswersText}</Alert>
      ) : (
        <div>{numAnswersText}</div>
      )}
    </div>
  );
}
