// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new aws.S3();

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const image = context.params.image;

    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'sean-amazon-clone-1',
        acl: 'public-read',
        metadata: (req, file, cb) => {
          cb(null, {
            fieldmame: image
          });
        },
        key: (req, file, cb) => {
          cb(null, Date.now().toString());
        }
      })
    });

    return context;
  };
};
