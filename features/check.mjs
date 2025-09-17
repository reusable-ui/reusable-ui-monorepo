import { execSync } from 'child_process';
import { resolve, join } from 'path';
import { existsSync } from 'fs';

const featureDirs = [
    'background-feature',
    'foreground-feature',
    'decoration-feature',
    'border-feature',
    'ring-feature',
    'padding-feature',
    'animation-feature',
    'filter-feature',
    'transform-feature',
    'box-shadow-feature',
];

console.log('🧪 Running tests for feature packages...\n');

for (const dir of featureDirs) {
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
