var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var sp = new SerialPort("/dev/ttyUSB0", {
  baudrate: 115200,
  parser: serialport.parsers.readline("\n")
}, false);

sp.on('open', function (data) {
  sails.log.verbose('FONA (open): ', data);
});

sp.on('data', function (data) {
  sails.log.verbose('FONA (data): ', data);
});

sp.on('close', function (data) {
  sails.log.verbose('FONA (close): ', data);
});

sp.on('error', function (err) {
  sails.log.error('FONA (error): ', err);
});


module.exports = {

  init: function (callback) {
    sp.open(function (err) {
      if (err) {
        callback(err, false);
      } else {
        callback(false, true);
      }
    });
  },

  reloadConnection: function (callback) {
    var that = this;
    if (sp.isOpen()) {
      sp.close(function (err) {
        if (err) {
          callback(err, false);
        } else {
          that.init(function (err, isOpen) {
            callback(err, isOpen);
          });
        }
      });
    } else {
      that.init(function (err, isOpen) {
        callback(err, isOpen);
      });
    }
  },

  sendSMS: function (recipient, message, callback) {
    if (sp.isOpen()) {

      // Demande d'envoi d'un SMS
      sp.write("s\n", function (err, results) {
        if (err) {
          callback({errorInfos: err, errorDetails: "Impossible d'envoyer la commande d'envoi du SMS."}, false);
        } else {

          sp.drain(function () {
            // Renseignement du numéro de téléphone
            sp.write(recipient + "\n", function (err, results) {
              if (err) {
                callback({errorInfos: err, errorDetails: "Impossible d'envoyer la commande d'envoi du SMS."}, false);
              } else {

                sp.drain(function () {
                  // Envoi du message
                  sp.write(message + "\n", function (err, results) {
                    if (err) {
                      callback({
                        errorInfos: err,
                        errorDetails: "Impossible d'envoyer la commande d'envoi du SMS."
                      }, false);
                    } else {
                      sp.drain(function () {
                        callback(false, {result: "Message en cours d'envoi, se reporter aux logs pour plus d'informations."});
                      });
                    }
                  });
                });

              }
            });
          });

        }
      });

    } else {
      callback({errorInfos: "", errorDetails: "La connexion n'est pas établie, merci d'initialiser le port."}, false)
    }
  },

  checkAllSMS: function () {

  }

};
