import 'dotenv/config';

/** Тестовые учётки из .env — заполни реальные перед запуском. */
export const users = {
  dispatcher: {
    login: process.env.DISPATCHER_LOGIN || 'dispatcher@test.com',
    password: process.env.DISPATCHER_PASSWORD || '***',
  },
  mechanic: {
    login: process.env.MECHANIC_LOGIN || 'mechanic@test.com',
    password: process.env.MECHANIC_PASSWORD || '***',
  },
  boss: {
    login: process.env.BOSS_LOGIN ,
    password: process.env.BOSS_PASSWORD ,
  },
};
