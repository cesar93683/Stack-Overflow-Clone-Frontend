import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/auth-context';
import DateUtils from '../utils/DateUtils';
import IComment from '../utils/interfaces/IComment';
import DeleteButtonWithModal from './DeleteButtonWithModal';
import VoteSection from './VoteSection';

interface CommentProps {
  comment: IComment;
  setVote: (newVote: number) => void;
  className?: string;
}

export default function Comment(props: CommentProps) {
  const {
    comment: {
      id,
      content,
      votes,
      user: { id: commentUserId, username },
      currVote,
      createdAt,
    },
    setVote,
    className,
  } = props;

  const { userId } = useContext(AuthContext);

  const [isCommentDeleted, setIsCommentDeleted] = useState(false);

  const createdAtLocaleString =
    DateUtils.getLocaleDateStringFromString(createdAt);

  const onDeleteSuccess = () => {
    setIsCommentDeleted(true);
  };

  if (isCommentDeleted) {
    return <div className={className}>Comment deleted</div>;
  }

  return (
    <div className={className}>
      <div className="p-2 d-flex">
        <VoteSection
          votes={votes}
          className="me-2"
          commentId={id}
          setVote={setVote}
          currVote={currVote}
          enabled={!!userId}
        />
        <div className="my-auto">
          <div className="d-inline">{content}</div>
          <div className="ms-1 d-inline-flex">
            <div>{' - '}</div>
            <Link
              className="ms-1 text-decoration-none"
              to={'/users/' + commentUserId}
            >
              {username}
            </Link>
          </div>
          <div className="ms-1 d-inline">{createdAtLocaleString}</div>
          {userId === commentUserId ? (
            <div className="d-inline">
              <DeleteButtonWithModal
                commentId={id}
                className="ms-1"
                type="comment"
                onDeleteSuccess={onDeleteSuccess}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
