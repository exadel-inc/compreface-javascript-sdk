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
import { RecognitionService } from '../services/recognition_service.js';
import { VerificationService } from '../services/verification_service.js';
import { DetectionService } from '../services/detection_service.js';
// main class
class CompreFace {
    constructor(server, port, options){
        this.server = server;
        this.port = port;
        this.options = options;
    }
    /**
     * Initialize RecognitionService instance
     * @param {String} api_key 
     * @returns {Object}
     */
    initFaceRecognitionService(api_key){
        let recognition_object = new RecognitionService(this.server, this.port, this.options, api_key)
        return recognition_object;
    }

    /**
     * Initialize VerificationService instance
     * @param {String} api_key 
     * @returns {Object}
     */
    initFaceVerificationService(api_key){
        let verification_object = new VerificationService(this.server, this.port, this.options, api_key)
        return verification_object;
    }

    /**
     * Initialize DetectionService instance
     * @param {String} api_key 
     * @returns {Object}
     */
     initFaceDetectionService(api_key){
        let detection_object = new DetectionService(this.server, this.port, this.options, api_key)
        return detection_object;
    }
}

export { CompreFace };