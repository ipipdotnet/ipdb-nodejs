
var Reader = require('./reader');

module.exports = class BaseStation {

    constructor(name) {
        this.db = new Reader(name);        
    }

    findInfo(addr, language) {
        var data = this.db.find(addr, language);
        if (data.length > 0) {
            return new BaseStationInfo(data);
        } else {
            return null;
        }
    }
}

class BaseStationInfo {

    constructor(data) {
        this.countryName = data[0];
        this.regionName = data[1];
        this.cityName = data[2];
        this.ownerDomain = data[3];
        this.ispDomain = data[4];
        this.baseStation = data[5];
    }
}