export class LogInRequest {
  login: string;
  password: string;

  validate() {
    return this.login && this.password;
  }
}
