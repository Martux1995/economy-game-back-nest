export abstract class EncryptService {
  abstract hash(text: string): string;
  abstract compare(text: string, hash: string): boolean;
}
