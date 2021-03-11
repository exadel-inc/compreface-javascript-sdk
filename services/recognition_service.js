import { recognition_endpoints } from '../endpoints/recognition_endpoints.js';

class RecognitionService {
    constructor(server, port, key){
        this.server = server;
        this.key = key;
        this.port = port;
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
     * Recognize face(s) from given image
     * @param {String} image_path 
     * @returns {Promise}
     */
    recognize(image_path){
        let url = `${this.get_full_url()}/recognize`;

        return new Promise((resolve, reject) => {
            recognition_endpoints.recognize_face_request(image_path, url, this.key)
                .then(response => {
                    return resolve(response.data)
                })
                .catch(error => {
                    return reject(error.response.data)
                })
        })
        
    }

    /**
     * Verify face from image
     * @param {String} image_path 
     * @param {String} image_id 
     * @returns {Promise}
     */
     verify(image_path, image_id){
        let url = `${this.get_full_url()}/${image_id}/verify`;

        return new Promise((resolve, reject) => {
            recognition_endpoints.verify_face_request(image_path, url, this.key)
                .then(response => {
                    return resolve(response.data)
                })
                .catch(error => {
                    return reject(error.response.data)
                })
        })
    }

    /**
     * Add image (with subject) to face collection
     * @param {String} image_path 
     * @param {String} subject 
     * @returns {Promise} 
     */
    add_subject(image_path, subject){
        let url = this.get_full_url();

        return new Promise((resolve, reject) => {
            recognition_endpoints.add_subject_request(image_path, subject, url, this.key)
                .then(response => {
                    return resolve(response.data)
                })
                .catch(error => {
                    return reject(error.response.data)
                })
        })
    }

    /**
     * View the list of images in face collection
     * @returns {Promise}
     */
    list(){
        let url = this.get_full_url();

        return new Promise((resolve, reject) => {
            recognition_endpoints.list_request(url, this.key)
                .then(response => {
                    return resolve(response.data)
                })
                .catch(error => {
                    return reject(error.response.data)
                })
        })
    }

    /**
     * Delete image by id
     * @param {String} image_id 
     * @returns {Promise}
     */
    delete(image_id){
        let url = `${this.get_full_url()}/${image_id}` ;

        return new Promise((resolve, reject) => {
            recognition_endpoints.delete_request(url, this.key,)
                .then(response => {
                    return resolve(response.data);
                })
                .catch(error => {
                    return reject(error.response.data);
                })
        })
    }

    /**
     * Delete image by subject
     * @param {String} subject 
     * @returns {Promise}
     */
    delete_all_subject(subject){
        let url = `${this.get_full_url()}?subject=${subject}`;

        return new Promise((resolve, reject) => {
            recognition_endpoints.delete_all_subject_request(url, this.key)
                .then(response => {
                    return resolve(response.data);
                })
                .catch(error => {
                    return reject(error.response.data);
                })
        })
    }

    /**
     * Delete all images in face collection
     * @returns {Promise}
     */
    delete_all(){
        let url = this.get_full_url();

        return new Promise((resolve, reject) => {
            recognition_endpoints.delete_all_request(url, this.key)
                .then(response => {
                    return resolve(response.data);
                })
                .catch(error => {
                    return reject(error.response.data);
                })
        })
    }
}

export { RecognitionService }