import { User } from '../model/user';
import { Role } from '../model/role';

export class UserState {
  static readonly default: UserState = Object.seal({
    user: null,
    loading: false,
    error: null,
    errorUpdated: null
  });
  user: User;
  loading: boolean;
  error: string;
  errorUpdated: number;
}
