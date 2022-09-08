interface ReputationScoreProps {
  reputation: number;
}

export default function ReputationScore({ reputation }: ReputationScoreProps) {
  return (
    <span className="ms-1 fw-bold" title="reputation score " dir="ltr">
      {reputation}
    </span>
  );
}
