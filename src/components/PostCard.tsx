import { useContext, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PostsService from '../service/PostsService';
import { AuthContext } from '../utils/auth-context';
import IPost from '../utils/interfaces/IPost';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteModalWithButton from './DeleteModalWithButton';
import VoteSection from './VoteSection';

interface PostCardProps {
  post: IPost;
  onDelete?: (() => void) | null;
  className?: string;
}

export default function PostCard(props: PostCardProps) {
  const {
    post: {
      id: postId,
      title,
      content,
      votes: initialVotes,
      numPostResponses,
      user: { id: postUserId, username },
      currVote: initialCurrVote,
      createdAt,
      updatedAt,
    },
    onDelete,
    className,
  } = props;
  const { userId, token } = useContext(AuthContext);

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

  return (
    <Card className={className}>
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
          <CustomCardSubtitle
            userId={postUserId}
            createdAt={createdAt}
            updatedAt={updatedAt}
            username={username}
          />
          <Card.Title>
            <div>{title}</div>
          </Card.Title>
          {content ? <Card.Text>{content}</Card.Text> : null}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {numPostResponses +
                ' Response' +
                (numPostResponses === 1 ? '' : 's')}
            </div>
            {onDelete && userId === postUserId ? (
              <div>
                <Link className="me-2" to={`/post/${postId}/edit`}>
                  <Button variant="outline-primary">EDIT</Button>
                </Link>
                <DeleteModalWithButton type="post" onDelete={onDelete} />
              </div>
            ) : null}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
