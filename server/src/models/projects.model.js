// projects-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const projects = new Schema({
    name: { type: String, required: true },
    description: String,
    open: {type: Boolean, required: true, default: true},
    type: {type: String, enum: ['personal', 'team']},
    teamId:  {type: Schema.Types.ObjectId, ref: 'Teams'},
    //memberIds: [{type: Schema.Types.ObjectId, ref: 'Users', Required: true}],
    createdBy: {type: Schema.Types.ObjectId, ref: 'Users'}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('projects');
  } catch (e) {
    return mongooseClient.model('projects', projects);
  }
};
