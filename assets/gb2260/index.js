var gb2260 = require('gb2260');
gb2260.register('201410', require('gb2260/lib/201410'))
console.log(gb2260)
var gb = new gb2260.GB2260();
console.log(gb)
var division = gb.get("110105")
console.log(division)