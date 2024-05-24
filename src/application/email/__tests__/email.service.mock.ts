import { SendMailParams } from '../../../infrastructure/mailer/params/sendmail.params';
import { RecoverPassMailParams } from '../params';

export const RECOVER_PASS_PARAMS: RecoverPassMailParams = {
  playerName: 'test user',
  timeToExpire: '1 minute',
  toAddress: 'testuser@test.com',
  token: 'anything',
};

export const RECOVER_PASS_MOCK_RETURN: SendMailParams = {
  content: { html: 'anycontent' },
  subject: 'password-recovery',
  to: RECOVER_PASS_PARAMS.toAddress,
};
