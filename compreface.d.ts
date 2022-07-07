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

declare interface Options {
    limit: number,
    prediction_count?: number,
    face_plugins?: string,
    det_prob_threshold?: number,
    status?: boolean
}
declare interface FaceCollectionAddOptions {
    det_prob_threshold: string
}

declare interface ServiceOptions{
    limit: number,
    face_plugins?: string,
    det_prob_threshold?: number,
    status?: boolean
}

declare interface Detection {
    detect<T>(image_path: string, localOptions?: ServiceOptions): Promise<T>;
}

declare interface Verification {
    verify<T>(source_image_path: string, target_image_path: string, options: ServiceOptions): Promise<T>
}

declare interface Recognition {
    recognize<T>(image_path: string, options: Options): Promise<T>;
    getFaceCollection(): FaceCollectionFunctions;
    subjectFunctions(): SubjectFunctions;
}

declare interface FaceCollectionFunctions {
    /**
     * View the list of images in face collection
     * @returns {Promise}
     */
    list<T>(): Promise<T>,

    /**
     * Add image (with subject) to face collection
     * @param {String} image_path 
     * @param {String} subject 
     * @returns {Promise} 
     */
    add<T>(image_path: string, subject: string, options?: FaceCollectionAddOptions): Promise<T>;

    /**
     * Verify face from image
     * @param {String} image_path 
     * @param {String} image_id 
     * @returns {Promise}
     */
    verify<T>(image_path: string, image_id: string, options?: Options): Promise<T>,

    /**
     * Delete image by id
     * @param {String} image_id 
     * @returns {Promise}
     */
    delete<T>(image_id: string): Promise<T>,

    /**
     * Delete multiple images
     * @param {String[]} image_ids
     * @returns {Promise}
     */
    delete_multiple_images<T>(image_ids: string[]): Promise<T>,
    /**
     * Delete image by subject
     * @param {String} subject 
     * @returns {Promise}
     */
    delete_all_subject<T>(subject: string): Promise<T>,

    /**
     * Delete all images in face collection
     * @returns {Promise}
     */
    delete_all<T>(): Promise<T>,
}

declare interface SubjectFunctions {

    /**
     * List the subjects
     * @returns {Promise}
     */
    list<T>(): Promise<T>,

    /**
     * Add subject
     * @param {String} subject
     * @returns {Promise}
     */
    add<T>(subject: string): Promise<T>,

    /**
     * Rename the subject
     * @param {String} presentSubjectName
     * @param {String} newSubjectName
     * @returns {Promise}
     */
    rename<T>(presentSubjectName: string, newSubjectName: string): Promise<T>,

    /**
     * Delete a subject
     * @param {String} subject
     * @returns {Promise}
     */
    delete<T>(subject: string): Promise<T>,

    /**
     * Delete all subject
     * @param {String} subject
     * @returns {Promise}
     */
    deleteAll<T>(): Promise<T>;
}

export declare class CompreFace {
    constructor(server: string, port: number, options?: Options);

    /**
     * Initialize RecognitionService instance
     * @param {String} api_key 
     * @returns {Object}
     */
    initFaceRecognitionService(api_key: string): Recognition;

    /**
     * Initialize VerificationService instance
     * @param {String} api_key 
     * @returns {Object}
     */
    initFaceVerificationService(api_key: string): Verification;

    /**
     * Initialize DetectionService instance
     * @param {String} api_key 
     * @returns {Object}
     */
    initFaceDetectionService(api_key: string): Detection;
}

