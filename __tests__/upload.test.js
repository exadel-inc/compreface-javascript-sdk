import { common_endpoints } from '../endpoints/common_endpoints';
import { jest } from '@jest/globals';

jest.doMock('../endpoints/common_endpoints.js')

it("Check upload function", () => {
    let url = "http://localhost:8000/api/v1/recognition/faces?subject=test";
    let api_key = '63a1f5cf-da50-4316-a1ce-50c13cac121b';
    let image_url = "https://media.gettyimages.com/photos/woman-standing-on-city-street-looking-at-camera-picture-id1292452761?s=2048x2048";
    
    common_endpoints.upload_url(image_url, url, api_key)
    .then(result => {
            expect(result.data).toEqual(undefined)
            expect.assertions(1);
        })
        .catch(error => console.log(error))

})