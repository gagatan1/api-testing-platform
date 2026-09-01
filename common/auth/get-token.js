// common/auth/get-token.js
import request from 'supertest';
import { users } from '../fixtures/test-users.js';

const BASE_URL = process.env.BASE_URL;
const sessionCache = new Map();

export async function getSession(role) {
  if (sessionCache.has(role)) return sessionCache.get(role);

  const user = users[role];
  const res = await request(BASE_URL)
    .post('/api/front-office/authentication/authentication')
    .send({ email: user.login, password: user.password })
    .expect(200);

  const cookies = res.headers['set-cookie'];
  const authData = res.body.data[0];

  const session = {
    cookies,
    owner_id: authData.owner_id,
    staff_id: authData.staff_id,
    api_key: authData.api_key,
  };

  if (!session.owner_id || !session.staff_id || !session.api_key) {
    throw new Error(`Не удалось получить auth-данные для роли ${role}: ${JSON.stringify(res.body)}`);
  }

  sessionCache.set(role, session);
  return session;
}