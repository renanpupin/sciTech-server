var expect = require('chai').expect;

describe('Test that tests run', function(done) {
  it('should run a test', function(done) {
    expect(true).to.eql(true);
    done();
  });
});

// describe('homepage', function(){
//   it('should respond to GET',function(done){
//     superagent
//       .get('http://localhost:'+port)
//       .end(function(res){
//         expect(res.status).to.equal(200);
//         done();
//     })
//   })


// describe('GET /', () => {
//   it('should return 200 OK', (done) => {
//     request(app)
//       .get('/')
//       .expect(200, done);
//   });
// });

// describe('GET /api', () => {
//   it('should return 200 OK', (done) => {
//     request(app)
//       .get('/api')
//       .expect(200, done);
//   });
// });