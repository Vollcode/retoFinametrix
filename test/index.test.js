const assert = require('chai').assert
const app = require('../server.js')
const HelperFunctions = require('../helpers/index')
let request = require('supertest')
let recordsVAModelSchema = require('../models/recordVA')
let recordsVLModelSchema = require('../models/recordVL')
let mongoose = require('mongoose');
let recordVAModel = mongoose.model('recordVAModel', recordsVAModelSchema);
let recordVLModel = mongoose.model('recordVLModel', recordsVLModelSchema);
let helper = new HelperFunctions()

describe("Homepage csv load and query functionality", function(){

  before(function (done) {
    recordVAModel.deleteMany({}, (err) => err);
    recordVLModel.deleteMany({}, (err) => err);
    done()
  })

  it("welcomes the user", function(done){
    request(app).get("/")
      .expect(200)
      .expect(/Finafunds Value/, done)
  })

  it("sends a file", function(done){
    request(app).post("/")

      .attach('file', 'test/fixtures/ejemplo.csv')

      .expect(/Líneas procesadas: 8/)
      .expect(/Errores encontrados: 1/, done)
  })

  it("reads data of uploaded file", function(done){
    request(app).get("/api/performance")

      .query({ ISIN: 'ES0000000001',dateFrom:20000101,dateTo:20000102 })

      .expect(/{\n   "performance": -0.0014478282576136817,\n   "volatility": 0.1484082207965561\n}/, done)
  })


  after(function (done) {
    recordVAModel.deleteMany({}, (err) => err);
    recordVLModel.deleteMany({}, (err) => err);
    done()
  })
})

describe('App helper functions',function(){
  it('app should check that a date has 8 digits', function(){
    let date = '20100809'
    let dateWithsigns = '2010/08/09'
    let dateLessNumbers = '2010080'

    let result = helper.checkDate(date)
    let resultWithSigns = helper.checkDate(dateWithsigns)
    let resultLessNumbers = helper.checkDate(dateLessNumbers)

    assert.equal(result,true)
    assert.equal(resultWithSigns,false)
    assert.equal(resultLessNumbers,false)
  })

  it('app should check that an ISIN has the correct format', function(){
    let ISINCorrect = 'ES0000000001'
    let ISINIncorrect = 'ES000000000'
    let ISINIncorrect2 = 'E0000000001'

    let result = helper.checkISIN(ISINCorrect)
    let resultLessNumbers = helper.checkISIN(ISINIncorrect)
    let resultOneLetter = helper.checkISIN(ISINIncorrect2)

    assert.equal(result,true)
    assert.equal(resultLessNumbers,false)
    assert.equal(resultOneLetter,false)
  })

  it('app should calculate the performance of two different dates', function(){
    let sample = [ { Date: 20000101, Price: '100' },
                 { Date: 20000101, Price: '100,01' },
                 { Date: 20000111, Price: '100' } ]
    let dateFrom = '20000101'
    let dateTo = '20000111'

    let result = helper.calculatePerformance(sample,dateFrom,dateTo)

    assert.equal(result,-0.5000249987500625)
  })

  it('app should calculate the price average', function(){
    let sample = [ { Date: 20000101, Price: '200' },
                 { Date: 20000101, Price: '100,01' },
                 { Date: 20000111, Price: '400' } ]

    let result = helper.calculateAverage(sample)

    assert.equal(result,233.33666666666667)
  })

  it('app should check that prices in file only contains digits and comma', function(){
    let number = '125,0'
    let numberWithLetter = '125a,0'
    let numberWithoutComma = '125'
    let wrongInput = 'n.d'

    let result = helper.checkNumber(number)
    let resultWithLetter = helper.checkNumber(numberWithLetter)
    let resultWithoutComma = helper.checkNumber(numberWithoutComma)
    let resultWrongInput = helper.checkNumber(wrongInput)

    assert.equal(result,true)
    assert.equal(resultWithLetter,false)
    assert.equal(resultWithoutComma,true)
    assert.equal(resultWrongInput,false)
  })

  it('app should calculate the volatility between two different dates', function(){
    let samples = [ { Date: 20000101, Price: '100' },
                  { Date: 20000102, Price: '100,01' },
                  { Date: 20000101, Price: '100,01' },
                  { Date: 20000102, Price: '100' },
                  { Date: 20000103, Price: '100' },
                  { Date: 20000105, Price: '100,01' },
                  { Date: 20000104, Price: '100' },
                  { Date: 20000106, Price: '100,02' },
                  { Date: 20000107, Price: '100,01' },
                  { Date: 20000108, Price: '100' },
                  { Date: 20000109, Price: '100,01' },
                  { Date: 20000110, Price: '100' },
                  { Date: 20000111, Price: '100' } ]
    let average = 100.00538461538461

    let result = helper.calculateVariance(samples,average)

    assert.equal(result,0.00004358974358975357)
  })

})
