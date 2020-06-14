const app = require('../src/server/server') 
const test = require('supertest')
const req = test(app)
it('Gets the test endpoint', async done => { 
  const res = await req.get('/test') 
  done()
})