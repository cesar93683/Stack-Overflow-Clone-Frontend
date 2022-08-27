export default interface IPost {
  id: number;
  title: string;
  content: string;
  votes: number;
  user: {
    id: number;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
  __typename?: string;
}
