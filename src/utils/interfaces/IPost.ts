import IComment from './IComment';
import IUser from './IUser';

export default interface IPost {
  id: number;
  title: string;
  content: string;
  votes: number;
  numPostResponses: number;
  comments?: IComment[];
  user: IUser;
  currVote?: string;
  createdAt: string;
  updatedAt: string;
}
