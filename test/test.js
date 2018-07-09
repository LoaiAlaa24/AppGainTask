var server = require('../app');
var chai = require('chai');
var should = chai.should();
var shortLink = require("../api/models/shortlink.model.js");

chaiHttp = require('chai-http');

chai.use(chaiHttp);



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


  describe('Testing posting shortlinks' , function() {
    it('Post shortlinks : should post shortlinks correctly without slug' , function(done) {
      this.timeout(10000);
      var sLinktest ={
        web: "http://www.google.com",
        androidFallback :'http://android.google.com',
        androidPrimary:'http://androidPri.google.com',
        iosFallback :'http://ios.google.com',
        iosPrimary:'http://iosPri.google.com',
      };
      chai.request(server).post('/api/shortlinks').send(sLinktest).end(function(err ,res) {
        res.status.should.be.eql(201);
        res.body.should.have.property('msg');
        res.body.msg.should.be.eql('ShortLink was created successfully.');
        done();
      });
    });
    it('Post shortlinks : should post shortlinks correctly with slug' , function(done) {
        this.timeout(10000);
        var sLinktest ={
          web: "http://www.google.com",
          androidFallback :'http://android.google.com',
          androidPrimary:'http://androidPri.google.com',
          iosFallback :'http://ios.google.com',
          iosPrimary:'http://iosPri.google.com',
          slug:"slug"
        };
        chai.request(server).post('/api/shortlinks').send(sLinktest).end(function(err ,res) {
          res.status.should.be.eql(201);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('ShortLink was created successfully.');
          done();
        });
      });
      it('Post shortlinks : should not post shortlinks correctly with slug ' , function(done) {
        this.timeout(10000);
        var sLinktest ={
          web: "http://www.fb.com",
          androidFallback :'http://android.fb.com',
          androidPrimary:'http://androidPri.fb.com',
          iosFallback :'http://ios.fb.com',
          iosPrimary:'http://iosPri.fb.com',
          slug:"slug"
        };
        chai.request(server).post('/api/shortlinks').send(sLinktest).end(function(err ,res) {
          res.status.should.be.eql(422);
          res.body.should.have.property('msg');
          res.body.msg.should.be.eql('Slug already exist!');
          done();
        });
      });
  });