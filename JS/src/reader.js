import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
__dirname = path.dirname(__dirname)
const fileToTasks = `${__dirname}/data/tasks.json`





export function read() {
  try {
    const data = fs.readFileSync(fileToTasks, 'utf8');
    return (JSON.parse(data));
  } catch {
    console.error("Error reading file", err);
    return;
  }
}

export function hole() {
  const json = read();
  let counter = 0;
  for (let i = 0; i < json.tasks.length; i++) {
    if (json.tasks[i].id == i + 1) counter++;
    console.log(`${json.tasks[i].id} -- ${i + 1}`)
  }
  return ++counter;
}

hole();
