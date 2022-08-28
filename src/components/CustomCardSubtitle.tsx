import { Link } from 'react-router-dom';

interface CustomCardSubtitleProps {
  userId: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export default function CustomCardSubtitle(props: CustomCardSubtitleProps) {
  const { userId, username, createdAt, updatedAt } = props;

  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const createdAtLocaleString = new Date(createdAt).toLocaleDateString(
    [],
    timeFormat
  );
  const updatedAtLocaleString = new Date(updatedAt).toLocaleDateString(
    [],
    timeFormat
  );

  return (
    <div className="d-flex">
      <Link className="text-body font-weight-bold" to={'/users/' + userId}>
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
