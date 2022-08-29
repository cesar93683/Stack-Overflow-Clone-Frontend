import { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import IPost from '../utils/interfaces/IPost';
import CommentForm from './CommentForm';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteModal from './DeleteModal';
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
      user: { id: postUserId, username },
      currVote: initialCurrVote,
      createdAt,
      updatedAt,
    },
  } = props;
  const { userId, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currVote, setCurrVote] = useState(
    !initialCurrVote
      ? 0
      : initialCurrVote === 'UP_VOTE'
      ? 1
      : initialCurrVote === 'NEUTRAL'
      ? 0
      : -1
  );
  const [votes, setVotes] = useState(initialVotes);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

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
          let diff = 0;
          if (currVote === 1) {
            if (newVote === 0) {
              diff = -1;
            } else {
              diff = -2;
            }
          } else if (currVote === 0) {
            diff = -1;
          } else {
            diff = 1;
          }
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
          let diff = 0;
          if (currVote === -1) {
            if (newVote === 0) {
              diff = 1;
            } else {
              diff = 2;
            }
          } else if (currVote === 0) {
            diff = 1;
          } else {
            diff = -1;
          }
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

  const onCommentSubmit = () => {
    // TODO
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
          enabled={true}
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
                <DeleteModal
                  type="post"
                  onDelete={onDelete}
                  loading={deleteLoading}
                />
              </div>
            ) : null}
          </div>
          {showCommentForm ? (
            <CommentForm
              className="mt-2"
              onSubmit={onCommentSubmit}
              onCancelClick={onCancelCommentSubmit}
            />
          ) : null}
          <a
            className="text-decoration-underline"
            role="button"
            onClick={onAddComment}
          >
            Add a comment
          </a>
        </div>
      </Card.Body>
    </Card>
  );
}
