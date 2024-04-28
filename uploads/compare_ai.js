const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect the client to the server
        await client.connect();

        console.log('Connected to MongoDB');

        // Create or select a database
        const database = client.db('my_database');

        // Create a collection and schema
        const petsCollection = database.collection('pets');

        // Define the schema
        const schema = {
            name: 'string',
            breed: 'string',
            age: 'number'
        };

        // Create indexes
        await petsCollection.createIndex({ name: 1 });
        await petsCollection.createIndex({ breed: 1 });

        console.log('Database schema created');
    } finally {
        // Close the connection
        await client.close();
    }
}

main().catch(console.error);
