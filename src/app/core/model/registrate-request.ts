export class RegistrateRequest {
  email: string;
  login: string;
  password: string;

  validate() {
    return this.email && this.login && this.password;
  }
}
