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

### Testing

There's a sandbox app provided by Amazon that you can use for the local testing and development. Since the sandbox app is written in Java you need to have a JRE set up locally before you start.

1. Download [Tomcat](http://tomcat.apache.org/) and [Amazon Mobile App SDK](https://developer.amazon.com/public/resources/development-tools/sdk)

    ```
    wget http://mirror.hosting90.cz/apache/tomcat/tomcat-8/v8.0.22/bin/apache-tomcat-8.0.22.tar.gz
    wget https://amznadsi-a.akamaihd.net/public/mobileSdkDistribution/Apps-SDK.zip
    tar -xf apache-tomcat-8.0.22.tar.gz
    unzip -d sdk Apps-SDK.zip
    ```
    
2. Deploy the sandbox app to the Tomcat server 

    ```
    cp sdk/Android/InAppPurchasing/2.0/tools/RVSSandbox.war apache-tomcat-8.0.22/webapps
    ```

3. Run Tomcat and verify that the sandbox app is up and running
   
    ```
    ./apache-tomcat-8.0.22/bin/startup.sh
    curl -I http://localhost:8080/RVSSandbox/
    ```
  

### License

MIT
