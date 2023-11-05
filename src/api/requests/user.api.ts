import { BaseApi } from '@/api/base.api.ts';
import api from '@/api/axios-api.ts';
import { User } from '@/data/dtos/user.ts';

export class UserApi extends BaseApi {
  static readonly directory = 'user';

  static async getAll(): Promise<User[]> {
    return api.get(this.directory).then(response => response.data);
  }
}
