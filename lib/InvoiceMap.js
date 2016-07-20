function insert (map, title, prize) {
  prize.numbers.forEach(number => {
    const num = number.slice(-3);

    if (map.hasOwnProperty(num) === false) {
      map[num] = [];
    }

    map[num].push({
      number: number,
      period: title,
      award: prize.name,
      message: prize.description
    });
  });
}

module.exports = (...invoiceInfo) => invoiceInfo.reduce((map, info) => {
  insert(map, info.title, info.super);
  insert(map, info.title, info.special);
  insert(map, info.title, info.addition);
  insert(map, info.title, {
    numbers: info.first.numbers,
    name: `${info.sixth.name} - ${info.first.name}`,
    description: info.sixth.description
  });
  return map;
}, {});
