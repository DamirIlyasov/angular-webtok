export class UserState {
  static readonly default: UserState = Object.seal({
    firstName: null,
    lastName: null
  });

  firstName: string;
  lastName: string;
}
