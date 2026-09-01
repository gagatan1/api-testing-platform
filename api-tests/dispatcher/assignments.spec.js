// import { getToken } from '../../common/auth/get-token.js';
// import { DispatcherClient } from '../../common/api-clients/dispatcher-client.js';

// // TESTIT-ID: ЗАМЕНИ

// describe('Диспетчерская — создание и чтение заявки [TESTIT-ID]', () => {
//   let client;

//   beforeAll(async () => {
//     const token = await getToken('dispatcher');
//     client = new DispatcherClient(token);
//   });

//   let createdId;

//   it('создаёт заявку (201) и возвращает id', async () => {
//     const res = await client
//       .createOrder({
//         address: 'г. Екатеринбург, ул. Ленина, 1',
//         problem: 'лифт не работает',
//       })
//       .expect(201);

//     expect(res.body.id).toBeDefined();
//     createdId = res.body.id;
//   });

//   it('GET /orders/:id — заявка доступна по id', async () => {
//     const res = await client.getOrder(createdId).expect(200);
//     expect(res.body.id).toBe(createdId);
//   });
// });
