import { Role } from './role';

export interface User {
  email: string;
  login: string;
  role: Role;
}
