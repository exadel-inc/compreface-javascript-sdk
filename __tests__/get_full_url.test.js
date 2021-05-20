import { common_functions } from '../functions/index.js';

test("Construct full url from base url, server and port number", () => {
    let base_url = 'api/v1/detection/detect', 
        server = 'http://localhost', 
        port = 8000;
    let result = 'http://localhost:8000/api/v1/detection/detect';

    expect(common_functions.get_full_url(base_url, server, port)).toEqual(result);
})