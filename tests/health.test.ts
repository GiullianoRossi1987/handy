import { Requester } from '@requests/Requester';

describe('testing connectivity to the go api', () => {
  it('should get a 200 status code from health', async () => {
    const requester = new Requester();
    const response = await fetch(`${requester.getUrl()}/health`, { method: 'GET' });
    expect(response.status).toStrictEqual(200);
  });
});
