// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const {
  Forbidden
} = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    console.log('Webhook - Context: ', context.data);
    let query = {
      repoId: context.data.repository.id,
    };

    let res = await context.app.service('github-repositories').find(null, {
      query
    });
    console.log('Response From GitHubRepos', res);
    //   .then(() => {
    //   console.log('Response From Projects', res);
    // });

    return context;
  };
};
