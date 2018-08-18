import { UserState } from './user.state';
import { Actions } from './user.actions';

export function reducer(state: UserState = UserState.default, action: Actions) {
  switch (action.type) {
    default:
      return state;
  }
}
