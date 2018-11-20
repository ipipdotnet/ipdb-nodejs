var Reader = require('./lib/reader');

db = new Reader("c:/work/ipdb/city.free.ipdb");

console.log(db.find("1.1.1.1", "CN"));

var city = require('./lib/city');

var c = new city("c:/work/ipdb/city.free.ipdb");

var info = c.findInfo("118.28.1.1", "CN");

console.log(info.cityName);
console.log(info);