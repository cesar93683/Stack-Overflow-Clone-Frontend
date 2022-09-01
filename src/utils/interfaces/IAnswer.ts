import IComment from './IComment';
import IUser from './IUser';

export default interface IAnswer {
  id: number;
  content: string;
  votes: number;
  comments?: IComment[];
  user: IUser;
  currVote?: string;
  createdAt: string;
  updatedAt: string;
}
