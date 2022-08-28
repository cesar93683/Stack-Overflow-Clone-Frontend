import IUser from './IUser';

export default interface IPost {
  id: number;
  title: string;
  content: string;
  votes: number;
  numPostResponses: number;
  comments?: [];
  user: IUser;
  currVote?: string;
  createdAt: string;
  updatedAt: string;
}
