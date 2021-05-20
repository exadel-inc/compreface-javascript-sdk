import { common_functions } from '../functions/index.js';

test("Check passed options to services", () => {
    let url = 'http://localhost:8000/api/v1/detection/detect',
        global_options = {
            limit: 1
        },
        local_options = {
            limit: 0,
            det_prob_threshold: 0.5,
            prediction_count: 1,
            face_plugins: 'age,gender',
            status: true
        },
        required_url_parameters = { 
            limit: true,
            det_prob_threshold: true, 
            prediction_count: true,
            face_plugins: true,
            status: true
        };
    let result = 'http://localhost:8000/api/v1/detection/detect?limit=1&det_prob_threshold=0.5&prediction_count=1&face_plugins=age,gender&status=true';
    expect(common_functions.add_options_to_url(url, global_options, local_options, required_url_parameters)).toEqual(result);
})