import {Action, State, StateContext} from '@ngxs/store';
import {Roles, UserModel} from '../../models/auth.model';
import {Login} from '../actions/auth.actions';


@State<UserModel>({
  name: 'user',
  defaults: {
    roles: Roles.Unknown
  }
})
export class LoginState {
  @Action(Login)
  login(ctx: StateContext<UserModel>) {
    const  state = ctx.getState();
  }
}
