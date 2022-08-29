import { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import IComment from '../utils/interfaces/IComment';
import VoteUtils from '../utils/VoteUtils';
import CommentForm from './CommentForm';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteModal from './DeleteModal';
import VoteSection from './VoteSection';

interface CommentProps {
  comment: IComment;
  className?: string;
}

export default function Comment(props: CommentProps) {
  const {
    comment: {
      id,
      content: contentFromProps,
      votes: initialVotes,
      user: { id: commentUserId, username },
      currVote: initialCurrVote,
      createdAt,
      updatedAt,
    },
    className,
  } = props;

  const { userId, token } = useContext(AuthContext);

  const [currVote, setCurrVote] = useState(
    VoteUtils.getCurrVoteNum(initialCurrVote)
  );
  const [votes, setVotes] = useState(initialVotes);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [content, setContent] = useState(contentFromProps);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const onDownVote = () => {
    const newVote = currVote === -1 ? 0 : -1;
    const action = newVote === 0 ? 'NEUTRAL' : 'DOWN_VOTE';
    PostsService.voteComment(id, action, token).then(
      (data) => {
        if (data?.code === 0) {
          setCurrVote(newVote);
          const diff = VoteUtils.getDownVoteDiff(currVote, newVote);
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

  const onEditClick = () => {
    setIsEditing(true);
  };

  const onCommentUpdate = (newContent: string) => {
    setUpdateLoading(true);
    PostsService.updateComment(newContent, id, token).then(
      (data) => {
        setUpdateLoading(false);
        if (data?.code === 0) {
          setContent(newContent);
          setIsEditing(false);
        } else {
          // TODO
          console.log('error');
        }
      },
      () => {
        setUpdateLoading(false);
        // TODO
        console.log('error');
      }
    );
  };

  const onCancelClick = () => {
    setIsEditing(false);
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
          onDownVote={onDownVote}
          currVote={currVote}
          enabled={!!userId}
        />
        <div className="w-100">
          <CustomCardSubtitle
            userId={commentUserId}
            createdAt={createdAt}
            updatedAt={updatedAt}
            username={username}
          />
          {isEditing ? (
            <CommentForm
              loading={updateLoading}
              onCancelClick={onCancelClick}
              onSubmit={onCommentUpdate}
              buttonText="Update"
              defaultContent={content}
            />
          ) : null}
          {!isEditing ? <Card.Text>{content}</Card.Text> : null}
          {!isEditing && userId === commentUserId ? (
            <div className="d-flex justify-content-end">
              <Button
                onClick={onEditClick}
                className="me-2"
                variant="outline-primary"
              >
                Edit
              </Button>
              <DeleteModal
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
