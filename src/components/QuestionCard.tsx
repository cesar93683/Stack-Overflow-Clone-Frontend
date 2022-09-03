import IComment from '../utils/interfaces/IComment';
import IQuestion from '../utils/interfaces/IQuestion';
import CustomCard from './CustomCard';

interface QuestionCardProps {
  question: IQuestion;
  setQuestion: React.Dispatch<React.SetStateAction<IQuestion>>;
  onDeleteSuccess: () => void;
}

export default function QuestionCard(props: QuestionCardProps) {
  const { question, onDeleteSuccess, setQuestion } = props;

  const setCurrVote = (currVote: number) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        currVote,
      };
    });
  };
  const setVotes = (votes: number) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        votes,
      };
    });
  };
  const setContent = (content: string) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        content,
      };
    });
  };
  const setComments = (comments: IComment[]) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        comments,
      };
    });
  };
  const setUpdatedAt = (updatedAt: string) => {
    setQuestion((prevState: IQuestion) => {
      return {
        ...prevState,
        updatedAt,
      };
    });
  };

  return (
    <CustomCard
      card={{
        questionId: question.id,
        title: question.title,
        content: question.content,
        votes: question.votes,
        comments: question.comments,
        user: question.user,
        currVote: question.currVote,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      }}
      onDeleteSuccess={onDeleteSuccess}
      setCurrVote={setCurrVote}
      setVotes={setVotes}
      setContent={setContent}
      setComments={setComments}
      setUpdatedAt={setUpdatedAt}
    />
  );
}
