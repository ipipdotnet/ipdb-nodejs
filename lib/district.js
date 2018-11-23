
var Reader = require('./reader');

module.exports = class District {

    constructor(name) {
        this.db = new Reader(name);        
    }

    findInfo(addr, language) {
        var data = this.db.find(addr, language);
        if (data.length > 0) {
            return new DistrictInfo(data);
        } else {
            return null;
        }
    }
}

class DistrictInfo {

    constructor(data) {
        this.countryName = data[0];
        this.regionName = data[1];
        this.cityName = data[2];
        this.districtName = data[3];
        this.chinaAdminCode = data[4];
        this.coveringRadius = data[5];
        this.longitude = data[6];
        this.latitude = data[7];
    }
}