import { CompreFace } from '../core/compre_face.js';

let api_key = "your_api_key";
let server = "http://localhost";
let port = 8000;

let main = new CompreFace(server, port);
let service = main.init_recognition_service(api_key);

// Listing images from face collection
service.list()
    .then(res => console.log(res))
    .catch(err => console.log(err))

// Add image to face collection with subject
let subject = "Test case";
service.add_subject("../img/girl.png", subject)
    .then(res => console.log(res))
    .catch(err => console.log(err)) 

// Verify face from image
let image_id = "image_id_from_face_collection";
service.verify_face_from_image("../img/girl.png", image_id)
    .then(res => console.log(res))
    .catch(err => console.log(err))

// Delete a image by id
service.delete(image_id)
    .then(res => console.log(res))
    .catch(err => console.log(err))

// Delete all images by subject name
service.delete_all_subject(subject)
    .then(res => console.log(res))
    .catch(err => console.log(err))

// Delete all images from face collection
service.delete_all()
    .then(res => console.log(res))
    .catch(err => console.log(err))