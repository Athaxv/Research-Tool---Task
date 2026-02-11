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
    .action(async () => {
        console.log(chalk.blue('Welcome to create-masti-app!'));

        // We will implement scaffolding logic here
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'What is the name of your project?',
                default: 'my-masti-app'
            }
        ]);

        console.log(chalk.green(`Creating project: ${answers.projectName}`));

        const targetDir = path.join(process.cwd(), answers.projectName);
        const templateDir = path.resolve(__dirname, '../template');

        try {
            await fs.copy(templateDir, targetDir);
            console.log(chalk.green('Project created successfully!'));
            console.log(chalk.white(`
To get started:
  cd ${answers.projectName}
  pnpm install
  pnpm dev
`));
        } catch (err) {
            console.error(chalk.red('Error creating project:', err));
        }
    });

program.parse(process.argv);
