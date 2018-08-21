export class RegistrateRequest {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;

  validate() {
    return this.firstName && this.lastName && this.login && this.password;
  }
}
