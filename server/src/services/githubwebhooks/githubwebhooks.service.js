// Initializes the `githubwebhooks` service on path `/githubwebhooks`
const {
  Githubwebhooks
} = require('./githubwebhooks.class');
const createModel = require('../../models/githubwebhooks.model');
const hooks = require('./githubwebhooks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/webhooks/github', new Githubwebhooks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('/webhooks/github');

  service.hooks(hooks);
};
