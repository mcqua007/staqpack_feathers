const {
  authenticate
} = require('@feathersjs/authentication').hooks;

const {
  setField
} = require('feathers-authentication-hooks');
const restrictToMembers = require('../../hooks/restrict-to-members');


const setCreatedById = setField({
  from: 'params.user._id',
  as: 'data.createdBy'
});



module.exports = {
  before: {
    all: [authenticate('jwt'), restrictToMembers()],
    find: [restrictToMembers()],
    get: [restrictToMembers()],
    create: [
      setCreatedById,
      restrictToMembers()
    ],
    update: [restrictToMembers()],
    patch: [restrictToMembers()],
    remove: [restrictToMembers()]
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
