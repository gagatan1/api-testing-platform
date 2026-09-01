import request from 'supertest';
import { authHeader } from '../auth/get-token.js';

const BASE_URL = process.env.BASE_URL || 'https://crm.example.com';

/**
 * API-клиент для модуля «Мобильное приложение».
 */
export class MobileClient {
  constructor(token) {
    this.api = request(BASE_URL);
    this.headers = authHeader(token);
  }

  // async getOrders() {
  //   return this.api
  //     .get('/api/mobile/orders')
  //     .set(this.headers);
  // }

  // async acceptOrder(id) {
  //   return this.api
  //     .post(`/api/mobile/orders/${id}/accept`)
  //     .set(this.headers);
  // }

  // async closeOrder(id, code) {
  //   return this.api
  //     .post(`/api/mobile/orders/${id}/close`)
  //     .set(this.headers)
  //     .send({ code });
  // }
}
