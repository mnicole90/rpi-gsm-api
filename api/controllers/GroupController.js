/**
 * GroupeController
 *
 * @description :: Server-side logic for managing groupes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getGroups: function (req, res) {
    Group.find().populateAll().exec(function (err, groups) {
      if (err) return res.badRequest(err);
      return res.json(groups);
    });
  },

  getGroupByName: function (req, res) {
    Group.findOne({name: req.param('name')}).populateAll().exec(function (err, group) {
      if (err) return res.badRequest(err);
      return res.json(group);
    });
  },

  updateGroup: function (req, res) {
    Group.update({name: req.param('name')}, req.allParams()).exec(function(err, group) {
      if(err) return res.badRequest(err);
      return res.json(group[0]);
    });
  },

  createGroup: function (req, res) {
    Group.create(
      req.allParams()
    ).exec(function (err, created) {
      if (err) return res.badRequest(err);
      return res.json(created);
    });
  },

  deleteGroup: function (req, res) {
    Group.destroy({id: req.param('id')}).exec(function (err) {
      if (err) return res.badRequest(err);
      return res.json({deletedId: req.param('id')});
    });
  },

  assignContact: function (req, res) {
    Group.findOne({name: req.param('name')}).populate('contacts').exec(function (err, group) {
      if (err) return res.badRequest(err);
      group.contacts.add(req.param('contactId'));
      group.save(function (err, result) {
        if (err) return res.badRequest(err);
        return res.json(result);
      });
    });
  }

};

