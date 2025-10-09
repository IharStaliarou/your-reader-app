export interface IAccessToken {
  userId: string;
  userName: string;
  email: string;
}

export interface IJwtPayload extends IAccessToken {}
