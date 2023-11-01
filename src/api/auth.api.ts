import { BaseApi } from '@/api/base.api.ts';
import axios from 'axios';

export class AuthApi extends BaseApi {
  static readonly directory = 'auth';

  static async signIn(signInData: { usernameOrEmail: string, password: string }) {
    return axios.post(`${this.directory}/sign-in`, signInData)
      .then(response => response.data);
  }

  static async signUp() {

  }

}
