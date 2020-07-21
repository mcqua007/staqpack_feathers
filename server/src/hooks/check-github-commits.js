// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const {
  Forbidden
} = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    console.log('Webhook - Context: ', context.data.commits);
    let query = {
      repoId: context.data.repository.id,
    };

    let res = await context.app.service('github-repositories').find(null, {
      query
    });
    let projectId = res.projectId;
    let tasks = await context.app.service('tasks').find(null, {
      projectId: projectId
    });

    console.log('Response From GitHubRepos', res);
    console.log('TaskData Res: ', tasks);

    let commits = context.data.commits;
    let feats = [];
    commits.forEach(function (commit, i) {
      console.log('InforEach', commit, i);

      //FINE UP TO HERE
      var searchForFeat = commit.search('@feat:');
      console.log('Search: ', searchForFeat);
      var sliceStrFeat = '';
      if (searchForFeat != -1) {
        console.log('Match! Feat Position:', searchForFeat);
        sliceStrFeat = commit.slice(this.addToString(searchForFeat, 6));
      }

      console.log('Sliced Str: ', sliceStrFeat.trim().toLowerCase());
      feats.push(sliceStrFeat.trim().toLowerCase()); //push onto feats array
    });
    // let userId = res.createdBy;



    return context;
  };
};
