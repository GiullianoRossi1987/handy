import { Requester } from '@requests/Requester';
describe('Should make the basic requester functions work', () => {
  it('parent inheritance', () => {
    const baseUrl = 'testing';
    const parent = new Requester({ url: baseUrl });
    expect(parent.getUrl()).toStrictEqual(baseUrl);
    const child = new Requester({ parent });
    expect(child.getUrl()).toStrictEqual(baseUrl);
  });
});
