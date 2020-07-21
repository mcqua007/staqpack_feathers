// Github Repositories-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;
  const githubRepositories = new Schema({
    name: {
      type: String,
      required: true
    },
    repoId: {
      type: Number,
      required: true
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Projects'
    },
    fullName: {
      type: String,
      required: true
    },
    owner: {
      type: String,
      required: true
    },
    private: {
      type: Boolean,
      required: true
    },
    repoUrl: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String,
      required: true
    },
    commitsUrl: {
      type: String,
      required: true
    },
    hooksUrl: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://github.com/Automattic/mongoose/issues/1251
  try {
    return mongooseClient.model('githubRepositories');
  } catch (e) {
    return mongooseClient.model('githubRepositories', githubRepositories);
  }
};
