export abstract class EnvService {
  abstract getDatabaseHost(): string;
  abstract getDatabasePort(): number;
  abstract getDatabaseUser(): string;
  abstract getDatabasePassword(): string;
  abstract getDatabaseName(): string;
  abstract getJwtSecret(): string;
}
