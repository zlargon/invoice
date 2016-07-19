const _async_ = require('co').wrap;
const cheerio = require('cheerio');
const fetch   = require('isomorphic-fetch');

function parse (dom) {
  return dom.find('.t18Red')
    .map((i, e) => e.children[0].data).get()
    .reduce((result, item, index) => {
      let name = null;
      switch (index) {
        case 0: name = '特別獎'; break;
        case 1: name = '特獎'; break;
        case 2: name = '頭獎'; break;
        case 3: name = '增開六獎'; break;
      }

      result[name] = item.trim().split('、');
      return result;
    }, {
      '月份': dom.find('h2').last().text()
    });
}

module.exports = _async_(function * () {
  const url = 'http://invoice.etax.nat.gov.tw/';
  const res = yield fetch(url, {
    timeout: 10 * 1000
  });
  if (res.status !== 200) {
    throw new Error(`request to ${url} failed, status code = ${res.status} (${res.statusText})`);
  }

  const $ = cheerio.load(yield res.text());
  return [
    parse($('#area1')),  // new
    parse($('#area2'))   // old
  ];
});
