<h1 align="center" style="border:none;">
"node-cam"
</h1>

Authentication with Webcam using <a href="https://aws.amazon.com/rekognition/" target="_blank">facial reckognition</a> and node-js.

[![Github file size](https://img.shields.io/github/size/webcaetano/craft/build/phaser-craft.min.js.svg)](https://github.com/Agezao/node-cam)
[![GitHub top language](https://img.shields.io/github/languages/top/badges/shields.svg)](https://github.com/Agezao/node-cam)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Agezao/node-cam)

## How it works?
It snaps a picture with the configured camera module (webcam or raspberry w/ raspistill), send it to the aws rekognition with the configured params and return the person found, if any.


## Getting started

### Install Global Dependancies
  * [Node.js](http://nodejs.org)

### Running the project
  * [Download zip](https://github.com/agezao/node-cam/archive/master.zip), or clone the repo `git clone https://github.com/Agezao/node-cam.git`
  * cd to project folder
  * run `[sudo] npm install` (first time users)
  * edit config with your informations and rename it to `index.js` (instead of `index.example.js`)
  * `node index.js --help` to get more info on how it works

##Examples

### Setting up a new Face
  * `node index.js --operation save --person someone` If found someone in the snaped picture, saves the person with the alias "someone"

### Validating a face
  * `node index.js --operation match` If found someone in the snaped picture, check if the face is known in the given bucket


## License

Do whatever you want. [open-source MIT license](http://opensource.org/licenses/mit-license.php).
