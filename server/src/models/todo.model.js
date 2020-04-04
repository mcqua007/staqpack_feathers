// todo-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const todo = new Schema({
    name: { type: String, required: true },
    completed: {type: Boolean, default: false},
    taskId: {type: Schema.Types.ObjectId, ref: 'tasks'},
    createdBy: {type: Schema.Types.ObjectId, ref: 'Users'}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('todo');
  } catch (e) {
    return mongooseClient.model('todo', todo);
  }
};
