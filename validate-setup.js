#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🧪 Validating npm ci setup...\n');

try {
  // Check that package files exist
  if (!fs.existsSync('package.json')) {
    throw new Error('package.json not found');
  }
  if (!fs.existsSync('package-lock.json')) {
    throw new Error('package-lock.json not found');
  }
  console.log('✅ Package files exist');

  // Test npm ci
  console.log('🔧 Testing npm ci...');
  const result = execSync('npm ci', { encoding: 'utf8', stdio: 'pipe' });
  console.log('✅ npm ci successful');

  // Test build
  console.log('🔨 Testing build...');
  execSync('npm run build', { encoding: 'utf8', stdio: 'pipe' });
  console.log('✅ Build successful');

  // Check dist folder
  if (!fs.existsSync('dist/index.html')) {
    throw new Error('dist/index.html not found after build');
  }
  console.log('✅ Build output verified');

  console.log('\n🎉 All validation tests PASSED!');
  console.log('📦 npm ci is working correctly');
  console.log('🔨 Build process is working correctly');
  console.log('🚀 Ready for GitHub Actions deployment!');

} catch (error) {
  console.error('\n❌ Validation FAILED:', error.message);
  process.exit(1);
}