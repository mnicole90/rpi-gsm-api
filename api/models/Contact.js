/**
 * Contact.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    firstname: {
      type: 'string',
    },

    lastname: {
      type: 'string',
    },

    nickname: {
      type: 'string',
      unique: true
    },

    email: {
      type: 'string'
    },

    password: {
      type: 'string'
    },

    phones: {
      collection: 'phone',
      via: 'owner'
    },

    smsSend: {
      collection: 'sms',
      via: 'recipient'
    },

    smsReceipt: {
      collection: 'sms',
      via: 'sender'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  // Lifecycle Callbacks
  beforeCreate: function (values, cb) {

    // Encrypt password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      cb();
    });
  }

};

