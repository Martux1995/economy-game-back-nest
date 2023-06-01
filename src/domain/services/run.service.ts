export abstract class RUNService {
  abstract validate(run: string): boolean;
  abstract format(run: string, dots?: boolean): string;
  abstract clean(run: string): string;
}
