import { BaseApi } from '@/api/base.api.ts';
import api from '@/api/axios-api.ts';
import Task from '@/data/dtos/task.ts';
import CreateNewTask from '@/data/dtos/create-new-task.ts';

export class TaskApi extends BaseApi {
  static readonly directory = 'task';

  static async getAll(): Promise<Task[]> {
    return api.get(this.directory).then(response => response.data);
  }

  static async getById(id: string): Promise<Task> {
    return api.get(`${this.directory}/${id}`).then(response => response.data);
  }

  static async create(body: CreateNewTask) {
    return api.post(this.directory, body).then(response => response.data);
  }

  static async replace(id: string, body: CreateNewTask) {
    return api.put(`${this.directory}/${id}`, body).then(response => response.data);
  }

  static async delete(id: string) {
    return api.delete(`${this.directory}/${id}`).then(response => response.data);
  }
}
