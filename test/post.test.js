import { postFunction } from '../src/client/js/post';

describe('Is function defined ?', ()=>{
  test('checking', ()=>{
    expect(postFunction).toBeDefined;
  });
});
