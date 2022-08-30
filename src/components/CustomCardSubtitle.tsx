import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';

interface CustomCardSubtitleProps {
  userId: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export default function CustomCardSubtitle(props: CustomCardSubtitleProps) {
  const { userId, username, createdAt, updatedAt } = props;

  const createdAtLocaleString = DateUtils.getLocaleDateString(createdAt);
  const updatedAtLocaleString = DateUtils.getLocaleDateString(updatedAt);

  return (
    <div className="d-flex">
      <Link className="text-decoration-none" to={'/users/' + userId}>
        {username}
      </Link>
      <div className="ms-1">{'asked ' + createdAtLocaleString}</div>
      {createdAt !== updatedAt ? (
        <div className="ms-1 fst-italic">
          {'edited ' + updatedAtLocaleString}
        </div>
      ) : null}
    </div>
  );
}
