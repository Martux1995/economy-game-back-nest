export class LoginNotFoundException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
