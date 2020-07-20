const app = require('../../src/app');

describe('\'githubwebhooks\' service', () => {
  it('registered the service', () => {
    const service = app.service('githubwebhooks');
    expect(service).toBeTruthy();
  });
});
