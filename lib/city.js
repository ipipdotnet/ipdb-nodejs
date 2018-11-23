
var Reader = require('./reader');

module.exports = class City {

    constructor(name) {
        this.db = new Reader(name);        
    }

    findInfo(addr, language) {
        var data = this.db.find(addr, language);
        if (data.length > 0) {
            return new CityInfo(data);
        } else {
            return null;
        }
    }
}

class CityInfo {

    constructor(data) {
        var size = data.length;
        this.countryName = getItem(data, size, 1);
        this.regionName = getItem(data, size, 2);
        this.cityName = getItem(data, size, 3);
        this.ownerDomain = getItem(data, size, 4);
        this.ispDomain = getItem(data, size, 5);
        this.latitude = getItem(data, size, 6);
        this.longitude = getItem(data, size, 7);
        this.timezone = getItem(data, size, 8);
        this.utcOffset = getItem(data, size, 9);
        this.chinaAdminCode = getItem(data, size, 10);
        this.iddCode = getItem(data, size, 11);
        this.countryCode = getItem(data, size, 12);
        this.continentCode = getItem(data, size, 13);
        this.idc = getItem(data, size, 14);
        this.baseStation = getItem(data, size, 15);
        this.countryCode3 = getItem(data, size, 16);
        this.europeanUnion = getItem(data, size, 17);
        this.currencyCode = getItem(data, size, 18);
        this.currencyName = getItem(data, size, 19);
        this.anycast = getItem(data, size, 20);
    }
}

function getItem(items, size, index) {
    return size >= index ? items[index - 1] : '';
}