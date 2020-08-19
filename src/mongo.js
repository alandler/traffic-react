//server.js

async function handleCreate(obj){
    return await main("create", [obj]).catch(console.error)
}

async function handleDelete(id){
    return await main("delete", [id]).catch(console.error)
}

async function handleUpdate(id, obj){
    return await main("update", [id, obj]).catch(console.error)
}

async function handleFind(user){
    console.log("Enter handleFind")
    let result =  await main("find", [user]).catch(console.error)
    console.log("Result from handleFind: ", result)
    return result
}



console.log(handleFind("alandler").catch(console.error))

async function getClient(){
    const { MongoClient } = require('mongodb');;
    const uri = "mongodb+srv://alandler:MangoDoMangoDont4@trafficscenarios.gxygq.mongodb.net/TrafficScenarios?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    return client
}

async function main(command, params) {
    console.log("Enter main", command)

    const { MongoClient } = require('mongodb');;
    const uri = "mongodb+srv://alandler:MangoDoMangoDont4@trafficscenarios.gxygq.mongodb.net/TrafficScenarios?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let result = ""

    try {
        console.log("Enter try")
        // Connect to the MongoDB cluster
        const connection = await client.connect();

        console.log("Connected in try")
        
        //Execute command
        if (command === "create"){
            result = await createScenario(client, params[0]);
        }

        if (command === "delete"){
            result = await deleteScenarioById(client, params[0]);
        }

        console.log("Command: ", command, command==="find", command=="find")
        if (command === "find"){
            console.log("Enter create")
            result = await findListingsByUser(client, params[0]);
        }

        if (command === "update"){
            result = await updateListingById(client, params[0], params[1]);
        }


    } catch (e) {
        console.log("Catch", e)
        console.error(e);
    } finally {
        console.log("Finally")
        await client.close();
        return result
    }
}

// main().catch(console.error);

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