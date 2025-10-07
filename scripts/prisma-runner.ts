#!/usr/bin/env ts-node

import { execSync } from 'child_process';
import { Command } from 'commander';
import { exists } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const exitsFile = promisify(exists);
const nestJson = require('../nest-cli.json')

enum Action {
    GENERATE = 'generate',
    MIGRATE = 'migrate',
    FORMAT = 'format',
    STUDIO = 'studio',
    RESET = 'reset'
};

const services = Object.keys(nestJson.projects)
    .filter(service => nestJson.projects[service].root.indexOf('apps/microservice') !== -1);

async function runPrisma(action: Action, cwd: string, name: string = 'auto'): Promise<void> {
    const pathToPrisma = join(cwd, 'prisma', 'schema.prisma');
    if (!await exitsFile(pathToPrisma)) {
        console.log(`service <${pathToPrisma}> haven't prisma`);
        return;
    }

    let cmd = '';
    const SCHEMA = `--schema ${pathToPrisma}`;

    if (action === Action.GENERATE) {
        cmd = `npx prisma generate ${SCHEMA}`;
    } else if (action === Action.MIGRATE) {
        cmd = `npx prisma migrate dev ${SCHEMA} --name ${name}`
    } else if (action === Action.RESET) {
        cmd = `npx prisma migrate reset ${SCHEMA}`;
    } else if (action === Action.FORMAT) {
        cmd = `npx prisma format ${SCHEMA}`;
    } else if (action === Action.STUDIO) {
        cmd = `npx prisma studio ${SCHEMA}`
    }

    console.log(`\n→ ${cmd}  (cwd: ${pathToPrisma})`);
    execSync(cmd, { stdio: 'inherit' });
}

function handler() {
    const { all, service, name } = this.opts() as { all?: boolean; service?: string, name?: string };
    const commandName = this.name();

    if (service && !services.includes(service)) {
        console.error(`Неверный аргумент "${service}". Используйте: ${services}`);
        process.exit(1);
    }

    if (all) {
        services.forEach(t => runPrisma(commandName, nestJson.projects[t].root, name))
    } else if (service) {
        runPrisma(commandName, nestJson.projects[service].root, name);
    } else {
        this.help()
    }
}

const program = new Command();

program
    .name('prisma-runner')
    .description('Генерация/миграции prisma')
    .version('1.0.0');

program
    .command(Action.MIGRATE)
    .option('-n, --name <name>', 'Имя миграции')
    .option('-a, --all', 'Запустить по всем микросервисам')
    .option(`-s, --service <name>`, 'Запустить для конкретного сервиса')
    .action(handler);

program
    .command(Action.RESET)
    .option(`-s, --service <name>`, 'Запустить для конкретного сервиса')
    .action(handler);

program
    .command(Action.GENERATE)
    .option('-a, --all', 'Запустить по всем микросервисам')
    .option(`-s, --service <name>`, 'Запустить для конкретного сервиса')
    .action(handler);

program
    .command(Action.FORMAT)
    .option('-a, --all', 'Запустить по всем микросервисам')
    .option(`-s, --service <name>`, 'Запустить для конкретного сервиса')
    .action(handler);

program
    .command(Action.STUDIO)
    .option('-a, --all', 'Запустить по всем микросервисам')
    .option(`-s, --service <name>`, 'Запустить для конкретного сервиса')
    .action(handler);

program.parse();


