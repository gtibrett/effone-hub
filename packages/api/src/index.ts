#!/usr/bin/env node
import config from './_config';
import appFactory, {AppConfig} from './AppFactory';
import {initializeLoader} from './loader';

export * from './types';

config();

const app = appFactory(process.env as AppConfig);
initializeLoader(app);
app.listen(process.env.PORT);

console.info(`API listening on port ${process.env.PORT}`);