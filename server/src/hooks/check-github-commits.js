// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
// const {
//   Forbidden
// } = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars

module.exports = () => {
  return async context => {
    console.log('Webhook - Context: ', context.data.commits);

    // First See if RepoId matches any of the projects (it should since a hook was fired)
    // Then use projectId to receive that projects tasks

    let res = await context.app.service('github-repositories').find({
      query: {
        repoId: context.data.repository.id,
      }
    });
    let projectId = res.data[0].projectId;
    //console.log('Project Id: ', projectId);
    let tasks = await context.app.service('tasks').find({
      query: {
        projectId: projectId
      }
    });

    //Cycle through commit messages then push ones that have a keyword in them to array
    // Compare tasks titles to messages extracted then, mark those tasks as complete
    // To the same as above with todos

    let commits = context.data.commits;
    let feats = [];

    commits.forEach(function (commit) {

      var searchForFeat = commit.message.toLowerCase().search('@feat:');
      var sliceStrFeat = '';

      if (searchForFeat != -1) {
        console.log('Match! Feat Position:', searchForFeat);
        sliceStrFeat = commit.message.slice(searchForFeat + 6);
        feats.push(sliceStrFeat.trim()); //push onto feats array
      }
    });

    tasks.data.forEach((task) => {
      if (feats.includes(task.name.toLowerCase().trim())) {
        context.app.service('tasks').patch(task._id, {
          completed: true
        }).then(function (res) {
          console.log('Task patch res: ', res);
          context.app.service('tasks').emit('webhook', {
            id: res._id,
            field: 'completed',
            newValue: true,
            data: res
          });
        });
      }
    });

    return context;
  };
};
