export class AuthRequest {
  username: string;
  password: string;

  validate() {
    return this.username && this.password;
  }
}

export class AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}
