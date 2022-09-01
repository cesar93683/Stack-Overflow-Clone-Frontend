import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';

interface CustomCardSubtitleProps {
  userId: number;
  username: string;
  action: string;
  createdAt: string;
  updatedAt?: string;
}

export default function CustomCardSubtitle(props: CustomCardSubtitleProps) {
  const { userId, username, action, createdAt, updatedAt } = props;

  const createdAtLocaleString =
    DateUtils.getLocaleDateStringFromString(createdAt);

  let updatedAtLocaleString;
  if (updatedAt) {
    updatedAtLocaleString = DateUtils.getLocaleDateStringFromString(updatedAt);
  }

  return (
    <div className="d-flex">
      <Link className="text-decoration-none" to={'/users/' + userId}>
        {username}
      </Link>
      <div className="ms-1">{action + ' ' + createdAtLocaleString}</div>
      {updatedAt && createdAt !== updatedAt ? (
        <div className="ms-1 fst-italic">
          {'edited ' + updatedAtLocaleString}
        </div>
      ) : null}
    </div>
  );
}
