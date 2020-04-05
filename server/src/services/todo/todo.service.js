// Initializes the `todo` service on path `/todo`
const { Todo } = require('./todo.class');
const createModel = require('../../models/todo.model');
const hooks = require('./todo.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: [ 'remove', 'patch' ] //added patch, and remove to multiple edits at once, patch incase instead of remove mark as deleted
  };

  // Initialize our service with any options it requires
  app.use('/todo', new Todo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('todo');

  service.hooks(hooks);
};
