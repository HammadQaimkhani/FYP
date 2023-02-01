const { MongoClient } = require("mongodb");
const { mongoConfig } = require("../config");

class MongoDB {
  static connectToMongoDB = () => {
    MongoClient.connect(mongoConfig.connectionUrl)
      .then((connection) => {
        console.log("MongoDB Connected");
        this.db = connection.db(mongoConfig.database);
      })
      .catch((error) => console.log(`MongoDB not Connected : ${error}`));
  };  
}

MongoDB.db = null;
module.exports = MongoDB;

//--------------Test Connection------------
// const { MongoClient } = require("mongodb");
// const url = "mongodb://127.0.0.1:27017";

// const connection = () => {
//   MongoClient.connect(url)
//   // .then(() => console.log('Connected'))
//   .then((connection) => console.log(connection))
//   .catch((err)=> console.log("not Connected - "+ err))
// };

// module.exports = connection;
