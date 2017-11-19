const utils = {
  importAccount(web3, key, pass) {
    web3.personal.importRawKey(key, pass)
  },

  calculateGuaranteeTime(timeOfBuying, during) {
    const date = new Date(parseInt(timeOfBuying));
    return date.setMonth(date.getMonth() + parseInt(during));
  },

  fromHex(h) {
    h = h.slice(2);
    var s = ''
    for (var i = 0; i < h.length; i+=2) {
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
    }
    s = decodeURIComponent(escape(s));
    return s.slice(0, s.indexOf('\u0000'));
  }
}

module.exports = utils;
