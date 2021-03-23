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
let image_url = "https://www.youtube.com/watch?v=Bs65qyxglHg";
let key = "00000000-0000-0000-0000-000000000002";
let image_id = '0ef8edcf-42fa-42ff-b6f0-6c15bd27782d';
let options = { limit: 0, det_prob_threshold: 0, prediction_count: 1 }

let core = new CompreFace(server, port, options);
let recognition_service = core.initFaceRecognitionService(key);
let faceCollection = recognition_service.getFaceCollection();

faceCollection.add(image_url, "Vimeo")
    .then(response => console.log(response))
    .catch(error => console.log(error))