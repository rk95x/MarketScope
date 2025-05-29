const { execSync } = require('child_process');
const fs = require('fs');

try {
  // First, ensure .gitignore has the correct entries
  console.log('Updating .gitignore...');
  const gitignoreContent = `
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# scripts
scripts/git-clean.js
`;
  fs.writeFileSync('.gitignore', gitignoreContent);

  // Stage all changes
  console.log('Staging all changes...');
  execSync('git add .', { stdio: 'inherit' });

  // Create a temporary commit
  console.log('Creating temporary commit...');
  execSync('git commit -m "Temporary commit for cleaning"', { stdio: 'inherit' });

  // Remove .env from git history
  console.log('Removing .env from git history...');
  execSync('git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all', { stdio: 'inherit' });

  // Force garbage collection
  console.log('Cleaning up git history...');
  execSync('git gc --aggressive --prune=now', { stdio: 'inherit' });

  // Force push
  console.log('Force pushing to remove sensitive data...');
  execSync('git push -f origin main', { stdio: 'inherit' });

  console.log('Successfully cleaned git repository!');
  console.log('\nIMPORTANT:');
  console.log('1. Your .env file has been removed from git history');
  console.log('2. Make sure to add your environment variables to Vercel');
  console.log('3. Keep your local .env file for development');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
} 