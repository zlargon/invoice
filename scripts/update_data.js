const fs = require('fs');
const path = require('path');
const getInvoiceInfo = require('../lib/getInvoiceInfo');

let orgData = '';
try { orgData = require('../data.json') } catch (e) {}

getInvoiceInfo()
.then(data => {
  const jsonData = JSON.stringify(data, null, 2);
  if (jsonData === JSON.stringify(orgData, null, 2)) {
    console.log('data has no changed');
    return;
  }

  fs.writeFileSync(
    path.resolve(__dirname, '../data.json'),  // file path
    jsonData                                  // data
  );
  console.log('data has been updated');
  console.log(jsonData);
})
.catch(console.error);
