import { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
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
  const [commentSubmitLoading, setCommentSubmitLoading] = useState(false);
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

  const onDownVote = () => {
    const newVote = currVote === -1 ? 0 : -1;
    const action = newVote === 0 ? 'NEUTRAL' : 'DOWN_VOTE';
    PostsService.votePost(String(postId), action, token).then(
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
    PostsService.votePost(String(postId), action, token).then(
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

  const onAddComment = () => {
    setShowCommentForm(true);
  };

  const onCancelCommentSubmit = () => {
    setShowCommentForm(false);
  };

  const onCommentSubmit = (content: string) => {
    setCommentSubmitLoading(true);
    PostsService.createComment(content, postId, token).then(
      (data) => {
        setCommentSubmitLoading(false);
        if (data) {
          setShowCommentForm(false);
          if (comments) {
            setComments([...comments, data]);
          } else {
            setComments([data]);
          }
        } else {
          // TODO
          console.log('error');
        }
      },
      () => {
        setCommentSubmitLoading(false);
        // TODO
        console.log('error');
      }
    );
  };

  return (
    <Card>
      <Card.Body className="d-flex">
        <VoteSection
          numVotes={votes}
          className="me-2"
          onUpVote={onUpVote}
          onDownVote={onDownVote}
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
                  <Button variant="outline-primary">EDIT</Button>
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
              <Comment className="mt-1" key={i} comment={comment} />
            ))}
          </div>
          {!userId ? null : showCommentForm ? (
            <CommentForm
              className="mt-2"
              loading={commentSubmitLoading}
              onSubmit={onCommentSubmit}
              onCancelClick={onCancelCommentSubmit}
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
