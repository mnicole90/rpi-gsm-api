var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/ttyUSB0", {
  baudrate: 115200,
  parser: serialport.parsers.readline("\n")
});

sp.on("open", function () {
  console.log('open');
  sp.on('data', function (data) {
    // Todo: Récupérer ces informations
    console.log(data.toString());
  });
});

module.exports = {

  sendSMS: function (dest, message) {
    sp.write("s\n", function (err, results) {
      if (err) {
        console.error(err);
      } else {
        console.log('results ' + results);
        setTimeout(function () {
          sp.write("0760986611\n", function (err, results) {
            if (err) {
              console.error(err);
            } else {
              console.log('results ' + results);
              setTimeout(function () {
                sp.write("Coucou\n", function (err, results) {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log('results ' + results);

                  }
                });
              }, 10000);
            }
          });
        }, 10000);
      }
    });
  }

};
