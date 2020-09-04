// Initializes the `uploads` service on path `/uploads`
//Need to add multipart support using multer and a way for more security
//so no one can upload executables
const {
  Uploads
} = require('./uploads.class');
const createModel = require('../../models/uploads.model');
const hooks = require('./uploads.hooks');

// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');


// File storage location. Folder must be created before upload.
// Example: './uploads' will be located under feathers app top level.
const blobStorage = fs('./public/uploads');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };
  // Initialize our service with any options it requires
  app.use('/uploads', blobService({
    Model: blobStorage
  }));

  // console.log('Blogstorage: ', blobStorage);
  // Initialize our service with any options it requires
  app.use('/uploads', new Uploads(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
