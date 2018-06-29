const config = require('../config');
const AWS = require('aws-sdk');
const fs = require('fs');

class RekognitionBusiness {

  constructor() {
    this.rekognition = new AWS.Rekognition({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region
    });
  }

  async IndexFace(imagePath, imageId) {
    let image = fs.readFileSync('./' + imagePath, 'base64');
    const buffer = new Buffer(image, 'base64');

    return this.rekognition.indexFaces({
        CollectionId: config.collectionId,
        Image: {
          Bytes: buffer
        },
        ExternalImageId: imageId
      }).promise();
  }
}

module.exports = RekognitionBusiness;