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
      <div className="mt-2 d-flex">
        <VoteSection
          votes={votes}
          commentId={id}
          setVote={setVote}
          currVote={currVote}
          enabled={!!userId}
        />
        <div>
          <span className="ms-1">{content}</span>
          <span className="ms-1">{'-'}</span>
          <Link className="ms-1 text-decoration-none" to={'/users/' + userId}>
            {username}
          </Link>
          <span className="ms-1">{createdAtLocaleString}</span>
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
