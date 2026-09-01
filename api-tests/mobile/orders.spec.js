// import { getToken } from '../../common/auth/get-token.js';
// import { MobileClient } from '../../common/api-clients/mobile-client.js';

// // TESTIT-ID: ЗАМЕНИ

// describe('Мобильное — авторизация [TESTIT-ID]', () => {
//   it('логин механика возвращает токен', async () => {
//     const token = await getToken('mechanic');
//     expect(token).toBeTruthy();
//   });
// });

// describe('Мобильное — заявки [TESTIT-ID]', () => {
//   let client;

//   beforeAll(async () => {
//     const token = await getToken('mechanic');
//     client = new MobileClient(token);
//   });

//   it('GET /orders — механик видит список заявок', async () => {
//     const res = await client.getOrders().expect(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });
// });

// describe('Мобильное — принятие и закрытие заявки [TESTIT-ID #23]', () => {
//   let client;

//   beforeAll(async () => {
//     const token = await getToken('mechanic');
//     client = new MobileClient(token);
//   });

//   it('POST /orders/:id/close без кода — ошибка 400', async () => {
//     const list = await client.getOrders().expect(200);
//     const accepted = list.body.find((o) => o.status === 'accepted');

//     if (!accepted) {
//       console.log('Нет принятых заявок — пропускаем');
//       return;
//     }

//     await client.closeOrder(accepted.id, '').expect(400);
//   });

//   it('POST /orders/:id/close с кодом — закрывает заявку', async () => {
//     const list = await client.getOrders().expect(200);
//     const accepted = list.body.find((o) => o.status === 'accepted');

//     if (!accepted) {
//       console.log('Нет принятых заявок — пропускаем');
//       return;
//     }

//     const res = await client
//       .closeOrder(accepted.id, 'NON_FAULT')
//       .expect(200);

//     expect(res.body.status).toBe('done');
//   });
// });
