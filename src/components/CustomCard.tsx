import { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../utils/auth-context';
import IComment from '../utils/interfaces/IComment';
import IUser from '../utils/interfaces/IUser';
import VoteUtils from '../utils/VoteUtils';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteButtonWithModal from './DeleteButtonWithModal';
import EditButtonWithModal from './EditButtonWithModal';
import VoteSection from './VoteSection';

interface CustomCardProps {
  card: {
    questionId?: number;
    answerId?: number;
    title?: string;
    content: string;
    votes: number;
    comments: IComment[];
    user: IUser;
    currVote: number;
    createdAt: string;
    updatedAt: string;
  };
  onDeleteSuccess: () => void;
  setVote: (currVote: number, votes: number) => void;
  setContent: (content: string) => void;
  onAddCommentSuccess: (comment: IComment) => void;
  onCommentVote: (newVote: number, newVotes: number, index: number) => void;
  className?: string;
}

export default function CustomCard(props: CustomCardProps) {
  const {
    card: {
      questionId,
      answerId,
      title,
      content,
      votes,
      comments,
      user: { id: questionUserId, username },
      currVote,
      createdAt,
      updatedAt,
    },
    onDeleteSuccess,
    setVote,
    setContent,
    onAddCommentSuccess,
    onCommentVote,
    className,
  } = props;
  const { userId } = useContext(AuthContext);

  const [showCommentForm, setShowCommentForm] = useState(false);

  const onVoteSuccess = (newVote: number) => {
    const diff = VoteUtils.getVoteDiff(currVote, newVote);
    setVote(newVote, votes + diff);
  };

  const onAddComment = () => {
    setShowCommentForm(true);
  };

  const onCancelCommentSubmit = () => {
    setShowCommentForm(false);
  };

  const onUpdateSuccess = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <Card className={className}>
      <Card.Body className="d-flex">
        <VoteSection
          votes={votes}
          className="me-2"
          onVoteSuccess={onVoteSuccess}
          questionId={questionId}
          answerId={answerId}
          currVote={currVote}
          enabled={!!userId}
        />
        <div className="w-100">
          {title ? <Card.Title>{title}</Card.Title> : null}
          <Card.Text>{content}</Card.Text>
          <div className="d-flex flex-row-reverse justify-content-between align-items-center">
            <CustomCardSubtitle
              action={questionId ? 'asked' : 'answered'}
              userId={questionUserId}
              createdAt={createdAt}
              updatedAt={updatedAt}
              username={username}
            />
            {userId === questionUserId ? (
              <div>
                <EditButtonWithModal
                  onUpdateSuccess={onUpdateSuccess}
                  questionId={questionId}
                  answerId={answerId}
                  content={content}
                  className="me-2"
                />
                <DeleteButtonWithModal
                  questionId={questionId}
                  answerId={answerId}
                  type="question"
                  onDeleteSuccess={onDeleteSuccess}
                />
              </div>
            ) : null}
          </div>
          <div>
            {comments.map((comment, i) => (
              <Comment
                key={i}
                comment={comment}
                setVote={(newVote: number, newVotes: number) =>
                  onCommentVote(newVote, newVotes, i)
                }
              />
            ))}
          </div>
          {!userId ? null : showCommentForm ? (
            <CommentForm
              questionId={questionId}
              answerId={answerId}
              setShowCommentForm={setShowCommentForm}
              onAddCommentSuccess={onAddCommentSuccess}
              onCancelClick={onCancelCommentSubmit}
              className="mt-2"
            />
          ) : (
            <a
              className="text-decoration-underline"
              role="button"
              onClick={onAddComment}
            >
              Add a comment
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
