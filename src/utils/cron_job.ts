import { CronJob } from 'cron';
import helper_functions from './helper_functions'
import domain_service from '../services/domain_service'
import logger from './logger'
let newjob;
const job = new CronJob('* * * * * *', () => {
    console.log('Tik');
}, null, true, 'Asia/Kolkata');
job.start();

 newjob =  new CronJob({
    cronTime: '* * * * * *',
    onTick: function () {
      // calling my function
      console.log('Invoked')
    },
    start: true,
    timeZone: 'Asia/Kolkata'
  })

  newjob.start();


