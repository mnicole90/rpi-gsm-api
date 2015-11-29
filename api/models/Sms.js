/**
 * Sms.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    sender: {
      model: 'contact'
    },

    recipient: {
      model: 'contact'
    },

    message: {
      type: 'string',
      size: 140
    }

  }
};

