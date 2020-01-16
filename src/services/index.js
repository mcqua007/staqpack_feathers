const users = require('./users/users.service.js');
const tasks = require('./tasks/tasks.service.js');
const todo = require('./todo/todo.service.js');
const projects = require('./projects/projects.service.js');
const teams = require('./teams/teams.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(tasks);
  app.configure(todo);
  app.configure(projects);
  app.configure(teams);
};
