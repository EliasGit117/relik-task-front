import { BaseApi } from '@/api/base.api.ts';
import api from '@/api/axios-api.ts';

export class AuthApi extends BaseApi {
  static readonly directory = 'auth';

  static async signIn(signInData: { usernameOrEmail: string, password: string }) {
    return api.post(`${this.directory}/sign-in`, signInData)
      .then(response => response.data);
  }

  static async signUp(signInData: {
    username: string,
    email: string,
    password: string
  }) {
    return api.post(`${this.directory}/sign-up`, signInData)
      .then(response => response.data);
  }

  static async testRole() {
    return api.get(`${this.directory}/test`).then(response => response.data);
  }
}
