/**
 * SmsController
 *
 * @description :: Server-side logic for managing sms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var gsm = rpiGsm;

module.exports = {

  send: function(req, res) {
    var message,
      recipient;

    if(typeof req.param('message') !== 'undefined') {
      message = req.param('message');
      if(messages.length > 140) {
        return res.badRequest({errorMessage: "Le message doit contenir moins de 140 caractères."});
      }
    } else {
      return res.badRequest({errorMessage: "Le message est obligatoire."});
    }

    if(typeof req.param('recipient') !== 'undefined') {
      recipient = req.param('recipient');
      Contact.findOne({id: recipient}).exec(function (err, result) {
        if (err) return res.badRequest(err);

        gsm.init(function(err) {
          if (err) return res.badRequest(err);

          gsm.sendSMS(recipient, message, function (err, data) {
            if (err) return res.badRequest(err);
            return res.json(data);
          });

        });

      });
    } else {
      return res.badRequest({errorMessage: "Le destinataire est obligatoire."});
    }
  }

};

