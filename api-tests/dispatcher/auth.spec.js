import { getToken } from '../../common/auth/get-token.js';
import { DispatcherClient } from '../../common/api-clients/dispatcher-client.js';

// TESTIT-ID: ЗАМЕНИ

describe('Диспетчерская — авторизация [TESTIT-ID]', () => {
  it('логин возвращает токен', async () => {
    const token = await getToken('dispatcher');
    expect(token).toBeTruthy();
  });
});

describe('Диспетчерская — заявки [TESTIT-ID]', () => {
  let client;

  beforeAll(async () => {
    const token = await getToken('dispatcher');
    client = new DispatcherClient(token);
  });

  it('GET /orders — возвращает список заявок', async () => {
    const res = await client.getOrders().expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
