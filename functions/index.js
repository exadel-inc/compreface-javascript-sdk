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

// Collection of common functions that used by almost all services
const common_functions = {
    /**
     * Construct full url from given parameters
     * @returns {String}
     */
    get_full_url(base_url, server, port) {
        return `${server}:${port}/${base_url}`;
    },

    /**
     * Check url
     * @param {String} image_url
     * @returns {Boolean}
     */
    isUrl(image_url){
        // regex to check passed parameter is url or relative path
        let urlRegEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        let isUrl = urlRegEX.test(image_url);

        return isUrl;
    },

    /**
     * Check whether string is base64
     * @param {String} path
     * @returns
     */
    isBase64(image_data){
        let base64regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
        let isBase64 = base64regex.test(image_data);

        return isBase64;
    },

    /**
     * Check whether string is relative path or not
     * @param {String} path
     * @returns
     */
    isPathRelative(path) {
        if(typeof path !== 'string') return false;
        let isAbsolute = /^([A-Za-z]:|\.)/.test(path);

        return isAbsolute;
    },

     /**
     * Add extra options to url
     * @param {String} url
     * @param {Object} globalOptions
     * @param {Object} localOptions
     * @param {Object} required_parameters
     * @returns {String}
     */
    add_options_to_url(url, globalOptions, localOptions, required_parameters){
        // merge options passed by localy and globally NOTE: global options will override local on if same value passed from both of them
        let uniqueOptions = {...localOptions, ...globalOptions};
        let isThereAnyOptions = Object.keys(uniqueOptions);
        let isLimitOptionExist = false;

        // check whether any parameters passed
        if(isThereAnyOptions.length > 0){
            // check limit parameter passed and it is allowed for particular endpoint (ex: it is not requrid for add())
            if(uniqueOptions['limit'] >= 0 && required_parameters['limit']){
                isLimitOptionExist = true;
                url = `${url}?limit=${uniqueOptions['limit']}`
            }

            // check det_prob_threshold parameter passed and is it allowed for particular endpoint
            if(uniqueOptions['det_prob_threshold'] >= 0 && required_parameters['det_prob_threshold']){
                url = `${url}${isLimitOptionExist ? '&' : '?'}det_prob_threshold=${uniqueOptions['det_prob_threshold']}`
            }

            // check prediction_count passed and is it allowed for particular endpoint
            if(uniqueOptions['prediction_count'] >= 0 && required_parameters['prediction_count']){
                url = `${url}${isLimitOptionExist ? '&' : '?'}prediction_count=${uniqueOptions['prediction_count']}`
            }

            // check face_plugins passed and is it allowed for particular endpoint
            if(uniqueOptions['face_plugins'] && required_parameters['face_plugins']){
                url = `${url}${isLimitOptionExist ? '&' : '?'}face_plugins=${uniqueOptions['face_plugins']}`
            }

            // check status passed and is it allowed for particular endpoint
            if(uniqueOptions['status'] && required_parameters['status']){
                url = `${url}${isLimitOptionExist ? '&' : '?'}status=${uniqueOptions['status']}`
            }
        }

        return url;
    }
}

export { common_functions }