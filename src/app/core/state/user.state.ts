import { User } from '../model/user';

export class UserState {
  static readonly default: UserState = Object.seal({
    user: {
      firstName: null,
      lastName: null
    },
    loading: false,
    error: null,
    errorUpdated: null
  });
  user: User;
  loading: boolean;
  error: string;
  errorUpdated: number;
}
