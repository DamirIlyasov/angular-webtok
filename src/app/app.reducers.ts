import { UserState } from './core/state/user.state';
import { reducer as userReducer } from './core/state/user.reducer';
import { ActionReducer, combineReducers } from '@ngrx/store';

export interface State {
  user: UserState;
}

const reducers = {
  user: userReducer
};

export const reducer: ActionReducer<State> = combineReducers(reducers);
