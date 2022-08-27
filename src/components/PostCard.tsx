import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PostsService from '../service/PostsService';
import IPost from '../utils/interfaces/IPost';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteModalWithButton from './DeleteModalWithButton';
import VoteSection from './VoteSection';

interface CustomCardProps {
  post: IPost;
  linkable?: boolean;
  onDelete?: (() => void) | null;
  className?: string;
}

export default function CustomCard(props: CustomCardProps) {
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
    linkable,
    onDelete,
    className,
  } = props;
  // TODO
  const currUserId = 100;

  const [currVote, setCurrVote] = useState(
    initialCurrVote === undefined
      ? 0
      : initialCurrVote === 'UP_VOTE'
      ? 1
      : initialCurrVote === 'NEUTRAL'
      ? 0
      : -1
  );
  const [votes, setVotes] = useState(initialVotes);

  const onDownVote = () => {
    const value = currVote === -1 ? 0 : -1;
    const action = value === 0 ? 'NEUTRAL' : 'DOWN_VOTE';
    PostsService.votePost(String(postId), action).then(
      () => {
        setCurrVote(value);
        let diff = 0;
        if (currVote === 1) {
          if (value === 0) {
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
      },
      () => {
        // TODO
        console.log('error');
      }
    );
  };

  const onUpVote = () => {
    const value = currVote === -1 ? 0 : -1;
    const action = value === 0 ? 'NEUTRAL' : 'DOWN_VOTE';
    PostsService.votePost(String(postId), action).then(
      () => {
        let diff = 0;
        if (currVote === -1) {
          if (value === 0) {
            diff = 1;
          } else {
            diff = 2;
          }
        } else if (currVote === 0) {
          diff = 1;
        } else {
          diff = -1;
        }
        setCurrVote(value + diff);
      },
      () => {
        console.log('error');
      }
    );
  };

  return (
    <Card className={className}>
      <Card.Body className="d-flex">
        <VoteSection
          numVotes={votes}
          className="mr-2"
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
            {linkable ? (
              <Link className="text-body" to={'/posts/' + postId}>
                {title}
              </Link>
            ) : (
              <div>{title}</div>
            )}
          </Card.Title>
          {content ? <Card.Text>{content}</Card.Text> : null}
          <div className="d-flex justify-content-between align-items-center">
            {linkable ? (
              <Link className="text-body" to={'/posts/' + postId}>
                {numPostResponses +
                  ' Response' +
                  (numPostResponses === 1 ? '' : 's')}
              </Link>
            ) : (
              <div>
                {numPostResponses +
                  ' Response' +
                  (numPostResponses === 1 ? '' : 's')}
              </div>
            )}

            {onDelete && currUserId === postUserId ? (
              <div>
                <Link className="mr-2" to={`/post/${postId}/edit`}>
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
