import IComment from './IComment';
import IUser from './IUser';

export default interface IAnswer {
  id: number;
  content: string;
  votes: number;
  accepted: number;
  comments: IComment[];
  user: IUser;
  currVote: number;
  questionId: number;
  createdAt: string;
  updatedAt: string;
}
