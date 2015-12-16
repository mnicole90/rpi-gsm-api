/**
 * CampagneController
 *
 * @description :: Server-side logic for managing campagnes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getCampaigns: function (req, res) {
    Campaign.find().populateAll().exec(function (err, campaigns) {
      if (err) return res.badRequest(err);
      return res.json(campaigns);
    });
  },

  getCampaignByName: function (req, res) {
    Campaign.findOne({name: req.param('name')}).populateAll().exec(function (err, campaign) {
      if (err) return res.badRequest(err);
      return res.json(campaign);
    });
  },

  updateCampaign: function (req, res) {
    Campaign.update({name: req.param('name')}, req.allParams()).exec(function(err, campaign) {
      if(err) return res.badRequest(err);
      return res.json(campaign[0]);
    });
  },

  createCampaign: function (req, res) {
    Campaign.create(
      req.allParams()
    ).exec(function (err, created) {
      if (err) return res.badRequest(err);
      return res.json(created);
    });
  },

  deleteCampaign: function (req, res) {
    Campaign.destroy({id: req.param('id')}).exec(function (err) {
      if (err) return res.badRequest(err);
      return res.json({deletedId: req.param('id')});
    });
  },

  assignGroup: function (req, res) {
    Campaign.findOne({name: req.param('name')}).populate('groups').exec(function (err, campaign) {
      if (err) return res.badRequest(err);
      campaign.groups.add(req.param('groupId'));
      campaign.save(function (err, result) {
        if (err) return res.badRequest(err);
        return res.json(result);
      });
    });
  }

};

