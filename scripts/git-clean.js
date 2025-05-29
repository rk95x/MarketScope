const { execSync } = require('child_process');

try {
  // First, add all untracked files to .gitignore
  console.log('Adding untracked files to .gitignore...');
  execSync('echo "\n.env\nscripts/git-clean.js" >> .gitignore', { stdio: 'inherit' });

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

  // Add .gitignore
  console.log('Adding .gitignore...');
  execSync('git add .gitignore', { stdio: 'inherit' });

  // Create commit
  console.log('Creating commit...');
  execSync('git commit -m "Remove .env from git tracking and add to .gitignore"', { stdio: 'inherit' });

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