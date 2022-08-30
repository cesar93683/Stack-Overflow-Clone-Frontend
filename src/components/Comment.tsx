import { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import DateUtils from '../utils/DateUtils';
import IComment from '../utils/interfaces/IComment';
import VoteUtils from '../utils/VoteUtils';
import DeleteButtonWithModal from './DeleteButtonWithModal';
import VoteSection from './VoteSection';

interface CommentProps {
  comment: IComment;
  className?: string;
}

export default function Comment(props: CommentProps) {
  const {
    comment: {
      id,
      content,
      votes: initialVotes,
      user: { id: commentUserId, username },
      currVote: initialCurrVote,
      createdAt,
    },
    className,
  } = props;

  const { userId, token } = useContext(AuthContext);

  const [currVote, setCurrVote] = useState(
    VoteUtils.getCurrVoteNum(initialCurrVote)
  );
  const [votes, setVotes] = useState(initialVotes);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);

  const createdAtLocaleString = DateUtils.getLocaleDateString(createdAt);

  const onDelete = () => {
    setDeleteLoading(true);
    PostsService.deleteComment(id, token).then(
      (data) => {
        setDeleteLoading(false);
        if (data?.code === 0) {
          setIsCommentDeleted(true);
        } else {
          // TODO
          console.log('error');
        }
      },
      () => {
        setDeleteLoading(false);
        // TODO
        console.log('error');
      }
    );
  };

  const onUpVote = () => {
    const newVote = currVote === 1 ? 0 : 1;
    const action = newVote === 0 ? 'NEUTRAL' : 'UP_VOTE';
    PostsService.voteComment(id, action, token).then(
      (data) => {
        if (data?.code === 0) {
          setCurrVote(newVote);
          const diff = VoteUtils.getUpVoteDiff(currVote, newVote);
          setVotes(votes + diff);
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
  };

  if (isCommentDeleted) {
    return <div className={className}>Comment deleted</div>;
  }

  return (
    <Card className={className}>
      <Card.Body className="p-2 d-flex">
        <VoteSection
          numVotes={votes}
          className="me-2"
          onUpVote={onUpVote}
          currVote={currVote}
          enabled={!!userId}
        />
        <div className="w-100">
          <Card.Text className="d-inline">{content}</Card.Text>
          <div className="d-inline">{' - '}</div>
          <Link
            className="ms-1 text-decoration-none d-inline"
            to={'/users/' + userId}
          >
            {username}
          </Link>
          <div className="ms-1 d-inline">
            {'asked ' + createdAtLocaleString}
          </div>
          {userId === commentUserId ? (
            <div className="d-flex justify-content-end">
              <DeleteButtonWithModal
                type="comment"
                onDelete={onDelete}
                loading={deleteLoading}
              />
            </div>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
}
