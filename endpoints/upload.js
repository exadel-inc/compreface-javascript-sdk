import { common_functions } from '../functions/index.js';
import { common_endpoints } from '../endpoints/common_endpoints.js';

const upload = (image_data, url, api_key) => {
    const{ isUrl, isPathRelative, isBase64 } = common_functions;
    const { upload_blob, upload_path, upload_url, upload_base64 } = common_endpoints;

    let imageFromUrl = isUrl(image_data),
        imageFromPath = isPathRelative(image_data),
        imageFromBase64 = isBase64(image_data);

        return new Promise((resolve, reject) => {
            if(imageFromUrl){
                upload_url(image_data, url, api_key)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }else if(imageFromBase64){
                upload_base64(image_data, url, api_key)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }else if(imageFromPath){
                upload_path(image_data, url, api_key)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }else {
                upload_blob(image_data, url, api_key)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => {
                        reject(error)
                    })
            }
        })
}

export { upload };