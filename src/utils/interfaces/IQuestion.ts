import IAnswer from './IAnswer';
import IComment from './IComment';
import IUser from './IUser';

export default interface IQuestion {
  id: number;
  title: string;
  content: string;
  votes: number;
  numAnswers: number;
  answers: IAnswer[];
  comments: IComment[];
  user: IUser;
  currVote: number;
  createdAt: string;
  updatedAt: string;
}
