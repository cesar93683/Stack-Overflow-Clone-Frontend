import IComment from './IComment';
import IUser from './IUser';

export default interface IQuestion {
  id: number;
  title: string;
  content: string;
  votes: number;
  numAnswers: number;
  comments?: IComment[];
  user: IUser;
  currVote?: string;
  createdAt: string;
  updatedAt: string;
}
