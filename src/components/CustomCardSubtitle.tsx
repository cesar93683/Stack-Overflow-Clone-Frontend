import { Link } from 'react-router-dom';

interface CustomCardSubtitleProps {
  userId: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export default function CustomCardSubtitle(props: CustomCardSubtitleProps) {
  const { userId, username, createdAt, updatedAt } = props;
  return (
    <small className="d-flex">
      <div>
        {'Posted by '}
        <Link className="text-body font-weight-bold" to={'/users/' + userId}>
          {username}
        </Link>
      </div>
      <div className="ml-1">{createdAt}</div>
      {createdAt !== updatedAt ? (
        <div className="ml-1 font-italic">{'edited ' + updatedAt}</div>
      ) : null}
    </small>
  );
}
