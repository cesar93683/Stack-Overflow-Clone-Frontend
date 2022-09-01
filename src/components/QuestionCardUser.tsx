import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IQuestion from '../utils/interfaces/IQuestion';

interface QuestionCardUserProps {
  question: IQuestion;
  className?: string;
}

export default function QuestionCardUser(props: QuestionCardUserProps) {
  const {
    question: { id, title, votes, createdAt },
    className,
  } = props;

  const x = new Date(createdAt).toLocaleDateString();

  return (
    <Card className={className}>
      <Card.Body className="w-100">
        <Row>
          <Col xs="2" md="1">
            {votes}
          </Col>
          <Col xs="7" md="9" xxl="10">
            <Link className="text-decoration-none" to={'/questions/' + id}>
              {title}
            </Link>
          </Col>
          <Col className="d-flex justify-content-end" xs="3" md="2" xxl="1">
            {x}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
