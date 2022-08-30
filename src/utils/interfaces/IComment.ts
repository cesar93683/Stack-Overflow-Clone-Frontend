import IUser from './IUser';

export default interface IComment {
  id: number;
  content: string;
  votes: number;
  user: IUser;
  currVote?: string;
  createdAt: string;
}
