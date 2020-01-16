// teams-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const teams = new Schema({
    name: { type: String, required: true },
    projects: {type: Schema.Types.ObjectId, ref: 'Projects'},
    createdBy: String
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('teams');
  } catch (e) {
    return mongooseClient.model('teams', teams);
  }
};
