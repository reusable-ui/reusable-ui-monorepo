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

console.log('🔧 Compiling feature packages...\n');

for (const dir of featureDirs) {
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
