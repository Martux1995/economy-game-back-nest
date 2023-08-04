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
  msg: 'good login',
  token: 'adasdas',
};

const logoutParams: UserSessionData = {
  sessionKey: 'asdfd',
  firstName: 'jaja',
  lastName: 'huehue',
  userId: 'sadas',
  role: ERoles.Admin,
};

const logoutExpected: AppResponse = {
  ok: true,
  msg: 'good logout',
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
  msg: 'Renewed Token',
  token: 'aasdas',
};

const requestPasswordRecoveryParams: PassTokenRequestDto = {
  email: 'asd@asd.com',
};

const requestPasswordRecoveryExpected: AppResponse = {
  ok: true,
  msg: 'Password change requested.',
};

const changePasswordParams: ChangePasswordDto = {
  key: 'new-key',
  newPassword: 'asdasdasd',
};

const changePasswordExpected: AppResponse = {
  ok: true,
  msg: 'Password Changed',
};

export const AUTH_CONTROLLER_MOCKS = {
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
