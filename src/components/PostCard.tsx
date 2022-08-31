import { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { AuthContext } from '../utils/auth-context';
import IComment from '../utils/interfaces/IComment';
import IPost from '../utils/interfaces/IPost';
import VoteUtils from '../utils/VoteUtils';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteButtonWithModal from './DeleteButtonWithModal';
import EditButtonWithModal from './EditButtonWithModal';
import VoteSection from './VoteSection';

interface PostCardProps {
  post: IPost;
  onDeleteSuccess: () => void;
  className?: string;
}

export default function PostCard(props: PostCardProps) {
  const {
    post: {
      id: postId,
      title,
      content: initialContent,
      votes: initialVotes,
      comments: initialComments,
      user: { id: postUserId, username },
      currVote: initialCurrVote,
      createdAt,
      updatedAt,
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
  };

  return (
    <Card className={className}>
      <Card.Body className="d-flex">
        <VoteSection
          votes={votes}
          className="me-2"
          onVoteSuccess={onVoteSuccess}
          postId={postId}
          currVote={currVote}
          enabled={!!userId}
        />
        <div className="w-100">
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <div className="d-flex flex-row-reverse justify-content-between align-items-center">
            <CustomCardSubtitle
              userId={postUserId}
              createdAt={createdAt}
              updatedAt={updatedAt}
              username={username}
            />
            {userId === postUserId ? (
              <div>
                <EditButtonWithModal
                  onUpdateSuccess={onUpdateSuccess}
                  postId={postId}
                  content={content}
                  className="me-2"
                />
                <DeleteButtonWithModal
                  postId={postId}
                  type="post"
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
              postId={postId}
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
