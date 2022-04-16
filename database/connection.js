const { MongoClient, ServerApiVersion } = require('mongodb');
export const uri = "mongodb+srv://sebastian:seb@cluster0.enpab.mongodb.net/cluster0?retryWrites=true&w=majority";
export const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
client.connect(err => {
  client.close();
});
