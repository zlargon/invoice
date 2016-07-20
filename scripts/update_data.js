const fs = require('fs');
const path = require('path');
const lottery = require('receipt-lottery-taiwan');

let orgData = '';
try { orgData = require('../invoice.json') } catch (e) {}

lottery.query((err, data) => {
  if (err) {
    console.error(err.stack);
    return;
  }

  const jsonData = JSON.stringify(data, null, 2);
  if (jsonData === JSON.stringify(orgData, null, 2)) {
    console.log('data has no changed');
    return;
  }

  fs.writeFileSync(
    path.resolve(__dirname, '../invoice.json'), // file path
    jsonData                                    // data
  );
  console.log('data has been updated');
  console.log(jsonData);
});
