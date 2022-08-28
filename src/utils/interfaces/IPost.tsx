export default interface IPost {
  id: number;
  title: string;
  content: string;
  votes: number;
  numPostResponses: number;
  comments?: [];
  user: {
    id: number;
    username: string;
  };
  currVote?: string;
  createdAt: string;
  updatedAt: string;
}
