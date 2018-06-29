const CameraBusiness = require('./business/camera.business');
const RekognitionBusiness = require('./business/rekognition.business');

const run = async () => {
  let cameraBusiness = new CameraBusiness();
  let rekognitionBusiness = new RekognitionBusiness();
  
  let cameraSnap = await cameraBusiness.snap();
  try{
    let response = await rekognitionBusiness.IndexFace(cameraSnap, 'age');
    console.log(response);
  } 
  catch(ex) {
    console.log(ex);
  }
};
run();