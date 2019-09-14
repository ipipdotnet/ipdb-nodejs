var addr = require("ipaddr.js");

exports.parse = function(ip) {
  var ipv = addr.parse(ip);
  return ipv.toByteArray();
};