var request = require('request');
var _ = require('lodash');
var util = require('util');

module.exports = Verifier;
function Verifier(options) {
  this.options = options || {};
}

Verifier.prototype.verify = function(receipt, cb) {
  var urlPattern = "https://appstore-sdk.amazon.com/version/1.0/verifyReceiptId/developer/%s/user/%s/receiptId/%s";
  var finalUrl = util.format(urlPattern, encodeURIComponent(this.options.sharedKey), encodeURIComponent(receipt.userId), encodeURIComponent(receipt.receiptId));
  request({
    url: finalUrl,
    json: true
  }, function(err, res, body) {
    if (err) {
      return cb(err);
    }
    if (res.statusCode === 400) {
      return cb(new Error('Amazon RVS Error: Invalid receiptID'));
    } else if (res.statusCode === 496) {
      return cb(new Error('Amazon RVS Error: Invalid developerSecret'));
    } else if (res.statusCode === 497) {
      return cb(new Error('Amazon RVS Error: Invalid userId'));
    } else if (res.statusCode === 500) {
      return cb(new Error('Amazon RVS Error: Internal Server Error'));
    } else if (res.statusCode !== 200) {
      return cb(new Error('Amazon RVS Error: Unknown other error'));
    }
    if (_.every(['productId', 'productType', 'purchaseDate'], Object.prototype.hasOwnProperty, body)) {
      cb(null, body);
    } else {
      cb(new Error("body did not contain expected json object"));
    }
  });
};
