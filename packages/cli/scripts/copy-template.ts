import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../../../');
const templateDir = path.resolve(__dirname, '../template');

const exclude = [
    'node_modules',
    'dist',
    '.turbo',
    '.next',
    '.git',
    '.vscode',
    path.join('packages', 'cli') // Don't include the CLI itself in the template
];

async function copyTemplate() {
    console.log(`Copying template from ${rootDir} to ${templateDir}...`);

    await fs.ensureDir(templateDir);
    await fs.emptyDir(templateDir);

    const filter = (src: string, dest: string) => {
        const relative = path.relative(rootDir, src);
        // console.log(`Checking ${relative}`);
        if (!relative) return true; // root

        // Check if path contains any excluded directory
        const parts = relative.split(path.sep);
        for (const part of parts) {
            if (exclude.includes(part)) return false;
        }

        // Exclude specific paths relative to root
        if (exclude.includes(relative)) {
            console.log(`Excluding relative: ${relative}`);
            return false;
        }

        // Simplify: Don't copy .env files ? Maybe we should but rename to .env.example
        if (path.basename(src) === '.env') return false;

        return true;
    };

    // Copy specific directories to avoid scanning everything
    const toCopy = [
        'apps',
        'packages/db',
        'packages/ui',
        'packages/eslint-config',
        'packages/typescript-config',
        'package.json',
        'pnpm-workspace.yaml',
        'turbo.json',
        '.gitignore',
        '.npmrc', // if exists
        'README.md'
    ];

    for (const item of toCopy) {
        const srcPath = path.join(rootDir, item);
        const destPath = path.join(templateDir, item);
        if (await fs.pathExists(srcPath)) {
            console.log(`Copying ${item}...`);
            await fs.copy(srcPath, destPath, { filter });
        }
    }

    console.log('Template copy complete!');
}

copyTemplate().catch(console.error);
