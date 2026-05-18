export type AccessType = 'admin' | 'user';

export interface LoginRequest {
  email: string;
  password: string;
  access_type: AccessType;
}
export interface UserDetails{

  id:number;
  name: string;
  email:string;
}

export interface LoginResult {
   accessToken: string;
  refreshToken: string;
  userDetails: UserDetails;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: LoginResult;
}