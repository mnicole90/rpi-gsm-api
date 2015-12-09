/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getContact: function (req, res) {
    Contact.find().populate('phones').exec(function (err, contacts) {
      if (err) return res.badRequest(err);
      return res.json(contacts);
    });
  },

  getContactByNickname: function (req, res) {
    Contact.find({nickname: req.param('nickname')}).populate('phones').exec(function (err, contacts) {
      if (err) return res.badRequest(err);
      return res.json(contacts[0]);
    });
  },

  searchContacts: function (req, res) {
    var firstname = '',
      lastname = '',
      nickname = '';

    if (typeof req.param('firstname') !== 'undefined') {
      firstname = req.param('firstname')
    }
    if (typeof req.param('lastname') !== 'undefined') {
      lastname = req.param('lastname')
    }
    if (typeof req.param('nickname') !== 'undefined') {
      nickname = req.param('nickname')
    }

    Contact.find({
      firstname: {
        'contains': firstname
      },
      lastname: {
        'contains': lastname
      },
      nickname: {
        'contains': nickname
      }
    }).populate('phones').exec(function (err, contacts) {
      if (err) return res.badRequest(err);
      return res.json(contacts);
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
              r[0].save(function (err, res) {
                if (err) return res.badRequest(err);
              });
            });
            return res.json(created);
          }
        }
      });
    });
  },

  deleteContact: function (req, res) {
    Contact.destroy({id: req.param('id')}).exec(function (err) {
      if (err) return res.badRequest(err);
      return res.json({deleted: req.param('id')});
    });
  }

};

