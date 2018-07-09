var server = require('../app');
var chai = require('chai');
var should = chai.should();
var shortLink = require("../api/models/shortlink.model.js");

chaiHttp = require('chai-http');

chai.use(chaiHttp);

// describe('Testing getting all shortlinks ' , function() {

//     it('should get all shortlinks on /api/user/login POST',function(done){
//         chai.request(server)
//         .post('/api/shortlinks')
//         .send()
//         .end(function(err,res){
    
//           res.should.have.status(200);
//           res.body.data.should.a('string');
// }



describe('Testing get shortlinks' , function() {
    it('Get shortlinks : should get shortlinks correctly' , function(done) {
      this.timeout(10000);
      chai.request(server).get('/api/shortlinks').send().end(function(err ,res) {
        res.status.should.be.eql(200);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('ShortLinks retrieved successfully.');
        done();
      });
    });
  });