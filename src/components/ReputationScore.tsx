interface ReputationScoreProps {
  reputation: number;
}

export default function ReputationScore({ reputation }: ReputationScoreProps) {
  const getReputationString = (rep: number) => {
    const repStr = String(rep);
    if (rep < 1000) {
      return rep;
    } else if (rep < 10000) {
      return repStr[0] + ',' + repStr.substring(1);
    } else if (rep < 100000) {
      return repStr.substring(0, 2) + '.' + repStr[3] + 'k';
    }
    return repStr.substring(0, 3) + 'k';
  };
  return (
    <span className="ms-1 fw-bold" title="reputation score " dir="ltr">
      {getReputationString(reputation)}
    </span>
  );
}
