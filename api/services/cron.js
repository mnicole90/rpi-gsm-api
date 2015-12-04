var CronJob = require('cron').CronJob,
  gsm = rpiGsm;
new CronJob('00 0,30 * * * *', function() {

  gsm.checkAllSMS(function (err, result) {
    if(err) {
      sails.log.error('CRON (error): ', err);
    } else {
      sails.log.verbose('CRON (data): ', result);
    }
  });

}, null, true);
