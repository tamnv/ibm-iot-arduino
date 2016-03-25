var mqtt = require('mqtt');
var properties = require('properties');

properties.parse('./app.properties', {path: true}, function(err, cfg) {
    if (err) {
      console.error('A file named config.properties containing the device registration from the IBM IoT Cloud is missing.');
      console.error('The file must contain the following properties: apikey and apitoken.');
      throw e;
    }
    var org = cfg.apikey.split('-')[1];
    start(cfg.deviceid, cfg.apikey, cfg.apitoken, org + '.messaging.internetofthings.ibmcloud.com', 
      '1883');
  });

function start(deviceId, apiKey, apiToken, mqttHost, mqttPort) {
  var org = apiKey.split('-')[1];
  var clientId = ['a', org, deviceId].join(':');
  var client = mqtt.connect("mqtt://" + mqttHost + ":" + mqttPort, {
              "clientId" : clientId,
              "keepalive" : 30,
              "username" : apiKey,
              "password" : apiToken
            });
  client.on('connect', function() {
    console.log('MQTT client connected to IBM IoT Cloud.');
    var data = {
      d:0
    };
    client.publish('iot-2/type/arm/id/' + deviceId + '/cmd/blink/fmt/json', JSON.stringify(data), 
    function() {
      console.log('published cmd blink');
      process.exit(0);
    });
  });
  client.on('error', function(err) {
    console.error('client error ' + err);
    process.exit(1);
  });
  client.on('close', function() {
    console.log('client closed');
    process.exit(1);
  });
};
