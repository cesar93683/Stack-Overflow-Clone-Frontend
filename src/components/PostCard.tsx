import { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import IComment from '../utils/interfaces/IComment';
import IPost from '../utils/interfaces/IPost';
import VoteUtils from '../utils/VoteUtils';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteButtonWithModal from './DeleteButtonWithModal';
import VoteSection from './VoteSection';

interface PostCardProps {
  post: IPost;
}

export default function PostCard(props: PostCardProps) {
  const {
    post: {
      id: postId,
      title,
      content,
      votes: initialVotes,
      comments: initialComments,
      user: { id: postUserId, username },
      currVote: initialCurrVote,
      createdAt,
      updatedAt,
    },
  } = props;
  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currVote, setCurrVote] = useState(
    VoteUtils.getCurrVoteNum(initialCurrVote)
  );
  const [votes, setVotes] = useState(initialVotes);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comments, setComments] = useState(initialComments);

  const onDelete = () => {
    setDeleteLoading(true);
    PostsService.deletePost(postId, token).then(
      (data) => {
        setDeleteLoading(false);
        if (data?.code === 0) {
          navigate('/');
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

  const onCommentSubmit = (comment: IComment) => {
    if (comments) {
      setComments([...comments, comment]);
    } else {
      setComments([comment]);
    }
  };

  return (
    <Card>
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
                <Link className="me-2" to={`/posts/edit/${postId}`}>
                  <Button variant="outline-primary" size="sm">
                    EDIT
                  </Button>
                </Link>
                <DeleteButtonWithModal
                  type="post"
                  onDelete={onDelete}
                  loading={deleteLoading}
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
              onSubmit={onCommentSubmit}
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
