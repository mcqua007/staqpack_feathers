const { authenticate } = require('@feathersjs/authentication').hooks;

const processTask = require('../../hooks/process-task');

module.exports = {
  before: {
    all: [ authenticate('jwt'),],
    find: [],
    get: [],
    create: [processTask()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
