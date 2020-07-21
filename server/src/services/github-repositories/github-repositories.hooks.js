const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const {
  setField
} = require('feathers-authentication-hooks');

const setCreatedById = setField({
  from: 'params.user._id',
  as: 'data.createdBy'
});

module.exports = {
  before: {
    all: [async (context) => {
      console.log('GithubRepos Context: ', context);
    }],
    find: [],
    get: [],
    create: [setCreatedById],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [async (context) => {
      console.log('After GithubRepos Context: ', context);
    }],
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
