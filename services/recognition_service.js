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
import { common_functions } from '../functions/index.js';
import { subject_endpoints } from '../endpoints/subject_endpoints.js';
import { upload } from '../endpoints/upload.js';

class RecognitionService {
    constructor(server, port, options, key){
        this.server = server;
        this.port = port;
        this.options = options;
        this.key = key;
        this.base_url = 'api/v1/recognition/faces';
        this.recognize_base_url = "api/v1/recognition/recognize";
    }

    /**
     * Recognize face(s) from given image
     * @param {String} image_path 
     * @returns {Promise}
     */
    recognize(image_path, options){
        const{ get_full_url, add_options_to_url, isUrl, isPathRelative } = common_functions;
        // add_options_to_url() adds this parameter to url if user passes some value as option otherwise function ignores this parameter
        let required_url_parameters = {
            limit: true, 
            det_prob_threshold: true, 
            prediction_count: true,
            face_plugins: true,
            status: true
        };

		if (!options.limit) {
			options = { ...options, limit: 0 };
		}

        // add parameters to basic url
        let full_url = get_full_url(this.recognize_base_url, this.server, this.port)
        let url = add_options_to_url(full_url, this.options, options, required_url_parameters);

        return new Promise((resolve, reject) => {
            upload(image_path, url, this.key)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
            
        })  
    }

    /**
     * Contains functions related to face collection
     * @returns {Object}
     */
    getFaceCollection(){
        const{ get_full_url, add_options_to_url, isUrl, isPathRelative } = common_functions;

        let url = get_full_url(this.base_url, this.server, this.port)
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
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
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
                // add_options_to_url() adds this parameter to url if user passes some value as option otherwise function ignores this parameter
                let required_url_parameters = { det_prob_threshold: true };
                
                // add parameters to basic url
                let url = get_full_url(that.base_url, that.server, that.port)
                url = `${url}?subject=${subject}`
                url = add_options_to_url(url, that.options, options, required_url_parameters);

                return new Promise((resolve, reject) => {
                    upload(image_path, url, key)
                        .then(response => {
                            resolve(response)
                        })
                        .catch(error => {
                            reject(error)
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
                // add_options_to_url() adds this parameter to url if user passes some value as option otherwise function ignores this parameter
                let required_url_parameters = { 
                    limit: true,
                    det_prob_threshold: true, 
                    face_plugins: true,
                    status: true
                };
                // add parameters to basic url
                url = `${url}/${image_id}/verify`;
                url = add_options_to_url(url, that.options, options, required_url_parameters);
               
                return new Promise((resolve, reject) => {
                    upload(image_path, url, key)
                        .then(response => {
                            resolve(response)
                        })
                        .catch(error => {
                            reject(error)
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
                            resolve(response.data);
                        })
                        .catch(error => {
                            reject(error);
                        })
                })
            },

            /**
			 * Delete multiple images
			 * @param {String[]} image_ids
			 * @returns {Promise}
			 */
			delete_multiple_images(image_ids) {
				url = `${url}/delete`;

				return new Promise((resolve, reject) => {
					recognition_endpoints.delete_multiple(url, key, image_ids)
						.then((response) => {
							resolve(response.data);
						})
						.catch((error) => {
							reject(error);
						});
				});
			},

            /**
             * Delete image by subject
             * @param {String} subject 
             * @returns {Promise}
             */
            delete_all_subject(subject){
                url = `${url}?subject=${subject}`;

                return new Promise((resolve, reject) => {
                    recognition_endpoints.delete_request(url, key)
                        .then(response => {
                            resolve(response.data);
                        })
                        .catch(error => {
                            reject(error);
                        })
                })
            },

            /**
             * Delete all images in face collection
             * @returns {Promise}
             */
            delete_all(){
                return new Promise((resolve, reject) => {
                    recognition_endpoints.delete_request(url, key)
                        .then(response => {
                            resolve(response.data);
                        })
                        .catch(error => {
                            reject(error);
                        })
                })
            }
        }

        return faceCollectionFunctions;
    }

    getSubjects(){
        const { get_full_url } = common_functions;
        const { list, add, rename, deleteSubject } = subject_endpoints;

        let base_subject_url = this.base_url.replace('faces', 'subjects');
        let url = get_full_url(base_subject_url, this.server, this.port)
        let key = this.key;

        const subjectFunctions = {
            /**
             * List the subjects
             * @returns {Promise}
             */
            list(){
                return new Promise((resolve, reject) => {
                    list(url, key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
            },

            /**
             * Add subject
             * @param {String} subject
             * @returns {Promise}
             */
            add(subject){
                return new Promise((resolve, reject) => {
                    add(subject, url, key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
            },

            /**
             * Rename the subject
             * @param {String} presentSubjectName
             * @param {String} newSubjectName
             * @returns {Promise}
             */
            rename(presentSubjectName, newSubjectName ){
                url = `${url}/${presentSubjectName}`
                return new Promise((resolve, reject) => {
                    rename(newSubjectName, url, key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
            },

            /**
             * Delete a subject
             * @param {String} subject
             * @returns {Promise}
             */
            delete(subject){
                url = `${url}/${subject}`
                return new Promise((resolve, reject) => {
                    deleteSubject(url, key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
            },

            /**
             * Delete all subject
             * @param {String} subject
             * @returns {Promise}
             */
            deleteAll(){
                return new Promise((resolve, reject) => {
                    deleteSubject(url, key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
            },
        }

        return subjectFunctions;
    }
}

export { RecognitionService }