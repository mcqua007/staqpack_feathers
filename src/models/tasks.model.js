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
    completed: {type: Boolean, required: true, default: false},
    archived: {type: Boolean, required: true, default: false},
    tags: { type: [String] },
    severity: {type: Number, enum: [1,2,3]},
    order:{type: Number, required: true, default: 0},
    createdBy: {type: Schema.Types.ObjectId, ref: 'Users'},
    projectId: {type: Schema.Types.ObjectId, ref: 'Projects', required: true },
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
