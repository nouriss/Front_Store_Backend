export interface UserType {
  firstname: string;
  lastname: string;
  password: string;
}
export interface UserReturnType {
  id: number;
  firstname: string;
  lastname: string;
  password_digest: string;
}

export interface UserAuthType {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
}

export interface AuthReturnType {
  auth: boolean;
  token: string;
}
