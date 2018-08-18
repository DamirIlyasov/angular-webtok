export class AuthRequest {
  login: string;
  password: string;

  validate() {
    return this.login && this.password;
  }
}
