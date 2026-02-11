import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
    .name('create-masti-app')
    .description('CLI to scaffold Masti app stack')
    .version('1.0.0');

program
    .command('init')
    .description('Initialize a new project')
    .option('-n, --name <name>', 'Project name')
    .option('-d, --db-url <url>', 'Database URL')
    .action(async (options) => {
        console.log(chalk.blue('Welcome to create-masti-app!'));

        let answers: { projectName: string; databaseUrl: string } = {
            projectName: '',
            databaseUrl: ''
        };

        if (options.name) {
            answers.projectName = options.name;
        } else {
            const projectAnswer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'What is the name of your project?',
                    default: 'turbo-stack'
                }
            ]);
            answers.projectName = projectAnswer.projectName;
        }

        if (options.dbUrl) {
            answers.databaseUrl = options.dbUrl;
        } else {
            const dbAnswer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'databaseUrl',
                    message: 'Enter your own database URL (or press enter for default):',
                    validate: (input) => input.length > 0 ? true : 'Please enter a valid URL'
                }
            ]);
            answers.databaseUrl = dbAnswer.databaseUrl;
        }

        console.log(chalk.green(`Creating project: ${answers.projectName}`));

        const targetDir = path.join(process.cwd(), answers.projectName);
        const templateDir = path.resolve(__dirname, '../template');

        try {
            await fs.copy(templateDir, targetDir);

            // Create .env file in packages/db
            const dbEnvPath = path.join(targetDir, 'packages/db/.env');
            await fs.writeFile(dbEnvPath, `DATABASE_URL="${answers.databaseUrl}"`);

            // Create .env file in apps/backend
            const backendEnvPath = path.join(targetDir, 'apps/backend/.env');
            await fs.writeFile(backendEnvPath, `DATABASE_URL="${answers.databaseUrl}"`);

            console.log(chalk.green('Project created successfully!'));
            console.log(chalk.white(`
To get started:
  cd ${answers.projectName}
  pnpm install
  pnpm run db:generate
  pnpm dev
`));
        } catch (err) {
            console.error(chalk.red('Error creating project:', err));
        }
    });

program.parse(process.argv);
