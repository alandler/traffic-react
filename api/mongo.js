//server.js
async function main() {

    const { MongoClient } = require('mongodb');;
    const uri = "mongodb+srv://alandler:MangoDoMangoDont4@trafficscenarios.gxygq.mongodb.net/TrafficScenarios?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await createScenario(
            client,
            {
                sae: 1,
                elec: 4,
                priv: 13,
                pub: 67,
                intersections: 44,
                passengerCost: .33,
            }
            );

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createScenario(client, newScenario){
   const result = await client.db("sample_scenario").collection("scenarios").insertOne(newScenario)
   console.log(`Result of createScenario: ${result.insertedId}`)
}

async function findOneListingById(client, nameOfListing) {
    result = await client.db("sample_scenario").collection("scenarios")
                        .findOne({ name: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
