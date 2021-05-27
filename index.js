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
let image_id = "3f87a2cd-bf4e-4347-931d-44f7d797fc47";
let key = "63a1f5cf-da50-4316-a1ce-50c13cac121b";

let core = new CompreFace(server, port);
let recognition_service = core.initFaceRecognitionService(key)
let faceCollection = recognition_service.getFaceCollection();
faceCollection.list()
    .then(data => console.log(data))
    .catch(error => console.error(error))