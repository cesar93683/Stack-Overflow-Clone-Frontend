import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/auth-context';
import IPost from '../utils/interfaces/IPost';
import CustomCardSubtitle from './CustomCardSubtitle';
import DeleteModalWithButton from './DeleteModalWithButton';

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
  const { userId } = useContext(AuthContext);

  return (
    <Card className={className}>
      <Card.Body className="d-flex">
        <div className="w-100">
          <CustomCardSubtitle
            userId={postUserId}
            createdAt={createdAt}
            updatedAt={updatedAt}
            username={username}
          />
          <Card.Title>
            <Link className="text-body" to={'/posts/' + postId}>
              {title}
            </Link>
          </Card.Title>
          {content ? <Card.Text>{content}</Card.Text> : null}
          <div className="d-flex justify-content-between align-items-center">
            <Link className="text-body" to={'/posts/' + postId}>
              {numPostResponses +
                ' Response' +
                (numPostResponses === 1 ? '' : 's')}
            </Link>
            {onDelete && userId === postUserId ? (
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
