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

// Collection of common endpoints that used by almost all services
const common_endpoints = {
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
    }
}

export { common_endpoints }