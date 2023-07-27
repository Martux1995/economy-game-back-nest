import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';

import { EFileType } from '../../domain/enums';
import { FileSystemService } from '../../domain/services';

@Injectable()
export class FileSystemServiceImp extends FileSystemService {
  getRawFile(filename: string, filetype: EFileType): Buffer {
    const route = join(process.cwd(), `./${filetype}/${filename}`);
    return existsSync(route) ? readFileSync(route) : null;
  }

  getTextFile(filename: string, filetype: EFileType): string {
    const route = join(process.cwd(), `./${filetype}/${filename}`);
    return existsSync(route)
      ? readFileSync(route, { encoding: 'utf-8' })
      : null;
  }
}
