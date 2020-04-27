// todos-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const todos = new Schema({
    name: { type: String, required: true },
    completed: {type: Boolean, default: false},
    taskId: {type: Schema.Types.ObjectId, ref: 'Tasks'},
    projectId: {type: Schema.Types.ObjectId, ref: 'Projects', required: true },
    createdBy: {type: Schema.Types.ObjectId, ref: 'Users'}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('todos');
  } catch (e) {
    return mongooseClient.model('todos', todos);
  }
};
