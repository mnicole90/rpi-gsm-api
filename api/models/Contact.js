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
      type: 'string'
    },

    lastname: {
      type: 'string'
    },

    nickname: {
      type: 'string',
      unique: true,
      required: true
    },

    email: {
      type: 'string',
      unique: true
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

    groups: {
      collection: 'group',
      via: 'contacts'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  // Lifecycle Callbacks

  beforeCreate: function (values, cb) {
    if(typeof values.password !== 'undefined') {
      // Encrypt password
      bcrypt.hash(values.password, 10, function(err, hash) {
        if(err) return cb(err);
        values.password = hash;
        cb();
      });
    } else {
      cb();
    }
  },

  beforeUpdate: function (values, cb) {
    if(typeof values.password !== 'undefined') {
      // Encrypt password
      bcrypt.hash(values.password, 10, function(err, hash) {
        if(err) return cb(err);
        values.password = hash;
        cb();
      });
    } else {
      cb();
    }
  }

};

