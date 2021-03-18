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
import { recognition_endpoints } from '../endpoints/recognition_endpoints.js';

class RecognitionService {
    constructor(server, port, options, key){
        this.server = server;
        this.port = port;
        this.options = options;
        this.key = key;
    }

    /**
     * Construct full url from given server and port number
     * @returns {String}
     */
    get_full_url(){
        let destination = 'api/v1/faces';
        let full_url = `${this.server}:${this.port}/${destination}`;

        return full_url;
    }

    /**
     * Add extra options to url
     * @param {Object} options 
     * @returns {String}
     */
    add_options_to_url(url, localOptions, needLimitOption, needDetOption, needPredictionOption){
        let uniqueOptions = {...localOptions, ...this.options};
        let isThereAnyOptions = Object.keys(uniqueOptions);
        
        // check whether user passed options by main class
        if(isThereAnyOptions.length > 0){
            if(!isNaN(uniqueOptions['limit']) && needLimitOption){
                url = `${url}?limit=${uniqueOptions['limit']}`
            }

            if(!isNaN(uniqueOptions['det_prob_threshold']) && needDetOption){
                url = `${url}&det_prob_threshold=${uniqueOptions['det_prob_threshold']}`
            }

            if(!isNaN(uniqueOptions['prediction_count']) && needPredictionOption){
                url = `${url}&prediction_count=${uniqueOptions['prediction_count']}`
            }
        }

        return url;
    }

    /**
     * Contains functions related to face collection
     * @returns {Object}
     */
    getFaceCollection(){
        let url = this.get_full_url();
        let key = this.key;
        let that = this;

        const faceCollectionFunctions = {
            /**
             * View the list of images in face collection
             * @returns {Promise}
             */
            list(){
                return new Promise((resolve, reject) => {
                    recognition_endpoints.list_request(url, key)
                        .then(response => {
                            return resolve(response.data)
                        })
                        .catch(error => {
                            return reject(error.response.data)
                        })
                })
            },

            /**
             * Add image (with subject) to face collection
             * @param {String} image_path 
             * @param {String} subject 
             * @returns {Promise} 
             */
            add(image_path, subject, options){
                let urlRegEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
                let isUrl = urlRegEX.test(image_path);
                
                // add parameters to basic url
                url = `${url}?subject=${subject}`
                url = that.add_options_to_url(url, options, false, true, false);

                return new Promise((resolve, reject) => {
                    if(isUrl){
                        recognition_endpoints.add_with_url_request(image_path, url, key)
                            .then(response => {
                                return resolve(response.data)
                            })
                            .catch(error => {
                                return reject(error.response.data)
                            })
                    }else {
                        recognition_endpoints.add_request(image_path, url, key)
                            .then(response => {
                                return resolve(response.data)
                            })
                            .catch(error => {
                                return reject(error.response.data)
                            })
                    }
                    
                })            
            },

            /**
             * Recognize face(s) from given image
             * @param {String} image_path 
             * @returns {Promise}
             */
            recognize(image_path, options){
                // add parameters to basic url
                url = `${url}/recognize`;
                url = that.add_options_to_url(url, options, true, true, true);

                return new Promise((resolve, reject) => {
                    recognition_endpoints.recognize_face_request(image_path, url, key)
                        .then(response => {
                            return resolve(response.data)
                        })
                        .catch(error => {
                            return reject(error.response.data)
                        })
                })
        
            },

            /**
             * Verify face from image
             * @param {String} image_path 
             * @param {String} image_id 
             * @returns {Promise}
             */
            verify(image_path, image_id, options){
                // add parameters to basic url
                url = `${url}/${image_id}/verify`;
                url = that.add_options_to_url(url, options, true, true, false);
               
                return new Promise((resolve, reject) => {
                    recognition_endpoints.verify_face_request(image_path, url, key)
                        .then(response => {
                            return resolve(response.data)
                        })
                        .catch(error => {
                            return reject(error.response.data)
                        })
                })
            },

            /**
             * Delete image by id
             * @param {String} image_id 
             * @returns {Promise}
             */
            delete(image_id){
                url = `${url}/${image_id}`;

                return new Promise((resolve, reject) => {
                    recognition_endpoints.delete_request(url, key,)
                        .then(response => {
                            return resolve(response.data);
                        })
                        .catch(error => {
                            return reject(error.response.data);
                        })
                })
            },

            /**
             * Delete image by subject
             * @param {String} subject 
             * @returns {Promise}
             */
            delete_all_subject(subject){
                url = `${url}?subject=${subject}`;

                return new Promise((resolve, reject) => {
                    recognition_endpoints.delete_all_subject_request(url, key)
                        .then(response => {
                            return resolve(response.data);
                        })
                        .catch(error => {
                            return reject(error.response.data);
                        })
                })
            },

            /**
             * Delete all images in face collection
             * @returns {Promise}
             */
            delete_all(){
                return new Promise((resolve, reject) => {
                    recognition_endpoints.delete_all_request(url, key)
                        .then(response => {
                            return resolve(response.data);
                        })
                        .catch(error => {
                            return reject(error.response.data);
                        })
                })
            }
        }

        return faceCollectionFunctions;
    }
}

export { RecognitionService }