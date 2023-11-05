import { Role } from '@/data/enums/role.ts';

export class User {
  _id: string;
  username: string;
  email: string;
  role: Role;
}
