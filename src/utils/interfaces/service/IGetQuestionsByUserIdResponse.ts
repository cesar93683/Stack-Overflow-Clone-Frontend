import IQuestions from '../IQuestions';
import IUser from '../IUser';

export default interface IGetQuestionsByUserIdResponse {
  code: number;
  user: IUser;
  questions: IQuestions;
}
