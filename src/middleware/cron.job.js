import cron from 'node-cron';

const cronJob = cron.schedule('* * * * *', () => {
    console.log('I am cron job that is running every minute');
},{ scheduled: true, timezone: "Asia/Kolkata" });

export default cronJob




