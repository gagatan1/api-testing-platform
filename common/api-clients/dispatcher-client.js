import request from 'supertest';
import { authHeader } from '../auth/get-token.js';

const BASE_URL = process.env.BASE_URL || 'https://crm.example.com';

/**
 * API-клиент для модуля «Диспетчерская».
 */
export class DispatcherClient {
  constructor(token) {
    this.api = request(BASE_URL);
    this.headers = authHeader(token);
  }

  async getTasksList(filters) {
    const req = this.api.get('/api/tasks') // уточните реальный путь
      .set(this.headers);
    if (filters) req.query(filters);
    return req;
  }

  async getOrder(id) {
    return this.api
      .get(`/api/dispatcher/orders/${id}`)
      .set(this.headers);
  }

  async getAppeals() {
    return this.api
      .get('/api/dispatcher/appeals')
      .set(this.headers);
  }
}
