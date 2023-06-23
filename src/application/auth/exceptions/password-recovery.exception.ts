export class PassRecoverTokenInvalidException extends Error {
  constructor() {
    super('Invalid token.');
  }
}

export class PassRecoverTokenActiveException extends Error {
  constructor() {
    super(
      'User has an active recover token. Check your mailbox for more details',
    );
  }
}

export class PassRecoverTokenExpireException extends Error {
  constructor() {
    super('This recover token has expired. Try to request it again.');
    this.name = 'PassRecoverTokenExpireException';
  }
}

export class UserNotFoundException extends Error {
  constructor() {
    super('User not found.');
    this.name = 'UserNotFoundException';
  }
}

export class UserDisabledException extends Error {
  constructor() {
    super(
      'The user with this Email are disabled. Contact with an admin for more details.',
    );
  }
}
