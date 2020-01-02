// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
        // Get authenticated user
    const user = context.params.user;
    console.log("User: ", user);
    console.log("context: ", context);
    //Extract Submitted Data
    const { data } = context;
 
    // Add new Fields
    context.data = {
      ...data, // Preserve submitted data
      createdBy: user._id,
      // createdOn: new Date()
    };

    return context;
  };
};
