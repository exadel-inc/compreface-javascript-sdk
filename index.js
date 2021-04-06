/*
 * Copyright (c) 2020 the original author or authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import { CompreFace } from './core/compre_face.js';
let server = "http://localhost";
let port = 8000;
let image_url = "https://media.gettyimages.com/photos/woman-standing-on-city-street-looking-at-camera-picture-id1292452761?s=2048x2048";
let key = "00000000-0000-0000-0000-000000000002";
let image_id = '00000000-0000-0000-0000-000000000022';

let core = new CompreFace(server, port);
let recognition_service = core.initFaceRecognitionService(key);
let faceCollection = recognition_service.getFaceCollection();

faceCollection.verify('../img/girl.png', image_id, {limit: 0, face_plugins: "age,gender"})
    .then(res => console.log(res))
    .catch(error => console.log(error))

// recognition_service.recognize('../img/girl.png', {limit: 0, face_plugins: "age,gender", status: true })
//     .then(res => console.log(JSON.stringify(res)))
//     .catch(error => console.log(error))

// faceCollection.list()
//     .then(res => console.log(res))
//     .catch(error => console.log(error))

// faceCollection.add("../img/girl.png", "Cute girl")
//     .then(res => console.log(res))
//     .catch(error => console.log(error))

// faceCollection.delete_all_subject("Cute girl")
//     .then(res => console.log(res))
//     .catch(error => console.log(error))