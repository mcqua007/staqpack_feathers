module.exports = {
  before: {
    all: [async (context) => {
      console.log('Webhook - Context: ', context.data);
      let query = {
        repoId: context.data.repository.id
      };

      let res = await context.app.service('projects').get(null, {
        query
      });
      console.log('Response From Projects', res);
      //   .then(() => {
      //   console.log('Response From Projects', res);
      // });




    }],
    find: [],
    get: [],
    create: [],
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
