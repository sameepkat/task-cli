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
    const parsedData = JSON.parse(data);
    return (parsedData);
  } catch {
    console.error("Error reading file", err);
    return;
  }
}

export function hole() {
  const json = read();
  let existingIDs = [];
  try {
    const length = json.tasks.length
    for (let i = 0; i < length; i++) {
      existingIDs.push(json.tasks[i].id)
    }
  } catch {
    return 0;
  }
  if (existingIDs.length == 0) {
    return 0;
  }
  let i = 0;
  for (i = 0; i <= Math.max(...existingIDs); i++) {
    if (!existingIDs.includes(i)) {
      return i;
    }
  }
  return i++;
}


