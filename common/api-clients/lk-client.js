// common/api-clients/lk-client.js
import request from 'supertest';

const BASE_URL = process.env.BASE_URL;

export class LkClient {
  constructor(session) {
    this.api = request(BASE_URL);
    this.session = session; // { cookies, owner_id, staff_id, api_key }
  }

  getAnalytics(filters = {}) {
    const payload = {
      owner_id: this.session.owner_id,
      staff_id: this.session.staff_id,
      api_key: this.session.api_key,
      filters: {
        bran_id: 0,
        category_filter: { mode: 'include', categories: [] },
        ...filters, // month/year ИЛИ dateFrom/dateTo — что передадите, то и уйдёт
      },
    };

    return this.api
      .post('/api/bff/analytics/snapshot')
      .set('Cookie', this.session.cookies)
      .send(payload);
  }
}