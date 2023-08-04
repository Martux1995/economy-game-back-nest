import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { EnvServiceImp } from '../env.service';
import { envMocks } from './env-service.mock';

describe('EnvServiceImp', () => {
  let envService: EnvServiceImp;
  let configService: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EnvServiceImp, ConfigService],
    }).compile();
    envService = module.get<EnvServiceImp>(EnvServiceImp);
    configService = module.get<ConfigService>(ConfigService);
  });

  beforeEach(() => {
    expect(module).toBeDefined();
  });

  describe.each(Object.keys(envMocks))('#%s', (name) => {
    const { varName, varType, varValue } = envMocks[name];
    it('should return the correct value.', () => {
      const getSpyOn = jest
        .spyOn(configService, 'get')
        .mockReturnValue(varValue);

      const result = envService[name]();

      expect(result).toBeDefined();
      expect(result).toEqual(varValue);
      expect(typeof result).toEqual(varType);
      expect(getSpyOn).toBeCalledWith(varName);
    });

    it('should thrown an error if environment var is not setted.', () => {
      const getSpyOn = jest
        .spyOn(configService, 'get')
        .mockReturnValue(undefined);

      try {
        envService[name]();
      } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toContain(
          `No value setted for environment var '${varName}'.`,
        );
        expect(getSpyOn).toBeCalledWith(varName);
        return;
      }
      throw new Error();
    });
  });
});
