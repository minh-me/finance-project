export type Token = {
  token: string;
  expiresAt: number;
};

export type AuthTokens = {
  accessToken: Token;
  refreshToken: Token;
};
