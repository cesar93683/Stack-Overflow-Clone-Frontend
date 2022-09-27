import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import AnswerService from '../service/AnswerService';
import { AuthContext } from '../utils/auth-context';

interface AcceptedAnswerProps {
  answerId: number;
  questionUserId: number;
  accepted: boolean;
  acceptAnswer: () => void;
  className?: string;
}

export default function AnswerAccept(props: AcceptedAnswerProps) {
  const { answerId, questionUserId, accepted, acceptAnswer, className } = props;
  const { userId, token } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const onAcceptAnswer = () => {
    setLoading(true);
    AnswerService.acceptAnswer(answerId, token).then(
      (data) => {
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

  return accepted ? (
    <Button className={className} variant="success" disabled>
      A
    </Button>
  ) : userId === questionUserId ? (
    <Button
      className={className}
      variant="outline-secondary"
      onClick={onAcceptAnswer}
      disabled={loading}
    >
      A
    </Button>
  ) : null;
}
