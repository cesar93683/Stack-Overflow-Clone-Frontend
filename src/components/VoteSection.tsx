import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AnswerService from '../service/AnswerService';
import CommentService from '../service/CommentService';
import QuestionService from '../service/QuestionService';
import { AuthContext } from '../utils/auth-context';

interface VoteSectionProps {
  votes: number;
  className?: string;
  onVoteSuccess: (newVote: number) => void;
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
    onVoteSuccess,
    currVote,
    commentId,
    answerId,
    questionId,
    enabled,
  } = props;

  const { token } = useContext(AuthContext);

  const onDownVote = () => {
    const newVote = currVote === -1 ? 0 : -1;
    const action = newVote === 0 ? 'NEUTRAL' : 'DOWN_VOTE';
    if (questionId) {
      QuestionService.voteQuestion(questionId, action, token).then(
        (data) => {
          if (data?.code === 0) {
            onVoteSuccess(newVote);
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
      AnswerService.voteAnswer(answerId, action, token).then(
        (data) => {
          if (data?.code === 0) {
            onVoteSuccess(newVote);
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
    const action = newVote === 0 ? 'NEUTRAL' : 'UP_VOTE';
    if (commentId) {
      CommentService.voteComment(commentId, action, token).then(
        (data) => {
          if (data?.code === 0) {
            onVoteSuccess(newVote);
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
      QuestionService.voteQuestion(questionId, action, token).then(
        (data) => {
          if (data?.code === 0) {
            onVoteSuccess(newVote);
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
      AnswerService.voteAnswer(answerId, action, token).then(
        (data) => {
          if (data?.code === 0) {
            onVoteSuccess(newVote);
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
