// tasks-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tasks = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    open: {type: Boolean, required: true, default: true},
    todos: {type: Schema.Types.ObjectId, ref: 'Todo'},
    tags: { type: [String] },
    severity: {type: Number, enum: [1,2,3]},
    createdBy: {type: String}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('tasks');
  } catch (e) {
    return mongooseClient.model('tasks', tasks);
  }
};
