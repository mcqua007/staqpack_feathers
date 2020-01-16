const { authenticate } = require('@feathersjs/authentication').hooks;
const getCreatedByUserId = require('../../hooks/get-created-by-user-id');

module.exports = {
  before: {
    all: [ authenticate('jwt'),],
    find: [],
    get: [],
    create: [getCreatedByUserId()],
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
