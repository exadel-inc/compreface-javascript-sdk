# CompreFace JavaScript SDK

CompreFace JavaScript SDK makes face recognition in your application
even more effortless.

# Table of content

-   [Requirements](#requirements)
-   [Installation](#installation)
-   [Usage](#usage)
    -   [Initialization](#initialization)
    -   [Adding faces into a face
        collection](#adding-faces-into-a-face-collection)
    -   [Recognition](#recognition)
    -   [Environments](#environments)
    -   [Webcam demo](#webcam-demo)
-   [Reference](#reference)
    -   [CompreFace Global Object](#compreface-global-object)
        -   [Methods](#methods)
    -   [Recognition Service](#recognition-service)
        -   [Recognize Faces from a Given
            Image](#recognize-faces-from-a-given-image)
        -   [Get Face Collection](#get-face-collection)
            -   [Add an Example of a
                Subject](#add-an-example-of-a-subject)
            -   [List of All Saved Examples of the
                Subject](#list-of-all-saved-examples-of-the-subject)
            -   [Delete All Examples of the Subject by
                Name](#delete-all-examples-of-the-subject-by-name)
            -   [Delete an Example of the Subject by
                ID](#delete-an-example-of-the-subject-by-id)
            -   [Verify Faces from a Given
                Image](#verify-faces-from-a-given-image)
        -   [Get Subjects](#get-subjects)
            -   [Add a Subject](#add-a-subject)
            -   [List Subjects](#list-subjects)
            -   [Rename a Subject](#rename-a-subject)
            -   [Delete a Subject](#delete-a-subject)
            -   [Delete All Subjects](#delete-all-subjects)
    -   [Face Detection Service](#face-detection-service)
        -   [Detect](#detect)
    -   [Face Verification Service](#face-verification-service)
        -   [Verify](#verify)
-   [Contributing](#contributing)
    -   [Report Bugs](#report-bugs)
    -   [Submit Feedback](#submit-feedback)
-   [License info](#license-info)

# Requirements

Before using our SDK, make sure you have installed CompreFace and Nodejs
on your machine. 1.
[CompreFace](https://github.com/exadel-inc/CompreFace#getting-started-with-compreface)
(See below compatibility matrix) 2. [Nodejs](https://nodejs.org/en/)
(Version 10+)

## CompreFace compatibility matrix

|  CompreFace JS SDK version |  CompreFace 0.4.x |  CompreFace 0.5.x |  CompreFace 0.6.x
|----------------------------|-------------------|-------------------|--------------
|  0.4.1                     |  ✔               |   ✘              |    ✘
|  0.5.x                     |  ✘               |   ✔              |    :yellow_circle:
|  0.6.x                     |  ✘               |   :yellow_circle: |   ✔

Explanation:

-   ✔ SDK supports all functionality from CompreFace.
-   :yellow_circle: SDK works with this CompreFace version. In case if
    CompreFace version is newer, SDK doesn\'t support the new features
    of CompreFace. In case if CompreFace version is older, new SDK
    features fail.
-   ✘ There are major backward compatibility issues. It is not
    recommended to use these versions together

# Installation

To add CompreFace JS SDK to your project, run the following command in
the project folder:

`npm i @exadel/compreface-js-sdk`

# Usage

## Initialization

To start using JavaScript SDK, you need to import the `CompreFace`
object from the \'compreface-js-sdk\' dependency.

Then it would help if you inited it with `URL` and `port`. By default,
if you run CompreFace on your local machine, it\'s `http://localhost`
and `8000``,` respectively. However, you can pass optional `options`
object when creating CompreFace to set default parameters; see reference
for [more information](#compreface-global-object).

After you initialize the `CompreFace` object, you need to init the
service object with the `API`` k``ey` of your face service. Then, you
can use this service object to recognize faces.

However, before recognizing, you need first to add faces into the face
collection. To do this, get the face collection object from the service
object.

```js
    import { CompreFace } from 'compreface-js-sdk';

    let api_key = "your_key";
    let url = "http://localhost";
    let port = 8000;

    let compreFace = new CompreFace(url, port); // set CompreFace url and port 
    let recognitionService = compreFace.initFaceRecognitionService(api_key); // initialize service
    let faceCollection = recognitionService.getFaceCollection(); // use face collection to fill it with known faces
    let subjects = recognitionService.getSubjects(); // use subjects object to work with subjects directely
```

## Adding faces into a face collection

Here is a JavaScript code example that shows how to add an image to your
face collection from your file system:

```js
    let path_to_image = "../images/boy.jpg";
    let name = encodeURIComponent('Tom');

    faceCollection.add(path_to_image, name)
        .then(response => {
            // your code
        })
        .catch(error => {
            console.log(`Oops! There is a problem in uploading image ${error}`)
        })
```

## Recognition

This code snippet shows how to recognize an unknown face:

```js
    let path_to_image = "../images/team.jpg";

    recognitionService.recognize(path_to_image)
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            console.log(`Oops! There is a problem with recognizing image ${error}`)
        })
```

## Environments

NOTE: We provide 3 ways of uploading an image to our SDK. They are URL,
blob, and relative path (from local machine).

|  Environments |  from URL |  with Blob format |  from a local machine
|---------------|-----------|-------------------|-------------------
|  Browser      |  ✔       |   ✔              |    ✘
|  Nodejs       |  ✔       |   ✔              |    ✔

## Webcam demo

[Documentation is here](/webcam_demo)

# Reference

## CompreFace Global Object

Global CompreFace Object is used for initializing connection to
CompreFace and setting default values for options. Default values are
used in every service method if applicable. The function argument value
is used if the option\'s value is set in the global object and passed as
a function argument.

**Constructor:**

`new CompreFace(server, port, options)`

|  Argument |  Type   |   Required |  Notes
|-----------|---------|------------|-----------------------------------------------------------------------
|  URL      |  string |   required |  URL with a protocol where CompreFace is located. E.g., `http://localhost`
|  port     |  string |   required |  CompreFace port. E.g., `8000`
|  options  |  object |   optional |  Default values for face recognition services

Possible options:

|  Option              | Type     | Notes
|----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  det_prob_threshold  | string   | minimum required confidence that a recognized face is a face indeed. Value is between 0.0 and 1.0
|  limit               | integer  | a maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0
|  prediction_count    | integer  | a maximum number of subject predictions per face. It returns the most similar subjects. Default value: 1
|  face_plugins        | string   | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)
|  status              | boolean  | if true, includes system information like execution_time and plugin_version fields. The default value is false

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

### Methods

1.  `compreFace.initFaceRecognitionService(api_key)`

Inits face recognition service object.

| Argument  | Type   |  Required  | Notes
|-----------|--------|------------|---------------------------------------
|  api_key  |  string|   required |  Face Recognition API Key in UUID format

Example:

```js
    let recognitionService = compreFace.initFaceRecognitionService(api_key);
```

2.  `compreFace.initFaceDetectionService(api_key)`

Inits face detection service object.

|  Argument  | Type    | Required  | Notes
|------------|---------|-----------|------------------------------------
|  api_key   | string  | required  | Face Detection API Key in UUID format

Example:

```js
    let detectionService = compreFace.initFaceDetectionService(api_key);
```

3.  `compreFace.initFaceVerificationService(api_key)`

Inits face verification service object.

|  Argument  | Type    | Required  | Notes
|------------|---------|-----------|----------------------------------------
|  api_key   | string  | required  | Face Verification API Key in UUID format

Example:

```js
    let verificationService = compreFace.initFaceVerificationService(api_key);
```

## Recognition Service

Face recognition service is used for face identification. This means
that you first need to upload known faces to face collection and then
recognize unknown faces among them. When you upload an unknown face, the
service returns the most similar faces to it. Also, the face recognition
service supports verifying endpoint to check if this person from face
collection is correct. For more information, see the [CompreFace
page](https://github.com/exadel-inc/CompreFace).

### Recognize Faces from a Given Image

`recognitionService.recognize(image_location, options)`

Recognizes all faces from the image. The first argument is the image
location; it could be a URL or a path on the local machine.

|  Argument        | Type    | Required  | Notes
|------------------|---------|-----------|-------------------------------------------------------------
|  image_location  | string  | required  | URL, an image in BLOB format or image from your local machine
|  options         | string  | optional  | Object that defines recognition options

Supported options:

|  Option              | Type     | Notes
|----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  det_prob_threshold  | string   | minimum required confidence that a recognized face is a face indeed. Value is between 0.0 and 1.0
|  limit               | integer  | a maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0
|  prediction_count    | object   | a maximum number of subject predictions per face. It returns the most similar subjects. Default value: 1
|  face_plugins        | string   | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)
|  status              | boolean  | if true, includes system information like execution_time and plugin_version fields. The default value is false

Response:

```js
    {
     "result" : [ {
       "age" : {
         "probability": 0.9308982491493225,
         "high": 32,
         "low": 25
       },
       "gender" : {
         "probability": 0.9898611307144165,
         "value": "female"
       },
       "mask" : {
         "probability": 0.9999470710754395,
         "value": "without_mask"
       },
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
         "calculator" : 45.0,
         "mask": 36.0
       }
     } ],
     "plugins_versions" : {
       "age" : "agegender.AgeDetector",
       "gender" : "agegender.GenderDetector",
       "detector" : "facenet.FaceDetector",
       "calculator" : "facenet.Calculator",
       "mask": "facemask.MaskDetector"
     }
    }
```

|  Element                     | Type     | Description
|------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  age                         | object   | detected age range. Return only if [age plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  gender                      | object   | detected gender. Return only if [gender plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  mask                        | object   | detected mask. Return only if [face mask plugin](https://github.com/exadel-inc/CompreFace/blob/master/docs/Face-services-and-plugins.md) is enabled.
|  embedding                   | array    | face embeddings. Return only if [calculator plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  box                         | object   | list of parameters of the bounding box for this face
|  probability                 | float    | the probability that a found face is a face indeed
|  x_max, y_max, x_min, y_min  | integer  | coordinates of the frame containing the face
|  landmarks                   | array    | list of the coordinates of the frame containing the face-landmarks. Return only if [landmarks plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  subjects                    | list     | list of similar subjects with the size of order by similarity
|  similarity                  | float    | a similarity that on that image predicted person
|  subject                     | string   | name of the subject in Face Collection
|  execution_time              | object   | execution time of all plugins
|  plugins_versions            | object   | contains information about plugin versions

Example:

```js
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
            console.log(`Oops! There is a problem with recognizing image ${error}`)
        })
```

### Get Face Collection


Returns Face collection object

Face collection can manage known faces, e.g., add, list, or delete them.

Face recognition is performed for the saved known faces in face collection, so before using the `recognize` method, you need to save at least one face into the face collection.

More information about face collection and managing examples [here](https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#managing-subject-examples)

**Methods:**

#### Add an Example of a Subject

```faceCollection.add(image_location, subject, options)```

Adds an image to your face collection. 

| Argument        | Type   | Required | Notes                                     |
|-----------------|--------|----------|------------------------------------------|
| image_location  | string | required | URL, an image in BLOB format or image from your local machine |
| subject         | string | required | Name or any other person ID. It can be just a random string you generate and save for further identification    |
| options         | string | optional | Object that defines adding options   |

Supported options:

| Option              | Type    | Notes                                     |
| --------------------| ------  | ----------------------------------------- |
| det_prob_threshold  | string  | minimum required confidence that a recognized face is a face indeed. Value is between 0.0 and 1.0 |

Response:

```json
    {
      "image_id": "string",
      "subject": "string"
    }
```

| Field     | string  | Notes
| ----------| --------| -----------------------------
| image_id  | string  | The ID of the saved image
| subject   | string  | Name or any other person ID

Example:

```js
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
            console.log(`Oops! There is a problem in uploading image ${error}`)
        })
```

#### List of All Saved Examples of the Subject


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

|  Field     | string  | Notes
| ---------- |-------- |-----------------------------
|  image_id  | string  | The ID of the saved image
|  subject   | string  | Name or any other person ID

Example:

```js
    faceCollection.list()
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            console.log(`Oops! There is a problem: ${error}`)
        })
```

#### Delete All Examples of the Subject by Name

Removes image(s) according to their given subject.

| Argument        | Type   | Required | Notes                                     |
| --------------- | ------ | -------- | ----------------------------------------- |
| subject         | string | optional | Name or any other person ID. If empty deletes all images in the face collection                      |

Response:

```js
{ "deleted": }
```

| Element  | Type    | Description              |
| -------- | ------- | ------------------------ |
| deleted  | integer | Number of deleted faces  |

Example:

```js
    lt subject = "Tom";

    faceCollection.delete(subject)
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            console.log(`Oops! There is problem ${error}`)
        })
```

#### Delete an Example of the Subject by ID

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

|  Field     | string  | Notes
| ---------- |-------- |-----------------------------
|  image_id  | string  | The ID of the deleted image
|  subject   | string  | Name or any other person ID

Example:

```js
    let image_id = "79ed78d8-f015-4947-b297-a24306ebbdad";

    faceCollection.delete(image_id)
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            console.log(`Oops! There is problem ${error}`)
        })
```

#### Verify Faces from a Given Image

`faceCollection.verify(image_path, image_id, options)`

Compares similarities of the given image with an image from your face
collection.

|  Argument        | Type    | Required  | Notes
|  ----------------| --------| ----------| ---------------------------------------------------------------
|  image_location  | string  | required  | URL, an image in BLOB format or image from your local machine
|  options         | string  | optional  | Object that defines recognition options

Supported options:

|  Option              | Type     | Notes
|----------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  det_prob_threshold  | string   | minimum required confidence that a recognized face is a face indeed. Value is between 0.0 and 1.0
|  limit               | integer  | a maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0
|  prediction_count    | object   | a maximum number of subject predictions per face. It returns the most similar subjects. Default value: 1
|  face_plugins        | string   | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)
|  status              | boolean  | if true, includes system information like execution_time and plugin_version fields. The default value is false

Response:

```json
    {
      "result" : [ {
        "age" : {
          "probability": 0.9308982491493225,
          "high": 32,
          "low": 25
        },
        "gender" : {
          "probability": 0.9898611307144165,
          "value": "female"
        },
        "mask" : {
          "probability": 0.9999470710754395,
          "value": "without_mask"
        },
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
          "calculator" : 45.0,
          "mask": 36.0
        }
      } ],
      "plugins_versions" : {
        "age" : "agegender.AgeDetector",
        "gender" : "agegender.GenderDetector",
        "detector" : "facenet.FaceDetector",
        "calculator" : "facenet.Calculator",
        "mask": "facemask.MaskDetector"
      }
    }
```

|  Element                     | Type     | Description
|------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  age                         | object   | detected age range. Return only if [age plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  gender                      | object   | detected gender. Return only if [gender plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  mask                        | object   | detected mask. Return only if [face mask plugin](https://github.com/exadel-inc/CompreFace/blob/master/docs/Face-services-and-plugins.md) is enabled.
|  embedding                   | array    | face embeddings. Return only if [calculator plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  box                         | object   | list of parameters of the bounding box for this face
|  probability                 | float    | the probability that a found face is a face indeed
|  x_max, y_max, x_min, y_min  | integer  | coordinates of the frame containing the face
|  landmarks                   | array    | list of the coordinates of the frame containing the face-landmarks. Return only if [landmarks plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  similarity                  | float    | a similarity that on that image predicted person
|  execution_time              | object   | execution time of all plugins
|  plugins_versions            | object   | contains information about plugin versions

```js
    let image_location = "../images/team.jpg";
    let image_id = "79ed78d8-f015-4947-b297-a24306ebbdad";
    let options = {
        limit: 0,
        det_prob_threshold: 0.8,
        prediction_count: 1,
        face_plugins: "calculator,age,gender,landmarks,mask",
        status: "true"
    }

    faceCollection.verify(image_location, image_id, options)
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            console.log(`Oops! There is a problem with verifying image ${error}`)
        })
```

### Get Subjects

`recognitionService.getSubjects()`

Returns subjects object

Subjects object allows working with subjects directly (not via subject
examples).

More information about subjects
[here](https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#managing-subjects)

```js
    let subjects = recognitionService.getSubjects(); 
```

**Methods:**

#### Add a Subject

Create a new subject in Face Collection.

`subjects.add(subject)`

|  Argument  | Type    | Required  | Notes
|  ----------| --------| ----------| --------------------------------------------------
|  subject   | string  | required  | is the name of the subject. It can be any string

Response:

```json
    {
      "subject": "subject1"
    }
```

|  Element  | Type    | Description
|  ---------| --------| ----------------------------
|  subject  | string  | is the name of the subject

```js
    let subjects = recognitionService.getSubjects();
    subjects.add("John");
```

#### List Subjects

Returns all subject related to Face Collection.

`subjects.list()`

Response:

```json
    {
      "subjects": [
        "<subject_name1>",
        "<subject_name2>"
      ]
    }
```

|  Element   | Type   | Description
|  ----------| -------| -----------------------------------------
|  subjects  | array  | the list of subjects in Face Collection

```js
    let subjects = recognitionService.getSubjects();
    console.log(subjects.list());
```

#### Rename a Subject

Rename existing subject. If a new subject name already exists, subjects
are merged - all faces from the old subject name are reassigned to the
subject with the new name, old subject removed.

`subjects.rename(subject, new_name)`

|  Argument  | Type    | Required  | Notes
|------------|---------|-----------|---------------------------------------------
|  subject   | string  | required  | is the name of the subject that is updated
|  new_name  | string  | required  | is the name of the subject. It can be any string

Response:

```json
    {
      "updated": "true|false"
    }
```

|  Element  | Type     | Description
| --------- |--------- |-------------------
|  updated  | boolean  | failed or success

```js
    let subjects = recognitionService.getSubjects();
    subjects.add("John");
    console.log(subjects.list());
    subjects.rename("John", "Jane");
    console.log(subjects.list());
```

#### Delete a Subject

Delete existing subject and all saved faces.

`subjects.delete(subject)`

|  Argument  | Type    | Required  | Notes
| ---------- |-------- |---------- |-----------------------------
|  subject   | string  | required  | is the name of the subject.

Response:

```json
    {
      "subject": "subject1"
    }
```

|  Element  | Type    | Description
|-----------|---------|-------------------------
|  subject  | string  | is the name of the subject

```js
    let subjects = recognitionService.getSubjects();
    subjects.add("John");
    console.log(subjects.list());
    subjects.delete("John");
    console.log(subjects.list());
```

#### Delete All Subjects

Delete all existing subjects and all saved faces.

subjects.deleteAll()

Response:

```json
    {
      "deleted": "<count>"
    }
```
  
| Element  | Type     | Description
|--------- |--------- |----------------------------
| deleted  | integer  | number of deleted subjects

```js
    let subjects = recognitionService.getSubjects();
    subjects.add("John");
    subjects.add("Jane");
    console.log(subjects.list());
    subjects.deleteAll();
    console.log(subjects.list());
```

## Face Detection Service

Face detection service is used for detecting faces in the image.

**Methods:**

### Detect

`detectionService.detect(image_location, options)`

Finds all faces on the image. The first argument is the image location;
it could be a URL or a path on the local machine.

|  Argument        | Type    | Required  | Notes
|------------------|---------|-----------|-----------------------------------------------------------
|  image_location  | string  | required  | URL, an image in BLOB format or image from your local machine
|  options         | string  | optional  | Object that defines detection options

Supported options:

|  Option              | Type     | Notes
|----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  det_prob_threshold  | string   | minimum required confidence that a recognized face is a face indeed. Value is between 0.0 and 1.0
|  limit               | integer  | a maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0
|  face_plugins        | string   | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)
|  status              | boolean  | if true, includes system information like execution_time and plugin_version fields. The default value is false

Response:

```json
    {
      "result" : [ {
        "age" : {
          "probability": 0.9308982491493225,
          "high": 32,
          "low": 25
        },
        "gender" : {
          "probability": 0.9898611307144165,
          "value": "female"
        },
        "mask" : {
          "probability": 0.9999470710754395,
          "value": "without_mask"
        },
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
          "calculator" : 49.0,
          "mask": 36.0
        }
      } ],
      "plugins_versions" : {
        "age" : "agegender.AgeDetector",
        "gender" : "agegender.GenderDetector",
        "detector" : "facenet.FaceDetector",
        "calculator" : "facenet.Calculator",
        "mask": "facemask.MaskDetector"
      }
    }
```

|  Element                     | Type     | Description
|------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  age                         | object   | detected age range. Return only if [age plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  gender                      | object   | detected gender. Return only if [gender plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  mask                        | object   | detected mask. Return only if [face mask plugin](https://github.com/exadel-inc/CompreFace/blob/master/docs/Face-services-and-plugins.md) is enabled.
|  embedding                   | array    | face embeddings. Return only if [calculator plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  box                         | object   | list of parameters of the bounding box for this face (on processedImage)
|  probability                 | float    | the probability that a found face is a face indeed (on processedImage)
|  x_max, y_max, x_min, y_min  | integer  | coordinates of the frame containing the face (on processedImage)
|  landmarks                   | array    | list of the coordinates of the frame containing the face-landmarks. Return only if [landmarks plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  execution_time              | object   | execution time of all plugins
|  plugins_versions            | object   | contains information about plugin versions

Example:

```js
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
            console.log(`Oops! There is a problem with recognizing image ${error}`)
        })
```

## Face Verification Service

Face verification service is used for comparing two images. Therefore, a
source image should contain only one face compared to all faces on the
target image.

**Methods:**

### Verify

`verificationService.verify(source_image_location, target_image_location, options)`

Compares two images provided in arguments. Source image should contain
only one face; it is compared to all faces in the target image. The
first two arguments are the image location; it could be a URL or a path
on the local machine.

|  Argument               | Type    | Required  | Notes
|-------------------------|---------|-----------|---------------------------------------------------------------------------
|  source_image_location  | string  | required  | URL, a source image in BLOB format, or a source image from your local machine
|  target_image_location  | string  | required  | URL, target image in BLOB format, or target image from your local machine
|  options                | string  | optional  | Object that defines detection options

Supported options:

|  Option              | Type     | Notes
|----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  det_prob_threshold  | string   | minimum required confidence that a recognized face is a face indeed. Value is between 0.0 and 1.0
|  limit               | integer  | a maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of 0 represents no limit. Default value: 0
|  face_plugins        | string   | comma-separated slugs of face plugins. If empty, no additional information is returned. [Learn more](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md)
|  status              | boolean  | if true, includes system information like execution_time and plugin_version fields. The default value is false

Response:

```json
    {
      "result" : [{
        "source_image_face" : {
          "age" : {
            "probability": 0.9308982491493225,
            "high": 32,
            "low": 25
          },
          "gender" : {
            "probability": 0.9898611307144165,
            "value": "female"
          },
          "mask" : {
            "probability": 0.9999470710754395,
            "value": "without_mask"
          },
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
            "calculator" : 116.0,
            "mask": 36.0
          }
        },
        "face_matches": [
          {
            "age" : {
              "probability": 0.9308982491493225,
              "high": 32,
              "low": 25
            },
            "gender" : {
              "probability": 0.9898611307144165,
              "value": "female"
            },
            "mask" : {
              "probability": 0.9999470710754395,
              "value": "without_mask"
            },
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
              "calculator" : 70.0,
              "mask": 36.0
            }
          }],
        "plugins_versions" : {
          "age" : "agegender.AgeDetector",
          "gender" : "agegender.GenderDetector",
          "detector" : "facenet.FaceDetector",
          "calculator" : "facenet.Calculator",
          "mask": "facemask.MaskDetector"
        }
      }]
    }
```

|  Element                     | Type     | Description
|------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  source_image_face           | object   | additional info about source image face
|  face_matches                | array    | result of face verification
|  age                         | object   | detected age range. Return only if [age plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  gender                      | object   | detected gender. Return only if [gender plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  mask                        | object   | detected mask. Return only if [face mask plugin](https://github.com/exadel-inc/CompreFace/blob/master/docs/Face-services-and-plugins.md) is enabled.
|  embedding                   | array    | face embeddings. Return only if [calculator plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  box                         | object   | list of parameters of the bounding box for this face
|  probability                 | float    | the probability that a found face is a face indeed
|  x_max, y_max, x_min, y_min  | integer  | coordinates of the frame containing the face
|  landmarks                   | array    | list of the coordinates of the frame containing the face-landmarks. Return only if [landmarks plugin](https://github.com/exadel-inc/CompreFace/tree/master/docs/Face-services-and-plugins.md#face-plugins) is enabled
|  similarity                  | float    | the similarity between this face and the face on the source image
|  execution_time              | object   | execution time of all plugins
|  plugins_versions            | object   | contains information about plugin versions

Example:

```js
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
            console.log(`Oops! There is a problem with recognizing image ${error}`)
        })
```

# Contributing

Contributions make the open source community such a fantastic place to
learn, inspire, and create. Therefore, any contributions you make are
greatly appreciated.

1.  Fork the Project
2.  Create your Feature Branch
    (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

After creating your first contributing pull request, you receive a
request to sign our Contributor License Agreement by commenting on your
pull request with a special message.

## Report Bugs

Please report any bugs
[here](https://github.com/exadel-inc/compreface-javascript-sdk/issues).

If you are reporting a bug, please specify:

-   Your operating system name and version
-   Any details about your local setup that might be helpful in
    troubleshooting
-   Detailed steps to reproduce the bug

## Submit Feedback

The best way to send us feedback is to file an issue at
https://github.com/exadel-inc/compreface-javascript-sdk/issues.

If you are proposing a feature, please:

-   Explain in detail how it should work.
-   Keep the scope as narrow as possible to make it easier to implement.

# License info

CompreFace JS SDK is an open-source facial recognition SDK released
under the [Apache 2.0
license](https://www.apache.org/licenses/LICENSE-2.0.html).
