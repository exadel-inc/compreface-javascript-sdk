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
import { common_functions } from '../functions/index.js';
import { upload } from '../endpoints/upload.js';

class DetectionService {
    constructor(server, port, options, key){
        this.server = server;
        this.port = port;
        this.options = options;
        this.key = key;
        this.base_url = 'api/v1/detection/detect';
    }

    /**
     * Detect faces from given image
     * @param {String} image_path 
     * @param {Object} options 
     * @returns 
     */
    detect(image_path, localOptions){
        const { get_full_url, add_options_to_url, isUrl, isPathRelative } = common_functions;
        // add_options_to_url() adds this parameter to url if user passes some value as option otherwise function ignores this parameter
        let required_url_parameters = { 
            limit: true,
            det_prob_threshold: true, 
            face_plugins: true,
            status: true
        };
        let full_url = get_full_url(this.base_url, this.server, this.port)
        // add parameters to basic url
        let url = add_options_to_url(full_url, this.options, localOptions, required_url_parameters);

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
}

export { DetectionService }