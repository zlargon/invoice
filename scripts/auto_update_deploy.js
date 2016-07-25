const co = require('co');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const lottery = require('receipt-lottery-taiwan');

let orgData = '';
try { orgData = require('../invoice.json') } catch (e) {}

const lotteryQuery = () => new Promise((resolve, reject) => {
  lottery.query((err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  }, 60 * 1000);
});

const wait = (second) => new Promise((resolve, reject) => {
  setTimeout(resolve, second * 1000);
});

// start
co(function * () {
  for (;;) {
    let jsonData;
    try {
      console.log('\nfetch data...');
      const data = yield lotteryQuery();

      jsonData = JSON.stringify(data, null, 2);
      if (jsonData === JSON.stringify(orgData, null, 2)) {
        throw new Error('data has no changed');
      }
    } catch (e) {
      console.log(e);
      console.log('wait a minute...');
      yield wait(60);
      continue;
    }

    fs.writeFileSync(
      path.resolve(__dirname, '../invoice.json'), // file path
      jsonData                                    // data
    );
    console.log('data has been updated');
    console.log(jsonData);

    // deploy
    const log = exec('sh ./deploy.sh');
    console.log(log.toString());
    return;
  }
})
.catch(console.error);
