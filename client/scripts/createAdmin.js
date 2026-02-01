
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin'],
        default: "admin"
    }
});

const User = mongoose.model('User', userSchema);

// Connection options
const options = {
    bufferCommands: false,
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxIdleTimeMS: 10000,
};

async function createAdminUser() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI not found in .env.local');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, options);
        console.log('✓ Connected to MongoDB');

        // Get user input from command line arguments
        const args = process.argv.slice(2);

        let name, email, phone, password;

        if (args.length === 0) {
            // Interactive mode
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            const question = (prompt) => {
                return new Promise((resolve) => {
                    rl.question(prompt, (answer) => {
                        resolve(answer);
                    });
                });
            };

            console.log('\n--- Create Admin User ---\n');
            name = await question('Enter admin name: ');
            email = await question('Enter admin email: ');
            phone = await question('Enter admin phone: ');
            password = await question('Enter admin password: ');

            rl.close();
        } else if (args.length === 4) {
            // Command line arguments mode
            [name, email, phone, password] = args;
        } else {
            console.error('Usage: node createAdmin.js <name> <email> <phone> <password>');
            console.error('Or run without arguments for interactive mode');
            process.exit(1);
        }

        // Validate inputs
        if (!name || !email || !phone || !password) {
            throw new Error('All fields (name, email, phone, password) are required');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        if (!email.includes('@')) {
            throw new Error('Invalid email format');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error(`User with email "${email}" already exists`);
        }

        // Hash password
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        console.log('Creating admin user...');
        const adminUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();

        console.log('\n✓ Admin user created successfully!');
        console.log('\nAdmin User Details:');
        console.log('-------------------');
        console.log(`Name: ${adminUser.name}`);
        console.log(`Email: ${adminUser.email}`);
        console.log(`Phone: ${adminUser.phone}`);
        console.log(`Role: ${adminUser.role}`);
        console.log(`ID: ${adminUser._id}`);

        await mongoose.disconnect();
        console.log('\n✓ Disconnected from MongoDB');
        process.exit(0);

    } catch (error) {
        console.error('\n✗ Error:', error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
}

createAdminUser();
