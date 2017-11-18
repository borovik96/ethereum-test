const utils = {
  importAccount(web3, key, pass) {
    web3.personal.importRawKey(key, pass)
  }
}

module.exports = utils;
