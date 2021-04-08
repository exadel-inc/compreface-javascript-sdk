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

import { verification_endpoints } from '../endpoints/verification_endpoints.js'

class VerificationService {
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
        let destination = 'api/v1/verification/verify';
        let full_url = `${this.server}:${this.port}/${destination}`;

        return full_url;
    }
    /**
     * Add extra options to url
     * @param {Object} options 
     * @returns {String}
     */
     add_options_to_url(url, localOptions, required_parameters){
        // merge options passed by localy and globally NOTE: global options will override local on if same value passed from both of them
        let uniqueOptions = {...localOptions, ...this.options};
        let isThereAnyOptions = Object.keys(uniqueOptions);
        
        // check whether any parameters passed
        if(isThereAnyOptions.length > 0){
            // check whether limit parameter passed and it is required for particular endpoint (ex: it is not requrid for add())
            if(uniqueOptions['limit'] >= 0 && required_parameters['limit']){
                url = `${url}?limit=${uniqueOptions['limit']}`
            }

            // check whether det_prob_threshold parameter passed and is it required for particular endpoint
            if(uniqueOptions['det_prob_threshold'] >= 0 && required_parameters['det_prob_threshold']){
                url = `${url}&det_prob_threshold=${uniqueOptions['det_prob_threshold']}`
            }

            // check whether prediction_count passed and is it required for particular endpoint
            if(uniqueOptions['prediction_count'] >= 0 && required_parameters['prediction_count']){
                url = `${url}&prediction_count=${uniqueOptions['prediction_count']}`
            }

            // check whether face_plugins passed and is it required for particular endpoint
            if(uniqueOptions['face_plugins'] && required_parameters['face_plugins']){
                url = `${url}&face_plugins=${uniqueOptions['face_plugins']}`
            }

            // check whether status passed and is it required for particular endpoint
            if(uniqueOptions['status'] && required_parameters['status']){
                url = `${url}&status=${uniqueOptions['status']}`
            }
        }

        return url;
    }

    verify(source_image_path, target_image_path, options){
        // add extra parameter(s) name with true value if it is referenced in API documentation for particular endpoint
        // add_options_to_url() adds this parameter to url if user passes some value as option otherwise function ignores this parameter
        let required_url_parameters = { 
            limit: true,
            det_prob_threshold: true, 
            prediction_count: true,
            face_plugins: true,
            status: true
        };
        // add parameters to basic url
        let url = this.add_options_to_url(this.get_full_url(), options, required_url_parameters);
       
        return new Promise((resolve, reject) => {
            verification_endpoints.verify_face_request(source_image_path, target_image_path, url, this.key)
                .then(response => {
                    resolve(response.data)
                })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    }
}

export { VerificationService }