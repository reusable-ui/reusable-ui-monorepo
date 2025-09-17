import { execSync } from 'child_process';
import { resolve, join } from 'path';
import { existsSync } from 'fs';

const variantDirs = [
    'orientation-variant',
    'flow-direction-variant',
    'size-variant',
    'theme-variant',
    'emphasis-variant',
    'outline-variant',
    'mild-variant',
    'bare-variant',
];

console.log('🔧 Compiling variant packages...\n');

for (const dir of variantDirs) {
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
