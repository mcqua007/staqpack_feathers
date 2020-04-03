// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { Forbidden } = require('@feathersjs/errors');
// eslint-disable-next-line no-unused-vars


module.exports = (options = {}) => {
  return async context => {

    if((context.params.query != undefined && context.params.query.projectId)){
      return context; //authorize return of data
    }
    else{
      //don't allow data to be returned
      return Promise.reject(new Error('Un-Authorized'));

    }
  };
};
