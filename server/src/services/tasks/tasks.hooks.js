const { authenticate } = require('@feathersjs/authentication').hooks;
const { setField } = require('feathers-authentication-hooks');
const restrictToProjectId = require('../../hooks/restrict-to-project-id');

const setCreatedById = setField({
  from: 'params.user._id',
  as: 'data.createdBy'
});

module.exports = {
  before: {
    all: [ authenticate('jwt'),],
    find: [],
    get: [],
    create: [
      setCreatedById 
    ],
    update: [],
    patch: [restrictToProjectId()],
    remove: [restrictToProjectId()]
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
