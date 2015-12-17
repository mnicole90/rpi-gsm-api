/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');

module.exports = {

  login: function (req, res) {
    if (typeof req.param('nickname') === 'undefined' || typeof req.param('password') === 'undefined') {
      return res.json({errorMessage: "Les informations de connexion entrées en correspondent pas !"});
    } else {
      Contact.findOne({nickname: req.param('nickname')}).exec(function (err, user) {
        if (err) return res.badRequest(err);
        if (!user) return res.json({errorMessage: "Les informations de connexion entrées en correspondent pas !"});

        bcrypt.compare(req.param('password'), user.password, function (err, result) {
          if (err) return res.badRequest(err);
          if (!result) return res.json({errorMessage: "Les informations de connexion entrées en correspondent pas !"});
          return res.json(user);
        });
      });
    }
  },

  getContacts: function (req, res) {
    Contact.find().populate('phones').exec(function (err, contacts) {
      if (err) return res.badRequest(err);
      return res.json(contacts);
    });
  },

  getContactByNickname: function (req, res) {
    Contact.findOne({nickname: req.param('nickname')}).populateAll().exec(function (err, contact) {
      if (err) return res.badRequest(err);
      return res.json(contact);
    });
  },

  createContact: function (req, res) {
    var phones = (typeof req.param('phones') !== 'undefined') ? JSON.parse(req.param('phones')) : '';

    Contact.create(
      req.allParams()
    ).exec(function (err, created) {
      if (err) return res.badRequest(err);
      Contact.find({id: created.id}).populate('phones').exec(function (e, r) {
        if (phones !== '') {
          if (Array.isArray(phones)) {
            phones.forEach(function (phone) {
              r[0].phones.add({
                label: phone.label,
                phone: phone.phone
              });
              r[0].save(function (err, result) {
                if (err) return res.badRequest(err);
                return res.json(created);
              });
            });
          }
        }
      });
    });
  },

  updateContact: function (req, res) {
    Contact.update({nickname: req.param('nickname')}, req.allParams()).exec(function(err, contact) {
      if(err) return res.badRequest(err);
      return res.json(contact[0]);
    });
  },

  deleteContact: function (req, res) {
    Contact.destroy({id: req.param('id')}).exec(function (err) {
      if (err) return res.badRequest(err);
      return res.json({deletedId: req.param('id')});
    });
  },

  getSMSByNickname: function (req, res) {
    Contact.findOne({nickname: req.param('nickname')}).populateAll().exec(function (err, contact) {
      if (err) return res.badRequest(err);
      var sms = {
        send: contact.smsSend,
        receipt: contact.smsReceipt
      }
      return res.json(sms);
    });
  }

};

