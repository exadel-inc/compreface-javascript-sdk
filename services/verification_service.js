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
import { common_functions } from '../functions/index.js';

class VerificationService {
    constructor(server, port, options, key){
        this.server = server;
        this.port = port;
        this.options = options;
        this.key = key;
        this.base_url = 'api/v1/verification/verify';
    }

    verify(source_image_path, target_image_path, options){
        const { get_full_url, add_options_to_url, isUrl, isPathRelative, isBase64 } = common_functions;
        // add extra parameter(s) name with true value if it is referenced in API documentation for particular endpoint
        // add_options_to_url() adds this parameter to url if user passes some value as option otherwise function ignores this parameter
        let required_url_parameters = { 
            limit: true,
            det_prob_threshold: true, 
            face_plugins: true,
            status: true
        };

        let full_url = get_full_url(this.base_url, this.server, this.port)
        // add parameters to basic url
        let url = add_options_to_url(full_url, this.options, options, required_url_parameters);
        
        let isSourceImageUrl = isUrl(source_image_path);
        let isTargetImageUrl = isUrl(target_image_path);

        let isSourceRelativePath = isPathRelative(source_image_path);
        let isTargetRelativePath = isPathRelative(target_image_path);

        let isSourceBase64 = isBase64(source_image_path);
        let isTargetBase64 = isBase64(target_image_path);

        return new Promise((resolve, reject) => {
            if(isSourceImageUrl){
                if(isTargetImageUrl){
                    verification_endpoints.both_url_request(source_image_path, target_image_path, url, this.key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }else if(isTargetRelativePath){
                    verification_endpoints.one_url_request(source_image_path, isSourceImageUrl, target_image_path, url, this.key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }else {
                    verification_endpoints.url_blob_request(source_image_path, isSourceImageUrl, target_image_path, url, this.key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }
            }else if(isSourceRelativePath){
                if(isTargetImageUrl){
                    console.log("hey I'm here", isSourceImageUrl)
                    verification_endpoints.one_url_request(source_image_path, isSourceImageUrl, target_image_path, url, this.key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }else if(isTargetRelativePath){
                    verification_endpoints.verify_face_request(source_image_path, target_image_path, url, this.key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }else {
                    verification_endpoints.one_blob_request(source_image_path, false, target_image_path, url, this.key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }
            }else if(isSourceBase64){
                verification_endpoints.base64_request(source_image_path, target_image_path, url, this.key)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }else {
                if(isTargetImageUrl){
                    verification_endpoints.url_blob_request(source_image_path, isSourceImageUrl, target_image_path, url, this.key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }else if(isTargetRelativePath){
                    verification_endpoints.one_blob_request(source_image_path, true, target_image_path, url, this.key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })    
                }else {
                    verification_endpoints.both_blob_request(source_image_path, target_image_path, url, this.key)
                        .then(response => {
                            resolve(response.data)
                        })
                        .catch(error => {
                            reject(error)
                        })
                }
            }
        })
    }
}

export { VerificationService }