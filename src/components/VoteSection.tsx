import { Button } from 'react-bootstrap';

interface VoteSectionProps {
  numVotes: number;
  className?: string;
  onUpVote: () => void;
  onDownVote: () => void;
  currVote: number;
  enabled: boolean;
}

export default function VoteSection(props: VoteSectionProps) {
  const { numVotes, className, onUpVote, onDownVote, currVote, enabled } =
    props;

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
}
