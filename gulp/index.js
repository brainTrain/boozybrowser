'use strict';

import fs from 'fs';
import onlyScripts from './util/scriptFilter';

const tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasks.forEach((task) => {
    console.log('taskkkkkkkkkkkkkkkkkkkk', task);
    require('./tasks/' + task);
});
