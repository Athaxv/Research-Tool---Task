import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
    .name('create-turbo-starter')
    .description('CLI to scaffold Masti app stack')
    .version('1.0.0')
    .option('-n, --name <name>', 'Project name')
    .action(async (options) => {
        try {
            console.log(chalk.bold.blue('\n🚀 Welcome to create-turbo-starter!\n'));

            let projectName = options.name;

            if (!projectName) {
                const answer = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'projectName',
                        message: 'What is the name of your project?',
                        default: 'turbo-stack',
                        validate: (input) => {
                            if (/^([a-z0-9\-\_\.]+)$/.test(input)) return true;
                            return 'Project name may only include letters, numbers, dashes, underscores and dots.';
                        }
                    }
                ]);
                projectName = answer.projectName;
            }

            const targetDir = path.join(process.cwd(), projectName);

            if (fs.existsSync(targetDir)) {
                console.error(chalk.red(`\n❌ Error: Directory "${projectName}" already exists.`));
                process.exit(1);
            }

            const dbAnswer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'dbPreset',
                    message: 'Choose your PostgreSQL setup:',
                    choices: [
                        { name: 'Local PostgreSQL', value: 'local' },
                        { name: 'Neon (Serverless)', value: 'neon' },
                        { name: 'Supabase', value: 'supabase' },
                        { name: 'Custom PostgreSQL URL', value: 'custom' }
                    ]
                }
            ]);

            let databaseUrl = '';

            if (dbAnswer.dbPreset === 'local') {
                const localAnswer = await inquirer.prompt([{
                    type: 'input',
                    name: 'url',
                    message: 'Enter your Local PostgreSQL URL:',
                    default: 'postgresql://postgres:postgres@localhost:5432/my-app',
                    validate: (input) => input.startsWith('postgres') ? true : 'Must start with postgresql://'
                }]);
                databaseUrl = localAnswer.url;
            } else {
                const urlAnswer = await inquirer.prompt([{
                    type: 'input',
                    name: 'url',
                    message: `Enter your ${dbAnswer.dbPreset === 'custom' ? 'PostgreSQL' : dbAnswer.dbPreset} connection string:`,
                    validate: (input) => input.length > 0 ? true : 'URL cannot be empty'
                }]);
                databaseUrl = urlAnswer.url;
            }

            console.log(''); // spacer

            const spinner = ora(`Scaffolding project in ${chalk.bold(targetDir)}...`).start();

            const templateDir = path.resolve(__dirname, '../template');
            await fs.copy(templateDir, targetDir);

            spinner.succeed('Project scaffolded successfully');

            // Env setup
            const envSpinner = ora('Setting up environment variables...').start();

            const envContent = `DATABASE_URL="${databaseUrl}"\n`;

            // Create .env in packages/db
            await fs.writeFile(path.join(targetDir, 'packages/db/.env'), envContent);
            await fs.copy(path.join(targetDir, 'packages/db/.env'), path.join(targetDir, 'packages/db/.env.example')); // Create example

            // Create .env in apps/backend
            await fs.writeFile(path.join(targetDir, 'apps/backend/.env'), envContent);
            await fs.copy(path.join(targetDir, 'apps/backend/.env'), path.join(targetDir, 'apps/backend/.env.example')); // Create example

            envSpinner.succeed('Environment variables configured');

            // Install dependencies
            const installSpinner = ora('Installing dependencies (this may take a minute)...').start();
            try {
                await execa('pnpm', ['install'], { cwd: targetDir });
                installSpinner.succeed('Dependencies installed');
            } catch (error) {
                installSpinner.fail('Failed to install dependencies. Please run "pnpm install" manually.');
            }

            // Generate Prisma Client
            const prismaSpinner = ora('Generating Prisma Client...').start();
            try {
                await execa('pnpm', ['run', 'db:generate'], { cwd: targetDir });
                prismaSpinner.succeed('Prisma Client generated');
            } catch (error) {
                prismaSpinner.warn('Failed to generate Prisma Client. Run "pnpm db:generate" manually.');
            }

            console.log(chalk.bold.green('\n✅ All set! Your project is ready.'));
            console.log(chalk.white(`
Next steps:
  ${chalk.cyan(`cd ${projectName}`)}
  ${chalk.cyan('pnpm dev')}
`));

        } catch (err) {
            console.error(chalk.red('\n❌ Something went wrong:'));
            console.error(err);
            process.exit(1);
        }
    });

program.parse(process.argv);
