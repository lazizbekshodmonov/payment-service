export interface JwtPayload {
  sub: number;
  name: string;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}
