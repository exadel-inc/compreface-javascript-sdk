import { common_functions } from '../functions/index.js';

test("Check passed value is base64 or not", () => {
  let base64 = 'cGFzc3dvcmQ=';
  let result = true;

  expect(common_functions.isBase64(base64)).toEqual(result);
})