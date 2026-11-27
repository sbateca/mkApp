export interface SessionUser {
  id: string | number;
  username: string;
  name: string;
  role: string;
  roles?: string[];
}
