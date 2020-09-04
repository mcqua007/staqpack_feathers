// images-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const images = new Schema({
    path: { type: String, required: true },
    archived: Boolean,
    type: String,
    taskId: {type: Schema.Types.ObjectId, ref: 'Tasks' },
    projectId: {type: Schema.Types.ObjectId, ref: 'Projects' },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('images');
  } catch (e) {
    return mongooseClient.model('images', images);
  }
};
