import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { TokenServiceImp } from '../token.service';
import { CONFIG_SERVICE_MOCK, tokenServiceMock } from './token-service.mock';

describe('EnvServiceImp', () => {
  let tokenService: TokenServiceImp;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TokenServiceImp,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(CONFIG_SERVICE_MOCK),
          },
        },
        ConfigService,
        JwtService,
      ],
    }).compile();
    tokenService = module.get<TokenServiceImp>(TokenServiceImp);
    jwtService = module.get<JwtService>(JwtService);
  });

  beforeEach(() => {
    expect(module).toBeDefined();
  });

  describe('sign', () => {
    const { payload, tokenExample } = tokenServiceMock;
    it('should return a signed token', () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue(tokenExample);

      const result = tokenService.sign(payload);

      expect(result).toBeDefined();
      expect(result).toEqual(tokenExample);
    });
  });

  describe('verify', () => {
    const { payload, tokenExample } = tokenServiceMock;
    it('should return the token payload if this is valid', () => {
      jest.spyOn(jwtService, 'verify').mockReturnValue(payload);

      const result = tokenService.verify(tokenExample);

      expect(result).toBeDefined();
      expect(result).toEqual(payload);
    });

    it('should return null if the token is valid', () => {
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error();
      });

      const result = tokenService.verify(tokenExample);

      expect(result).toBeNull();
    });
  });
});
