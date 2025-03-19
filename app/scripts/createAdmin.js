const bcrypt = require('bcryptjs');
const dbConnect = require('../lib/mongoose');
const User = require('../models/User');
const readline = require('readline');

// to create admin account npm run create-admin
// to check admin account npm run check-admin

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(09|07)\d{8}$/;
  return phoneRegex.test(phone);
};

async function createAdmin() {
  try {
    await dbConnect();

    // Get admin credentials interactively
    console.log('\n=== Create Admin Account ===\n');
    
    let phoneNumber;
    do {
      phoneNumber = await question('Enter phone number (must start with 09 or 07, exactly 10 digits): ');
      if (!isValidPhoneNumber(phoneNumber)) {
        console.log('\n❌ Invalid phone number format. Must start with 09 or 07 and be exactly 10 digits\n');
      }
    } while (!isValidPhoneNumber(phoneNumber));

    let password;
    do {
      password = await question('Enter password (minimum 6 characters): ');
      if (password.length < 6) {
        console.log('\n❌ Password must be at least 6 characters long\n');
      }
    } while (password.length < 6);

    const firstName = await question('Enter first name: ');
    const lastName = await question('Enter last name: ');
    
    const adminData = {
      firstName,
      lastName,
      phoneNumber,
      sponsor: 'System',
      position: 'Administrator',
      password: await bcrypt.hash(password, 12),
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ phoneNumber });
    if (existingAdmin) {
      throw new Error('An admin with this phone number already exists');
    }

    // Create admin user
    const admin = await User.create(adminData);
    console.log('\n✅ Admin user created successfully:', {
      name: `${admin.firstName} ${admin.lastName}`,
      phoneNumber: admin.phoneNumber,
      role: admin.role
    });

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

createAdmin(); 