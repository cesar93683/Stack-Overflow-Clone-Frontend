interface VotesAndAnswersProps {
  votes: number;
  numAnswers: number;
  className?: string;
}

export default function VotesAndAnswers({
  votes,
  numAnswers,
  className,
}: VotesAndAnswersProps) {
  return (
    <div className={'d-flex flex-md-column flex-row ' + className}>
      <div className={'me-2 me-md-0'}>
        {votes + ' vote' + (votes === 1 ? '' : 's')}
      </div>
      <div>{numAnswers + ' answer' + (numAnswers === 1 ? '' : 's')}</div>
    </div>
  );
}
