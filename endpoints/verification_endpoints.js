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
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const verification_endpoints = {
    /**
     * Verify face(s) from given image
     * @param {String} source_image_path 
     * @param {String} target_image_path 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
     async verify_face_request(source_image_path, target_image_path, url, api_key ){
        var bodyFormData = new FormData();
        bodyFormData.append('source_image', fs.createReadStream(source_image_path), { knownLength: fs.statSync(source_image_path).size }); 
        bodyFormData.append('target_image', fs.createReadStream(target_image_path), { knownLength: fs.statSync(target_image_path).size }); 

        return new Promise( async (resolve, reject) => {
            try {
                const response = await axios.post( url, bodyFormData, {
                    headers: {
                        ...bodyFormData.getHeaders(),
                        "Content-Length": bodyFormData.getLengthSync(),
                        "x-api-key": api_key
                    },
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    },
}

export { verification_endpoints }