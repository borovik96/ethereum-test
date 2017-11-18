const utils = {
  importAccount(web3, key, pass) {
    web3.personal.importRawKey(key, pass)
  },

  calculateGuaranteeTime(timeOfBuying, during) {
    const date = new Date(timeOfBuying);
    return date.setMonth(d.getMonth() + during);
  }
}

module.exports = utils;
