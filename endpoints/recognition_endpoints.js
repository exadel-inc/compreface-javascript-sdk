import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const recognition_endpoints = {
    /**
     * Recognize face(s) from given image
     * @param {String} image_path 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async recognize_face_request(image_path, url, api_key ){
        var bodyFormData = new FormData();
        bodyFormData.append('file', fs.createReadStream(image_path), { knownLength: fs.statSync(image_path).size }); 

        const response = await axios.post( url, bodyFormData, {
            headers: {
                ...bodyFormData.getHeaders(),
                "Content-Length": bodyFormData.getLengthSync(),
                "x-api-key": api_key
            },
        })

        return response;
    },

    /**
     * Verify face(s) from given image
     * @param {String} image_path 
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
     async verify_face_request(image_path, url, api_key ){
        var bodyFormData = new FormData();
        bodyFormData.append('file', fs.createReadStream(image_path), { knownLength: fs.statSync(image_path).size }); 

        const response = await axios.post( url, bodyFormData, {
            headers: {
                ...bodyFormData.getHeaders(),
                "Content-Length": bodyFormData.getLengthSync(),
                "x-api-key": api_key
            },
        })

        return response;
    },

    /**
     * Add image with subject
     * @param {String} image_path
     * @param {String} subject 
     * @param {String} api_key
     * @returns {Promise}
     */
    async add_subject_request(image_path, subject, url, api_key){
        url = `${url}?subject=${subject}`
        var bodyFormData = new FormData();
        bodyFormData.append('file', fs.createReadStream(image_path), { knownLength: fs.statSync(image_path).size }); 

        const response = await axios.post( url, bodyFormData, {
            headers: {
                ...bodyFormData.getHeaders(),
                "Content-Length": bodyFormData.getLengthSync(),
                "x-api-key": api_key
            },
        })

        return response;
    },

    /**
     * View list of faces user tried
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async list_request(url, api_key){
        const response = await axios.get(url, { 
        headers: {
            "x-api-key": api_key
        }})

        return response;
    },

    /**
     * Delete image according to their id number
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async delete_request(url, api_key){
        const response = await axios.delete(url, { 
            headers: {
                "x-api-key": api_key
            }})
    
        return response;
    },

    /**
     * Delete image according to their subject name
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async delete_all_subject_request(url, api_key){
        const response = await axios.delete(url, { 
            headers: {
                "x-api-key": api_key
            }})
    
        return response;
    },

    /**
     * Delete all images
     * @param {String} url 
     * @param {String} api_key 
     * @returns {Promise}
     */
    async delete_all_request(url, api_key){
        const response = await axios.delete(url, { 
            headers: {
                "x-api-key": api_key
            }})
    
        return response;
    }
} 

export { recognition_endpoints };

