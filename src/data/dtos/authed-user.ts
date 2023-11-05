import { Role } from '@/data/enums/role.ts';

export interface AuthedUser {
  _id: string,
  username: string,
  role: Role
}
