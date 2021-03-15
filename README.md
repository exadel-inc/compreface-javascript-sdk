# CompreFace JavaScript-SDK

CompreFace is free and open-source face recognition system from Exadel and this JavaScript SDK helps you to use all functionalities of the system in your web application without prior machine learning skills. 

## Table of content
- [Installation](#installation)
- [Recognition Service](#recognize)
- [Usage](#usage)

## Installation

Make sure you have installed LTS version of Nodejs and run below command to install sdk in your local environment.
```javascript
npm install compreface-js-sdk
```

## Recognition Service
The main purpose of Recognition Service is operating on images in your face collection. Face collection is an array of objects that every object contains ```image_id``` and ```subject``` to represent added image. Below given useful information about functionaliites of Recognition Service.

  - ```faceCollection.add(image_path, subject)``` - to add an image to your face collection. This function takes ```image_path```(path of image) and ```subject```(name) as argument and returns object that contains ```image_id``` and ```subject``` in success  
  - ```faceCollection.list()``` - to return all images in your face collection and returns array of objects in success.
  - ```faceCollection.recognize(image_path)``` - to recognize faces from givent image. The function takes ```image_path``` as argument and returns below object in success.
```{
  "result": [
    {
      "box": {
        "probability": <probability>,
        "x_max": <integer>,
        "y_max": <integer>,
        "x_min": <integer>,
        "y_min": <integer>
      },
      "faces": [
        {
          "similarity": <similarity1>,
          "subject": <subject1>	
        },
        ...
      ]
    }
  ]
}
 ``` 
  - ```faceCollection.verify(image_path, image_id)``` - to compare similarities of given image with image from your face collection. Accepts ```image_path```(path of image) and ```image_id``` from your face collection and returns similarity percentage of images.
  - ```faceCollection.delete(image_id)``` - to remove image from face collection. Accepts ```image_id``` and returns object of removed image in success.
  - ```faceCollection.delete_all_subject(subject)``` - to remove image(s) according to their given subject(name). Accepts ```subject``` and returns object(s) of removed image(s). NOTE: this function removes all images with same subject.
  - ```faceCollection.delete_all()``` - to delete all images from face collection.

## Usage
We have built our sdk around ```CompreFace``` class and below given steps for using Recognition Service functionalities.
```
import { CompreFace } from 'compreface-js-sdk';

let api_key = "your_key";
let server = "http://localhost";
let port = 8000;

let compreFace = new CompreFace(server, port); // set server and port number
let recognitionService = compreFace.initFaceRecognitionService(api_key); // initialize service
let faceCollection = recognitionService.getFaceCollection();
```
