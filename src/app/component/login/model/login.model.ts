export type AccessType = 'admin' | 'user';

export interface LoginRequest {
  email: string;
  password: string;
  access_type: AccessType;
}

export interface LoginResult {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: LoginResult;
}

