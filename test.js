/*


var city = require('./lib/city');

var c = new city("c:/work/ipdb/city.free.ipdb");

var info = c.findInfo("118.28.1.1", "CN");

console.log(info.cityName);
console.log(info);


var Reader = require('./lib/reader');

db = new Reader("c:/work/ipdb/city.free.ipdb");

console.log(db.find("1.1.1.1", "CN"));
*/
var BaseStation = require('./lib/base_station')

var bst = new BaseStation('c:/tiantexin/download/base_station.ipdb');
console.log(bst.findInfo("223.220.231.255", "CN"));