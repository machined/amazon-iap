var expect = require('chai').expect;
var Verifier = require('../index');

var sharedKey = 'non empty';
var testData = {
  "userId": "l3HL7XppEMhrOGDnur9-ulvqomrSg6qyODKmah76lJU=",
  "sku": "de.test.subscription",
  "purchaseDate": "Mon Mar 30 11:38:15 MESZ 2015",
  "itemType": "SUBSCRIPTION",
  "receiptId": "q1YqVrJSSknVK0ktLtErLk0qTi7KLCjJzM9T0lFKAUoZmhiZmxtYGFmaWppbAMVKgWI5xh4-5hEFBa6-GUX-7i55pUWWuqU5ZYX5uUXB6WaFlf4u3rmJGeZmOV6htkAtJUpWRrUA"
};

describe('verifier', function() {

  beforeEach(function() {
    delete process.env.AMAZON_PRODUCTION_URL;
    delete process.env.AMAZON_SANDBOX_URL;
  });

  describe('configuration', function() {
    it('uses default sandbox config if no env variables are set', function() {
      expect(process.env.AMAZON_SANDBOX_URL).to.be.undefined;
      var verifier = new Verifier({sharedKey: sharedKey});
      expect(verifier.host).to.equal('http://localhost:8080/RVSSandbox/version/1.0/verifyReceiptId/developer/%s/user/%s/receiptId/%s');
    });

    it('uses env variable sandbox value if set instead of default config', function() {
      var newAmazonSandboxUrl = 'http://localhost:9200/RVSSandbox/version/1.0/verifyReceiptId/developer/%s/user/%s/receiptId/%s';
      process.env.AMAZON_SANDBOX_URL = newAmazonSandboxUrl;
      expect(process.env.AMAZON_SANDBOX_URL).to.be.ok;
      verifier = new Verifier({sharedKey: sharedKey});
      expect(verifier.host).to.equal(newAmazonSandboxUrl);
    });

    it('uses default production config if options.production is set and no env variables are set', function() {
      expect(process.env.AMAZON_PRODUCTION_URL).to.be.undefined;
      var verifier = new Verifier({sharedKey: sharedKey, production: true});
      expect(verifier.host).to.equal('https://appstore-sdk.amazon.com/version/1.0/verifyReceiptId/developer/%s/user/%s/receiptId/%s');
    });

    it('uses env variable production value if set in addition to options.production instead of default config', function() {
      var newAmazonProductionUrl = 'http://MY-TEST-PRODUCTION-URL/version/1.0/verifyReceiptId/developer/%s/user/%s/receiptId/%s';
      process.env.AMAZON_PRODUCTION_URL = newAmazonProductionUrl;
      expect(process.env.AMAZON_PRODUCTION_URL).to.be.ok;
      verifier = new Verifier({sharedKey: sharedKey, production: true});
      expect(verifier.host).to.equal(newAmazonProductionUrl);
    });
  });

  it('successfully verifies a correct subscription receipt', function(done) {
    var verifier = new Verifier({sharedKey: sharedKey});
    verifier.verify(testData, function(err, result) {
      expect(err).to.not.be.ok;
      expect(result).to.be.ok;
      done();
    });
  });
});
