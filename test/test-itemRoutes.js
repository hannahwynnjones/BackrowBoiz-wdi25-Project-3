/*global describe, should, expect, it, beforeEach, */
process.env.NODE_ENV = 'test'; // Set the process environment to be test so we don't log Morgan
const chai = require('chai');
const should = require('chai').should();
const expect = require('chai').expect; //requires Chai which is giving us the actualtesting methods (describe, should,expect )
const chaiHttp = require('chai-http');
const server = require('../server');
const app = require('supertest')(require('../server')); // requires the app from server.js and supertest
const ItemList = require('../models/item'); // requires the Model we want to test our restful routing on
chai.use(chaiHttp);

//Create fake data we are going to run our tests on
const testData = [{
  name: 'Ball',
  createdBy: '58d54d45f028b0f6b0375803',
  price: 120,
  image: 'imageofball.jpg',
  description: 'It is round',
  size: 'Small'
},{
  name: 'Ice',
  createdBy: '58d54d45f028b0f6b0375803',
  price: 160,
  image: 'imageofIce',
  description: 'It should be cold',
  size: 'huge'
},{
  name: 'Police',
  createdBy: '58d54d45f028b0f6b0375803',
  price: 890,
  image: 'imageOFpopo',
  description: 'It should be Cold',
  size: 'Medium'
}];
//Runs before each test it will drop a collection and create a new collection to prevent us from passing in reused Data to our tests
beforeEach((done)=>{
  ItemList.collection.drop();
  ItemList.create(testData, done);

});
//<------------------TEST SETUP OVER NOW WE CAN WRITE SOME TEST-------------->
//Describes what we are going to test in this describe block
describe('GET /api/item', ()=>{
// it describes what is going to be logged in the terminal , app.get is the function we testing and expect is the result we expect to get
  it('should return a 200 response', (done)=>{
    app.get('/api/item')
    .end((err, res)=>{
      expect(res.text).to.contain('createdBy');
      expect(res.text).to.contain('price');
      expect(res.text).to.contain('image');
      expect(res.text).to.contain('description');
      expect(res.text).to.contain('size');
      res.should.have.status(200);
      done();
    });
  });

  //Should gives a 404 not found because our URL is false
  it('should return a 404 not found', (done)=>{
    app.get('/api/THISISNOTAURL')
    .end((err, res)=>{
      console.log(res);
      expect(res.body).to.have.property('message').to.equal('Not Found');
      res.should.have.status(404);
      done();
    });
  });

  it('should render Json, return the length and be an array', (done)=>{
    app.get('/api/item')
    .end((err,res)=>{
      //res.should.have.status(200);
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(3);
      expect(res.body).to.be.a('Array');
      done();
    });
  });
});

describe('Post api/item', ()=>{

  it('should return a 201status and have all the properties',(done)=>{
    const item = {
      name: 'Bacon',
      createdBy: '58d54d45f028b0f6b0375803',
      price: 117,
      image: 'ImageofBacon',
      description: 'Sweet Bacon',
      size: 'Hippo'
    };
    app.post('/api/item')
  .send(item)
  .end((err, res)=>{
    console.log(res);
    expect(res.status).to.equal(302);
    expect(res.body).to.be.a('object');
    //expect(res.headers.location).to.equal('/api/item');
    //res.body.should.be.a('object');
    // res.body.should.have.property('name');
    // res.body.should.have.property('price');
    // res.body.should.have.property('createdBy');
    // res.body.should.have.property('size');
    // res.body.should.have.property('image');
    // res.body.should.have.property('description');
    done();

  });
  });
});

describe('PUT api/item/:id', ()=>{

  let oneItem = null;
  beforeEach((done)=>{
    ItemList.findOne({name: 'Ball'}, (err, item)=>{
      oneItem = item;
      done();
    });
  });
  it('should return one item', ()=>{
      //chai.request(server)
    app.get(`/api/item/${oneItem.id}`)
      .end((err, res)=>{
        expect(res.status).to.equal(200);
        expect(res.body).be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('name');
        expect(res.body).name.to.equal('Ball');
        expect(res.body).createdBy.to.equal('58d54d45f028b0f6b0375803');
      });
  });

  it('should update our selected item',(done)=>{
    app.put(`/api/item/${oneItem.id}`)
    .type('form')
    .send({name: 'Miachel Jordan',
      createdBy: '58d54d45f028b0f6b0375803',
      price: 117,
      image: 'ImageofBacon',
      description: 'Sweet Bacon',
      size: 'Hippo'})
    .end((err, respo)=>{
      respo.should.have.status(204);
      respo.should.be.json;
      respo.body.should.be.a('object');
      respo.body.should.have.property('name');
      respo.body.name.should.equal('Miachel Jordan');
      done();
    });
  });
});


describe('GET /api/register', ()=>{
  
  it('should return a 200 responce',(done)=>{
    app.get('/register')
    .end(200, done);
  });
});
