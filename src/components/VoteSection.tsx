import { Button } from 'react-bootstrap';

interface VoteSectionProps {
  numVotes: number;
  className?: string;
  onUpVote: () => void;
  onDownVote?: () => void;
  currVote: number;
  enabled: boolean;
}

export default function VoteSection(props: VoteSectionProps) {
  const { numVotes, className, onUpVote, onDownVote, currVote, enabled } =
    props;

  if (onDownVote) {
    return (
      <div className={'d-flex flex-column align-items-center ' + className}>
        <Button
          onClick={onUpVote}
          variant={currVote === 1 ? 'primary' : 'secondary'}
          disabled={!enabled}
          size="sm"
        >
          ^
        </Button>
        <div>{numVotes}</div>
        <Button
          onClick={onDownVote}
          variant={currVote === -1 ? 'primary' : 'secondary'}
          disabled={!enabled}
          size="sm"
          className="w-100"
        >
          v
        </Button>
      </div>
    );
  } else {
    return (
      <div
        className={
          'h-fit-content d-flex flex-row align-items-start ' + className
        }
      >
        <div className="my-auto me-1">{numVotes}</div>
        <Button
          onClick={onUpVote}
          variant={currVote === 1 ? 'primary' : 'secondary'}
          disabled={!enabled}
          size="sm"
        >
          ^
        </Button>
      </div>
    );
  }
}
