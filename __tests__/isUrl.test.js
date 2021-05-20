import { common_functions } from '../functions/index.js';

test("Check passed value is url or not", () => {
    let url = "https://gmail.com";
    let result = true;

    expect(common_functions.isUrl(url)).toEqual(result);
})