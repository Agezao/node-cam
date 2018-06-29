const config = require('../config');
const NodeWebcam = require("node-webcam");

class CameraBusiness {
  
  constructor() {
    this.opts = {
      //Picture related
      width: 1600,
      height: 900,
      quality: 100,
  
      //Delay to take shot
      delay: 0,
  
      //Save shots in memory      
      saveShots: true,

      // [jpeg, png] support varies
      // Webcam.OutputTypes
      output: "png",
  
      //Which camera to use
      //Use Webcam.list() for results
      //false for default device
      device: false,
      // [location, buffer, base64]
      // Webcam.CallbackReturnTypes
      callbackReturn: "location",   
      //callbackReturn: "base64",
      //callbackReturn: "buffer",
      verbose: true
    };
      
    this.webcam = NodeWebcam.create(this.opts);
  }

  async snap() {
    return new Promise((resolve, reject) => {
      this.webcam.capture("test_picture", function(err, data) {
        if (err)
          reject(err)
        else {
          resolve(data)
        }
      });
    });
  }
}

module.exports = CameraBusiness;