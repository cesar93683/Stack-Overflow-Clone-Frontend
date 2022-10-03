import { useEffect, useState } from 'react';
import { Card, Col, Placeholder, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QuestionService from '../service/QuestionService';
import ITag from '../utils/interfaces/ITag';

export default function HomePage() {
  const [tags, setTags] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const rowClassName =
    'row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mt-2';
  const colClassName = 'ps-0 pt-0 pb-2 pe-2';

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
    const loadingCol = (
      <Col className={colClassName}>
        <Card>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={5} md={7} /> <Placeholder xs={3} md={4} />
              <Placeholder xs={2} md={4} /> <Placeholder xs={4} md={6} />
              <Placeholder xs={5} md={8} /> <Placeholder xs={2} md={3} />
              <Placeholder xs={2} md={3} /> <Placeholder xs={6} md={8} />
              <Placeholder xs={3} md={4} /> <Placeholder xs={6} md={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={5} />
            </Placeholder>
          </Card.Body>
        </Card>
      </Col>
    );
    return (
      <Row className={rowClassName}>
        {loadingCol}
        {loadingCol}
        {loadingCol}
        {loadingCol}
      </Row>
    );
  }

  if (errorOccurred) {
    return <div>An error occured</div>;
  }

  return (
    <Row className={rowClassName}>
      {tags.map((tag) => (
        <Col className={colClassName} key={tag.tag}>
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
