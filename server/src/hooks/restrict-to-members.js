// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { Forbidden } = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars


module.exports = (options = {}) => {
  return async context => {
    
    const { user } = context.params;
    console.log('query: ', context.params.query);
    //console.log('User: ', user.email);


    if ((context.method === 'find' || context.method === 'get') && (context.params.query != undefined && !context.params.query.teamId)){
      // if get or find method, and no teamId query is sent then only show results
      // that where created by current logged in user 
      // context.params.query = {
      //   createdBy: user._id
      // };
      //us ethis instead in order to also pass in other queries not overide them all as the above code did
      context.params.query.createdBy = user._id;

    }else if((context.params.query != undefined && context.params.query.teamId) || (context.data != undefined  && context.data.teamId)){
      
      let teamId = context.data != undefined  && context.data.teamId  ? context.data.teamId : context.params.query.teamId;
      let res = await context.app.service('teams').get(teamId);

      if (res.members.find(element => String(element) === String(user._id))) {
        console.log('Current User is member of team');
        return context; //authorize return of data
      } else {
        console.log('Current user is not in team');
        //don't allow data to be returned
        return Promise.reject(new Error('Un-Authorized'));
      }
    }
    else if((context.method === 'update' || context.method === 'patch' || context.method === 'remove')){
      
      try{
        const proj_data = await context.app.service('projects').get(context.id);
        //console.log('Project Data: ', proj_data);
        if ((String(proj_data.createdBy) === String(user._id))) {
          //console.log('Current User created project for updating or removing');
          return context; //authorize return of data
        } else {
          //console.log('Current user did not create project');
          //don't allow data to be returned
          return Promise.reject(new Error('Un-Authorized'));
        }
      }catch(err){
        console.log('Project Await Error:', err);
      }

    }
  };
};
