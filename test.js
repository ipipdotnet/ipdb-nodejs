
var ipdb = require('./index')

function testBaseStation() {
    var bst = new ipdb.BaseStation('c:/tiantexin/download/base_station.ipdb');
    console.log(bst.findInfo("223.220.231.255", "CN"));
}

// testBaseStation();

function testCity() {
    var city = new ipdb.City('c:/work/ipdb/city.free.ipdb');
    console.log(city.findInfo("118.28.1.1", "CN"));
    // console.log(city.findInfo("2001:250:200::", "CN"));
}

testCity();