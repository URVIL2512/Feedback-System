import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

        await mongoose.connect(mongoURI, {
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          // Optimize for serverless
          maxPoolSize: 1,
          minPoolSize: 0,
        });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n⚠️  Authentication failed. Please check:');
      console.error('1. Username and password in MongoDB Atlas');
      console.error('2. Database user has proper permissions');
      console.error('3. Network Access allows your IP address');
      console.error('\nCurrent connection string format:');
      console.error('mongodb+srv://<username>:<password>@cluster0.w8ce3ev.mongodb.net/<database>');
    }
    
    if (error.message.includes('not allowed to do action')) {
      console.error('\n⚠️  Permission denied. Please check MongoDB Atlas:');
      console.error('1. Go to MongoDB Atlas → Database Access');
      console.error('2. Click on your user (Feedback)');
      console.error('3. Under "Database User Privileges", select:');
      console.error('   - "Atlas admin" OR');
      console.error('   - "Read and write to any database"');
      console.error('4. Click "Update User"');
    }
    
    process.exit(1);
  }
};

export default connectDB;

