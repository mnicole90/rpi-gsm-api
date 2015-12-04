var CronJob = require('cron').CronJob;
new CronJob('00 0,30 * * * *', function() {

  rpiGsm.checkAllSMS(function (err, result) {
    if(err) {
      sails.log.error('CRON (error): ', err);
    } else {
      sails.log.verbose('CRON (data): ', result);
    }
  });

}, null, true);
