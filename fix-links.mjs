import fs from 'fs';
import path from 'path';

const pkgJson = JSON.parse(fs.readFileSync('packages/eslint-config/package.json', 'utf8'));
const deps = { ...pkgJson.dependencies, ...pkgJson.devDependencies };

const pnpmDir = 'node_modules/.pnpm';
const targetDir = 'packages/eslint-config/node_modules';

fs.mkdirSync(targetDir, { recursive: true });

for (const dep of Object.keys(deps)) {
  if (dep === 'eslint' || dep === 'typescript') continue; // Available in root node_modules
  
  const dirs = fs.readdirSync(pnpmDir);
  const depEscaped = dep.replace('/', '+');
  
  // Find the exact version folder matching the package
  const matchingDir = dirs.find(d => d.startsWith(depEscaped + '@'));
  
  if (matchingDir) {
    const srcPath = path.resolve(pnpmDir, matchingDir, 'node_modules', dep);
    const destPath = path.resolve(targetDir, dep);
    
    if (fs.existsSync(srcPath)) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.symlinkSync(srcPath, destPath, 'junction');
        console.log(`Linked ${dep} -> ${matchingDir}`);
      }
    } else {
      console.log(`Warning: Target source not found inside pnpm dir: ${srcPath}`);
    }
  } else {
    console.log(`Warning: No match found in .pnpm for ${dep}`);
  }
}
