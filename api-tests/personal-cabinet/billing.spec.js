import { getSession } from '../../common/auth/get-token.js';
import { LkClient } from '../../common/api-clients/lk-client.js';

// TESTIT-ID: ЗАМЕНИ — Аналитика ЛК (#64)
describe('Аналитика ЛК — виджеты, дефолтный период [TESTIT-ID #64]', () => {
  let client;
  let res;
  let data;

  beforeAll(async () => {
    const token = await getSession('boss');
    client = new LkClient(token);

    res = await client
      .getAnalytics({
        bran_id: 0,
        month: 8,
        year: 2026,
        category_filter: null,
        org_filter: null,
        periodMode: 'month',
      })
      .expect(200);

    data = res.body.widgets.tableTasks.data;
  });

  it('все виджеты в статусе ready', () => {
    const widgets = res.body.widgets;
    Object.keys(widgets).forEach((key) => {
      expect(widgets[key].status).toBe('ready');
    });
  });

  it('tableTasks: total и inWork — числа >= 0, inWork <= total', () => {
    expect(data.total).toBeGreaterThanOrEqual(0);
    expect(data.inWork).toBeGreaterThanOrEqual(0);
    expect(data.inWork).toBeLessThanOrEqual(data.total);
  });

  it('evac: over30m не превышает total', () => {
    expect(data.evac.over30m).toBeLessThanOrEqual(data.evac.total);
  });

  it('tableTasksDowntime.over24h: сумма byBranch не превышает count', () => {
    const { over24h } = res.body.widgets.tableTasksDowntime.data;
    const sum = over24h.byBranch.reduce((acc, b) => acc + b.count, 0);
    expect(sum).toBeLessThanOrEqual(over24h.count);
  });

  it('elevators: сумма byStatus равна total', () => {
    const { total, byStatus } = res.body.widgets.elevators.data;
    const sum = Object.values(byStatus).reduce((a, b) => a + b, 0);
    expect(sum).toBe(total);
  });

  it('tableStaff: сумма byGroup равна total', () => {
    const { total, byGroup } = res.body.widgets.tableStaff.data;
    const sum = byGroup.reduce((acc, g) => acc + g.count, 0);
    expect(sum).toBe(total);
  });

  it('tableTasks.sources: сумма internal+external соответствует total', () => {
    const { sources } = data;
    const sum =
      sources.internal.reduce((acc, s) => acc + s.count, 0) +
      sources.external.reduce((acc, s) => acc + s.count, 0);

    expect(sum).toBe(sources.total);
  });

  it('avgResponseMinutes — валидное неотрицательное число', () => {
    expect(data.avgResponseMinutes).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(data.avgResponseMinutes)).toBe(true);
  });

  it('avgExecutionMinutes — валидное неотрицательное число', () => {
    expect(data.avgExecutionMinutes).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(data.avgExecutionMinutes)).toBe(true);
  });

  it('размер выборки для среднего не превышает общее количество заявок', () => {
    expect(data.avgSampleSize.response).toBeLessThanOrEqual(data.total);
    expect(data.avgSampleSize.execution).toBeLessThanOrEqual(data.total);
  });

  it('repairOver2h не превышает total', () => {
    expect(data.repairOver2h).toBeGreaterThanOrEqual(0);
    expect(data.repairOver2h).toBeLessThanOrEqual(data.total);
  });
});

describe('Аналитика ЛК — переключение периода', () => {
  let client;

  beforeAll(async () => {
    const session = await getSession('boss');
    client = new LkClient(session);
  });


  it('декабрь корректно переходит на новый год', async () => {
    const res = await client
      .getAnalytics({ periodMode: 'month', month: 12, year: 2026 })
      .expect(200);

    expect(res.body.filters.periodStart).toBe('2026-12-01 00:00:00');
    expect(res.body.filters.periodEnd).toBe('2027-01-01 00:00:00');
  });
  it('periodMode=year — границы на весь год, tasksByMonths на 12 месяцев', async () => {
    const res = await client
      .getAnalytics({ periodMode: 'year', year: 2026 })
      .expect(200);

    expect(res.body.filters.periodMode).toBe('year');
    expect(res.body.filters.periodStart).toBe('2026-01-01 00:00:00');
    expect(res.body.filters.periodEnd).toBe('2027-01-01 00:00:00');
    expect(res.body.widgets.tasksByMonths.data.totals).toHaveLength(12);
  });

  it('dateFrom/dateTo — кастомный период', async () => {
    const res = await client
      .getAnalytics({ periodMode: 'custom', dateFrom: '2026-07-01', dateTo: '2026-08-19' })
      .expect(200);

    expect(res.body.filters.periodMode).toBe('custom');
    expect(res.body.filters.dateFrom).toBe('2026-07-01');
    expect(res.body.filters.dateTo).toBe('2026-08-19');
    expect(res.body.filters.periodStart).toBe('2026-07-01 00:00:00');
    expect(res.body.filters.periodEnd).toBe('2026-08-20 00:00:00'); // dateTo + 1 день, эксклюзивная граница
  });
});