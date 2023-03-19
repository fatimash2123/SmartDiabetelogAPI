const request = require('supertest');
const app=require("../app.js")


// request('app')
//   .get('/')
//   .end(function(err, res) {
//         if (err) throw err;
//         console.log(res.body);
//   });

  describe('GET /user', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/')
        .expect(401, done);
    });
  });