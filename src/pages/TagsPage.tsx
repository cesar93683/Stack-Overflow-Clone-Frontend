import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionService from '../service/QuestionService';
import ITag from '../utils/interfaces/ITag';

export default function HomePage() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    QuestionService.getTags().then(
      (data) => {
        setTags(data);
        setLoading(false);
      },
      () => {
        setLoading(false);
        setErrorOccurred(true);
      }
    );
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (errorOccurred) {
    return <div>An error occured</div>;
  }

  return (
    <div>
      {tags.map((tag) => (
        <div>{tag.tag}</div>
      ))}
    </div>
  );
}
