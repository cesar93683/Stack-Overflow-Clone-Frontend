import IUser from './IUser';

export default interface IComment {
  id: number;
  content: string;
  votes: number;
  user: IUser;
  currVote?: number;
  createdAt: string;
}
