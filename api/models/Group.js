/**
* Groupe.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name: {
      type: 'string'
    },

    campaigns: {
      collection: 'campaign',
      via: 'groups'
    },

    contacts: {
      collection: 'contact',
      via: 'groups'
    }

  }
};

