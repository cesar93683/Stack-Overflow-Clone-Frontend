import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AnswerService from '../service/AnswerService';
import CommentService from '../service/CommentService';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';

interface VoteSectionProps {
  votes: number;
  className?: string;
  setVote: (newVote: number) => void;
  onDownVoteSuccess?: () => void;
  currVote: number;
  commentId?: number;
  questionId?: number;
  answerId?: number;
  enabled: boolean;
}

export default function VoteSection(props: VoteSectionProps) {
  const {
    votes,
    className,
    setVote,
    currVote,
    commentId,
    answerId,
    questionId,
    enabled,
  } = props;

  const { token } = useContext(AuthContext);

  const onDownVote = () => {
    const newVote = currVote === -1 ? 0 : -1;
    if (questionId) {
      QuestionService.voteQuestion(questionId, newVote, token).then(
        (data) => {
          if (data?.code === 0) {
            setVote(newVote);
          } else {
            // TODO
            console.log('error');
          }
        },
        () => {
          // TODO
          console.log('error');
        }
      );
    } else if (answerId) {
      AnswerService.voteAnswer(answerId, newVote, token).then(
        (data) => {
          if (data?.code === 0) {
            setVote(newVote);
          } else {
            // TODO
            console.log('error');
          }
        },
        () => {
          // TODO
          console.log('error');
        }
      );
    }
  };

  const onUpVote = () => {
    const newVote = currVote === 1 ? 0 : 1;
    if (commentId) {
      CommentService.voteComment(commentId, newVote, token).then(
        (data) => {
          if (data?.code === 0) {
            setVote(newVote);
          } else {
            // TODO
            console.log('error');
          }
        },
        () => {
          // TODO
          console.log('error');
        }
      );
    } else if (questionId) {
      QuestionService.voteQuestion(questionId, newVote, token).then(
        (data) => {
          if (data?.code === 0) {
            setVote(newVote);
          } else {
            // TODO
            console.log('error');
          }
        },
        () => {
          // TODO
          console.log('error');
        }
      );
    } else if (answerId) {
      AnswerService.voteAnswer(answerId, newVote, token).then(
        (data) => {
          if (data?.code === 0) {
            setVote(newVote);
          } else {
            // TODO
            console.log('error');
          }
        },
        () => {
          // TODO
          console.log('error');
        }
      );
    }
  };

  if (questionId || answerId) {
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
        <div>{votes}</div>
        <Button
          onClick={onDownVote}
          variant={currVote === -1 ? 'primary' : 'secondary'}
          disabled={!enabled}
          size="sm"
        >
          v
        </Button>
      </div>
    );
  } else {
    return (
      <div className={'d-flex flex-row align-items-start ' + className}>
        <div className="my-auto me-1">{votes}</div>
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
