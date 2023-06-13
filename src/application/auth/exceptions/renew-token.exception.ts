export class SessionNotFoundException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
