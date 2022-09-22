import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-2">
      {tags.map((tag) => (
        <Col className="ps-0 pt-0 pb-2 pe-2" key={tag.tag}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Link to={'/questions/tagged/' + encodeURIComponent(tag.tag)}>
                  {tag.tag}
                </Link>
              </Card.Title>
              <Card.Text className="line-clamp-5">{tag.description}</Card.Text>
              <Card.Text>{tag.numQuestions + ' questions'}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
