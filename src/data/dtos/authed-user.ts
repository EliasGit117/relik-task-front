import { Role } from '@/data/enums/role.ts';

export interface AuthedUser {
  id: string,
  username: string,
  role: Role
}
