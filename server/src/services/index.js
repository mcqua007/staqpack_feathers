const users = require('./users/users.service.js');
const tasks = require('./tasks/tasks.service.js');
const projects = require('./projects/projects.service.js');
const teams = require('./teams/teams.service.js');
const todos = require('./todos/todos.service.js');
const githubRepositories = require('./github-repositories/github-repositories.service.js');
const githubwebhooks = require('./githubwebhooks/githubwebhooks.service.js');
const images = require('./images/images.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(tasks);
  app.configure(projects);
  app.configure(teams);
  app.configure(todos);
  app.configure(githubRepositories);
  app.configure(githubwebhooks);
  app.configure(images);
};
