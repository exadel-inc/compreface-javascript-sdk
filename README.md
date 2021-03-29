# CompreFace JavaScript SDK

CompreFace JavaScript SDK makes face recognition into your application even easier.

## Table of content
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
    - [Initialization](#initialization)
    - [Adding faces into a face collection](#adding-faces-into-a-face-collection)
    - [Recognition](#recognition)
- [Reference](#reference)
    - [CompreFace Global Object](#compreface-global-object)
    - [Recognition Service](#recognition-service)
        - [Recognize Faces from a Given Image](#recognize-faces-from-a-given-image)
        - [Get Face Collection](#get-face-collection)
    - [Face Collection Object](#face-collection-object)
        - [Add an Example of a Subject](#add-an-example-of-a-subject)
        - [List of All Saved Subjects](#list-of-all-saved-subjects)
        - [Delete All Examples of the Subject by Name](#delete-all-examples-of-the-subject-by-name)
        - [Delete an Example of the Subject by ID](#delete-an-example-of-the-subject-by-id)
        - [Verify Faces from a Given Image](#verify-faces-from-a-given-image)

## Requirements

Before using our SDK make sure you have installed CompreFace and Nodejs on your machine.
1. [CompreFace](https://github.com/exadel-inc/CompreFace#getting-started-with-compreface)(Version 0.4.1)
2. [Nodejs](https://nodejs.org/en/)(Version 10+)

## Installation
To add CompreFace JS SDK to your project, run the following command in the project folder:

```npm i @exadel/compreface-js-sdk```


## Usage

### Initialization

To start using JavaScript SDK you need to import `CompreFace` object from 'compreface-js-sdk' dependency.  

Then you need to init it with `url` and `port`. By default, if you run CompreFace on your local machine, it's `http://localhost` and `8000` respectively.
You can pass optional `options` object when creating CompreFace to set default parameters, see reference for [more information](#compreface-global-object).

After you initialized `CompreFace` object you need to init the service object with the `api key` of your face collection. You can use this service object to recognize faces.

However, before recognizing you need first to add faces into the face collection. To do this, get the face collection object from the service object.

```javascript
import { CompreFace } from 'compreface-js-sdk';

let api_key = "your_key";
let url = "http://localhost";
let port = 8000;

let compreFace = new CompreFace(url, port); // set CompreFace url and port 
let recognitionService = compreFace.initFaceRecognitionService(api_key); // initialize service
let faceCollection = recognitionService.getFaceCollection(); // use face collection to fill it with known faces
```

### Adding faces into a face collection

Here is JavaScript code example that shows how to add an image to your face collection from your file system:

```javascript
let path_to_image = "../images/boy.jpg";
let name = encodeURIComponent('Tom');

faceCollection.add(path_to_image, name)
    .then(response => {
        // your code
    })
    .catch(error => {
        console.log(`Oops! There is problem in uploading image ${error}`)
    })
```

### Recognition

This code snippet shows how to recognize unknown face:

```javascript
let path_to_image = "../images/team.jpg";

recognitionService.recognize(path_to_image)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem with recognizing image ${error}`)
    })
```

## Reference

### CompreFace Global Object

Global CompreFace Object is used for initializing connection to CompreFace and setting default values for options.
Default values will be used in every service method if applicable. 
If the option’s value is set in the global object and passed as a function argument then the function argument value will be used.

**Constructor:**

```new CompreFace(server, port, options)```

| Argument | Type   | Required | Notes                                     | 
| ---------| ------ | -------- | ----------------------------------------- | 
| url      | string | required | URL with protocol where CompreFace is located. E.g. `http://localhost` |
| port     | string | required | CompreFace port. E.g. `8000` |
| options  | object | optional | Default values for face recognition services    |

Possible options:

| Option              | Type    | Notes                                     |
| --------------------| ------  | ----------------------------------------- |
| det_prob_threshold  | string  | minimum required confidence that a recognized face is actually a face. Value is between 0.0 and 1.0 |
| limit               | integer | maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0       |
| prediction_count    | object  | maximum number of subject predictions per face. It returns the most similar subjects. Default value: 1    |

Example:

```js
let server = "http://localhost";
let port = 8000;
let options = {
  limit: 0, 
  det_prob_threshold: 0.8, 
  prediction_count: 1
}

let compreFace = new CompreFace(server, port, options);
```

**Methods:**

1. ```compreFace.initFaceRecognitionService(api_key)```

Inits face recognition service object.

| Argument | Type   | Required | Notes                                     |
| ---------| ------ | -------- | ----------------------------------------- |
| api_key  | string | required | Face Collection Api Key in UUID format    |

Example:

```js
let recognitionService = compreFace.initFaceRecognitionService(api_key);
```

### Recognition Service

Face recognition service is used for face identification. 
This means that you first need to upload known faces to face collection and then recognize unknown faces among them. 
When you upload an unknown face, the service returns the most similar faces to it. 
Also, face recognition service supports verify endpoint to check if this person from face collection is the correct one.
For more information, see [CompreFace page](https://github.com/exadel-inc/CompreFace).

**Methods:**

#### Recognize Faces from a Given Image

```recognitionService.recognize(image_location, options)```

Recognizes all faces from the image. 
The first argument is the image location, it could be a URL or a path on the local machine.

| Argument        | Type   | Required | Notes                                     |
| --------------- | ------ | -------- | ----------------------------------------- |
| image_location  | string | required | URL or local machine path to the image you want to recognize    |
| options         | string | optional | Object that defines recognition options   |

Supported options:

| Option              | Type    | Notes                                     |
| --------------------| ------  | ----------------------------------------- |
| det_prob_threshold  | string  | minimum required confidence that a recognized face is actually a face. Value is between 0.0 and 1.0 |
| limit               | integer | maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0       |
| prediction_count    | object  | maximum number of subject predictions per face. It returns the most similar subjects. Default value: 1    |

Response:

 ```json
{
  "result": [
    {
      "box": {
        "probability": 0.9,
        "x_max": 50,
        "y_max": 50,
        "x_min": 500,
        "y_min": 500
      },
      "faces": [
        {
          "similarity": 0.9,
          "subject": "example1"
        }
      ]
    }
  ]
}
  ```

| Element                        | Type    | Description                                                  |
| ------------------------------ | ------- | ------------------------------------------------------------ |
| box                            | object  | list of parameters of the bounding box for this face         |
| probability                    | float   | probability that a found face is actually a face             |
| x_max, y_max, x_min, y_min | integer | coordinates of the frame containing the face                 |
| faces                          | list    | list of similar faces with size of <prediction_count> order by similarity |
| similarity                     | float   | similarity that on that image predicted person              |
| subject                        | string  | Name or any other person ID saved in Face Collection                                 |

Example:

```javascript
let image_location = "../images/team.jpg";
let options = {
    limit: 0,
    det_prob_threshold: 0.8,
    prediction_count: 1
}

recognitionService.recognize(image_location, options)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem with recognizing image ${error}`)
    })
```

#### Get Face Collection

```recognitionService.getFaceCollection()```

Returns Face collection object

### Face Collection Object

Face collection could be used to manage known faces, e.g. add, list, or delete them.
Face recognition is performed for the saved known faces in face collection, so before using the `recognize` method you need to save at least one face into the face collection.

**Methods:**

#### Add an Example of a Subject

```faceCollection.add(image_location, subject, options)```

Adds an image to your face collection. 

| Argument        | Type   | Required | Notes                                     |
| --------------- | ------ | -------- | ----------------------------------------- |
| image_location  | string | required | URL or local machine path to the image  you want  to add to face collection     |
| subject         | string | required | Name or any other person ID. It can be just a random string you generate and save for further identification    |
| options         | string | optional | Object that defines adding options   |

Supported options:

| Option              | Type    | Notes                                     |
| --------------------| ------  | ----------------------------------------- |
| det_prob_threshold  | string  | minimum required confidence that a recognized face is actually a face. Value is between 0.0 and 1.0 |

Response:

 ```json
{
  "image_id": "string",
  "subject": "string"
}
  ```

| Field               | string    | Notes                                     |
| --------------------| ------    | ----------------------------------------- |
| image_id            | string    | ID of the saved image |
| subject             | string    | Name or any other person ID   |

Example:

```javascript
let image_location = "../images/boy.jpg";
let name = encodeURIComponent('Tom');
let options = {
    det_prob_threshold: 0.8
}

faceCollection.add(image_location, name, options)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem in uploading image ${error}`)
    })
```

#### List of All Saved Subjects

```faceCollection.list()```

Retrieve a list of images saved in a Face Collection

Response:

```json
{
  "faces": [
    {
      "image_id": "string",
      "subject": "string"
    }
  ]
}
```

| Field               | string    | Notes                                     |
| --------------------| ------    | ----------------------------------------- |
| image_id            | string    | ID of the saved image |
| subject             | string    | Name or any other person ID   |

Example:

```javascript
faceCollection.list()
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem: ${error}`)
    })
```

#### Delete an Example of the Subject by ID

```faceCollection.delete(image_id)```

Remove image from face collection.

| Argument        | Type   | Required | Notes                                     |
| --------------- | ------ | -------- | ----------------------------------------- |
| image_id        | string | required | ID of the saved image                      |

Response:

 ```json
{
  "image_id": "string",
  "subject": "string"
}
  ```

| Field               | string    | Notes                                     |
| --------------------| ------    | ----------------------------------------- |
| image_id            | string    | ID of the deleted image |
| subject             | string    | Name or any other person ID   |

Example:

```javascript
let image_id = "79ed78d8-f015-4947-b297-a24306ebbdad";

faceCollection.delete(image_id)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem ${error}`)
    })
```

#### Delete All Examples of the Subject by Name

```faceCollection.delete_all_subject(subject)``` 

Removes image(s) according to their given subject.

| Argument        | Type   | Required | Notes                                     |
| --------------- | ------ | -------- | ----------------------------------------- |
| subject         | string | optional | Name or any other person ID. If empty deletes all images in the face collection                      |


Response:

```json
[
  {
    "image_id": "string",
    "subject": "string"
  }
]
```

| Field               | string    | Notes                                     |
| --------------------| ------    | ----------------------------------------- |
| image_id            | string    | ID of the deleted image |
| subject             | string    | Name or any other person ID   |


Example:

```javascript
let subject = "Tom";

faceCollection.delete(subject)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem ${error}`)
    })
```

#### Verify Faces from a Given Image

```faceCollection.verify(image_path, image_id, options)```

Compares similarities of given image with image from your face collection. 

| Argument        | Type   | Required | Notes                                     |
| --------------- | ------ | -------- | ----------------------------------------- |
| image_location  | string | required | URL or local machine path to the image you want to recognize    |
| options         | string | optional | Object that defines recognition options   |

Supported options:

| Option              | Type    | Notes                                     |
| --------------------| ------  | ----------------------------------------- |
| det_prob_threshold  | string  | minimum required confidence that a recognized face is actually a face. Value is between 0.0 and 1.0 |
| limit               | integer | maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0       |
| prediction_count    | object  | maximum number of subject predictions per face. It returns the most similar subjects. Default value: 1    |

Response:

 ```json
{
  "result": {
    "box": {
      "probability": 0.9,
      "x_max": 50,
      "y_max": 50,
      "x_min": 500,
      "y_min": 500
    },
    "faces": [
      {
        "similarity": 0.9,
        "subject": "example1"
      }
    ]
  }
}
```

| Element                        | Type    | Description                                                  |
| ------------------------------ | ------- | ------------------------------------------------------------ |
| box                            | object  | list of parameters of the bounding box for this face         |
| probability                    | float   | probability that a found face is actually a face             |
| x_max, y_max, x_min, y_min | integer | coordinates of the frame containing the face                 |
| faces                          | list    | list of similar faces with size of <prediction_count> order by similarity |
| similarity                     | float   | similarity that on that image predicted person              |
| subject                        | string  | Name or any other person ID saved in Face Collection                                 |

```javascript
let image_location = "../images/team.jpg";
let image_id = "79ed78d8-f015-4947-b297-a24306ebbdad";
let options = {
    limit: 0,
    det_prob_threshold: 0.8,
    prediction_count: 1
}

faceCollection.verify(image_location, image_id, options)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem with verifying image ${error}`)
    })
```
