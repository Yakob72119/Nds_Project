const dbConnect = require('../lib/mongoose');
const User = require('../models/User');

async function checkDb() {
  try {
    await dbConnect();
    
    // List all databases
    const dbs = await mongoose.connection.db.admin().listDatabases();
    console.log('\nAvailable databases:', dbs.databases.map(db => db.name));

    // Check if our database exists
    console.log('\nCurrent database:', mongoose.connection.db.databaseName);

    // List all collections
    const collections = await mongoose.connection.db.collections();
    console.log('\nCollections:', collections.map(c => c.collectionName));

    // Check users collection
    const users = await User.find({});
    console.log('\nUsers in database:', users.map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      phoneNumber: user.phoneNumber,
      role: user.role
    })));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}

checkDb(); 