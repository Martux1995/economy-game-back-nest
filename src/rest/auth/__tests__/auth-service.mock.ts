import { ERoles } from '../../../domain/enums';
import { UserSessionData } from '../../../domain/types';
import { AppResponse } from '../../common/types';
import { ChangePasswordDto, LoginDto, PassTokenRequestDto } from '../dtos';
import { LoginPresenter } from '../presenters/login.presenter';

const loginParams: LoginDto = {
  email: 'asdasdas',
  password: 'asdasdassdsad',
};

const loginExpected: AppResponse<LoginPresenter> = {
  ok: true,
  msg: 'Login successful',
  token: 'adasdas',
};

const logoutParams = 'asdfd';

const logoutExpected: AppResponse = {
  ok: true,
  msg: 'Logged Off',
};

const checkTokenExpected: AppResponse = {
  ok: true,
  msg: 'Valid Token',
};

const renewTokenParams: UserSessionData = {
  sessionKey: 'asdfd',
  firstName: 'jaja',
  lastName: 'huehue',
  userId: 'sadas',
  role: ERoles.Admin,
};

const renewTokenExpected: AppResponse<{ token: string }> = {
  ok: true,
  msg: 'Token renewed',
  token: 'aasdas',
};

const requestPasswordRecoveryParams: PassTokenRequestDto = {
  email: 'asd@asd.com',
};

const requestPasswordRecoveryExpected: AppResponse = {
  ok: true,
  msg: 'Password change requested successfully. Check your email.',
};

const changePasswordParams: ChangePasswordDto = {
  key: 'new-key',
  newPassword: 'asdasdasd',
};

const changePasswordExpected: AppResponse = {
  ok: true,
  msg: 'Password changed successfully. Please LogIn again.',
};

export const AUTH_SERVICE_MOCKS = {
  login: {
    params: loginParams,
    expected: loginExpected,
  },
  logout: {
    params: logoutParams,
    expected: logoutExpected,
  },
  checkToken: {
    expected: checkTokenExpected,
  },
  renewToken: {
    params: renewTokenParams,
    expected: renewTokenExpected,
  },
  requestPasswordRecovery: {
    params: requestPasswordRecoveryParams,
    expected: requestPasswordRecoveryExpected,
  },
  changePassword: {
    params: changePasswordParams,
    expected: changePasswordExpected,
  },
};
