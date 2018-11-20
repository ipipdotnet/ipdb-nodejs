var fs = require('fs');
var ip = require('./ip');

module.exports = class Reader {
    constructor (name) {
        var data = fs.readFileSync(name);

        var metaLength = data.readInt32BE();
        
        var buf = new Buffer(metaLength);
        data.copy(buf, 0, 4, 4+metaLength)
        
        this.meta = JSON.parse(buf.toString());
        this.body = new Buffer(this.meta.total_size);
        data.copy(this.body, 0, 4 + metaLength);

        this.v4offset = 0;
    }

    _readNode(node, idx) {
        var off = idx * 4 + node * 8;
        return this.body.readUInt32BE(off, true);
    }

    findNode(addr) {
        
        var bit_count = 0;
        var ipv = ip.parse(addr)
        if (ipv.length == 6) {
            bit_count = 128
        } else {
            bit_count = 32
        }

        var idx = 0
        var node = 0
        if (bit_count == 32) {
            if (this.v4offset == 0) {
                var i = 0
                while (i < 96){
                    if (i >= 80) {
                        node = this._readNode(node, 1)
                    } else{
                        node = this._readNode(node, 0)
                    }
                    i += 1                
                }
    
                this.v4offset = node;
            } else {
                node = this.v4offset;
            }    
        }
        
        while (idx < bit_count) {
            if (node > this.meta.node_count) {
                break;
            }
            
            node = this._readNode(node, (1 & (ipv[idx >> 3] >> 7 - (idx % 8))))
            idx += 1
        }
    console.log(node, this.meta.node_count);
        if (node > this.meta.node_count) {
            return node;
        } else {
            return -1;
        }
    }

    bytes2long(a, b, c, d) {
        return (a << 24) | (b << 16) | (c << 8) | d;
    }

    resolveNode(node) {
        var resolved = node - this.meta.node_count + this.meta.node_count * 8;
        var size = this.bytes2long(0, 0, this.body[resolved], this.body[resolved + 1])
        if ((resolved+2+size) > this.body.length) {
            throw Error("database is error");
        }

        var buf = new Buffer(size);
        this.body.copy(buf, 0, resolved+2, resolved + 2+size);

        return buf
    }

    find(addr, language) {
        if (language === undefined) {
            throw Error("param language is undefined");
        }
        var node = this.findNode(addr);
        if (node <= 0) {
            return [];
        }
        var buf = this.resolveNode(node);
        var tmp = buf.toString().split("\t");
        var off = this.meta.languages[language];

        return tmp.slice(off, off + this.meta.fields.length);
    }
}