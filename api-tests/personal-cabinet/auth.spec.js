import { getSession } from '../../common/auth/get-token.js';
import { LkClient } from '../../common/api-clients/lk-client.js';

// TESTIT-ID: ЗАМЕНИ — ЛК авторизация

describe('ЛК — авторизация [TESTIT-ID]', () => {
  it('логин начальника возвращает токен', async () => {
    const token = await getSession('boss');
    expect(token).toBeTruthy();
  });
});

// describe('ЛК — профиль [TESTIT-ID]', () => {
//   let client;

//   beforeAll(async () => {
//     const token = await getSession('boss');
//     client = new LkClient(token);
//   });

//   it('GET /profile — возвращает данные профиля', async () => {
//     const res = await client.getProfile().expect(200);
//     expect(res.body).toHaveProperty('id');
//   });
// });
