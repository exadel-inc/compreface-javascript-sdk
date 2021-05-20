import { common_functions } from '../functions/index.js';

test("Check the path of image", () => {
    let path = '../img/girl.png';
    
    expect(common_functions.isPathRelative(path)).toEqual(true);
})