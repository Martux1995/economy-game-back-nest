import { Test } from '@nestjs/testing';
import { FileSystemServiceImp } from '../file-system.service';

import * as fs from 'fs';
import { EFileType } from '../../../domain/enums';
import { join } from 'path';

describe('FileSystemServiceImp', () => {
  let fileSystemService: FileSystemServiceImp;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [FileSystemServiceImp],
    }).compile();
    fileSystemService = module.get<FileSystemServiceImp>(FileSystemServiceImp);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('getRawFile', () => {
    it('should get a file', () => {
      const existsSpyOn = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation(() => Buffer.alloc(100));

      const result = fileSystemService.getRawFile(
        'name',
        EFileType.EmailTemplate,
      );

      expect(result).toBeDefined();
      expect(result).toStrictEqual<Buffer>(Buffer.alloc(100));
      expect(existsSpyOn).toBeCalledWith(
        join(process.cwd(), `./${EFileType.EmailTemplate}/name`),
      );
    });

    it('should return null if path is invalid', () => {
      const existsSpyOn = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      const result = fileSystemService.getRawFile(
        'name',
        EFileType.EmailTemplate,
      );

      expect(result).toBeNull();
      expect(existsSpyOn).toBeCalledWith(
        join(process.cwd(), `./${EFileType.EmailTemplate}/name`),
      );
    });
  });

  describe('getTextFile', () => {
    it('should get a file', () => {
      const existsSpyOn = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation(() => Buffer.alloc(100));

      const result = fileSystemService.getTextFile(
        'name',
        EFileType.EmailTemplate,
      );

      expect(result).toBeDefined();
      expect(result).toStrictEqual<Buffer>(Buffer.alloc(100));
      expect(existsSpyOn).toBeCalledWith(
        join(process.cwd(), `./${EFileType.EmailTemplate}/name`),
      );
    });

    it('should return null if path is invalid', () => {
      const existsSpyOn = jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      const result = fileSystemService.getTextFile(
        'name',
        EFileType.EmailTemplate,
      );

      expect(result).toBeNull();
      expect(existsSpyOn).toBeCalledWith(
        join(process.cwd(), `./${EFileType.EmailTemplate}/name`),
      );
    });
  });
});
