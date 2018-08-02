export interface User {
  sid: string;
  phoneNumber: string;
  type: string;
  key: string;
  role: string;
  name: string;
  token: string;
  loading?: boolean;
  error?: string;
}

export interface Store {
  sid: string;
  loading?: boolean;
  error?: string;
}
