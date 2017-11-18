const utils = {
  importAccount(web3, key, pass) {
    web3.personal.importRawKey(key, pass)
  },

  calculateGuaranteeTime(timeOfBuying, during) {
    const date = new Date(parseInt(imeOfBuying));
    return date.setMonth(date.getMonth() + during);
  }
}

module.exports = utils;
