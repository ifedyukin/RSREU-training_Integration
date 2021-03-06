const MongoClient = require('mongodb').MongoClient;
let _db;

module.exports = {
  connect(url) {
    return MongoClient.connect(url)
      .then(db => (_db = db))
      .catch(err => Promise.reject(err));
  },

  getInstance() {
    if (!_db) {
      throw Error(`You have been disconnected!`);
    }
    return _db;
  },

  getCollection(name) {
    const collection = this.getInstance().collection(name);
    // TODO don't work
    if (!collection) {
      throw Error(`Requested Collection "${name}" not found!`);
    }
    return collection;
  }
};
