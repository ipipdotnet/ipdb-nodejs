
var Reader = require('./reader');

module.exports = class City {

    constructor(name) {
        this.db = new Reader(name);        
    }

    findInfo(addr, language) {
        var data = this.db.find(addr, language);

        return new CityInfo(data);
    }
}

class CityInfo {

    constructor(data) {
        this.countryName = data[0];
        this.regionName = data[1];
        this.cityName = data[2];
    }
}