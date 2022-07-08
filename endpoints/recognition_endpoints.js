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

const recognition_endpoints = {
    /**
     * View list of faces user tried
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async list_request(url, api_key){
        return new Promise( async (resolve, reject) => {
            try {
                const response = await axios.get(url, { 
                    headers: {
                        "x-api-key": api_key 
                    }
                })

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    },

    /**
     * Delete image(s)
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async delete_request(url, api_key){
        return new Promise( async (resolve, reject) => {
            try {
                const response = await axios.delete(url, { 
                    headers: {
                        "x-api-key": api_key
                    }
                }) 

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    },
    
    /**
     * Delete multiple images
     * @param {String} url 
     * @param {String} api_key 
     * @param {String[]} image_ids
     * @returns {Promise}
     */
     async delete_multiple(url, api_key, image_ids){
        return new Promise( async (resolve, reject) => {
            try {
                const response = await axios.post(url, image_ids, { 
                    headers: {
                        "x-api-key": api_key
                    }
                }) 

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

} 

export { recognition_endpoints };

