import { User} from './auth.model';


export interface AppState {
  sid: string;
  user: User;
}
