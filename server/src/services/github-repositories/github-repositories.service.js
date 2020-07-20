// Initializes the `Github Repositories` service on path `/github-repositories`
const { GithubRepositories } = require('./github-repositories.class');
const createModel = require('../../models/github-repositories.model');
const hooks = require('./github-repositories.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/github-repositories', new GithubRepositories(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('github-repositories');

  service.hooks(hooks);
};
