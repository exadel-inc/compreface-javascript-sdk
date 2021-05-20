# CompreFace JavaScript SDK

CompreFace JavaScript SDK makes face recognition into your application even easier.

## Table of content
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
    - [Initialization](#initialization)
    - [Adding faces into a face collection](#adding-faces-into-a-face-collection)
    - [Recognition](#recognition)
    - [Enviroments](#enviroments)
    - [Webcam demo](#webcam-demo)
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
    - [Detection Service](#detection-service)
        - [Detect](#detect)
    - [Verification Service](#verification-service)
        - [Verify](#verify)

## Requirements

Before using our SDK make sure you have installed CompreFace and Nodejs on your machine.
1. [CompreFace](https://github.com/exadel-inc/CompreFace#getting-started-with-compreface) (See below compatibility matrix)
2. [Nodejs](https://nodejs.org/en/) (Version 10+)

### CompreFace compatibility matrix

| CompreFace JS SDK version | CompreFace 0.4.x | CompreFace 0.5.x |
| --------------------------| ---------------- | ---------------- | 
| 0.4.1                     | ✔                | ✘                | 
| 0.5.x                     | ✘                | ✔                | 

## Installation
To add CompreFace JS SDK to your project, run the following command in the project folder:

```npm i @exadel/compreface-js-sdk```


## Usage

### Initialization

To start using JavaScript SDK you need to import `CompreFace` object from 'compreface-js-sdk' dependency.  

Then you need to init it with `url` and `port`. By default, if you run CompreFace on your local machine, it's `http://localhost` and `8000` respectively.
You can pass optional `options` object when creating CompreFace to set default parameters, see reference for [more information](#compreface-global-object).

After you initialized `CompreFace` object you need to init the service object with the `api key` of your face service. You can use this service object to recognize faces.

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

### Enviroments
NOTE: We provide 3 ways of uploading image to our SDK. They are url, blob and relative path (from local machine).

| Enviroments | from URL | with Blob format | from local machine|
| ------------|--------- | ---------------- | ----------------  | 
| Browser     |    ✔     |  ✔              |  ✘                | 
| Nodejs      |    ✔     |  ✔              |  ✔                | 

### Webcam demo
[Documentation is here](/webcam_demo)

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
| prediction_count    | integer | maximum number of subject predictions per face. It returns the most similar subjects. Default value: 1    |
| face_plugins        | string  | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)    |
| status              | boolean | if true includes system information like execution_time and plugin_version fields. Default value is false    |

Example:

```js
let server = "http://localhost";
let port = 8000;
let options = {
  limit: 0, 
  det_prob_threshold: 0.8, 
  prediction_count: 1,
  face_plugins: "calculator,age,gender,landmarks",
  status: "true"
}

let compreFace = new CompreFace(server, port, options);
```

**Methods:**

1. ```compreFace.initFaceRecognitionService(api_key)```

Inits face recognition service object.

| Argument | Type   | Required | Notes                                     |
| ---------| ------ | -------- | ----------------------------------------- |
| api_key  | string | required | Face Recognition Api Key in UUID format    |

Example:

```js
let recognitionService = compreFace.initFaceRecognitionService(api_key);
```

2. ```compreFace.initFaceDetectionService(api_key)```

Inits face detection service object.

| Argument | Type   | Required | Notes                                     |
| ---------| ------ | -------- | ----------------------------------------- |
| api_key  | string | required | Face Detection Api Key in UUID format    |

Example:

```js
let detectionService = compreFace.initFaceDetectionService(api_key);
```

3. ```compreFace.initFaceVerificationService(api_key)```

Inits face verification service object.

| Argument | Type   | Required | Notes                                     |
| ---------| ------ | -------- | ----------------------------------------- |
| api_key  | string | required | Face Verification Api Key in UUID format    |

Example:

```js
let verificationService = compreFace.initFaceVerificationService(api_key);
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
| image_location  | string | required | URL, image in BLOB format or image from your local machine|
| options         | string | optional | Object that defines recognition options   |

Supported options:

| Option              | Type    | Notes                                     |
| --------------------| ------  | ----------------------------------------- |
| det_prob_threshold  | string  | minimum required confidence that a recognized face is actually a face. Value is between 0.0 and 1.0 |
| limit               | integer | maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0       |
| prediction_count    | object  | maximum number of subject predictions per face. It returns the most similar subjects. Default value: 1    |
| face_plugins        | string  | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)    |
| status              | boolean | if true includes system information like execution_time and plugin_version fields. Default value is false    |

Response:

 ```json
{
  "result" : [ {
    "age" : [ 25, 32 ],
    "gender" : "female",
    "embedding" : [ 9.424854069948196E-4, "...", -0.011415496468544006 ],
    "box" : {
      "probability" : 1.0,
      "x_max" : 1420,
      "y_max" : 1368,
      "x_min" : 548,
      "y_min" : 295
    },
    "landmarks" : [ [ 814, 713 ], [ 1104, 829 ], [ 832, 937 ], [ 704, 1030 ], [ 1017, 1133 ] ],
    "subjects" : [ {
      "similarity" : 0.97858,
      "subject" : "subject1"
    } ],
    "execution_time" : {
      "age" : 28.0,
      "gender" : 26.0,
      "detector" : 117.0,
      "calculator" : 45.0
    }
  } ],
  "plugins_versions" : {
    "age" : "agegender.AgeDetector",
    "gender" : "agegender.GenderDetector",
    "detector" : "facenet.FaceDetector",
    "calculator" : "facenet.Calculator"
  }
}
  ```

| Element                        | Type    | Description                                                  |
| ------------------------------ | ------- | ------------------------------------------------------------ |
| age                            | array   | detected age range. Return only if [age plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled         |
| gender                         | string  | detected gender. Return only if [gender plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled         |
| embedding                      | array   | face embeddings. Return only if [calculator plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled      |
| box                            | object  | list of parameters of the bounding box for this face         |
| probability                    | float   | probability that a found face is actually a face             |
| x_max, y_max, x_min, y_min     | integer | coordinates of the frame containing the face                 |
| landmarks                      | array   | list of the coordinates of the frame containing the face-landmarks. Return only if [landmarks plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled      |
| subjects                       | list    | list of similar subjects with size of <prediction_count> order by similarity |
| similarity                     | float   | similarity that on that image predicted person               |
| subject                        | string  | name of the subject in Face Collection                       |
| execution_time                 | object  | execution time of all plugins                       |
| plugins_versions               | object  | contains information about plugin versions                       |

Example:

```javascript
let image_location = "../images/team.jpg";
let options = {
    limit: 0,
    det_prob_threshold: 0.8,
    prediction_count: 1,
    face_plugins: "calculator,age,gender,landmarks",
    status: "true"
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
| image_location  | string | required | URL, image in BLOB format or image from your local machine |
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
| image_location  | string | required | URL, image in BLOB format or image from your local machine |
| options         | string | optional | Object that defines recognition options   |

Supported options:

| Option              | Type    | Notes                                     |
| --------------------| ------  | ----------------------------------------- |
| det_prob_threshold  | string  | minimum required confidence that a recognized face is actually a face. Value is between 0.0 and 1.0 |
| limit               | integer | maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0       |
| prediction_count    | object  | maximum number of subject predictions per face. It returns the most similar subjects. Default value: 1    |
| face_plugins        | string  | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)    |
| status              | boolean | if true includes system information like execution_time and plugin_version fields. Default value is false    |

Response:

 ```json
{
  "result": [
    {
      "age" : [ 25, 32 ],
      "gender" : "female",
      "embedding" : [ -0.049007344990968704, "...", -0.01753818802535534 ],
      "box" : {
        "probability" : 0.9997453093528748,
        "x_max" : 205,
        "y_max" : 167,
        "x_min" : 48,
        "y_min" : 0
      },
      "landmarks" : [ [ 260, 129 ], [ 273, 127 ], [ 258, 136 ], [ 257, 150 ], [ 269, 148 ] ],
      "similarity" : 0.97858,
      "execution_time" : {
        "age" : 59.0,
        "gender" : 30.0,
        "detector" : 177.0,
        "calculator" : 70.0
      }
    }
  ],
  "plugins_versions" : {
    "age" : "agegender.AgeDetector",
    "gender" : "agegender.GenderDetector",
    "detector" : "facenet.FaceDetector",
    "calculator" : "facenet.Calculator"
  }
}
```
| Element                        | Type    | Description                                                  |
| ------------------------------ | ------- | ------------------------------------------------------------ |
| age                            | array   | detected age range. Return only if [age plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled         |
| gender                         | string  | detected gender. Return only if [gender plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled         |
| embedding                      | array   | face embeddings. Return only if [calculator plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled      |
| box                            | object  | list of parameters of the bounding box for this face         |
| probability                    | float   | probability that a found face is actually a face             |
| x_max, y_max, x_min, y_min     | integer | coordinates of the frame containing the face                 |
| landmarks                      | array   | list of the coordinates of the frame containing the face-landmarks. Return only if [landmarks plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled      |
| similarity                     | float   | similarity that on that image predicted person               |
| execution_time                 | object  | execution time of all plugins                       |
| plugins_versions               | object  | contains information about plugin versions                       |

```javascript
let image_location = "../images/team.jpg";
let image_id = "79ed78d8-f015-4947-b297-a24306ebbdad";
let options = {
    limit: 0,
    det_prob_threshold: 0.8,
    prediction_count: 1,
    face_plugins: "calculator,age,gender,landmarks",
    status: "true"
}

faceCollection.verify(image_location, image_id, options)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem with verifying image ${error}`)
    })
```

### Detection Service

Face detection service is used for detecting faces in the image.

**Methods:**

#### Detect

```detectionService.detect(image_location, options)```

Finds all faces on the image.
The first argument is the image location, it could be a URL or a path on the local machine.

| Argument        | Type   | Required | Notes                                     |
| --------------- | ------ | -------- | ----------------------------------------- |
| image_location  | string | required | URL, image in BLOB format or image from your local machine |
| options         | string | optional | Object that defines detection options   |

Supported options:

| Option              | Type    | Notes                                     |
| --------------------| ------  | ----------------------------------------- |
| det_prob_threshold  | string  | minimum required confidence that a recognized face is actually a face. Value is between 0.0 and 1.0 |
| limit               | integer | maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0       |
| face_plugins        | string  | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)    |
| status              | boolean | if true includes system information like execution_time and plugin_version fields. Default value is false    |

Response:
```json
{
  "result" : [ {
    "age" : [ 25, 32 ],
    "gender" : "female",
    "embedding" : [ -0.03027934394776821, "...", -0.05117142200469971 ],
    "box" : {
      "probability" : 0.9987509250640869,
      "x_max" : 376,
      "y_max" : 479,
      "x_min" : 68,
      "y_min" : 77
    },
    "landmarks" : [ [ 156, 245 ], [ 277, 253 ], [ 202, 311 ], [ 148, 358 ], [ 274, 365 ] ],
    "execution_time" : {
      "age" : 30.0,
      "gender" : 26.0,
      "detector" : 130.0,
      "calculator" : 49.0
    }
  } ],
  "plugins_versions" : {
    "age" : "agegender.AgeDetector",
    "gender" : "agegender.GenderDetector",
    "detector" : "facenet.FaceDetector",
    "calculator" : "facenet.Calculator"
  }
}
```

| Element                        | Type    | Description                                                  |
| ------------------------------ | ------- | ------------------------------------------------------------ |
| age                            | array   | detected age range. Return only if [age plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled         |
| gender                         | string  | detected gender. Return only if [gender plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled         |
| embedding                      | array   | face embeddings. Return only if [calculator plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled      |
| box                            | object  | list of parameters of the bounding box for this face (on processedImage) |
| probability                    | float   | probability that a found face is actually a face (on processedImage)     |
| x_max, y_max, x_min, y_min     | integer | coordinates of the frame containing the face (on processedImage)         |
| landmarks                      | array   | list of the coordinates of the frame containing the face-landmarks. Return only if [landmarks plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled      |
| execution_time                 | object  | execution time of all plugins                       |
| plugins_versions               | object  | contains information about plugin versions                       |

Example:

```javascript
let image_location = "../images/team.jpg";
let options = {
    limit: 0,
    det_prob_threshold: 0.8,
    face_plugins: "calculator,age,gender,landmarks",
    status: "true"
}

detectionService.detect(image_location, options)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem with recognizing image ${error}`)
    })
```

### Verification Service

Face verification service is used for comparing two images.
A source image should contain only one face which will be compared to all faces on the target image.

**Methods:**

#### Verify

```verificationService.verify(source_image_location, target_image_location, options)```

Compares two images provided in arguments. Source image should contain only one face, it will be compared to all faces in the target image.
The first two arguments are the image location, it could be a URL or a path on the local machine.

| Argument               | Type   | Required | Notes                                     |
| ---------------------- | ------ | -------- | ----------------------------------------- |
| source_image_location  | string | required | URL, source image in BLOB format or source image from your local machine  |
| target_image_location  | string | required | URL, target image in BLOB format or target image from your local machine |
| options                | string | optional | Object that defines detection options   |

Supported options:

| Option              | Type    | Notes                                     |
| --------------------| ------  | ----------------------------------------- |
| det_prob_threshold  | string  | minimum required confidence that a recognized face is actually a face. Value is between 0.0 and 1.0 |
| limit               | integer | maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0       |
| face_plugins        | string  | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)    |
| status              | boolean | if true includes system information like execution_time and plugin_version fields. Default value is false    |

Response:
```json
{
  "source_image_face" : {
    "age" : [ 25, 32 ],
    "gender" : "female",
    "embedding" : [ -0.0010271212086081505, "...", -0.008746841922402382 ],
    "box" : {
      "probability" : 0.9997453093528748,
      "x_max" : 205,
      "y_max" : 167,
      "x_min" : 48,
      "y_min" : 0
    },
    "landmarks" : [ [ 92, 44 ], [ 130, 68 ], [ 71, 76 ], [ 60, 104 ], [ 95, 125 ] ],
    "execution_time" : {
      "age" : 85.0,
      "gender" : 51.0,
      "detector" : 67.0,
      "calculator" : 116.0
    }
  },
  "face_matches": [
    {
      "age" : [ 25, 32 ],
      "gender" : "female",
      "embedding" : [ -0.049007344990968704, "...", -0.01753818802535534 ],
      "box" : {
        "probability" : 0.99975,
        "x_max" : 308,
        "y_max" : 180,
        "x_min" : 235,
        "y_min" : 98
      },
      "landmarks" : [ [ 260, 129 ], [ 273, 127 ], [ 258, 136 ], [ 257, 150 ], [ 269, 148 ] ],
      "similarity" : 0.97858,
      "execution_time" : {
        "age" : 59.0,
        "gender" : 30.0,
        "detector" : 177.0,
        "calculator" : 70.0
      }
    }],
  "plugins_versions" : {
    "age" : "agegender.AgeDetector",
    "gender" : "agegender.GenderDetector",
    "detector" : "facenet.FaceDetector",
    "calculator" : "facenet.Calculator"
  }
}
```

| Element                        | Type    | Description                                                  |
| ------------------------------ | ------- | ------------------------------------------------------------ |
| source_image_face              | object  | additional info about source image face |
| face_matches                   | array   | result of face verification |
| age                            | array   | detected age range. Return only if [age plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled         |
| gender                         | string  | detected gender. Return only if [gender plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled         |
| embedding                      | array   | face embeddings. Return only if [calculator plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled      |
| box                            | object  | list of parameters of the bounding box for this face         |
| probability                    | float   | probability that a found face is actually a face             |
| x_max, y_max, x_min, y_min     | integer | coordinates of the frame containing the face                 |
| landmarks                      | array   | list of the coordinates of the frame containing the face-landmarks. Return only if [landmarks plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled      |
| similarity                     | float   | similarity between this face and the face on the source image               |
| execution_time                 | object  | execution time of all plugins                       |
| plugins_versions               | object  | contains information about plugin versions                       |

Example:

```javascript
let source_image_location = "../images/boy.jpg";
let target_image_location = "../images/team.jpg";
let options = {
    limit: 0,
    det_prob_threshold: 0.8,
    face_plugins: "calculator,age,gender,landmarks",
    status: "true"
}

verificationService.verify(source_image_location, target_image_location, options)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem with recognizing image ${error}`)
    })
```

# Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

After creating your first contributing pull request, you will receive a request to sign our Contributor License Agreement by commenting your pull request with a special message.

### Report Bugs

Please report any bugs [here](https://github.com/exadel-inc/compreface-javascript-sdk/issues).

If you are reporting a bug, please specify:

- Your operating system name and version
- Any details about your local setup that might be helpful in troubleshooting
- Detailed steps to reproduce the bug


### Submit Feedback

The best way to send us feedback is to file an issue at https://github.com/exadel-inc/compreface-javascript-sdk/issues.

If you are proposing a feature, please:

- Explain in detail how it should work.
- Keep the scope as narrow as possible to make it easier to implement.


# License info

CompreFace JS SDK is open-source facial recognition SDK released under the [Apache 2.0 license](https://www.apache.org/licenses/LICENSE-2.0.html).
