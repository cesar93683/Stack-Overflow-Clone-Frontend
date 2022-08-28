interface VotesAndAnswersProps {
  votes: number;
  numPostResponses: number;
  className?: string;
}

export default function VotesAndAnswers({
  votes,
  numPostResponses,
  className,
}: VotesAndAnswersProps) {
  return (
    <div className={'d-flex flex-md-column flex-row ' + className}>
      <div className={'me-2 me-md-0'}>
        {votes + ' vote' + (votes === 1 ? '' : 's')}
      </div>
      <div>
        {numPostResponses + ' answer' + (numPostResponses === 1 ? '' : 's')}
      </div>
    </div>
  );
}
