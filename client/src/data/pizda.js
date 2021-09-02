let fs = require('fs');

let list = fs.readFileSync('items_list.json', 'utf8');

list = JSON.parse(list);

console.log(list);
