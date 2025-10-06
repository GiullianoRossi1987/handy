import { expect, test, describe } from 'bun:test';
describe('testing connectivity to the go api', () => {
  test('should get a 200 status code from health', async () => {
    const response = await fetch(`${process.env.HANDY_URL}/health`, { method: 'GET' });
    expect(response.status).toStrictEqual(200);
  });
});
