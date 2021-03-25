# CompreFace JavaScript-SDK

CompreFace is free and open-source face recognition system from Exadel and this JavaScript SDK helps you to use all functionalities of the system in your web application without prior machine learning skills. 

## Table of content
- [Installation](#installation)
- [Recognition Service](#recognition)
- [Usage](#usage)

## Installation

Make sure you have installed LTS version of Nodejs and run below command to install sdk in your local environment.
```javascript
npm install compreface-js-sdk
```

## Recognition Service
The main purpose of Recognition Service is operating on images in your face collection. Face collection is an array of objects that every object contains ```image_id``` and ```subject``` to represent added image. Below given useful information about functionaliites of Recognition Service.

  - ```faceCollection.add(image_path, subject, options)``` - to add an image to your face collection. This function takes ```image_path```(path of image),  ```subject```(name of image) and options as argument and returns object that contains ```image_id``` and ```subject``` in success. Options argument is an object that contains extra parameters for particular function. Those extra parameters could be ```options = { limit, det_prob_threshold, prediction_count }```
 

|           |  |     |  |                                                         |
| ---------------- | ----------- | ------- | -------- | ------------------------------------------------------------ |
| limit            | integer | optional | maximum number of faces with best similarity in result. Value of 0 represents no limit. Default value: 0 |
| det_prob_ threshold | string | optional | minimum required confidence that a recognized face is actually a face. Value is between 0.0 and 1.0. |
| prediction_count | integer | optional | maximum number of predictions per faces. Default value: 1    |


  ```
  {
    "image_id": "<UUID>",
    "subject": "<subject>"
  }
  ```

  - ```faceCollection.list()``` - to return all images in your face collection and returns array of objects in success.
  ```
  {
    "faces": [
      {
        "image_id": <image_id>,
        "subject": <subject>
      },
      ...
    ]
  }
  ```

  - ```faceCollection.recognize(image_path, options)``` - to recognize faces from given image. The function takes ```image_path``` and ```options``` as argument and returns below object in success.
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

  - ```faceCollection.verify(image_path, image_id, options)``` - to compare similarities of given image with image from your face collection. Accepts ```image_path```(path of image), ```image_id``` from your face collection, ```options``` and returns similarity percentage of images.
  ```
  {
    "result": [
      {
        "box": {
          "probability": <probability>,
          "x_max": <integer>,
          "y_max": <integer>,
          "x_min": <integer>,
          "y_min": <integer>
        },
        "similarity": <similarity1>
      },
      ...
    ]
  }
  ```

  - ```faceCollection.delete(image_id)``` - to remove image from face collection. Accepts ```image_id``` and returns object of removed image in success.
  ```
  {
    "image_id": <image_id>,
    "subject": <subject>
  }
  ```

  - ```faceCollection.delete_all_subject(subject)``` - to remove image(s) according to their given subject(name). Accepts ```subject``` and returns object(s) of removed image(s). NOTE: this function removes all images with same subject.
  ```
  [
    {
      "image_id": <image_id>,
      "subject": <subject>
    },
    ...
  ]
  ```

  - ```faceCollection.delete_all()``` - to delete all images from face collection.

## Usage
You only need to import ```CompreFace``` in order to use functionalities of services. Below given initial setup for your web application. NOTE: you can pass options globally too. In this case if you provide same option values from functions, global ones override local one.
```
import { CompreFace } from 'compreface-js-sdk';

let api_key = "your_key";
let server = "http://localhost";
let port = 8000;
let options = {
  limit: 0, 
  det_prob_threshold: 0.5, 
  prediction_count: 1
}

let compreFace = new CompreFace(server, port, options); // set server, port number and options
let recognitionService = compreFace.initFaceRecognitionService(api_key); // initialize service
let faceCollection = recognitionService.getFaceCollection();
```

Here is JavaScript code example that shows how to add image to your face collection. NOTE: we use initial setup variable names in following example:

```
function saveInFaceCollection(){
    let path_to_image = "../images/boy.jpg";
    let name = encodeURIComponent('Tom'); 

    faceCollection.add(path_to_image, name)
        .then(response => {
          // your code
        })
        .catch(error => {
            console.log(`Ups! There is problem in uploading image ${error}`)
        })
}

```
Following example shows how to display list of images in face collection
```
function listFaceCollectionInfo(){
  let table = document.getElementById("face_collection_table");
  let tableBody = document.createElement('tbody');

  faceCollection.list()
    .then( response => {
      const { faces } = response;

      faces.forEach(faceObjects => {
        let row = document.createElement('tr');

          Object.values(faceObject).forEach(element => {
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(element));
            row.appendChild(cell);
          })
          tableBody.appendChild(row);
      })
      table.appendChild(tableBody);
    })
    .catch(error => {
      console.log(`Ups! There is problem retriving data ${error}`)
    })

}
```
This code snippet shows how to use recognize function and write result to text area:

```
function recognizeFace(){
  let path_to_image = "../images/team.jpg";

  faceCollection.recognize(path_to_image)
    .then(response => {
      document.getElementById("result-textarea-request").innerHTML = JSON.stringify(response);
    })
    .catch(error => {
      console.log(`Ups! There is problem with recognizing image ${error}`)
    })
}
```