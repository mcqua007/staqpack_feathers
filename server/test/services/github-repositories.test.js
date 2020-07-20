const app = require('../../src/app');

describe('\'Github Repositories\' service', () => {
  it('registered the service', () => {
    const service = app.service('github-repositories');
    expect(service).toBeTruthy();
  });
});
