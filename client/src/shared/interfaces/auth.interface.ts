export interface IAuthResponse {
  accessToken: string;
}

export interface IVerifyResponse {
  message: string;
  email: string;
}

export interface IAccessTokenPayload {
  userId: string;
  userName: string;
  email: string;
}

export interface ISignUpResponse {
  user: { email: string; userName: string };
  token: string;
}
