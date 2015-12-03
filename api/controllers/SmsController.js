/**
 * SmsController
 *
 * @description :: Server-side logic for managing sms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var gsm = RpiGSM;

module.exports = {

  send: function(req, res) {
    var message,
      recipient;

    // Todo: Vérifications des paramètres
    message = req.param('message');
    recipient = req.param('recipient');


    gsm.init(function(err) {
      if (err) return res.badRequest(err);

      gsm.sendSMS(recipient, message, function (err, data) {
        if (err) return res.badRequest(err);
        return res.json(data);
      });

    });
  }

};

