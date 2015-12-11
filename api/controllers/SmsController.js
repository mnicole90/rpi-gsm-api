/**
 * SmsController
 *
 * @description :: Server-side logic for managing sms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var gsm = rpiGsm;

module.exports = {

  send: function (req, res) {
    var message,
      recipient;

    if (typeof req.param('message') !== 'undefined') {
      message = req.param('message');
      if (message.length > 140) {
        return res.badRequest({errorMessage: "Le message doit contenir moins de 140 caractères."});
      }
    } else {
      return res.badRequest({errorMessage: "Le message est obligatoire."});
    }

    if (typeof req.param('recipient') !== 'undefined') {
      recipient = req.param('recipient');

      gsm.init(function (err) {
        if (err) return res.badRequest(err);

        gsm.sendSMS(recipient, message, function (err, data) {
          if (err) return res.badRequest(err);

          Phone.findOne({phone: recipient}).exec(function (e, r) {

            Contact.findOne({id: r.owner}).populate('smsSend').exec(function (e, r) {
              r.smsSend.add({
                sender: 2, // Todo: A remplacer par celui qui est connecté à l'API
                recipient: r.owner,
                message: message
              });
              r.save(function (err, result) {
                if (err) sails.log.error('SMS save (error): ', err);;
                sails.log.verbose('SMS save (data): ', result);
              });
            });

          });
          return res.json(data);
        });

      });

    } else {
      return res.badRequest({errorMessage: "Le destinataire est obligatoire."});
    }
  }

};

