export default interface IPost {
  id: number;
  title: string;
  content: string;
  votes: number;
  user: {
    id: number;
    username: string;
  };
  createdAt: number;
  updatedAt: number;
  __typename?: string;
}
