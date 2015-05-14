# Amazon IAP Verifier

Verifies the given receipt data agains the Amazon IAP Server.

### Usage

```javascript
var verifier = new Verifier({sharedKey: sharedKey, production: true});
verifier.verify({userId: "foo", receiptId: "bar"}, function(err, result) {
  if (err) ...
  else console.log(result);
});
```
### License

MIT
