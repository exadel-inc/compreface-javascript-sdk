import { RecognitionService } from '../services/recognition_service.js';
// main class
class CompreFace {
    constructor(server, port){
        this.server = server;
        this.port = port;
    }
    /**
     * Initialize RecognitionService instance
     * @param {String} api_key 
     * @returns {Object}
     */
    init_recognition_service(api_key){
        let recognition_object = new RecognitionService(this.server, this.port, api_key)
        return recognition_object;
    }
}

export { CompreFace };