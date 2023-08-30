const {MongoClient} = require('mongodb');
require('dotenv').config()

async function main(){
    const uri = 'mongodb+srv://js2062:'+process.env.PASSWORD+'@cluster0.iwfcbm2.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await console.log(client.db().admin().listDatabases());
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);