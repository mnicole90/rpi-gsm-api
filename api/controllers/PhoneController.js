/**
 * PhoneController
 *
 * @description :: Server-side logic for managing phones
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  updatePhone: function (req, res) {
    // Todo: To be implement !
    return res.json({info: "To be implement !"});
  },

  addPhone: function (req, res) {
    Contact.findOne({nickname: req.param('nickname')}).populate('phones').exec(function (err, contact) {
      if(err) return res.badRequest(err);
      if (req.param('phone') !== 'undefined' && req.param('phone') !== '' && req.param('label') !== 'undefined' && req.param('label') !== '') {
        contact.phones.add({
          label: req.param('label'),
          phone: req.param('phone')
        });
        contact.save(function (err, result) {
          if (err) return res.badRequest(err);
          return res.json(result);
        });
      } else {
        return res.badRequest({errorMessage: 'Les paramètres "phone" et "label" sont obligatoire.'});
      }
    });
  }

};

