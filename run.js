var config = require("./aws.config.json")
var AWS = require('aws-sdk');
var _ = require("underscore");

// AWS node.js API reference links for endpoints used:
//
// AWS.Config.update                       http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#update-property
// SNS.listEndpointsByPlatformApplication: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html#listEndpointsByPlatformApplication-property
// AWS.Request.eachPage:                   http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Request.html#eachPage-property
// SNS.setEndpointAttributes:              http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html#setEndpointAttributes-property


AWS.config.update({
  accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region
});

var sns = new AWS.SNS();

var pages = 1;
var params = {
  PlatformApplicationArn: config.platformApplicationArn,
};
var req = sns.listEndpointsByPlatformApplication(params)
  .eachPage(function(err, data) {
    if (err) console.log("error fetching page " + pages);
    if (!data) return // means pagination has finished
    dealWithData(data);
    pages++;
  });


var dealWithData = function (data) {
  _.each(data["Endpoints"], function(item) {

    var endpointArn = item["EndpointArn"]
    var params = {
      Attributes: { // required
        Enabled: "true",
      },
      EndpointArn: endpointArn // required
    };
    sns.setEndpointAttributes(params, function(err, data) {
      if (err) console.log("ERROR: " + endpointArn);
      else console.log("OK: " + endpointArn);
    });

  });
}
