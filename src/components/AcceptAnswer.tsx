import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import AnswerService from '../service/AnswerService';
import { AuthContext } from '../utils/auth-context';
import LoadingSpinner from './LoadingSpinner';

interface AcceptedAnswerProps {
  answerId: number;
  questionUserId: number;
  accepted: boolean;
  acceptAnswer: () => void;
}

export default function AcceptedAnswer(props: AcceptedAnswerProps) {
  const { answerId, questionUserId, accepted, acceptAnswer } = props;
  const { userId, token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const onAcceptAnswer = () => {
    setLoading(true);
    AnswerService.acceptAnswer(answerId, token).then(
      (data) => {
        setLoading(false);
        if (data) {
          acceptAnswer();
        } else {
          // TODO
          console.log('error');
        }
      },
      () => {
        setLoading(false);
        // TODO
        console.log('error');
      }
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return accepted ? (
    <Button className="mt-3" variant="success" size="sm" disabled>
      A
    </Button>
  ) : userId === questionUserId ? (
    <Button
      className="mt-3"
      variant="outline-secondary"
      size="sm"
      onClick={onAcceptAnswer}
    >
      A
    </Button>
  ) : null;
}
