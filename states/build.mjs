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

console.log('🔧 Compiling feature packages...\n');

for (const dir of stateDirs) {
    const fullPath = resolve(dir);
    const tsconfigPath = join(fullPath, 'tsconfig.json');
    
    if (!existsSync(tsconfigPath)) {
        console.warn(`⚠️ Skipping ${dir} — no tsconfig.json found.`);
        continue;
    }
    
    console.log(`📦 Compiling ${dir}...`);
    try {
        execSync('npm run tsc', { cwd: fullPath, stdio: 'inherit' });
    } catch (err) {
        console.error(`❌ Failed to compile ${dir}:`, err.message);
    }
}

console.log('\n✅ All compilations attempted.');
