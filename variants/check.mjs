import { execSync } from 'child_process';
import { resolve, join } from 'path';
import { existsSync } from 'fs';

const variantDirs = [
  'orientation-variant',
  'flow-direction-variant',
  'size-variant',
  'theme-variant',
  'emphasize-variant',
  'outline-variant',
  'mild-variant',
  'bare-variant',
];

console.log('🧪 Running tests for variant packages...\n');

for (const dir of variantDirs) {
  const fullPath = resolve(dir);
  const pkgJsonPath = join(fullPath, 'package.json');

  if (!existsSync(pkgJsonPath)) {
    console.warn(`⚠️ Skipping ${dir} — no package.json found.`);
    continue;
  }

  console.log(`🔍 Testing ${dir}...`);
  try {
    execSync('npm test', { cwd: fullPath, stdio: 'inherit' });
  } catch (err) {
    console.error(`❌ Tests failed in ${dir}:`, err.message);
  }
}

console.log('\n✅ All test runs attempted.');
