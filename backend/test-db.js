import connectDB from './config/database.js';
import User from './models/User.js';
import Product from './models/Product.js';

const testDatabase = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    
    // Connect to database
    await connectDB();
    
    console.log('\n📊 Testing User Model...');
    
    // Test creating a user
    const testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'seller'
    });
    
    console.log('✅ Test user created:', testUser.username);
    
    console.log('\n📦 Testing Product Model...');
    
    // Test creating a product
    const testProduct = await Product.create({
      name: 'Modern React Template',
      description: 'A beautiful and modern React template for web applications',
      price: 29.99,
      category: 'web-templates',
      seller: testUser._id,
      images: ['https://example.com/image1.jpg'],
      tags: ['react', 'modern', 'template'],
      features: ['Responsive Design', 'TypeScript', 'Tailwind CSS']
    });
    
    console.log('✅ Test product created:', testProduct.name);
    
    console.log('\n🔍 Testing queries...');
    
    // Test finding users
    const users = await User.find({}).select('-password');
    console.log(`✅ Found ${users.length} users`);
    
    // Test finding products with populated seller
    const products = await Product.find({}).populate('seller', 'username firstName lastName');
    console.log(`✅ Found ${products.length} products`);
    
    console.log('\n🧹 Cleaning up test data...');
    
    // Clean up test data
    await User.findByIdAndDelete(testUser._id);
    await Product.findByIdAndDelete(testProduct._id);
    
    console.log('✅ Test data cleaned up');
    
    console.log('\n🎉 All tests passed! MongoDB connection is working perfectly.');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
};

testDatabase(); 