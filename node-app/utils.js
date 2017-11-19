const utils = {
  importAccount(web3, key, pass) {
    web3.personal.importRawKey(key, pass)
  },

  calculateGuaranteeTime(timeOfBuying, during) {
    const date = new Date(parseInt(timeOfBuying));
    return date.setMonth(date.getMonth() + parseInt(during));
  },

  fromHex(h) {
    var s = ''
    for (var i = 0; i < h.length; i+=2) {
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
    }
    return decodeURIComponent(escape(s))
}

}

module.exports = utils;
