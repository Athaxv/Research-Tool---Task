import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';

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
    });

program.parse(process.argv);
