const asciimo = require('asciimo').Figlet;
//const CameraBusiness = require('./business/camera.business'); // CameraBusiness for webcam (should have same interface)
const RaspistillBusiness = require('./business/raspistill.business'); // RaspistillBusiness for raspiberry cam (should have same interface)
const RekognitionBusiness = require('./business/rekognition.business');

//Gathering parameters
let operation = null;
let personName = null; // Name of the person to be associated with this face on aws
let pictureName = "track.jpg"; // Name of the default saved picture (for sending to rekognition)
let help = false;

process.argv.forEach(function (val, index, array) {
  if(val === '--operation')
	operation = process.argv[index + 1];
	
  if(val === '--person')
	personName = process.argv[index + 1];
	
  if(val === '--picture')
	pictureName = process.argv[index + 1];
	
  if(val === '--help')
	help = true;
});

if(help) {
  let spacer = '-----------------------//-----------------------';
  console.log('Params:');
  console.log(spacer);
  console.log('"--operation" (*required)');
  console.log('options:');
  console.log('"save" -> snap or use provided picture to save face to rekognition on configured collection');
  console.log('"match" -> snap or use provided picture to check if face is recognized on collection');
  console.log(spacer);
  console.log('"--person" (*required only when using save op)');
  console.log('options:');
  console.log('"*any string" -> name of the person to be associated with picture on collection when saving new face');
  console.log(spacer);
  console.log('"--picture" (*optional)');
  console.log('options:');
  console.log('"*any string" -> filename of the picture to be used (with extention) (default = track.jpg)');
  console.log(spacer);
  return;
}

if(!operation || (operation != "match" && operation != "save")) {
  console.log('Param "--operation" is required or is invalid!');
  console.log('For more info run --help');
  return;
}

if(!personName && operation == "save") {
  console.log('Param "--person" is required when op == save!');
  console.log('For more info run --help');
  return;
}


// Starting program
const run = async () => {  
  let captureBusiness = new RaspistillBusiness();
  let rekognitionBusiness = new RekognitionBusiness();
  
  // Capturing the image
  if(pictureName == "track.jpg") {
	console.log('Snapping picture...');
	let cameraSnap = await captureBusiness.snap(pictureName);
	console.log('Picture saved!');
  }

  try{
	let response = 'Invalid operation';
	
	if(operation == 'save') {
	  // Saving face to rekognition
	  console.log('Saving face to rekognition...');
      response = await rekognitionBusiness.IndexFace(pictureName, personName);
    }
    
    if(operation == 'match') {
	  // Matching face on rekognition
	  console.log('Matching face on rekognition...');
      response = await rekognitionBusiness.MatchFace(pictureName);
      
      if(response.FaceMatches[0]) {
        asciimo.write("Authorized", "Banner", (art) => {console.log(art)});
        asciimo.write(response.FaceMatches[0].Face.ExternalImageId, "Banner", (art) => {console.log(art)});
      }
      else
		asciimo.write("Denied", "Banner", (art) => {console.log(art)});
      return;
    }
    
    console.log(response);
  } 
  catch(ex) {
    console.log(ex);
  }
};
run();
