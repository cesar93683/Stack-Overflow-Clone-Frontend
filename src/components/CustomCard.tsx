import { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../utils/auth-context';
import IComment from '../utils/interfaces/IComment';
import IUser from '../utils/interfaces/IUser';
import AcceptedAnswer from './AcceptAnswer';
import Comment from './Comment';
import CommentForm from './CommentForm';
import Content from './Content';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteButtonWithModal from './DeleteButtonWithModal';
import EditButtonWithModal from './EditButtonWithModal';
import Tags from './Tag';
import VoteSection from './VoteSection';

interface CustomCardProps {
  questionUserId: number;
  card: {
    questionId?: number;
    answerId?: number;
    accepted?: boolean;
    title?: string;
    content: string;
    votes: number;
    comments: IComment[];
    user: IUser;
    tags?: string[];
    currVote: number;
    createdAt: string;
    updatedAt: string;
  };
  onDelete: () => void;
  setVote: (newVote: number) => void;
  setContent: (content: string) => void;
  addComment: (comment: IComment) => void;
  setCommentVote: (newVote: number, index: number) => void;
  acceptAnswer?: () => void;
  className?: string;
}

export default function CustomCard(props: CustomCardProps) {
  const {
    questionUserId,
    card: {
      questionId,
      answerId,
      accepted,
      title,
      content,
      votes,
      comments,
      user: { id: cardUserId, username, reputation },
      tags,
      currVote,
      createdAt,
      updatedAt,
    },
    onDelete,
    setVote,
    setContent,
    addComment,
    setCommentVote,
    acceptAnswer,
    className,
  } = props;
  const { userId } = useContext(AuthContext);

  const [showCommentForm, setShowCommentForm] = useState(false);

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
      <Card.Body className="row">
        <div className="col-2 col-sm-1">
          <div className="w-fit-content mx-auto">
            <VoteSection
              votes={votes}
              setVote={setVote}
              questionId={questionId}
              answerId={answerId}
              currVote={currVote}
              enabled={!!userId}
            />
            {answerId && acceptAnswer ? (
              <AcceptedAnswer
                className="mt-2 d-block"
                answerId={answerId}
                questionUserId={questionUserId}
                accepted={!!accepted}
                acceptAnswer={acceptAnswer}
              />
            ) : null}
          </div>
        </div>
        <div className="col-10 col-sm-11">
          {title ? <Card.Title>{title}</Card.Title> : null}
          <Content content={content} />
          <div className="d-flex flex-row-reverse justify-content-between align-items-center">
            <CustomCardSubtitle
              action={questionId ? 'asked' : 'answered'}
              userId={cardUserId}
              reputation={reputation}
              createdAt={createdAt}
              updatedAt={updatedAt}
              username={username}
            />
            {userId === cardUserId ? (
              <div className="d-flex flex-column flex-md-row me-1">
                <EditButtonWithModal
                  onUpdateSuccess={onUpdateSuccess}
                  questionId={questionId}
                  answerId={answerId}
                  content={content}
                  className="me-0 me-md-1"
                />
                <DeleteButtonWithModal
                  className="mt-1 mt-md-0"
                  questionId={questionId}
                  answerId={answerId}
                  type="question"
                  onDeleteSuccess={onDelete}
                />
              </div>
            ) : null}
          </div>

          {tags ? <Tags tags={tags} className="mt-1" /> : null}
          <div>
            {comments.map((comment, i) => (
              <Comment
                key={i}
                comment={comment}
                setVote={(newVote: number) => setCommentVote(newVote, i)}
              />
            ))}
          </div>
          {!userId ? null : showCommentForm ? (
            <CommentForm
              questionId={questionId}
              answerId={answerId}
              setShowCommentForm={setShowCommentForm}
              addComment={addComment}
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
