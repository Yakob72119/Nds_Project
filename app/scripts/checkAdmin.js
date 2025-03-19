const dbConnect = require('../lib/mongoose');
const User = require('../models/User');

async function checkAdmin() {
  try {
    await dbConnect();
    const admins = await User.find({ role: 'admin' });
    console.log('\nAdmin users in database:', admins.map(admin => ({
      name: `${admin.firstName} ${admin.lastName}`,
      phoneNumber: admin.phoneNumber,
      role: admin.role
    })));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit();
  }
}

checkAdmin(); 