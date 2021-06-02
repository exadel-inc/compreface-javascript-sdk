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

// Collection of common endpoints that used by almost all services
const common_endpoints = {
    /**
     * @param {String} base64string 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async upload_base64(base64string, url, api_key){
        let data = {
            file: base64string
        }

        return new Promise( async (resolve, reject) => {
            try {
                const response = await axios.post( url, JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json',
                        "x-api-key": api_key
                    },
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    },

    /**
     * @param {Object} blobData 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async upload_blob(blobData, url, api_key){
        var bodyFormData = new FormData();
        bodyFormData.append('file', blobData, 'example.jpg');

        return new Promise( async (resolve, reject) => {
            try {
                const response = await axios.post( url, bodyFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "x-api-key": api_key
                    },
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    },

    /**
     * Upload from local machine
     * @param {String} image_path 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
     async upload_path(image_path, url, api_key ){
        var bodyFormData = new FormData();
        bodyFormData.append('file', fs.createReadStream(image_path), { knownLength: fs.statSync(image_path).size }); 

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

    /**
     * Add image (from url) with subject
     * @param {String} image_url 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async upload_url(image_url, url, api_key){
        var bodyFormData = new FormData();
        
        return new Promise( async (resolve, reject) => {
            await axios.get(image_url, { responseType: 'stream' })
                .then( async (response) => {
                    let image_extention = response.headers['content-type'].split("/")[1]
                    bodyFormData.append('file', response.data, `example.${image_extention}`);   
                    try {
                        const res = await axios.post( url, bodyFormData, {
                            headers: {
                                ...bodyFormData.getHeaders(),
                                "x-api-key": api_key
                            },
                        })

                        resolve(res)
                    } catch (error) {
                        reject(error)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
}

export { common_endpoints }