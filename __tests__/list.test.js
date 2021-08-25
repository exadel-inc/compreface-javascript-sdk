import { recognition_endpoints } from '../endpoints/recognition_endpoints.js';
import { jest } from '@jest/globals';

jest.doMock('../endpoints/recognition_endpoints.js')

const expected_res = [{"image_id": "d71b4c82-f02e-4d85-83d4-f2b9dae74640", "subject": "Cute girl"}, {"image_id": "1d00114b-c1c1-4535-b881-ff5c53366e94", "subject": "Cute girl"}];

it("Check list of images in face collection", async () => {
    const result = await recognition_endpoints.list_request("http://localhost:8000/api/v1/recognition/faces", '63a1f5cf-da50-4316-a1ce-50c13cac121b') 
    expect(result.data.faces).toEqual(expected_res)
    expect.assertions(1);
})