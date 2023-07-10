import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

import { EFileType } from '../../domain/enums';
import { FileSystemService } from '../../domain/services';

@Injectable()
export class FileSystemServiceImp extends FileSystemService {
  getRawFile(filename: string, filetype: EFileType): Buffer {
    return readFileSync(`${__dirname}/../../../../${filetype}/${filename}`);
  }

  getTextFile(filename: string, filetype: EFileType): string {
    return readFileSync(`${__dirname}/../../../../${filetype}/${filename}`, {
      encoding: 'utf-8',
    });
  }
}
