import { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../utils/auth-context';
import DateUtils from '../utils/DateUtils';
import IComment from '../utils/interfaces/IComment';
import IQuestion from '../utils/interfaces/IQuestion';
import VoteUtils from '../utils/VoteUtils';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteButtonWithModal from './DeleteButtonWithModal';
import EditButtonWithModal from './EditButtonWithModal';
import VoteSection from './VoteSection';

interface QuestionCardProps {
  question: IQuestion;
  onDeleteSuccess: () => void;
  className?: string;
}

export default function QuestionCard(props: QuestionCardProps) {
  const {
    question: {
      id: questionId,
      title,
      content: initialContent,
      votes: initialVotes,
      comments: initialComments,
      user: { id: questionUserId, username },
      currVote: initialCurrVote,
      createdAt,
      updatedAt: initialUpdatedAt,
    },
    onDeleteSuccess,
    className,
  } = props;
  const { userId } = useContext(AuthContext);

  const [currVote, setCurrVote] = useState(
    VoteUtils.getCurrVoteNum(initialCurrVote)
  );
  const [votes, setVotes] = useState(initialVotes);
  const [content, setContent] = useState(initialContent);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt);

  const onVoteSuccess = (newVote: number) => {
    setCurrVote(newVote);
    const diff = VoteUtils.getVoteDiff(currVote, newVote);
    setVotes(votes + diff);
  };

  const onAddComment = () => {
    setShowCommentForm(true);
  };

  const onCancelCommentSubmit = () => {
    setShowCommentForm(false);
  };

  const onAddCommentSuccess = (comment: IComment) => {
    if (comments) {
      setComments([...comments, comment]);
    } else {
      setComments([comment]);
    }
  };

  const onUpdateSuccess = (newContent: string) => {
    setContent(newContent);
    setUpdatedAt(DateUtils.getLocaleDateString(new Date()));
  };

  return (
    <Card className={className}>
      <Card.Body className="d-flex">
        <VoteSection
          votes={votes}
          className="me-2"
          onVoteSuccess={onVoteSuccess}
          questionId={questionId}
          currVote={currVote}
          enabled={!!userId}
        />
        <div className="w-100">
          <Card.Body>{title}</Card.Body>
          <Card.Text>{content}</Card.Text>
          <div className="d-flex flex-row-reverse justify-content-between align-items-center">
            <CustomCardSubtitle
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
                  content={content}
                  className="me-2"
                />
                <DeleteButtonWithModal
                  questionId={questionId}
                  type="question"
                  onDeleteSuccess={onDeleteSuccess}
                />
              </div>
            ) : null}
          </div>
          <div>
            {comments?.map((comment, i) => (
              <Comment key={i} comment={comment} />
            ))}
          </div>
          {!userId ? null : showCommentForm ? (
            <CommentForm
              questionId={questionId}
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
