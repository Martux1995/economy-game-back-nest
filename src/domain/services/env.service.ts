export abstract class EnvService {
  abstract getFrontDomain(): string;

  abstract getDatabaseHost(): string;
  abstract getDatabasePort(): number;
  abstract getDatabaseUser(): string;
  abstract getDatabasePassword(): string;
  abstract getDatabaseName(): string;

  abstract getSMTPServer(): string;
  abstract getSMTPPort(): number;
  abstract getSMTPUserMail(): string;
  abstract getSMTPUserName(): string;
  abstract getSMTPUserPassword(): string;

  abstract getJwtSecret(): string;
}
