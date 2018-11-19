var ip = require("./lib/ip");

var fs = require('fs');

console.log(ip.parse("1.1.1.1").length);
console.log(ip.parse("2001:250:200::").length);
console.log(ip.parse("2001:250:200::ff"));


var data = fs.readFileSync("c:/work/ipdb/city.free.ipdb")

var metaLength = data.readInt32BE();

var buf = new Buffer(metaLength);
data.copy(buf, 0, 4, 4+metaLength)

var meta = JSON.parse(buf.toString());
var body = new Buffer(meta.total_size);

data.copy(body, 0, 4+metaLength);

console.log(meta.node_count);

function _read_node(node, idx) {
    var off = idx * 4 + node * 8;
    return body.readUInt32BE(off, true);
    // return bytes2long(self.data[off], self.data[off + 1], self.data[off + 2], self.data[off + 3]);
}


function _find_node(addr) {
    ipv = ip.parse(addr)
    if (ipv.length == 6) {
        bit_count = 128
    } else {
        bit_count = 32
    }
    _v4offset = 0
    idx = 0
    node = 0
    key = ipv[0]
    if (bit_count == 32) {
        if (_v4offset == 0) {
            i = 0
            while (i < 96){
                if (i >= 80) {
                    node = _read_node(node, 1)
                } else{
                    node = _read_node(node, 0)
                }
                i += 1                
            }

            _v4offset = node
        } else {
            node = _v4offset
        }
    } else {

    }
    console.log("start:" + node);
    packed = ipv
    while (idx < bit_count) {
        if (node > meta.node_count) {
            break;
        }
            
        node = _read_node(node, (1 & (packed[idx >> 3] >> 7 - (idx % 8))))
        idx += 1
    }

    if (node > meta.node_count) {
        return node;
    } else if (node == meta.node_count) {
        return 0;
    } else {
        throw Error("not found")
    }
}

console.log(_resolve(_find_node("255.255.255.255")));

function bytes2long(a, b, c, d) {
    return (a << 24) | (b << 16) | (c << 8) | d;
}

function _resolve(node) {
    resolved = node - meta.node_count + meta.node_count * 8
    size = bytes2long(0, 0, body[resolved], body[resolved + 1])
    if ((resolved+2+size) > body.length) {
        throw Error("database is error");
    }

    console.log(resolved);


    var buf = new Buffer(size);

    body.copy(buf, 0, resolved+2, resolved + 2+size);

    return buf.toString().split("\t")
}

