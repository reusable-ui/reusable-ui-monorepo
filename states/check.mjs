import { execSync } from 'child_process';
import { resolve, join } from 'path';
import { existsSync } from 'fs';

const stateDirs = [
    'animation-state',
    'effective-state',
    'observer-state',
    'activity-state',
    'transition-state',
    'feedback-state',
    'interaction-state',
    'disabled-state',
    'read-only-state',
    'focus-state',
    'hover-state',
    'press-state',
    'validity-state',
    'drag-state',
    'sort-state',
    'excite-state',
    'collapse-state',
    'active-state',
    'view-state',
];

console.log('🧪 Running tests for feature packages...\n');

for (const dir of stateDirs) {
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
