import IAnswer from './IAnswer';
import IComment from './IComment';
import ITag from './ITag';
import IUser from './IUser';

export default interface IQuestion {
  id: number;
  title: string;
  content: string;
  votes: number;
  numAnswers: number;
  answered: number;
  answers: IAnswer[];
  comments: IComment[];
  user: IUser;
  tags: ITag[];
  currVote: number;
  createdAt: string;
  updatedAt: string;
}
