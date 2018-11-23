
var Reader = require('./reader');

module.exports = class IDC {

    constructor(name) {
        this.db = new Reader(name);        
    }

    findInfo(addr, language) {
        var data = this.db.find(addr, language);
        if (data.length > 0) {
            return new IDCInfo(data);
        } else {
            return null;
        }
    }
}

class IDCInfo {

    constructor(data) {
        this.countryName = data[0];
        this.regionName = data[1];
        this.cityName = data[2];
        this.ownerDomain = data[3];
        this.ispDomain = data[4];
        this.idc = data[5];
    }
}