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

const recognition_endpoints = {
    /**
     * Recognize face(s) from given image
     * @param {String} image_path 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async recognize_face_request(image_path, url, api_key ){
        var bodyFormData = new FormData();
        bodyFormData.append('file', fs.createReadStream(image_path), { knownLength: fs.statSync(image_path).size }); 

        const response = await axios.post( url, bodyFormData, {
            headers: {
                ...bodyFormData.getHeaders(),
                "Content-Length": bodyFormData.getLengthSync(),
                "x-api-key": api_key
            },
        })

        return response;
    },

    /**
     * Verify face(s) from given image
     * @param {String} image_path 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
     async verify_face_request(image_path, url, api_key ){
        var bodyFormData = new FormData();
        bodyFormData.append('file', fs.createReadStream(image_path), { knownLength: fs.statSync(image_path).size }); 

        const response = await axios.post( url, bodyFormData, {
            headers: {
                ...bodyFormData.getHeaders(),
                "Content-Length": bodyFormData.getLengthSync(),
                "x-api-key": api_key
            },
        })

        return response;
    },

    /**
     * Add image with subject
     * @param {String} image_path
     * @param {String} subject 
     * @param {String} api_key
     * @returns {Promise}
     */
    async add_request(image_path, subject, url, api_key){
        url = `${url}?subject=${subject}`
        var bodyFormData = new FormData();
        bodyFormData.append('file', fs.createReadStream(image_path), { knownLength: fs.statSync(image_path).size }); 

        const response = await axios.post( url, bodyFormData, {
            headers: {
                ...bodyFormData.getHeaders(),
                "Content-Length": bodyFormData.getLengthSync(),
                "x-api-key": api_key
            },
        })

        return response;
    },

    /**
     * Add image (from url) with subject
     * @param {String} image_url 
     * @param {String} subject 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    add_with_url_request(image_url, subject, url, api_key){
        url = `${url}?subject=${subject}`
        var bodyFormData = new FormData();
        
        return new Promise( async (resolve, reject) => {
            await axios.get(image_url, { responseType: 'stream' })
            .then( async (response) => {
                bodyFormData.append('file', response.data, 'exadel.png'); 
        
                const res = await axios.post( url, bodyFormData, {
                    headers: {
                        ...bodyFormData.getHeaders(),
                        "x-api-key": api_key
                    },
                })
        
                return resolve(res)
            })
            .catch(error => {
                return reject(error)
            })
        })
    },

    /**
     * View list of faces user tried
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async list_request(url, api_key){
        const response = await axios.get(url, { 
        headers: {
            "x-api-key": api_key
        }})

        return response;
    },

    /**
     * Delete image according to their id number
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async delete_request(url, api_key){
        const response = await axios.delete(url, { 
            headers: {
                "x-api-key": api_key
            }})
    
        return response;
    },

    /**
     * Delete image according to their subject name
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async delete_all_subject_request(url, api_key){
        const response = await axios.delete(url, { 
            headers: {
                "x-api-key": api_key
            }})
    
        return response;
    },

    /**
     * Delete all images
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async delete_all_request(url, api_key){
        const response = await axios.delete(url, { 
            headers: {
                "x-api-key": api_key
            }})
    
        return response;
    }
} 

export { recognition_endpoints };

