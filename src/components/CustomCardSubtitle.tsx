import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';

interface CustomCardSubtitleProps {
  userId: number;
  username: string;
  reputation: number;
  action: string;
  createdAt: string;
  updatedAt?: string;
}

export default function CustomCardSubtitle(props: CustomCardSubtitleProps) {
  const { userId, username, reputation, action, createdAt, updatedAt } = props;

  const createdAtLocaleString =
    DateUtils.getLocaleDateStringFromString(createdAt);

  let updatedAtLocaleString;
  if (updatedAt) {
    updatedAtLocaleString = DateUtils.getLocaleDateStringFromString(updatedAt);
  }

  const showUpdatedAt = updatedAt && createdAt !== updatedAt;

  return (
    <div
      className={'d-flex' + (showUpdatedAt ? ' flex-column flex-md-row' : '')}
    >
      <div className="d-flex">
        <Link className="text-decoration-none" to={'/users/' + userId}>
          {username}
        </Link>
        <div className="ms-1 fw-bold">{reputation}</div>
      </div>
      <div className={showUpdatedAt ? 'ms-0 ms-md-1' : 'ms-1'}>
        {action + ' ' + createdAtLocaleString}
      </div>
      {showUpdatedAt ? (
        <div className="ms-0 ms-md-1 fst-italic">
          {'edited ' + updatedAtLocaleString}
        </div>
      ) : null}
    </div>
  );
}
