//mongo.js

async function main(param) {

    const { MongoClient } = require('mongodb');;
    const uri = "mongodb+srv://alandler:MangoDoMangoDont4@trafficscenarios.gxygq.mongodb.net/TrafficScenarios?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await findListingsByUser(
            client, param
            );

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

let x = main().catch(console.error);
console.log("X: ", x)

async function createScenario(client, newScenario) {
    const result = await client.db("sample_scenario").collection("scenarios").insertOne(newScenario)
    console.log(`Result of createScenario: ${result.insertedId}`)
    return result
}

async function findListingsByUser(client, user) {
    const result = await client.db("sample_scenario").collection("scenarios")
        .find({ username: user });

    if (result) {
        console.log(`Found a scenario in the collection with the username '${user}':`);
        console.log(result);
        return result
    } else {
        console.log(`No scenario found with the username '${user}'`);
        return "Invalid"
    }
}

async function deleteScenarioById(client, scenarioId) {
    const result = await client.db("sample_scenario").collection("scenarios")
            .deleteOne({ _id: scenarioId });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return result
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function updateListingById(client, idOfListing, updatedScenario) {
    const result = await client.db("sample_scenario").collection("scenarios")
                        .updateOne({ _id: idOfListing }, { $set: updatedScenario });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
    return "Success"
}