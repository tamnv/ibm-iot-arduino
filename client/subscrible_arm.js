var iotf = require("ibmiotf");

var appClientConfig = {
  org: '1sihq1',
  id: 'hackanoi_app',
  "auth-key": 'a-1sihq1-xx',
  "auth-token": 'yourtoken',
  "auth-method": "token",
  "type": "shared"
};

var appClient = new iotf.IotfApplication(appClientConfig);

//setting the log level to debug. By default its 'warn'
appClient.log.setLevel('debug');

appClient.connect();

appClient.on('connect', function () {
	appClient
		.subscribeToDeviceEvents();

});


appClient.on('deviceEvent', function (deviceType, deviceId, eventType, format, payload, topic) {
    console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload + ' topic:'+ topic);

});