import { EFileType } from '../enums';

export abstract class FileSystemService {
  abstract getRawFile(filename: string, filetype: EFileType): Buffer;
  abstract getTextFile(filename: string, filetype: EFileType): string;
}
